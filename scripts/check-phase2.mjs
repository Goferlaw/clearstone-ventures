import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:8137";
const paths = [
  "/",
  "/about",
  "/strategies",
  "/strategies/multifamily",
  "/strategies/net-lease",
  "/strategies/residential-acquisitions",
  "/our-approach",
  "/contact",
  "/privacy",
];
for (const path of paths) {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  const html = await r.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one h1`);
  assert.ok(
    html.includes(
      `href="https://www.clearstone-ventures.com${path === "/" ? "" : path}"`,
    ),
    `${path}: canonical`,
  );
  assert.ok(html.includes('name="description"'), `${path}: description`);
  assert.ok(html.includes('property="og:title"'), `${path}: Open Graph`);
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("/_next/") || /\.(png|webp|jpg)$/.test(href)) continue;
    assert.ok(paths.includes(href), `${path}: unknown link ${href}`);
  }
}
assert.equal((await fetch(base + "/strategies/not-a-strategy")).status, 404);
assert.equal((await fetch(base + "/not-a-page")).status, 404);
for (const asset of [
  "/clearstone-logo.png",
  "/multifamily-community.webp",
  "/franchise-nnn.webp",
])
  assert.equal((await fetch(base + asset)).status, 200, asset);
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const path of paths)
  assert.ok(
    sitemap.includes(
      `https://www.clearstone-ventures.com${path === "/" ? "" : path}`,
    ),
  );
assert.ok(
  (await (await fetch(base + "/robots.txt")).text()).includes("sitemap.xml"),
);
const tokenResponse = await fetch(base + "/api/inquiry");
assert.match(tokenResponse.headers.get("cache-control"), /no-store/);
const config = await tokenResponse.json();
// Refuse live delivery credentials so this suite can never send real email.
assert.equal(config.ready, false, "Run tests without delivery credentials");
const post = (body, extra = {}) =>
  fetch(base + "/api/inquiry", {
    method: "POST",
    headers: { Origin: base, "Content-Type": "application/json", ...extra },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const valid = {
  name: "Test Visitor",
  email: "test@example.com",
  category: "Multifamily Opportunity",
  message: "A test inquiry with enough detail for server validation.",
  website: "",
  token: config.token || "",
};
let r = await post({ ...valid, email: "bad" });
assert.equal(r.status, 400);
assert.ok((await r.json()).errors.email);
r = await post({ ...valid, message: "short" });
assert.equal(r.status, 400);
assert.ok((await r.json()).errors.message);
r = await post({ ...valid, category: "Injected category" });
assert.equal(r.status, 400);
r = await post({
  ...valid,
  email: "test@example.com\r\nBcc: other@example.com",
});
assert.equal(r.status, 400);
r = await post({ ...valid, website: "bot-value" });
assert.equal(r.status, 400);
r = await post(valid, { Origin: "https://untrusted.example" });
assert.equal(r.status, 403);
r = await post("{bad json");
assert.equal(r.status, 400);
r = await post({ ...valid, message: "x".repeat(18000) });
assert.equal(r.status, 413);
r = await post(valid);
assert.equal(r.status, 503);
const pending = await r.json();
assert.ok(!pending.accepted);
assert.match(pending.error, /not been sent/);
console.log(
  "PASS: 9 pages, metadata, internal links, assets, sitemap, robots, 404s, server validation, origin rejection, honeypot, body limit, and honest unconfigured delivery. No email sent.",
);
