# Supabase Custom SMTP Configuration (Resend)

To ensure signup emails come from `vizulux.com` instead of the default Supabase address, follow these steps:

## 1. Credentials (From Resend Dashboard)
- **SMTP Host**: `smtp.resend.com`
- **SMTP Port**: `587`
- **User**: `resend`
- **Password**: `${RESEND_API_KEY}` (The same one in your .env.local)

## 2. Supabase Dashboard Settings
1. Go to **Settings** -> **Auth**.
2. Scroll to **Email Settings**.
3. Toggle **Enable Custom SMTP** to ON.
4. Input the credentials above.
5. Set **Sender Email** to: `Vizulux <no-reply@vizulux.com>`
6. Set **Sender Name** to: `Vizulux`

## 3. Verify Domain
Ensure `vizulux.com` is verified in your Resend dashboard (Settings -> Domains) with the correct DNS records (SPF, DKIM).
