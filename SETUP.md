# Vizulux Website — Setup Guide

## Quick Start (3 commands)

```bash
cd vizulux-website
npm install
npm run dev
```

Open http://localhost:3000 — your site is live.

---

## Pages Built

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage (12 sections) |
| `/pricing` | `app/pricing/page.tsx` | Full pricing + add-ons |
| `/work` | `app/work/page.tsx` | Portfolio grid |
| `/start` | `app/start/page.tsx` | Intake form |
| `/about` | `app/about/page.tsx` | About page |
| `/thank-you` | `app/thank-you/page.tsx` | Post-form confirmation |
| `/api/contact` | `app/api/contact/route.ts` | Form submission handler |

---

## Connect the Contact Form (Pick one method)

### Option A: Resend (Recommended — free tier)
1. Sign up at https://resend.com
2. `npm install resend`
3. Add `RESEND_API_KEY=re_xxx` to `.env.local`
4. Uncomment the Resend block in `app/api/contact/route.ts`

### Option B: Gmail SMTP
1. Enable App Passwords in your Google account
2. `npm install nodemailer @types/nodemailer`
3. Add Gmail credentials to `.env.local`
4. Uncomment the Nodemailer block in the route file

### Option C: Supabase (stores leads in a database)
1. Create a Supabase project at https://supabase.com
2. Create a `leads` table (SQL below)
3. Add Supabase keys to `.env.local`

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  first_name text,
  business_name text,
  industry text,
  package_interest text,
  email text,
  phone text,
  goal text,
  timeline text,
  created_at timestamptz default now()
);
```

---

## Customize Your Content

### Phone number
Search and replace `(802) 555-0100` with your real number.

### Email
Search and replace `hello@vizulux.com` with your email.

### Testimonials
Edit `components/homepage/Testimonials.tsx` — replace with real client quotes.

### Portfolio
Edit `app/work/page.tsx` — update project names, results, descriptions.

### Logo
Drop your logo file into `/public/` and update `components/Navbar.tsx`:
```tsx
// Replace the text logo with:
<Image src="/logo.png" alt="Vizulux" width={120} height={36} />
```

---

## Deploy to Vercel (One command)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at https://vercel.com/new — Vercel auto-detects Next.js and deploys on every push.

Add your environment variables in Vercel's dashboard under Project Settings → Environment Variables.

---

## Tech Stack

- **Next.js 14** — App Router, Server Components
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations
- **TypeScript** — Type safety
- **Vercel** — Deployment platform
