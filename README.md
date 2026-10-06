# Yebum Ko — Portfolio 2026

A static site with no build step. The content comes from `github.com/yebum/portfolio2026`, and the mood follows genesis.ai.
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
| `js/app.js` | Hash router (`#/`, `#/index`, `#/work/<id>`), renderers, interactions |
| `assets/img/*.webp` | Optimized images (`-sm` = 900px thumbnails) |
| `_work/` | Helper scripts: data extraction, image conversion, headless screenshots |
| `_source/` | Clone of the original repo (reference only; not needed to deploy) |

## Editing content

- **Add or edit a project**: add an object to `projects` in `js/data.js`. Media goes in `media.films` (YouTube or Drive ID), `media.decks` (Drive PDF ID), `media.images` (WebP filename without the extension) and `media.links`.
- **Project order and visibility**: all projects in `js/data.js` appear in Work; their array order controls the default display.
- **Problem / Solution / Result and metrics**: edit `caseStudy` and `metrics` in `js/data.js`. The `_work/` data builder is a legacy helper and does not include every later addition, including MATMI and Recognition updates. Running it over the current `js/data.js` would discard those additions.
- **Attached PDFs**: Drive file IDs in `media.decks` appear automatically in the panel next to the Overview. The Drive file must be shared as "Anyone with the link" for preview and download to work.
- **New images**: put the originals in `_source/img/` and run `python _work/opt.py` (it creates WebP files and fixes EXIF rotation).

## Deploy

Upload the root folder as-is to GitHub Pages, Netlify or similar (you can leave out `_source` and `_work`).
Each project has its own shareable URL, for example `/#/work/Neuroscape`.
