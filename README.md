# My Games: Guide

A web app (PWA) that keeps all your games in one place, installs on the iPad home screen, and works without internet.

## What's in the folder

```
index.html          The games screen (no need to touch)
sw.js               Saves files for offline use (no need to touch)
manifest.json       App name and icon
games.json          The list of games ← edit this when adding a game
icons/              App icons
games/
  balloons/
    index.html      Example game
.nojekyll           Empty file required by GitHub Pages (don't delete)
```

Each game lives in its own folder inside `games`, and its main file is always called `index.html`.

---

## Part A: Putting it online (once)

The app needs a web address so the iPad can install it. The free way: GitHub Pages.

1. Go to github.com and create an account if you don't have one.
2. Top right: **+** → **New repository**.
3. Name: `games` (or any English name). Choose **Public**. Click **Create repository**.
4. On the page that opens, click the link **uploading an existing file**.
5. Unzip the file on your computer, open the `games-hub` folder, select **everything inside it** (not the folder itself) and drag it into the browser. Make sure `.nojekyll` was uploaded too (on a Mac: Cmd+Shift+. shows hidden files).
6. Click **Commit changes**.
7. Go to **Settings** → **Pages** (in the side menu). Under **Branch** choose `main` and the folder `/ (root)`, then click **Save**.
8. Wait a minute or two and refresh the page. The address will appear, something like:
   `https://your-name.github.io/games/`

> ⚠️ In a public repository, anyone with the address can see the games. That's fine for games, but don't put anything private there.

## Part B: Installing on the iPad

1. Open the address in **Safari** (it must be Safari, not Chrome).
2. Wait until a green dot with "available offline" appears next to the title.
3. Tap the Share button (square with an up arrow) → **Add to Home Screen** → **Add**.
4. Open the app from the new icon once while connected to the internet.

From now on it works even in airplane mode. Inside a game, the ⌂ button in the corner returns to the games screen.

---

## Part C: Adding a new game (each time)

The example here: adding **Unicorn Merge**.

### Step 1: Prepare the game file

The game must be **a single HTML file** that contains all of its code. In the Claude conversation where the game was built, download the HTML file (for example `unicorn-merge.html`).

If the game was built for claude.ai, see Part E for what to ask Claude so it works here.

### Step 2: Choose an id

The id is the name of the game's folder. Rules: **lowercase English letters, digits and hyphens only**, no spaces. For example: `unicorn-merge`.

### Step 3: Upload the file to GitHub

The most reliable way, straight from the browser:

1. In the repository, click **Add file** → **Create new file**.
2. In the file name box, type exactly:
   `games/unicorn-merge/index.html`
   (every `/` you type automatically becomes a folder.)
3. Open `unicorn-merge.html` in a text editor (TextEdit / VS Code), copy **all** of its contents and paste it into the large box.
4. Click **Commit changes** → **Commit changes**.

### Step 4: Add the game to the list

1. In the repository, click `games.json` and then the pencil icon ✏️.
2. Add a comma after the `}` of the last game, followed by the new game.

**Before:**
```json
{
  "games": [
    {
      "id": "balloons",
      "title": "Balloons",
      "emoji": "🎈",
      "color": "#8FD8FF"
    }
  ]
}
```

**After:**
```json
{
  "games": [
    {
      "id": "balloons",
      "title": "Balloons",
      "emoji": "🎈",
      "color": "#8FD8FF"
    },
    {
      "id": "unicorn-merge",
      "title": "Unicorn Merge",
      "emoji": "🦄",
      "color": "#FFB3D9"
    }
  ]
}
```

3. Click **Commit changes**.

Golden rules for this file: all text goes inside double quotes `"`, a comma **between** games, and **no** comma after the last game. If something breaks, paste the file into jsonlint.com and it will show you where the mistake is.

### Step 5: Update on the iPad

1. Wait about a minute (GitHub updates the site).
2. Open the app on the iPad **with internet** and tap ↻.
3. The new game appears. **Open it once with internet**, so everything it needs is saved on the device.

That's it. No need to reinstall the app.

### Fields in games.json

| Field | Required? | What it is |
|---|---|---|
| `id` | Yes | The folder name inside `games`. Lowercase English, digits, hyphens. |
| `title` | Yes | The name shown on the card. |
| `emoji` | No | The emoji on the card. Default: 🎮 |
| `color` | No | The card color as a hex code, e.g. `"#FFC93C"`. |
| `homeCorner` | No | Where the ⌂ button sits inside the game: `"top-left"` (default), `"top-right"`, `"bottom-left"`, `"bottom-right"`. Change it if the button covers something in the game. |
| `path` | No | Only if the main file isn't called `index.html`, e.g. `"games/my-game/game.html"`. |
| `assets` | No | Extra files to save for offline use (images, sounds, libraries), e.g. `["games/my-game/music.mp3"]`. |

---

## Part D: Updating and removing a game

**Update:** On GitHub open `games/<id>/index.html`, click ✏️, replace all the contents with the new version and save. On the iPad, open the app with internet and tap ↻.

**Remove:** Delete the game's block from `games.json` (watch the commas). You can also delete its folder, but you don't have to.

**Changing the name, emoji or color:** only in `games.json`.

---

## Part E: Asking Claude for a game that fits the app

When you build a new game, add this paragraph to your request:

> Build the game as a single, self-contained HTML file with all CSS and JavaScript inside it. It will run on an iPad inside an iframe, full screen and without internet: no external files, no images from links, and no window.storage or window.claude. Use localStorage to save data. If a library is needed (e.g. Matter.js), embed its code inside the file. Support touch, include a viewport meta tag, and don't put important buttons in the top-left corner.

---

## Part F: Parental controls

The header has a **🔒 Parents** button. To get in, you need to solve a math problem (a two-digit number times a small number, plus a single digit, e.g. `14 × 4 + 7`). Every wrong answer brings up a new problem.

The **i** button at the top of the parents screen explains how to put the app on your phone's home screen and how to check that it works offline. It also shows whether this device is ready right now.

**Play time**
- **No limit**: play as much as you like.
- **Daily limit**: set how many minutes of play are allowed per day. Only time with a game open on screen counts, and the counter resets at midnight. You can also reset it by hand.
- **Set time**: allow play for the next X minutes, or until a specific time (a time that has already passed today means tomorrow).
- **Lock now**: closes the games immediately.

When time runs out, the game closes and a "Game time is over" screen appears. Kids see the remaining time next to the title.

**Games**
- **Shown**: uncheck to hide a game from the screen.
- **⭐ Promoted**: the game appears first and bigger, with a "Featured!" ribbon, sparkles and animation.

**Activity**
- Shows each game's number of plays and play time for today, the last 7 days and in total, plus the 10 most recent sessions. Only time with the game on screen counts.
- **Download CSV** saves the full history (one row per session) to open in Excel, Numbers or Google Sheets.
- **Clear history** deletes it.

> Settings are saved on the device itself, so set them on the iPad the kids play on. A new game added to `games.json` is shown automatically.

## Troubleshooting

**The screen is empty / it says there's an error in games.json.** Almost always a missing or extra comma. Check it at jsonlint.com.

**A card says "File missing".** The path doesn't match: make sure the file is exactly at `games/<id>/index.html`, and that the `id` in `games.json` matches the folder name (including lowercase).

**The game doesn't work offline.** Did you open it once with internet after adding it? If so, it probably loads something from an external site. Ask Claude to embed everything inside the file (see Part E).

**Changes don't show up.** Wait a minute or two after saving on GitHub (the **Actions** tab shows when the update is finished), then tap ↻ in the app.

**The ⌂ button covers part of the game.** Add the field `"homeCorner": "bottom-left"` (or another corner) to the game in `games.json`.

## Testing on a computer (optional)

From the folder, in a terminal:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000` in a browser. Don't open `index.html` by double-clicking; that won't work.
