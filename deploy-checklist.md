# Launch checklist

> Status: **Build passes, lint passes, admin credentials hardened.** Two things still block a real launch: **SMTP** and an **actual deploy**. See "Remaining blockers" at the bottom.
>
> **Re-verified 2026-10-20:** an unescaped apostrophe in `src/app/features/page.tsx` (line 154) was blocking `npm run lint` and `npm run build`; fixed with `&apos;`. Lint, full production build (52 static pages / 56 routes), and a live `next start` smoke test (12 routes → all HTTP 200, including `/features` and `/admin/login`) now all pass.

## Before deployment

- [x] Copy `.env.example` to `.env.local` and set real values
- [x] Set a production-safe `ADMIN_SECRET` (regenerated to a 64-char random value locally)
- [ ] **Configure SMTP for real mail sending** ← requires provider credentials (blocked)
- [x] Review admin username/password and change if needed (password regenerated locally)
- [ ] Verify blog publish/unpublish behavior on the live site
- [ ] Confirm PDF CV uploads work in production
- [ ] Test contact form submission and email reply flow (needs SMTP)
- [ ] Test newsletter subscription and bulk email flow (needs SMTP)
- [ ] Review homepage, pricing, services, and contact content
- [ ] **REQUIRED (custom-server/VPS deploys): set `NEXT_PUBLIC_SITE_URL`** (e.g. `https://yourdomain.com`) in the production environment. Page-level canonical/og:url tags are baked at BUILD time and fall back to `http://localhost:3000` without it — sitemap/robots self-detect per request, but the in-`<head>` tags do not. Vercel-only deploys pick the production domain up automatically.
- [ ] Confirm images, logos, and favicon are correct

## Deployment

- [ ] Deploy to Vercel or hosting provider ← requires hosting account/access (blocked)
- [ ] Add custom domain and HTTPS
- [ ] Confirm environment variables are set in the hosting dashboard (must include `NEXT_PUBLIC_SITE_URL` — see above)
- [ ] Run a live smoke test on production URL

## Post-launch

- [ ] Verify admin login works on production
- [ ] Check contact message inbox and reply flow
- [ ] Check subscriber email list and sends
- [ ] Monitor for 500 errors and logs
- [ ] Back up `/data` JSON content regularly

## Remaining blockers (need input from you)

1. **SMTP / email** — `src/lib/mailer.ts` throws until `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` are set. Provide credentials for a provider (Gmail app password, SendGrid, Mailgun, Postmark) and they can be added to `.env.local` + the hosting dashboard.
2. **Deployment** — needs a Vercel/hosting account and (optionally) a custom domain. The build is verified ready; only the push + env vars + DNS remain.
3. **Regenerate secrets per environment** — the local `ADMIN_SECRET`/`ADMIN_PASSWORD` set here are for local use. Generate fresh values in the hosting dashboard for production.

## Completed locally (this session)

- [x] Stopped dev server, cleared stale `.next` cache
- [x] Hardened `ADMIN_SECRET` and `ADMIN_PASSWORD` in `.env.local`; updated README
- [x] `npm run build` — passes, all 38 routes compile
- [x] `npm run lint` — no warnings or errors
- [x] Restarted dev server; verified homepage 200 and admin login 200 with session cookie
