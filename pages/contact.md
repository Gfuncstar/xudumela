# Contact — xudumela.africa/contact/

URL: https://xudumela.africa/contact/
Title tag: `Contact – Xudumela`
Meta description: **MISSING**
Canonical: `https://xudumela.africa/contact/`
OG / Twitter tags: **MISSING**
JSON-LD: **MISSING**

## Heading hierarchy

- H1: Contact Us
- H2: Contact Us to Get More Details
- H3: Let's start a conversation
- H4: XUDUMELA Conservancy

## Body copy

Page is form-led. Only standing copy is the global footer brand statement.

## Contact form

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Your name | text | not marked | none visible |
| Your email | email | not marked | none visible |
| Subject | text | not marked | none visible |
| Your message | textarea | not marked | none visible |

- Submit destination: **not visible in markup** (likely a generic theme contact form using `admin-ajax.php` or PHP-mail).
- Post-submit behaviour: **not specified**.
- Spam protection visible: **none** (no reCAPTCHA, no honeypot field detected).
- Field requireds: **none marked**. A user can submit an empty form.

## Visible contact info

| Item | Value | Notes |
|------|-------|-------|
| Phone | +267 73 893 375 | Botswana mobile |
| Phone (footer placeholder) | +41 22 345 67 88 | **Theme demo placeholder, NOT real** — remove |
| Phone (mobile footer placeholder) | +123456789 | **Theme demo placeholder, NOT real** — remove |
| Email | bookings@xudumela.africa | Primary booking inbox |
| Email | poachella2026@gmail.com | Festival inbox |
| Address | LOT 320 PM, Xudum River, Okavango Delta | |
| Secondary address | Plot 22207 Sedia, Maun | Maun-side office? Coords: -20.0002798, 23.3777038 |
| Instagram | @xudumela_conservancy | |

## Map embeds

Two Google Maps coordinates appear in the page markup:
- `-19.272376, 22.8450691` — LOT 320 PM, Xudum River (the camp itself)
- `-20.0002798, 23.3777038` — Plot 22207 Sedia, Maun (likely the Maun town office / pickup)

## Issues for rebuild

- Phone numbers in footer are still theme defaults (+41 22 ... and +123456789). Embarrassing on a live site.
- Two different email addresses without explanation (`bookings@xudumela.africa` vs `poachella2026@gmail.com`). Pick a single primary inbox per intent and label clearly.
- No required-field validation on contact form.
- No success or error state copy specified.
- No spam protection.
