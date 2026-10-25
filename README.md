# Yebum Ko — Portfolio 2026

A static site with one small build step for shareable project pages. Projects, awards and profile content are maintained in `js/data.js` in this repository.
See `DESIGN.md` for the user flow, site structure, design tokens and the review-loop log.

## Run locally

```bash
python -m http.server 5178 --directory .
```
Open http://localhost:5178. Use a local server instead of opening the file directly (`file://`), because YouTube embeds need a real origin.

## Files

| Path | Role |
|---|---|
| `index.html` | Shell: nav, home sections, footer, modal |
| `css/style.css` | Design tokens (`:root`), components, responsive rules |
| `js/data.js` | **All content**: projects, awards, experience, capabilities |
| `js/image-sizes.js` | Generated intrinsic dimensions for stable image layout and responsive sources |
| `js/app.js` | Hash router (`#/`, `#/index`, `#/work/<id>`), renderers, interactions |
| `js/inquiry.js` | Project inquiry draft for the visitor's mail app |
| `work/<id>/index.html` | Generated project page with static HTML and unique social/search metadata |
| `assets/img/*.webp` | Optimized images (`-sm` = 900px thumbnails) |
| `_work/` | Helper scripts: data extraction, image conversion, headless screenshots |
| `_source/` | Clone of the original repo (reference only; not needed to deploy) |

## Editing content

- **Add or edit a project**: add an object to `projects` in `js/data.js`. Media goes in `media.films` (YouTube or Drive ID), `media.decks` (Drive PDF ID), `media.images` (WebP filename without the extension) and `media.links`.
- **Project order and visibility**: all projects in `js/data.js` appear in Work; the grid sorts by newest year first, preserving array order within each year.
- **Problem / Solution / Result and metrics**: edit `caseStudy` and `metrics` in `js/data.js`. The `_work/` data builder is a legacy helper and does not include every later addition, including MATMI and Recognition updates. Running it over the current `js/data.js` would discard those additions.
- **Attached PDFs**: Drive file IDs in `media.decks` appear automatically in the panel next to the Overview. The Drive file must be shared as "Anyone with the link" for preview and download to work.
- **New images**: put the originals in `_source/img/` and run `python _work/opt.py` (it creates WebP files and fixes EXIF rotation).
- **Image dimensions**: after generating WebP files, run `python _work/generate-image-sizes.py` so cards reserve the correct space before images load.
- **Project pages**: after editing `js/data.js` or `index.html`, run `node _work/build-project-pages.mjs`. It updates all `/work/<id>/` pages and `sitemap.xml`. Commit those generated files with the source changes.
- **New external services**: update the Content Security Policy in `index.html` only for the domains the service needs.

## Deploy

Run `node _work/build-project-pages.mjs` and upload the root folder as-is to GitHub Pages, Netlify or similar (you can leave out `_source` and `_work`).
Every project has a shareable, pre-rendered URL such as `/work/Neuroscape/` with its own canonical URL, image and description. The in-site gallery still uses fast hash navigation. `sitemap.xml` includes all pre-rendered pages.
The contact form prepares a structured draft in the visitor's mail app. The visitor must send it there and attach files there. In-page email delivery and file upload need a configured server or mail provider; there is no client-side SMTP credential.

## Performance and regression checks

- Reel images load on demand: the first scene and next scene are prepared first. Scene changes wait for image decoding; rapid selections keep the latest choice. Hidden tabs and reduced-motion preferences pause playback.
- Search caches project metadata; detail navigation releases reveal observers and cancels stale scroll callbacks.
- Responsive image candidates and intrinsic dimensions come from the generated image-size inventory. Project galleries support keyboard controls and touch swipes.
- Guestbook submission has an in-flight guard. Server-side Firebase rules remain responsible for access and abuse prevention; client validation is not an authorization boundary.
- Run `node tests/regression.mjs` with Playwright installed and Microsoft Edge available. `PLAYWRIGHT_PATH` can point to an existing Playwright package. The test starts its own temporary local server and never submits guestbook entries.
- After changing JavaScript, update its version query in `index.html` before publishing to invalidate browser caches.
