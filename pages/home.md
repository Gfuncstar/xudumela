# Home — xudumela.africa

URL: https://xudumela.africa/
Title tag: `Xudumela`
Meta description: **MISSING**
Canonical: `https://xudumela.africa/`
OG / Twitter tags: **MISSING**
JSON-LD / structured data: **MISSING**

## Heading hierarchy

- H1: Welcome to Xudumela
- H1: Where Conservation meets Wilderness
- H3: More than a place to stay, Xudumela is a living conservancy shaped by wildlife, people, education, and a deep connection to the transitional landscapes surrounding the Okavango Delta.
- H2: Enjoy magnificent Okavango Experiences
- H2: The Okavango Delta
- H2: Discover the camp we made
- H2: The Essentials
  - H3: Airport Transfers
  - H3: Wifi & Internet
  - H3: Breakfast and Full board Options
  - H3: Housekeeper Services
  - H3: Laundry Services
  - H3: Swimming Pool
  - H3: Activities
  - H3: Conservation
- H2: Discover Our Accommodations
  - H3: TENTS AND CAMP SITES
  - H3: CAMP SITE
  - H3: SAFARI TENT
- H2: Local Activities & Events
  - H3: CONSERVATION
  - H3: EXCLUSIVE EVENTS
  - H3: EXPERIENCES
- H2: IMMERSE YOURSELF INTO THE XUDUMELA VISION
- H2: Book Your Stay Now
  - H3: Begin your Xudumela journey today, where wilderness, conservation, adventure, and meaningful connection come together beside the remarkable Okavango Delta.

**Issues:**
- Two H1s on a single page (Welcome + Where Conservation meets Wilderness). Should be one.
- H3 used as a long-form paragraph rather than as a heading. Should be `<p>` body copy with a smaller H2/H3 above it.

## Body copy (verbatim)

**Hero / opening:**
> Welcome to Xudumela
> Where Conservation meets Wilderness
> More than a place to stay, Xudumela is a living conservancy shaped by wildlife, people, education, and a deep connection to the transitional landscapes surrounding the Okavango Delta.

**Counter strip (currently displaying zeros):**
> Hectare Reserve: 0
> Mammal species recorded: 0
> Years of protection to date: 0

**Experiences cards (4):**
- Bushmen Archery ($95 / Person)
- Walking & Tracking ($75 / Person)
- Mokoro & Canoes ($85 / Person)
- Elephant Hide ($20 / Person)

**The Essentials — 8 cards:**
- Airport Transfers: Seamless transfers connecting guests between Maun Airport, Xudumela, and surrounding wilderness experiences.
- Wifi & Internet: Stay connected when needed, while remaining immersed in nature and meaningful wilderness experiences.
- Breakfast and Full board Options: Fresh, relaxed meals inspired by outdoor living, local flavours, and shared campfire dining experiences.
- Housekeeper Services: Friendly daily housekeeping ensuring your tent, campsite, or retreat space always feels comfortable.
- Laundry Services: Convenient safari laundry services helping guests travel lighter during longer wilderness stays and adventures.
- Swimming Pool: Cool off beside the water while wildlife and wilderness rhythms unfold around you naturally.
- Activities: Immersive wilderness experiences connecting guests with wildlife, culture, conservation, adventure, and the Okavango.
- Conservation: Every stay directly supports conservation, education, community partnerships, and long-term ecosystem protection efforts.

**Accommodation cards:**
- CAMP SITE — $25 PPPN
- SAFARI TENT — FROM $160 per person (LOW SEASON) — 26 m², 2 Guests, 1 En-Suite Bathroom

**Local Activities & Events cards:**
- CONSERVATION: Every stay directly supports conservation initiatives focused on wildlife protection, habitat restoration, education, and meaningful community partnerships locally.
- EXCLUSIVE EVENTS: Host unforgettable gatherings, retreats, celebrations, and conservation events beneath open skies in an authentic wilderness setting beside Maun.
- EXPERIENCES: Discover immersive Okavango experiences including mokoro journeys, tracking, walking safaris, birding, wellness, and meaningful wilderness connection daily.

**Footer brand statement (appears on every page):**
> Xudumela Conservancy and Camp Grounds was created from a vision to protect and celebrate the important landscapes surrounding the Okavango Delta near Maun. Built around conservation, community, and authentic wilderness experiences, Xudumela combines relaxed safari living with meaningful environmental purpose. What began as a simple idea has evolved into a growing conservancy welcoming travellers, schools, events, and conservation partnerships — creating a place where people can reconnect with nature in a way that feels personal, grounded, and real.

## Calls to action

| # | Text | Destination | Position |
|---|------|-------------|----------|
| 1 | Book now | `/contact/` | Top nav, right |
| 2 | Discover experience | `#` *(broken)* | Bushmen Archery card |
| 3 | Discover Experience | `#` *(broken)* | Walking & Tracking card |
| 4 | Discover Experience | `#` *(broken)* | Mokoro & Canoes card |
| 5 | Discover Experience | `#` *(broken)* | Elephant Hide card |
| 6 | Explore All Accommodations | `https://cozystay.loftocean.com/mountain-hotel/stay/` *(WRONG, points to theme demo)* | Accommodations section |
| 7 | Get Directions | Google Maps `-19.272376, 22.8450691` | Footer |
| 8 | Sign up for newsletter | (form, no visible destination) | Footer |

## Images referenced

Hero / experience tiles, essentials grid, accommodation cards, events cards. All listed in `assets/images/images-index.md`.

## Forms

- Footer newsletter signup (single-field, "Sign up for newsletter", no destination wired in markup)

## Third-party embeds

- Google Maps embed in footer
- Instagram link to `@xudumela_conservancy`
- The "Explore All Accommodations" CTA points to the theme vendor's demo site, not to `/stay/`. **Bug.**

## Notes for rebuild

- Counter strip with three zeros is the most damaging element on the page. Either populate with real numbers or remove entirely.
- Four experience cards link to `#` (placeholder). Each should resolve to either a dedicated experience page or anchor to a section.
- The "Explore All Accommodations" CTA links off-site to a theme demo. Fix to `/stay/`.
- Two H1s is an SEO bug.
- The H3 used for long-form intro copy is a semantic mistake.
