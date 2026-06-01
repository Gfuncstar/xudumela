# Xudumela — Links and CTAs map

One-line summary: the link graph is small (about 25 distinct destinations site-wide) and contains four broken or wrong-target CTAs that need fixing in the rebuild.

## Primary navigation

Same across every page:

| Label | Destination | Type |
|-------|-------------|------|
| Home | `/` | Internal |
| Stay | `/stay/` | Internal |
| Contact | `/contact/` | Internal |
| Poachella / Festival | `/poachella-festival/` | Internal |
| Book now | `/contact/` | Internal CTA button |

The "Book now" CTA is the only button-style item in the nav. It is repeated identically on every page.

## Footer links

| Label | Destination | Notes |
|-------|-------------|-------|
| Home | `/` | Internal |
| Stay | `/stay/` | Internal |
| Contact | `/contact/` | Internal |
| Instagram | `https://www.instagram.com/xudumela_conservancy` | External, opens new tab |
| Dzein Studio | `http://www.dzeinstudio.co.za/` | External, web-design credit. **Uses `http://` not `https://` — flag.** |
| View on Map | `https://maps.google.com/?q=-19.272376,22.8450691` | External, Google Maps |
| Phone (display) | `tel:+41223456788` | **WRONG — theme demo placeholder.** Real number is +267 73 893 375. |
| Email (display) | `mailto:bookings@xudumela.africa` | Correct |

## Page-level CTAs by destination

### Internal CTAs

| From page | CTA text | Target |
|-----------|----------|--------|
| Header (all pages) | Book now | `/contact/` |
| Stay (Camp Site card) | Discover More | `/room/camp-site/` |
| Stay (Safari Tent card) | Discover More | `/room/safari-tent/` |
| Room: Camp Site | BOOK NOW | `/contact/` |
| Room: Safari Tent | BOOK NOW | `/contact/` |
| Home (booking band) | Book your stay now | `/contact/` |

### External CTAs

| From page | CTA text | Target | Notes |
|-----------|----------|--------|-------|
| Poachella | BOOK HERE | `https://www.quicket.co.za/events/371693-poachella-2026/#/` | The single working off-site funnel |
| All pages (footer) | Get Directions | Google Maps | Two coords in the contact page markup |

### **Broken or incorrect links — fix list**

| From page | CTA text | Current target | Fix |
|-----------|----------|----------------|-----|
| Home | Discover experience (Bushmen Archery) | `#` | Build a `/experiences/bushmen-archery/` page or anchor target |
| Home | Discover Experience (Walking & Tracking) | `#` | Build a `/experiences/walking-and-tracking/` page or anchor target |
| Home | Discover Experience (Mokoro & Canoes) | `#` | Build a `/experiences/mokoro-and-canoes/` page or anchor target |
| Home | Discover Experience (Elephant Hide) | `#` | Build a `/experiences/elephant-hide/` page or anchor target |
| Home | Explore All Accommodations | `https://cozystay.loftocean.com/mountain-hotel/stay/` | **Theme-demo URL.** Should be `/stay/`. |
| Footer (all pages) | Phone tap-to-call | `tel:+41223456788` | Replace with `tel:+26773893375` |
| Footer (mobile, all pages) | Phone (placeholder) | `+123456789` | Replace with the real number |
| Footer | Dzein Studio | `http://www.dzeinstudio.co.za/` | Upgrade to `https://` (the site supports it) |

## External / outbound link inventory

| Destination | Where it appears | Purpose |
|-------------|------------------|---------|
| `instagram.com/xudumela_conservancy` | Footer (every page) | Social |
| `quicket.co.za/events/371693-poachella-2026/` | Poachella page | Ticket purchase |
| `dzeinstudio.co.za` | Footer (every page) | Web-design credit |
| `google.com/maps/...` | Contact + footer | Directions |
| `cozystay.loftocean.com/mountain-hotel/stay/` | Home | **Accidental — theme demo URL** |

## Internal-link graph

Crawlable internal pages — six in total:

```
Home
 ├─ Stay
 │   ├─ Room: Camp Site
 │   └─ Room: Safari Tent
 ├─ Contact
 └─ Poachella / Festival
```

Every page links to:
- Home
- Stay
- Contact
- Poachella
- Plus the footer Instagram + map + email + phone

The two room detail pages are reachable from `/stay/` but not from the main nav. Direct deep-link discoverability is fine because they're crawled from the stay overview.

## URLs to redirect or repair in the rebuild

| Current URL | Action |
|-------------|--------|
| `/wp-sitemap.xml` | Currently returns HTML. Restore as XML. |
| `/sitemap.xml` | Same. |
| `tel:+41223456788` | Remove. |
| `https://cozystay.loftocean.com/mountain-hotel/stay/` | Replace with `/stay/`. |

## Suggested new internal pages for the rebuild

To support both SEO and user flow:

1. `/about/` — founder story, conservation partners, designer credit
2. `/experiences/` — single index page replacing the four `#` cards on the homepage
3. `/experiences/<each>/` — one page per activity (Bushmen Archery, Walking & Tracking, Mokoro & Canoes, Elephant Hide, Birding, Wellness)
4. `/conservation/` — Connect Trust partnership, anti-poaching, $15/night levy, hectares protected, species recorded
5. `/poachella-festival/2026/` — full festival info pulled onto the Xudumela domain (line-up, tickets, partners, FAQ), so the brand owns the SEO instead of Quicket
6. `/journal/` or `/news/` — basic blog feed for SEO and shareable content
