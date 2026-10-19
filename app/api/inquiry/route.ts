import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { validateInquiry } from "@/lib/inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
let localSecret: string | undefined;
const developmentSecret = () => (localSecret ??= randomBytes(32).toString("hex"));
const usedTokens = new Map<string, number>();
const buckets = new Map<string, { count: number; expires: number }>();
const MAX_BYTES = 16000;
const config = () => ({
  key: process.env.RESEND_API_KEY,
  to: process.env.INQUIRY_TO_EMAIL,
  from: process.env.INQUIRY_FROM_EMAIL,
  secret:
    process.env.INQUIRY_TOKEN_SECRET &&
    Buffer.byteLength(process.env.INQUIRY_TOKEN_SECRET, "utf8") >= 32
      ? process.env.INQUIRY_TOKEN_SECRET
      : process.env.NODE_ENV !== "production"
        ? developmentSecret()
        : undefined,
});
const response = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
const sign = (value: string, secret: string) =>
  createHmac("sha256", secret).update(value).digest("hex");
const tokenError =
  "Please refresh the form, wait a few seconds, then try again.";

export async function GET() {
  const { key, to, from, secret } = config();
  const ready = Boolean(key && to && from && secret);
  if (!secret) return response({ ready: false, token: null });
  const value = `${Date.now()}.${randomBytes(16).toString("hex")}`;
  return response({ ready, token: `${value}.${sign(value, secret)}` });
}
export async function POST(request: NextRequest) {
  // Browser-origin verification complements signed timing tokens and a honeypot.
  const requestOrigin = request.headers.get("origin");
  const allowedOrigin =
    process.env.INQUIRY_ALLOWED_ORIGIN ||
    `${request.nextUrl.protocol}//${request.headers.get("host")}`;
  if (!requestOrigin || requestOrigin !== allowedOrigin)
    return response({ error: "This request origin is not allowed." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response({ error: "Use a JSON inquiry request." }, 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES)
    return response({ error: "The inquiry is too large." }, 413);
  // Bound the streamed body as well; Content-Length alone is not trustworthy.
  const reader = request.body?.getReader();
  if (!reader) return response({ error: "The inquiry body is missing." }, 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      return response({ error: "The inquiry is too large." }, 413);
    }
    chunks.push(value);
  }
  let raw: unknown;
  try {
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return response({ error: "The inquiry could not be read." }, 400);
  }
  const { data, errors } = validateInquiry(raw);
  if (Object.keys(errors).length || !data)
    return response(
      { error: "Please check the highlighted fields.", errors },
      400,
    );
  const { key, to, from, secret } = config();
  if (!key || !to || !from || !secret)
    return response(
      {
        error:
          "Online delivery is not configured yet. Your inquiry has not been sent. Please use the email draft option below.",
      },
      503,
    );
  const [timestamp, nonce, signature, ...rest] = data.token.split(".");
  const value = `${timestamp}.${nonce}`;
  const expected = sign(value, secret);
  if (
    rest.length ||
    !/^\d{13}$/.test(timestamp || "") ||
    !/^[a-f0-9]{32}$/.test(nonce || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return response({ error: tokenError }, 400);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
    return response({ error: tokenError }, 400);
  const now = Date.now();
  const age = now - Number(timestamp);
  if (age < 3000 || age > 60 * 60 * 1000)
    return response({ error: tokenError }, 400);
  for (const [id, expires] of usedTokens)
    if (expires < now) usedTokens.delete(id);
  for (const [id, bucket] of buckets)
    if (bucket.expires < now) buckets.delete(id);
  if (usedTokens.has(nonce))
    return response(
      {
        error:
          "This form was already submitted. Refresh before sending another inquiry.",
      },
      409,
    );
  // Email-keyed limits work without trusting spoofable client-forwarded IP headers.
  // Per-instance global budget bounds memory/use; use a durable limiter before multi-instance public launch.
  const emailKey = sign(data.email.toLowerCase(), secret);
  const bucket = buckets.get(emailKey) || {
    count: 0,
    expires: now + 15 * 60 * 1000,
  };
  if (bucket.count >= 3 || usedTokens.size >= 500)
    return response(
      { error: "Too many inquiries. Please try later or contact us by email." },
      429,
    );
  bucket.count++;
  buckets.set(emailKey, bucket);
  usedTokens.set(nonce, now + 60 * 60 * 1000);
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Company: ${data.company || "Not provided"}`,
    `Category: ${data.category}`,
    `Property address: ${data.propertyAddress || "Not provided"}`,
    "",
    data.message,
  ].join("\n");
  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": nonce,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Clearstone inquiry: ${data.category}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!delivery.ok)
      return response(
        {
          error:
            "The email service did not accept this inquiry. Please use the email draft option or contact us directly.",
        },
        502,
      );
    return response({
      accepted: true,
      message:
        "The email service accepted your inquiry for delivery. Thank you for contacting Clearstone.",
    });
  } catch {
    return response(
      {
        error:
          "Delivery could not be confirmed. Please contact us directly. If you retry, mention that this may be a duplicate.",
      },
      502,
    );
  }
}
