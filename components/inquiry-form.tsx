"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { inquiryCategories } from "@/lib/site";
type DeliveryStatus = { ready: boolean; token: string | null };
type SubmissionResult = { accepted?: boolean; message?: string; errors?: Record<string, string>; error?: string };

export function InquiryForm({
  initialCategory,
  audience,
}: {
  initialCategory: string;
  audience: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [delivery, setDelivery] = useState<{
    ready: boolean;
    token: string | null;
  }>({ ready: false, token: null });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [accepted, setAccepted] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true;
    fetch("/api/inquiry", { cache: "no-store" })
      .then((r) => r.json() as Promise<DeliveryStatus>)
      .then((d) => {
        if (active) setDelivery(d);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setAccepted(false);
    setStatus("");
    setErrors({});
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const r = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          category,
          token: delivery.token || "",
        }),
      });
      const result = await r.json() as SubmissionResult;
      if (r.ok && result.accepted) {
        setAccepted(true);
        setStatus(result.message || "The email service accepted your inquiry for delivery.");
      } else {
        setErrors(result.errors || {});
        setStatus(
          result.error ||
            "Your inquiry has not been sent. Please try again or contact us directly.",
        );
      }
    } catch {
      setStatus(
        "The connection failed. Delivery could not be confirmed. Please contact us directly.",
      );
    } finally {
      setBusy(false);
      requestAnimationFrame(() => summary.current?.focus());
    }
  }
  function prepareEmail() {
    const values = new FormData(form.current!);
    const body = `Name: ${values.get("name") || ""}\nEmail: ${values.get("email") || ""}\nPhone: ${values.get("phone") || ""}\nCompany: ${values.get("company") || ""}\nProperty address: ${values.get("propertyAddress") || ""}\n\n${values.get("message") || ""}`;
    window.location.href = `mailto:info@clearstone-ventures.com?subject=${encodeURIComponent(`Clearstone: ${category}`)}&body=${encodeURIComponent(body)}`;
    setAccepted(false);
    setStatus(
      "An email draft has been requested in your email app. Review and send it there. No message has been sent by this website.",
    );
  }
  const field = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  const property = [
    "Multifamily Opportunity",
    "Net Lease / Franchise Opportunity",
    "Residential Property",
  ].includes(category);
  return (
    <form ref={form} onSubmit={submit} className="inquiry-form" noValidate>
      {audience && (
        <p className="audience-note">For {audience.toLowerCase()}</p>
      )}
      <p className="form-helper">Fields marked * are required.</p>
      {!loading && !delivery.ready && (
        <div className="delivery-pending">
          <strong>Online delivery is pending configuration.</strong>
          <p>
            You can prepare an email draft below and send it from your email
            app. Nothing entered here is stored until an inquiry is sent through
            a configured delivery service.
          </p>
        </div>
      )}
      {status && (
        <div
          className={accepted ? "form-status success" : "form-status"}
          ref={summary}
          tabIndex={-1}
          role={accepted ? "status" : "alert"}
        >
          {status}
          {Object.keys(errors).length > 0 && (
            <ul>
              {Object.entries(errors).map(([name, text]) => (
                <li key={name}>
                  <a href={name === "form" ? "#inquiry-form" : `#${name}`}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="form-grid">
        <label htmlFor="name">
          Name *
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={150}
            {...field("name")}
          />
          {error("name")}
        </label>
        <label htmlFor="email">
          Email *
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            {...field("email")}
          />
          {error("email")}
        </label>
        <label htmlFor="phone">
          Phone <span>(optional)</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={50}
            {...field("phone")}
          />
          {error("phone")}
        </label>
        <label htmlFor="company">
          Company <span>(optional)</span>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={200}
            {...field("company")}
          />
          {error("company")}
        </label>
      </div>
      <label htmlFor="category">
        Inquiry category *
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          {...field("category")}
        >
          {inquiryCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {error("category")}
      </label>
      {property && (
        <label htmlFor="propertyAddress">
          Property or site address <span>(if known)</span>
          <input
            id="propertyAddress"
            name="propertyAddress"
            autoComplete="off"
            maxLength={300}
            {...field("propertyAddress")}
          />
          {error("propertyAddress")}
        </label>
      )}
      <label htmlFor="message">
        Message *
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          placeholder="Introduce the opportunity, your objectives and any relevant context."
          {...field("message")}
        />
        {error("message")}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-helper">
        Please do not send confidential financial information or sensitive
        personal documents. <a href="/privacy">How we handle inquiries</a>.
      </p>
      <div className="form-actions">
        {delivery.ready && (
          <button
            className="button button-navy"
            disabled={busy || accepted}
            type="submit"
          >
            {busy ? "Sending…" : accepted ? "Inquiry accepted" : "Send inquiry"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        )}
        <button
          className={
            delivery.ready ? "button button-light" : "button button-navy"
          }
          type="button"
          onClick={prepareEmail}
        >
          Prepare email draft <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="form-helper">
        The draft option opens your email app. It does not send a message
        automatically.
      </p>
    </form>
  );
}
