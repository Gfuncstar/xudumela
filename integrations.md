# Xudumela — Third-party integrations

One-line summary: the site is running thin. No analytics, no tag manager, no CRM, no booking system, no consent platform. The only live external service is Quicket for festival ticketing. Everything else is theme-default placeholder.

## Visible / wired

| Service | Where | Purpose | Notes |
|---------|-------|---------|-------|
| **Quicket** | Poachella page (BOOK HERE button) | Festival ticket sales | Event ID `371693-poachella-2026`. The only working revenue path on the entire site. |
| **Google Maps** | Contact page + footer | Directions | Plain URL links, not an iframe embed. No API key required. |
| **Instagram** | Footer of every page | Social link out | Handle `@xudumela_conservancy`. Link-out only, no embedded feed. |
| **Google Fonts** | Every page | Type loading | Marcellus + Jost (used) + Roboto + Roboto Slab (loaded but unused). |
| **Dzein Studio** | Footer credit | Web-design agency credit | `http://dzeinstudio.co.za/`. Marketing partnership, not a runtime integration. |
| **Connect Trust** | Mentioned in Camp Site page | Conservation levy beneficiary ($15/night) | Mentioned only in body copy. No website link, no donate page, no logo, no schema. |

## Not present (but typical for a property in this category)

| Service category | Status |
|------------------|--------|
| Analytics — GA4 / Plausible / Fathom | **None detected.** Site is currently uninstrumented. |
| Tag manager — GTM | None. |
| Heatmaps / session replay — Hotjar / Clarity | None. |
| Booking engine — Cloudbeds / Little Hotelier / SiteMinder / Lodgify | None. |
| Channel manager — Booking.com / Airbnb / Expedia | Not connected at the website level. |
| Live chat — Intercom / Crisp / tawk.to / WhatsApp Business widget | None. |
| Email service provider — Mailchimp / Klaviyo / ConvertKit | **Not wired.** Newsletter form has no detectable destination. |
| CRM — HubSpot / Salesforce / Pipedrive | None. |
| Payment processor — Stripe / PayPal / Yoco / PayFast | None on the site itself. Quicket handles festival payments separately. |
| Reviews widget — TripAdvisor / Reviews.io / Trustpilot / Google Reviews | None. |
| Cookie banner / consent platform — Cookiebot / Iubenda / OneTrust | **None.** Site sets fonts.googleapis.com cookies and runs a contact form without a consent layer. Potential PoPIA / GDPR exposure. |
| Privacy policy | Not linked in footer. |
| Terms & conditions | Not present. |
| Search Console / Bing Webmaster | Not verifiable from front-end; assumed not set up given the broken sitemap. |

## Festival ecosystem (from Quicket page)

These are real-world partners of Poachella 2026 but are not currently linked or surfaced on the Xudumela website:

| Partner | Role |
|---------|------|
| **Connect Trust** | Conservation beneficiary — wildlife, education, community upliftment |
| **YOWNN Yoga** | Wellness / RESET Lounge |
| **Helicopter Horizons** | Scenic flights provider |
| **Dusty Donkey** | Festival catering |
| **Okavango Air Rescue** | Medical support / standby |
| **Duck Inn** | Maun shuttle |
| **Barclay Stenner** | Marketing / website partner for the festival |

Surfacing these on the Xudumela site (logos + links + short descriptions on a "Festival partners" or "Conservation partners" page) is a cheap credibility win.

## CMS / framework

- **WordPress** 6.9.4 (per `<meta name="generator">`)
- **Elementor** 4.0.8 (visual page builder)
- **Cozystay** theme (LoftOcean's hotel/rental theme)
- Hosted on the `.africa` ccTLD

## Stack exposure

The site advertises its stack in meta and link tags:

- `<meta name="generator" content="WordPress 6.9.4" />`
- `<meta name="generator" content="Elementor 4.0.8; ..." />`
- Theme path `wp-content/themes/cozystay/`

This is normal for WordPress but worth removing in the rebuild if you want to reduce automated-vulnerability scanning noise.

## What the rebuild should add

In rough priority order:

1. **Analytics** — GA4 or Plausible. Pick one before launch.
2. **Search Console** — verify property, submit a real sitemap.
3. **Booking engine** — Lodgify, Little Hotelier, or a Stripe-backed custom booking form. The "every booking is an email" model is bleeding revenue.
4. **Email service provider** — wire the newsletter to a real ESP with double-opt-in.
5. **Consent platform** — even a simple cookie banner with link to privacy policy.
6. **Privacy policy + T&Cs pages** — required for any commerce, required for PoPIA / GDPR compliance.
7. **Reviews widget** — TripAdvisor or Google Reviews carousel on the Stay page once enough reviews exist.
8. **Festival partner logos block** — surface Connect Trust, Helicopter Horizons, Air Rescue, etc.
9. **WhatsApp Business link** — for a property where booking and arrival logistics are the bulk of customer enquiries, a tap-to-WhatsApp link will outperform a contact form.
