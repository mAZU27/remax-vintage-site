# RE/MAX Collection Vintage — Website

Premium one-page website for The RE/MAX Collection Vintage (luxury/vintage properties,
Porto). Static site: HTML + CSS + a little vanilla JS. No build step.

## Run it locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure
```
index.html      The full page (12 sections)
styles.css      Design system + all styles
lib/            <image-slot> web component
assets/         Logo + hero imagery
CLAUDE.md       ← Start here. Context, brand system, standards, and the work backlog.
```

## Working with Claude Code
Open this folder in Claude Code and say: **"Read CLAUDE.md first."** It contains the brand
system, the quality bar, and the prioritized list of what to fix. The current top priority
is optimizing the hero image (currently 9.2 MB).

## Status
Front-end is built and looks the part. Not yet launch-ready: images need optimizing, the
logo SVGs are broken placeholders, forms have no backend, and SEO/meta tags are missing.
See `CLAUDE.md §5–7` for the full list.
