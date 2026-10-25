# Cyber Savvy Pro Website

A Next.js marketing website with an admin dashboard for blog management, careers, messages, newsletter subscribers, testimonials, FAQs, case studies, and other content updates.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy [.env.example](.env.example) to `.env.local` and fill in the values.
3. Start the site:
   ```bash
   npm run dev -- --port 3001
   ```
4. Open the app:
   - http://localhost:3001
   - http://localhost:3001/admin/login

## Admin login

Credentials are set in `.env.local` (see `.env.example` for the required variables):

- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

Generate a strong password locally, e.g. with PowerShell:

```powershell
-[guid]::NewGuid().ToString("N") + [convert]::ToBase64String((1..16 | % {Get-Random -Max 256}))
```

Never commit real credentials to the repository.

## Features

- Sidebar navigation grouped by Dashboard, Site Content, and Inbox (with a mobile drawer)
- Blog publishing and unpublishing
- Career posting and editing
- Contact form message review and email replies
- Subscriber email list and bulk newsletter sending
- Testimonials, FAQ, and case study creation/editing/deletion (powers the public /testimonials, /faq, and /case-studies pages)
- Page Content editor for site-wide blocks: stats bars, feature grids, process steps, benefits, and metrics (20 sections across 14 pages)
- Rich text blog editor
- PDF CV upload support for job applications
- One-click JSON backup of all site content

## SMTP setup

To enable real email sending, configure these variables in `.env.local`:

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-business-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=your-business-email@example.com
```

Recommended providers:
- Gmail SMTP with app password
- SendGrid
- Mailgun
- Postmark

## Deployment notes

This project is ready for deployment on Vercel or similar Node-based hosting.

Before going live:
- set `ADMIN_SECRET` to a strong random value
- configure SMTP for production
- verify HTTPS and custom domain setup
- back up the JSON files in the `/data` folder

## Common issue

If the app starts showing missing chunk/module errors in development, clear the stale Next.js cache and restart:

```bash
rm -rf .next
npm run dev -- --port 3001
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev -- --port 3001
```

## Data storage

Content is stored in the `/data` folder as JSON files.

This keeps the CMS simple and easy to manage while still allowing content edits from the admin dashboard.
