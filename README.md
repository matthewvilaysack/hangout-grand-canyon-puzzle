# The Grand Canyon Hangout — 1000 Piece Puzzle

A small retro monument to a good night with four people, one canyon puzzle,
and a lot of squinting. Earth-toned, shooting-star-lit, gently grateful.

## Stack

Plain HTML / CSS / JS. No build step. Just open `index.html` locally or deploy
the folder to any static host.

## Local preview

```bash
python3 -m http.server 5500
# then open http://localhost:5500
```

## Customising the four stars

Edit `index.html` — search for `data-name="Star One"` etc. Replace names and
the one-line descriptions under each card.

## Deploy

### Option A — Vercel CLI

```bash
vercel login         # one-time, opens browser
vercel --prod        # deploys this folder
```

### Option B — GitHub Pages

1. Create a new repo on GitHub (public).
2. `git init && git add . && git commit -m "init"`
3. `git remote add origin <repo-url> && git push -u origin main`
4. In repo Settings → Pages → Source: `main` / root.
