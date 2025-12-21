# Resend Email Service Setup Guide

## Overview
The contact form now sends real emails using **Resend**, a free email service for developers.

**What happens when someone submits the contact form:**
1. Email is sent to your admin inbox (info@communitycare.org)
2. Confirmation email is sent to the user's email address
3. Both emails are fully formatted with the submitted information

## Free Tier Limits
- **100 emails/day** on the free tier
- No credit card required to start
- Perfect for small to medium organizations

## Setup Steps

### 1. Create a Resend Account
1. Go to https://resend.com
2. Click "Sign Up"
3. Enter your email and create an account
4. Verify your email address

### 2. Get Your API Key
1. In your Resend dashboard, go to **API Keys**
2. Copy the default API key (it starts with `re_`)

### 3. Add to Environment Variables
1. Open `.env.local` in your project
2. Add this line:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Replace `re_your_api_key_here` with your actual API key from step 2

### 4. Configure Sender Email (Important!)
By default, Resend uses a subdomain email: `onboarding@resend.dev`

**To use your own domain or email:**
1. Go to Resend Dashboard → **Domains**
2. Add your domain (or use a free Resend subdomain)
3. Update the sender email in `src/app/actions/contact.ts`:
   ```typescript
   from: 'noreply@yourdomainhere.com',  // Change this
   ```

**For testing with default:**
- Replace `noreply@communitycare.org` with `onboarding@resend.dev` in both files:
  - `src/app/actions/contact.ts`
  - Update the confirmation email sender as well

### 5. Update Recipient Email
In `src/app/actions/contact.ts`, update the admin email address:
```typescript
to: 'your-email@yourorganization.org',  // Change this line
```

### 6. Test the Form
1. Run `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out the form and submit
4. Check your admin email for the submission
5. Check your test email for the confirmation

## Troubleshooting

**"RESEND_API_KEY is not configured"**
- Make sure you added the key to `.env.local`
- Restart your dev server after adding the key: `npm run dev`

**Email not received**
- Check spam/junk folder
- Verify the email address is correct in `src/app/actions/contact.ts`
- Check Resend dashboard for delivery status

**Domain verification issues**
- Use `onboarding@resend.dev` as the sender while testing
- Once you have a real domain, add it to Resend for verification

## Next Steps
- Add the contact form to your website navigation
- Test with real emails before launch
- Monitor email delivery in Resend dashboard
- When ready to scale beyond 100/day, upgrade to paid plan
