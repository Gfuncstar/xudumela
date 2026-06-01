# Images — index

37 image files captured from xudumela.africa. Sizes vary wildly (28KB to 7.3MB). All originals are JPG or PNG. **No file ships with alt text on the live site.**

The images split into three groups: full-resolution originals (the bigger files), Elementor-cropped thumbnails (the smaller "card" sized files), and a few hybrid PNG/JPG masters used in product cards. The site uses both originals AND the elementor/thumb variants depending on the layout, which is why some logical images appear twice in this list under different filenames.

## Originals (full-resolution photography)

| File | Bytes | Subject | Purpose | Used on |
|------|-------|---------|---------|---------|
| `1620210.jpg` | 2.5 MB | Delta channel landscape | Hero / gallery | Home gallery |
| `1630002.jpg` | 2.5 MB | Delta channel landscape | Hero / gallery | Home gallery |
| `1660413.jpg` | 7.3 MB | Delta landscape, wide | Hero / gallery | Home gallery |
| `1660618.jpg` | 6.5 MB | Delta landscape | Hero / gallery | Home gallery |
| `Delta-Scenes.jpg` | 695 KB | Mixed delta scene | Inline gallery | Home, Stay |
| `Drone-Shot-of-Camp-from-South.jpg` | 673 KB | Aerial view of camp from south | Hero on Camp Site, card on Stay | Home, Stay, Camp Site |
| `IMG_3703.jpg` | 482 KB | Pool / camp wide | Essentials, gallery | Home, Stay |
| `IMG_3704.jpg` | 464 KB | Camp environment | Hero gallery | Home |
| `IMG_3713.jpg` | 317 KB | Camp environment | Gallery | Home |
| `IMG_3716.jpg` | 670 KB | Camp wide | Camp Site detail page | Camp Site |
| `IMG_3722.jpg` | 286 KB | Camp environment | Gallery | Home |
| `IMG_3724.jpg` | 205 KB | Camp environment | Gallery | Home |
| `IMG_3734.jpg` | 535 KB | Camp environment | Gallery | Home |
| `IMG_3737.jpg` | 386 KB | Elephant hide | Experiences card | Home, Stay |
| `IMG_3741.jpg` | 510 KB | Camp environment | Gallery | Home |
| `IMG_3743.jpg` | 192 KB | Camp environment | Gallery | Home |
| `IMG_3744.jpg` | 324 KB | Camp environment | Gallery | Home |
| `IMG_3762.jpg` | 465 KB | Camp environment | Gallery | Home |
| `Pool-Zebra.jpg` | 899 KB | Zebra at pool edge | Essentials, gallery | Home, Stay |
| `Safari_Tent.png` | 3.2 MB | Safari tent exterior | Hero, card | Stay, Safari Tent detail |
| `Safari_Tent_Pool.png` | 2.8 MB | Tent / pool composite | Card | Stay, Safari Tent detail |
| `Safari_Shower.png` | 511 KB | Outdoor safari shower | Gallery | Stay |

## Elementor cropped thumbnails (already cropped to card aspect, low-res)

These are the same source photos but pre-cropped by Elementor to the card grid. The site uses these for the home-page experience tiles and the events grid.

| File | Bytes | Subject | Purpose | Used on |
|------|-------|---------|---------|---------|
| `Anti-Poaching.jpg` | 85 KB | Anti-poaching team / patrol scene | Conservation card | Home |
| `Bathroom-Detail.jpg` | 32 KB | Tent bathroom detail | Gallery | Stay |
| `Bathroom-Detail-1.jpg` | 32 KB | Tent bathroom detail (variant) | Gallery | Stay |
| `Bushmen_Archery.jpg` | 37 KB | Bushmen archery activity | Experience card | Home |
| `Camp.jpg` | 129 KB | Camp wide | Gallery | Stay |
| `Drone-of-Tents.jpg` | 95 KB | Aerial of tents | Gallery | Stay |
| `Festival-Image.jpg` | 78 KB | Poachella festival image | Exclusive Events card | Home |
| `Front-of-Tent.jpg` | 109 KB | Tent front exterior | Gallery | Stay |
| `Guided_Tour.jpg` | 27 KB | Guided walk / tracking | Experience card | Home |
| `IMG_3700.jpg` | 30 KB | Mokoro on water | Experience card | Home |
| `IMG_3701.jpg` | 48 KB | Mokoro / canoe scene | Experiences card | Home |
| `IMG_3715.jpg` | 76 KB | Tent interior | Gallery | Stay |
| `IMG_3717.jpg` | 51 KB | Tent interior | Gallery | Stay |
| `IMG_3718.jpg` | 57 KB | Tent interior | Gallery | Stay |
| `Pool.jpg` | 81 KB | Pool detail | Gallery | Stay |
| `Pool-and-camp.jpg` | 83 KB | Pool with camp | Gallery | Stay |

## Production quality flags

| Image | Issue |
|-------|-------|
| `1660413.jpg` (7.3 MB) | Served unresized on home page. Mobile LCP killer. |
| `1660618.jpg` (6.5 MB) | Same. |
| `Safari_Tent.png` (3.2 MB) | PNG used where JPG would be 1/5 the size. |
| `Safari_Tent_Pool.png` (2.8 MB) | Same. |
| `IMG_3700.jpg` (30 KB) | Too low-res for any production use. Looks like a screenshot of a screenshot. |
| `Guided_Tour.jpg` (27 KB) | Same. |
| `Bushmen_Archery.jpg` (37 KB) | Same. |
| Everything with an `IMG_NNNN` filename | These are raw camera dumps. Rename and select a curated set. |

## Things missing

- **No food / dining photography.** Every working camp shows food.
- **No portrait of guides, staff, or trackers.** Conservation brand without people doesn't land.
- **No festival photography from previous editions** (if any).
- **No wildlife portraits** — only landscape and "zebra at pool" oblique angles.
- **No after-dark / fire-light / star photography.** Big miss for a Delta camp.
- **No "arriving at camp" sequence** — guests have nothing to anchor expectation to.
- **No floor plan, no map of the conservancy.**

## What the rebuild needs

1. Cull to ~20 images (5 hero, 5 tent/camp, 5 activities, 5 wildlife/landscape) — drop the rest.
2. Re-export all as WebP at three sizes (480, 1024, 1920) with `srcset`.
3. Commission or shoot: food, portraits of staff and guides, night/fire, wildlife portraits, festival imagery from 2026.
4. Add a written alt text to every image.
5. Convert the `Safari_Tent.png` and `Safari_Tent_Pool.png` masters to JPG/WebP.
