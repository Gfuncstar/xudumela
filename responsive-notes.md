# Xudumela — Desktop vs mobile differences

One-line summary: the site serves identical HTML to desktop and mobile (a 7-byte diff — just a `mobile` class on `<html>`). All responsive behaviour is CSS-driven via Cozystay + Elementor media queries. There's no separate mobile site, no app banner, and no mobile-only content.

## Verified markup parity

| Page | Desktop bytes | Mobile bytes | Diff |
|------|--------------:|-------------:|-----:|
| Home | 139,291 | 139,298 | +7 (`class="...mobile"`) |
| Stay | 99,250 | 99,269 | +19 (same class plus a whitespace) |

Both versions reference the exact same image URLs, the same nav, the same forms, the same fonts. There is no `<source media="...">` swap and no mobile-only or desktop-only block in markup.

## Visual / CSS-driven differences

Captured by reading the Cozystay theme CSS and the Elementor breakpoints (`additional_custom_breakpoints` enabled in the Elementor settings).

| Surface | Desktop | Mobile |
|---------|---------|--------|
| **Top navigation** | Full horizontal nav with logo left, links centre, "Book now" right | Hamburger drawer. Logo stays left. "Book now" hidden behind hamburger. |
| **Hero** | Full-bleed image, two stacked headlines | Same image, same headlines, type scaled down |
| **Counter strip ("Hectare Reserve 0 / Mammal species 0 / Years 0")** | Three columns | Three rows stacked |
| **Essentials grid (8 items)** | Four columns × two rows | Two columns × four rows |
| **Accommodation cards** | Two columns | Stacked, full-width |
| **Activity / event cards (Conservation, Exclusive Events, Experiences)** | Three columns | Stacked, full-width |
| **Footer columns** | Three-column block (brand statement / reach out / newsletter) | Stacked, plus an extra "secondary footer" block becomes visible with `View on Map`, tel, mailto, Instagram link |
| **Newsletter form** | Inline input + button | Stacked input then button |

## The "mobile-only" footer block

On mobile the footer reveals a secondary contact block with three quick-action items:
- "View On Map" → Google Maps link
- Tap-to-call → currently still wired to the **theme-demo number `+41 22 345 67 88`** (must fix)
- Tap-to-email → `mailto:bookings@xudumela.africa`
- Instagram tap → `@xudumela_conservancy`

On desktop this block is collapsed/hidden behind the standard footer columns. The presence of separate tap targets on mobile is a sensible UX call. The wrong phone number is the issue.

## Issues specific to mobile

1. **The tap-to-call still hits the theme demo placeholder number.** That alone is a launch-blocker.
2. **Gallery images on `/stay/` are heavy.** The largest hero file is 7.3MB (`1660413.jpg`), served unresized to mobile. On a 3G or weak 4G connection in Maun this will load like a slideshow.
3. **The hamburger drawer hides the "Book now" CTA.** The whole site is funnelling people to `/contact/`. Hiding that one CTA inside the hamburger costs conversion. A sticky "Book now" / "Enquire" button at the bottom of the mobile viewport would help.
4. **No "click to WhatsApp" button.** For an African accommodation business this is mobile table-stakes.

## Issues that exist on both but show worse on mobile

- Two H1s on the homepage compress poorly into the mobile viewport.
- The zero-counter strip ("Hectare Reserve 0...") looks particularly broken on mobile because the three zeros sit on their own lines.
- The Marcellus display serif used for buttons at 16px is borderline thin on retina mobile screens. Worth bumping a notch in the rebuild.

## Rebuild recommendations for responsive

1. Fix the tap-to-call number.
2. Add a persistent bottom-anchored mobile CTA bar: `[Book] [WhatsApp]`.
3. Add `srcset` for every hero image with mobile-sized variants (~800px wide @ ~80KB target).
4. Add `loading="eager"` + `fetchpriority="high"` to the LCP hero image, `loading="lazy"` to everything else.
5. Add `picture` + WebP/AVIF source for hero galleries.
6. Add a click-to-WhatsApp button.
7. Test against real Botswana network conditions, not just localhost.
