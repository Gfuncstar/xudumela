# Xudumela — site clone foundation

Foundation pulled from https://xudumela.africa on 2026-05-19 for a Claude Code rebuild. Everything below is plain markdown so the rebuild session can navigate fast.

## The brand at a glance

- **Name:** Xudumela Conservancy and Camp Grounds
- **Location:** LOT 320 PM, Xudum River, Okavango Delta, near Maun, Botswana
- **Coordinates:** 20°02'32.7"S, 23°05'10.4"E
- **Designer / current build partner:** Dzein Studio (Cape Town)
- **Festival marketing partner:** Barclay Stenner
- **Live stack:** WordPress 6.9.4 + Elementor 4.0.8 + Cozystay theme

## The site at a glance

- **Pages:** 6 — Home, Stay, Contact, Poachella / Festival, Room: Camp Site, Room: Safari Tent
- **Logos captured:** primary on dark + primary on light + 3 favicon sizes. **Vector + black-only + monochrome variants are missing.**
- **Images captured:** 37 unique files (everything the live site references)
- **Videos captured:** none — the site has no video
- **Schema types found:** none
- **Forms:** 2 (contact + newsletter) — both with no destination wired, no validation, no spam protection
- **Third-party integrations:** Quicket (festival tickets) and Google Maps. No analytics, no booking engine, no email service, no CRM.

## Index of documents

| File | What's in it |
|------|--------------|
| [README.md](./README.md) | This file. |
| [brand.md](./brand.md) | Real palette and typography (Cozystay theme tokens — primary `#b99d75`, secondary `#53624e`, Marcellus + Jost). Logo set status. Voice patterns. |
| [seo-audit.md](./seo-audit.md) | Metadata, schema, sitemap, performance. **The site is invisible to Google.** Prioritised fix list. |
| [links-and-ctas.md](./links-and-ctas.md) | Every link, every CTA, every broken target. |
| [forms.md](./forms.md) | Two forms with full field-by-field detail and the wiring they don't have. |
| [integrations.md](./integrations.md) | Quicket, Google Maps, festival partners. Long list of what's missing. |
| [responsive-notes.md](./responsive-notes.md) | Desktop vs mobile (CSS-only, identical HTML). Mobile-specific issues. |
| [competitive-analysis.md](./competitive-analysis.md) | Where Xudumela sits between Tier 1 luxury fly-ins and Tier 3 overland camps. Whitespace gaps. |
| [copy.md](./copy.md) | Original vs rewritten copy for every key block. |
| [pages/home.md](./pages/home.md) | Full page capture. |
| [pages/stay.md](./pages/stay.md) | Full page capture. |
| [pages/contact.md](./pages/contact.md) | Full page capture. |
| [pages/poachella-festival.md](./pages/poachella-festival.md) | Full page capture + the Quicket ticket data the site itself doesn't have. |
| [pages/room-camp-site.md](./pages/room-camp-site.md) | Full page capture. |
| [pages/room-safari-tent.md](./pages/room-safari-tent.md) | Full page capture. |
| [assets/images/](./assets/images/) | All 37 images. See `images-index.md` for labels, purpose, and quality flags. |
| [assets/logos/](./assets/logos/) | Logo files + favicons. See `logos-index.md` for what's there and what's missing. |
| [assets/videos/](./assets/videos/) | Empty — see `videos-index.md` for the case for adding video. |
| `raw/` *(not committed)* | Raw HTML and CSS pulled from the live site, kept for reference. |

## Headline findings, ordered by leverage

1. **Sitemap is broken.** robots.txt points to `/wp-sitemap.xml`. That URL returns the homepage HTML instead of XML. Google has nothing to crawl from. Fix this before launch.
2. **No meta descriptions, no Open Graph tags, no JSON-LD.** Every page. The Poachella festival URL shared on WhatsApp looks like a naked link. The home page can't appear in event-rich Google results.
3. **The "Explore All Accommodations" CTA on the homepage links to the theme vendor's demo site.** Four other CTAs on the homepage link to `#`.
4. **The footer tap-to-call still uses the theme demo number `+41 22 345 67 88`** and the mobile footer shows `+123456789`. Both will be live on production.
5. **Two H1s on the homepage**, plus an H3 used as a long-form paragraph. Semantic HTML is broken.
6. **The "0 hectares, 0 species, 0 years" counter strip is rendering literal zeros** on the live site.
7. **No analytics, no booking engine, no ESP.** The entire booking flow is "email us via the form, we'll reply when we see it."
8. **Strategic positioning is buried.** Xudumela is a *conservancy* with a *boutique music festival*, drivable from Maun. None of those three differentiators are on the hero.

## What's ready to drop into Claude Code

You can start the rebuild straight from this folder. Pull the per-page markdown for structure, `brand.md` for design tokens, `copy.md` for the rewritten voice, `links-and-ctas.md` for the wiring map, and `seo-audit.md` for the fix list. The `assets/` folder has every image you need (cull and re-export as WebP before shipping).

## Open questions for the team

Three things the rebuild can't answer without input from Xudumela / Dzein:

1. **Real numbers for the counter strip** — hectares of conservancy, mammal species recorded, anti-poaching patrol hours funded by levy.
2. **High-season and low-season dates** — currently the Safari Tent has two prices with no dates attached.
3. **Vector logo source** — Dzein Studio almost certainly has an SVG / AI master. Worth one email before the rebuild starts.
