# Clearstone Ventures LTD — Phase 2

Development branch: `feature/clearstone-phase-2`. No Phase 2 production deployment or DNS changes are authorized. The currently published static Site remains unchanged.

## Review locally

Use Node 20+ and pnpm. Run `pnpm install`, `pnpm dev --hostname 127.0.0.1 --port 8137`, and open `http://127.0.0.1:8137`. The preserved logo and approved illustrative multifamily / NNN assets remain local. Optimized WebP copies are used in the new pages; original assets are retained.

Pages: Home, About, Strategies, Multifamily, Net Lease, Residential Acquisitions, Our Approach, Contact and Privacy. Navigation, strategy content, inquiry categories, metadata helpers and editorial sections use shared components/data. No portfolio, performance, franchise relationship or institutional-capital claims are introduced. Decorative numbered labels remain removed.

## Checks

- `pnpm lint`
- `pnpm exec tsc --noEmit` (after Next has generated route types)
- `pnpm build`
- With an unconfigured local server running: `node scripts/check-phase2.mjs`

The smoke suite refuses a live delivery configuration so no email is sent. It covers routes, heading hierarchy, metadata, internal links, assets, sitemap/robots, unknown routes, API field errors, cross-origin rejection, honeypot, request size and an honest 503 response when delivery is unconfigured.

## Contact delivery — pending configuration

No provider account is created and no paid service is enabled. A server-only Resend HTTP adapter implements the official send-email contract: https://resend.com/docs/api-reference/emails/send-email . Another provider can replace the adapter if preferred.

The owner must approve a provider account and securely configure:

- `RESEND_API_KEY`: a sending credential; never expose it in browser code or commit it.
- `INQUIRY_FROM_EMAIL`: a verified sender identity.
- `INQUIRY_TO_EMAIL`: the confirmed destination inbox. The existing public email remains `info@clearstone-ventures.com`, but is not silently treated as an approved backend destination.
- `INQUIRY_TOKEN_SECRET`: random server-only secret, at least 32 bytes.
- `INQUIRY_ALLOWED_ORIGIN`: exact canonical origin, e.g. `https://www.clearstone-ventures.com`, without trailing slash. Redirect the noncanonical hostname to the canonical host before form use.

Copy `.env.example` to `.env.local` for local setup. Until configured, the UI says delivery is pending and offers the existing email-draft workflow. Valid inquiries receive API status 503, never success. Contact submissions are not persisted by the application.

Server validation and spam controls include a honeypot, signed one-use tokens, minimum completion interval, expiry, per-email throttling and a per-instance budget. These controls are process-local; add a platform-level/durable limiter or an owner-approved challenge service before multi-instance public launch. Provider acceptance does not guarantee inbox delivery; the confirmation describes acceptance accurately. Real email delivery, deliverability and live abuse controls remain unverified without credentials and a deployment target.

## Runtime and deployment implications

Phase 1 is a static export hosted by Sites, not a confirmed Vercel deployment. Phase 2 adds `/api/inquiry` and a server-rendered contact page, so `next.config.mjs` no longer sets `output: 'export'`. `pnpm build` produces a standard Next.js application; `pnpm start` serves it on a Node-compatible host such as a configured Vercel project. Do not upload `.next` into the static Sites manifest or deploy the old `out/` directory as Phase 2.

The tracked `.openai/hosting.json` retains the existing production identity/configuration and still describes Phase 1 output. A future Sites launch requires an approved server-capable migration, such as its Worker/Vinext workflow, or a separately configured server endpoint. A Vercel launch requires an owner-approved project, these environment variables and explicit production authorization. No Vercel project has been assumed or created.

Production names are `www.clearstone-ventures.com` (canonical) and `clearstone-ventures.com`. Review their current state immediately before an authorized launch. Do not alter GoDaddy DNS on this branch. Keep branch preview deployment disabled unless separately authorized when connecting any host later. Both domains are attached to Sites, so changing hosts requires an explicit cutover plan.

Read-only check on October 19, 2026: the www URL returned HTTP 200 with Clearstone content and no WordPress error. The apex URL returned HTTP 404; Sites reported its certificate active but its custom-domain mapping still pending / `active_redeploying`. This is an outstanding hosting-mapping issue for a separately authorized production follow-up. No DNS or production deployment was changed in Phase 2.

## Review and merge

Review the feature branch/PR and local preview. Confirm the copy, destination inbox, provider and deployment target. Merge only after approval; merging a connected repository can trigger production deployment, so inspect deployment hooks first. Do not merge or deploy merely to preview these changes.
