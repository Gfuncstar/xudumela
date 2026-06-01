# Xudumela — Brand audit

Pulled from the live CSS theme variables in `wp-content/themes/cozystay/assets/styles/front/main.min.css` plus inline page styles. The brand is sitting inside a Cozystay theme with very lightly customised tokens. Real palette and typography below.

## Colours

| Role | Hex | Where used |
|------|-----|------------|
| **Primary — warm khaki / sand** | `#b99d75` | Buttons, icon strokes, dividers, hover underlines, primary accent across the site |
| Primary semi-transparent | `rgba(185, 157, 117, 0.3)` | Soft overlays, card hovers |
| Primary hover | `#ab916c` | Button hover background |
| **Secondary — muted olive / bushveld green** | `#53624e` | Subheading colour, secondary callouts |
| Content text (light surfaces) | `#333632` | Body copy on white backgrounds |
| Light surface bg | `#ffffff` | Default page background |
| Light surface text | `#1a1b1a` | Near-black headings on white |
| Dark surface bg | `#0e0d0a` | Near-black with a warm tint, used for dark sections / footer |
| Dark surface text | `#ffffff` | Body on dark sections |
| Dark surface content | `#eeeeee` | Subdued copy on dark sections |
| Border accent | `#b5bbb3` | Warm grey for fine borders |
| Lighter text | `#666666` | Captions, meta text |
| Border (soft) | `rgba(0, 0, 0, 0.1)` | Card outlines on light surfaces |

The site is **not** running the Elementor default palette (`#6EC1E4 / #54595F / #7A7A7A / #61CE70`). The Elementor kit globals are still on the defaults from theme install. All the visible styling is Cozystay theme tokens.

### Palette summary in plain English

It's a warm-earth two-colour system: a soft **golden khaki** as the action colour and a **dusty olive green** as the secondary. Both pull from the dry-bush palette of the Okavango fringe rather than the lush green of the wet delta. Backgrounds are either pure white or a deep, slightly warm near-black for dark sections. It's restrained and tonal, exactly what a small conservation camp brand should look like.

## Typography

The site loads four families but only two are actually rendered as type. The other two are imported by the theme but unused.

### In use

| Role | Family | Weights | Where |
|------|--------|---------|-------|
| **Headings, page titles, buttons** | **Marcellus** (serif, Google Fonts) | 400 | All H1–H6, primary CTA labels |
| **Body, nav, subheadings, widgets** | **Jost** (sans, Google Fonts) | 400, 500 | Paragraph copy, nav, footer, captions |

Marcellus is a Trajan-feeling display serif — high-contrast, almost monumental. Jost is a clean geometric sans, modernist, neutral. The pairing reads "boutique, considered, restrained safari" rather than "luxury lodge" or "budget backpacker". It's a good pairing for the brand position.

### Loaded but unused

- Roboto (sans) — full weight set 100–900 with italics
- Roboto Slab (slab serif) — full weight set 100–900 with italics

These come from the Elementor default kit. They add roughly 600KB to the page weight for no visible benefit. **Flag for the rebuild: drop them entirely.**

### Type rules from CSS

- Nav: Jost 13px / 500 / `letter-spacing: 0.05em` / uppercase
- Widget titles: Jost 14px / 500 / `letter-spacing: 0.05em` / uppercase
- Sub-headings: Jost 12px / 500 / `letter-spacing: 0.1em` / uppercase
- Body: 18px / `line-height: 1.66`
- Buttons: Marcellus 16px / 400 / mixed case / 52px tall
- Primary heading scale appears to follow a Cozystay default (no custom scale set)

## Logo set

| Variant | File | Status |
|---------|------|--------|
| Primary (positive on dark) | `assets/logos/Xudumela-Logo_small_white.png` (255×307) | ✓ Captured |
| Mark on light | `assets/logos/Xudumela-Logo_small.png` (255×307) | ✓ Captured |
| Black-only variant | — | **MISSING — flag for design** |
| Monochrome / single colour | — | **MISSING — flag for design** |
| Vector source (SVG / AI / EPS) | — | **MISSING — request from Dzein Studio (designer credit in footer)** |
| Favicon 32×32 | `assets/logos/cropped-Favicon-32x32.png` | ✓ |
| Favicon 180×180 (Apple touch) | `assets/logos/cropped-Favicon-180x180.png` | ✓ |
| Favicon 192×192 (Android) | `assets/logos/cropped-Favicon-192x192.png` | ✓ |

The existing logo is a stacked mark (icon above wordmark) and works at the 255×307 raster size. Anything smaller will need an SVG. **Request the SVG from Dzein Studio before starting the rebuild.**

## Imagery style

Photographic, no illustration. Three distinct buckets visible across the site:

1. **Wide landscape / drone shots** of the camp, river channel, and tents in the bush — warm midday-to-golden-hour light, neutral grading.
2. **Wildlife / activity shots** — zebra at pool, walking safaris, archery, mokoro canoes, anti-poaching crews. Documentary feel, not over-styled.
3. **Tent and amenity interiors** — canvas, dark wood, neutral linens, hammered-copper bathroom fittings, outdoor showers.

The set is **consistent in tone** (warm, slightly desaturated) but **inconsistent in production quality** — some shots look like working iPhone documentation (IMG_3700–IMG_3762 series) and some look like professional drone / DSLR work. Flag for the rebuild: cull the snapshot-quality images or commission a coherent shoot.

## Voice — current state

The current copy across the site uses one register. Calm, earnest, slightly soft. Some samples:

> More than a place to stay, Xudumela is a living conservancy shaped by wildlife, people, education, and a deep connection to the transitional landscapes surrounding the Okavango Delta.

> Built around conservation, community, and authentic wilderness experiences, Xudumela combines relaxed safari living with meaningful environmental purpose.

> Begin your Xudumela journey today, where wilderness, conservation, adventure, and meaningful connection come together beside the remarkable Okavango Delta.

**Patterns / verbal tics:**
- "Meaningful X" three times in single paragraphs. Overused.
- "Authentic" / "real" / "grounded" / "connection" cluster — generic eco-luxury fillers.
- Every essential service description ends on a soft adverb or modifier ("ensuring", "naturally", "always", "daily"). Reads as filler.
- Em-dashes used (— rather than -). Banned in Giles's rebuild rules.
- "A living conservancy" is the one phrase doing real work — it implies the place is more than a hotel.

**Patterns to keep:**
- Confident first-person institutional voice ("we made", "our")
- Specifics where they appear ($15/night to Connect Trust; 400-guest festival cap; Xudum Channel; UNESCO World Heritage Site)
- The conservation-as-purpose framing

**Patterns to drop:**
- "Meaningful" as filler
- "Authentic / real / grounded" stack
- Vague capacity claims ("Hectare Reserve 0, Mammal species 0, Years of protection 0" — actually displayed as zeros on the live site)
- The em-dashes

## Language patterns

- "Conservancy" is used consistently (not "reserve", not "lodge"). Distinctive and worth keeping.
- "Camp Grounds" is the formal name in some sentences.
- The river is "Xudum Channel" or "Xudum River" (used inconsistently — pick one).
- "Okavango Delta near Maun" is the consistent geographic anchor.
- "Poachella" is the festival brand. Strong, ironic, memorable. Keep.

## What the brand needs that it doesn't have yet

1. SVG logo + black + white + icon-only variants
2. A short brand-voice statement (under 20 words) the team can write to
3. A consistent name for the river ("Xudum Channel" vs "Xudum River")
4. Real numbers for the counter strip (hectares, species, years) or remove it
5. A short brand mission line that can sit under the logo in the hero, replacing the current H1-stacked "Welcome to Xudumela / Where Conservation meets Wilderness"
