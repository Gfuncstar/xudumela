# Xudumela — Forms inventory

One-line summary: two forms across the site. Both are theme-default Cozystay forms with no required-field validation, no spam protection, and no specified submit destination.

## 1. Contact form

- **URL:** https://xudumela.africa/contact/
- **Purpose:** General enquiries and bookings (the site has no real booking system, so every booking flows through this form).
- **Visible label:** "Contact Us to Get More Details"

### Fields

| Order | Label | Type | Required | Placeholder | Validation |
|-------|-------|------|----------|-------------|------------|
| 1 | Your name | text | not marked | none | none |
| 2 | Your email | email | not marked | none | HTML5 `type=email` only |
| 3 | Subject | text | not marked | none | none |
| 4 | Your message | textarea | not marked | none | none |

### Submission

- Submit destination: **not visible in markup** (likely WordPress `admin-ajax.php` via the Cozystay theme's bundled contact-form handler, dispatching to the configured admin email)
- Configured recipient: assumed `bookings@xudumela.africa`, not verifiable from the front-end
- Post-submit behaviour: not specified
- Success state copy: not specified
- Error state copy: not specified
- Spam protection: **none detected** (no reCAPTCHA, no hCaptcha, no honeypot field)

### Issues for rebuild

1. No required fields. Empty submissions accepted.
2. No spam protection. Will get scraped within days of going live.
3. No reply-to email address from the system, so submissions can't be replied to from the inbox directly.
4. No confirmation email sent to the user.
5. No CRM or marketing automation hooked up.

## 2. Newsletter signup

- **Location:** Footer, every page
- **Purpose:** Email subscriber capture
- **Visible label:** "Sign up for newsletter"

### Fields

| Order | Label | Type | Required | Placeholder |
|-------|-------|------|----------|-------------|
| 1 | (email input) | email | not marked | implied |

A single email field plus a submit control. No further details exposed in the rendered markup.

### Submission

- Submit destination: **not visible in markup**
- Service provider: **unknown.** No Mailchimp, no ConvertKit, no Klaviyo, no MailerLite script tags detected in the rendered HTML. This is most likely either:
  - The Cozystay theme's built-in newsletter widget (writes to a WordPress option, doesn't deliver anywhere)
  - A non-functional placeholder

### Issues for rebuild

1. No double-opt-in flow.
2. No welcome email.
3. No GDPR/PoPIA consent checkbox.
4. No privacy-policy link visible at the form.
5. If the form is going to a WP option and not to a real ESP, every signup so far is unreachable in production.

## What the rebuild needs

Two distinct forms, both wired to real services:

1. **Booking enquiry form** (`/contact/` plus inline on `/stay/`, `/room/camp-site/`, `/room/safari-tent/`, `/poachella-festival/`)
   - Required: name, email, phone, dates (from / to), guests (adults / children), tent vs camp site, dietary or access needs, message
   - reCAPTCHA v3 or Cloudflare Turnstile
   - Auto-reply to user with timing expectation
   - Pipes into a CRM or shared inbox plus a Slack/WhatsApp notification

2. **Newsletter signup** (footer, inline blog if/when added)
   - Single field (email), with one-tick consent toggle and link to privacy policy
   - Wire to a real ESP (Mailchimp / ConvertKit / Beehiiv)
   - Double-opt-in
   - Welcome email confirming the subscription

Optionally:

3. **Poachella ticket-interest form** for tickets not yet on sale, or for sold-out scenarios.
4. **Group / event enquiry form** — Xudumela actively markets "exclusive events, retreats, gatherings" but there's no targeted form for that yet.
