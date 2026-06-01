# Videos — index

**Status: none on the site.**

No `<video>` elements, no Vimeo embeds, no YouTube embeds, no MP4 background loops, no autoplay reels. The hero is a static image on every page.

## What the rebuild should add

For a property selling wilderness + a music festival, video is table-stakes.

1. **Hero background loop (silent, 6–10 seconds, looped)** — slow drone push over the tents and the Xudum Channel. Web-optimised at ~1MB.
2. **Poachella sizzle reel (60–90 seconds)** — once 2026 footage exists. Embeds on the festival page above the BUY TICKETS button.
3. **Walking-with-trackers short** — 30–45 seconds, ambient sound only, low-effort to produce.
4. **Founder voiceover / "why this place exists" piece** — under 2 minutes. Sits on the /about/ page.

All should be:
- Hosted on Vimeo (with privacy + domain restriction) rather than self-hosted, to keep bandwidth costs predictable
- Available in MP4 (H.264) for fallback
- Captioned (for accessibility and silent autoplay on mobile)
- Lazy-loaded below the fold; only the hero loop preloaded
