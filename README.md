# Clearstone Ventures LTD — Phase 2

Phase 2 uses the Sites-supported Vinext/Cloudflare Worker runtime. The project retains its existing Site identity, logo, public audience and custom-domain configuration. Do not change DNS or deploy subsequent edits without the appropriate user authorization.

## Review locally

Use Node 22.13+ and pnpm. Run `pnpm install`, then `pnpm dev` (portable preview defaults to port 5173). For the exact deployed runtime, run `pnpm build`, then `pnpm start --port 8137` and open `http://127.0.0.1:8137`. The preserved logo and approved illustrative multifamily / NNN assets remain local. Optimized WebP copies are used in the new pages; original assets are retained.

Pages: Home, About, Strategies, Multifamily, Net Lease, Residential Acquisitions, Our Approach, Contact and Privacy. Navigation, strategy content, inquiry categories, metadata helpers and editorial sections use shared components/data. No portfolio, performance, franchise relationship or institutional-capital claims are introduced. Decorative numbered labels remain removed.

## Checks

- `pnpm lint`
- `pnpm typecheck`
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

## Runtime and deployment

The application uses the supported Sites Vinext starter build integration, including `sites()` in `vite.config.ts`. The Next-compatible application routes run on Cloudflare Workers, with React 19 and asynchronous route/search parameters. `pnpm build` emits the deployable Worker in `dist/server` and browser assets in `dist/client`. `pnpm start` runs that exact build locally through Wrangler.

The tracked `.openai/hosting.json` retains `project_id` and omits `static` for Worker deployment. Source synchronization and packaging must use the Sites workflow. Do not upload the old `.next` or `out/` output as Phase 2. No Vercel project has been assumed or created. Secrets must be configured in the Site's server runtime, never client variables.

Production names are `www.clearstone-ventures.com` (canonical) and `clearstone-ventures.com`. Review their current state immediately before an authorized launch. Do not alter GoDaddy DNS on this branch. Keep branch preview deployment disabled unless separately authorized when connecting any host later. Both domains are attached to Sites, so changing hosts requires an explicit cutover plan.

Read-only check during Phase 2 preparation on October 19, 2026: the www URL returned HTTP 200 with Clearstone content and no WordPress error. The apex URL returned HTTP 404 while its mapping was pending / `active_redeploying`. Recheck this mapping after publication. No GoDaddy DNS changes are part of the publishing migration.

## Review and merge

Review the feature branch/PR and local preview. Confirm the copy, destination inbox, provider and deployment target. Merge only after approval; merging a connected repository can trigger production deployment, so inspect deployment hooks first. Do not merge or deploy merely to preview these changes.
