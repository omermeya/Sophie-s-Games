# Feed the Unicorn: asset brief

Everything in the game is currently drawn in code. This is the list of images that will replace those drawings.

## General rules (apply to every file)

- **Format:** PNG with a transparent background. SVG is even better if you have vector art.
- **Size:** exactly the pixel size given for each file. If the art doesn't fill the canvas, leave the rest transparent. Don't crop.
- **No drop shadows, glow or background color** baked into the image. The game adds those.
- **Style:** soft, round, friendly, pastel, for a 5-year-old. Thick, rounded outlines. Current palette: pink `#FFC8E1`/`#F27AB0`, lavender `#E6DAFF`/`#9C7AD6`, mint `#C9F5E3`/`#3FBF8F`, sky `#CDEBFF`/`#3FA3DC`, gold `#FFD35C`/`#E8A92B`, outline/ink `#5B3F86`.
- **No text or numbers in any image.** The game adds numbers itself.
- **File weight:** keep each file under about 300 KB (the game is cached for offline play). Run PNGs through TinyPNG or similar.
- **Names:** use the exact file names below, all lowercase.

---

## 1. The unicorn (the most important part): 11 layers

The unicorn is animated in pieces: the head shakes, the mouth opens and chews, the eyes blink, the mane and tail sway, and wings flap during the celebration. So it has to be delivered as **separate layers on one shared canvas**.

**Every layer is 1200 × 1320 px**, the same canvas for all of them. Each part stays in the position it has in the full unicorn. If you stack all the layers in the order below, they must form the complete unicorn. Easiest way: draw the full unicorn in one file with each part on its own layer, then export each layer at full canvas size.

Reference: `_reference/unicorn-template-1200x1320.png` shows the current unicorn on that canvas, with the pivot points marked.

| # (back → front) | File | What it is | Rotates around (px) |
|---|---|---|---|
| 1 | `unicorn-wing-left.png` | Left wing. Only shown while flying. | (400, 1020): where it joins the body |
| 2 | `unicorn-wing-right.png` | Right wing. Only shown while flying. | (800, 1020) |
| 3 | `unicorn-tail.png` | Tail | (860, 1160): where it joins the body |
| 4 | `unicorn-body.png` | Body and legs (sitting, facing us) | — |
| 5 | `unicorn-mane.png` | Mane: the hair behind and around the head | (600, 440) |
| 6 | `unicorn-head.png` | Head: face, ears, horn, cheeks, snout. **No eyes and no mouth.** | (600, 900): the neck |
| 7 | `unicorn-eyes-open.png` | Normal eyes, big and friendly | — |
| 8 | `unicorn-eyes-happy.png` | Happy closed eyes (^ ^ shape) | — |
| 9 | `unicorn-eyes-closed.png` | Blink frame: eyes gently shut | — |
| 10 | `unicorn-mouth-closed.png` | Closed smile | — |
| 11 | `unicorn-mouth-open.png` | Wide open "aaah" mouth, ready to eat | — |

Must-haves:
- **The mouth center has to be at (600, 816).** Food flies to that exact point.
- The eyes are centered around (600, 592).
- The wings, tail and mane must overlap a little under the body/head at their pivot point, so no gap shows when they rotate.
- The unicorn should be facing the viewer (or a slight ¾ view). The flying scene moves it left to right, so it shouldn't look strongly to one side.
- Keep everything inside the canvas with about 40 px of margin, because the parts rotate.

---

## 2. Magical foods: 6 images

The child drags these into the unicorn's mouth. Each one gets a number on a **white circle badge** drawn on top by the game.

**Each one is 600 × 600 px**, centered, filling about 85% of the canvas.

| File | Idea (feel free to change) |
|---|---|
| `food-cupcake.png` | Rainbow cupcake with a cherry |
| `food-star-cookie.png` | Star-shaped cookie with icing |
| `food-donut.png` | Pink donut with sprinkles |
| `food-moon-candy.png` | Crescent-moon candy / lollipop |
| `food-apple.png` | Shiny magic apple |
| `food-cotton-candy.png` | Cotton candy cloud on a stick |

Must-have: **leave a plain, calm area of about 290 × 290 px** (a circle) somewhere in each food, ideally a bit below the middle, for the number badge. Then tell me where its center is, in pixels (for example "cupcake: 300, 440"). More foods are welcome. Any extra `food-*.png` works the same way.

---

## 3. Counting pictures: 8 images

Small pictures shown in rows so the child can count them ("3 + 2" shows ●●● + ●●). There are 4 shapes, each in 2 colors: **gold** for the first group and **pink** for the second. For take-away questions the game grays out and crosses off items itself.

**Each one is 200 × 200 px**, centered, filling about 90%.

| File | |
|---|---|
| `count-star-gold.png` / `count-star-pink.png` | Star |
| `count-heart-gold.png` / `count-heart-pink.png` | Heart |
| `count-flower-gold.png` / `count-flower-pink.png` | Flower |
| `count-gem-gold.png` / `count-gem-pink.png` | Gem / crystal |

Must-have: simple, very readable shapes. Up to 18 of them appear at once, quite small (about 40–70 px on screen). Gold ≈ `#FFD35C`, pink ≈ `#FF9EC8`.

---

## 4. Rewards and particles: 4 images

| File | Size | Where it's used |
|---|---|---|
| `star-reward.png` | 512 × 512 | Big star earned at the end of a round. A smaller copy is the star counter on the start screen. |
| `heart.png` | 128 × 128 | Little hearts that pop out when the unicorn eats |
| `sparkle.png` | 128 × 128 | 4-pointed sparkle that twinkles everywhere |
| `crumb.png` | 64 × 64 | Food crumb when chewing (optional; otherwise it stays as colored dots) |

---

## 5. Button icons: 6 images

These sit inside round colored buttons (the button color comes from the game). Draw them **white only, on transparent**, as simple bold shapes.

**Each one is 160 × 160 px**, with the icon filling about 80%.

| File | Meaning |
|---|---|
| `icon-speaker.png` | Hear the question again |
| `icon-music-on.png` | Sound on (music note) |
| `icon-music-off.png` | Sound off (music note with a line through it) |
| `icon-home.png` | Back to start (little house) |
| `icon-again.png` | Play again (circular arrow) |
| `icon-pip.png` | Small white star: shows the level (1–4 of them) under the level buttons |

---

## 6. Level buttons (optional): 4 images

The 4 big round buttons on the start screen. Right now each is a colored circle with a big **+**, **+** (bigger numbers), **−** or **±**. If you want illustrated buttons instead:

**Each one is 400 × 400 px**, a round design. Keep the symbol big and clear, because the child can't read.

| File | Level | Current color |
|---|---|---|
| `level-1-add.png` | Adding to 10 | Mint green |
| `level-2-add-big.png` | Adding to 18 | Pink |
| `level-3-minus.png` | Taking away | Sky blue |
| `level-4-mixed.png` | Both | Lavender |

---

## 7. Background (optional): 2 images

Right now it's a soft pink → lavender → blue gradient with floating bubbles. If you want a scene (clouds, rainbow land, a meadow):

| File | Size | Used on |
|---|---|---|
| `bg-landscape.jpg` | 2732 × 2048 | Tablet/phone held sideways |
| `bg-portrait.jpg` | 2048 × 2732 | Held upright |

Must-have: **very calm and light**. Numbers, food and the unicorn sit on top of it. Keep the **bottom 30% especially plain**, since that's where the food tray goes. JPG, under 500 KB each.

---

## Delivery

Put all the files in one folder (or a zip) with the exact names above and send them over. Also send the badge center for each food (section 2). Then I'll swap them into the game and check how it looks on phone and tablet sizes.

**Minimum set** for a visible makeover: section 1 (unicorn) + section 2 (foods). Everything else is optional and can stay as it is.
