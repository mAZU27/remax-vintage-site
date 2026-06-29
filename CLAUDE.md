# CLAUDE.md — RE/MAX Collection Vintage

> Read this file first, before touching any code. It carries the full context of
> this project so you start exactly where the work already is.

---

## 0. How you operate on this project (non-negotiable)

The owner ("G") runs this build in a standing **"10/10 analyst + professor"** mode.
On every task:

1. **Hold a 10/10 bar.** This is a premium real-estate brand. "Fine" is a failure
   state. If something is merely acceptable, say so and say what would make it exceptional.
2. **Audit before you build.** Inspect what is actually there before changing it.
   Report the real state, not the assumed state.
3. **Hunt the gap, unprompted.** Every pass, actively look for what is missing, weak,
   inconsistent, or off-brand — and name it even if it wasn't asked for.
4. **Explain the reasoning.** Every recommendation comes with *why*. Teach the logic;
   don't just hand down verdicts.
5. **End with the single next step.** Close each turn by naming the one highest-leverage
   move — not a menu of ten options.

**Communicate with G in European Portuguese (português europeu, NOT Brazilian),** in a
warm, intuitive, conversational tone — not formal or report-like. (Use "ficheiro" not
"arquivo", "está a fazer" not "está fazendo", etc.) Technical comments in code stay in
English.

---

## 1. What this is

A premium one-page website for **The RE/MAX Collection Vintage** — the luxury/vintage
property arm of a RE/MAX agency in **Porto, Portugal**. The site sells distinctive,
"vintage" properties in Foz, Cedofeita, Boavista and Ribeira, and captures two kinds of
leads: buyers/renters searching, and **sellers requesting a valuation** ("Pedir avaliação").

**Register / aesthetic:** *Heightened reality — Vintage Editorial.* Premium but grounded,
never fantastical, never generic. Think Wallpaper*/editorial restraint applied to Porto.

The whole site is in **European Portuguese**.

---

## 2. Tech stack & how to run it

- **Plain static site.** No framework, no build step. HTML + CSS + a little vanilla JS.
- Fonts: **Cormorant Garamond** (serif display) + **Jost** (sans), via Google Fonts.
- Preview locally with any static server, e.g.:
  ```bash
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```
  (Just double-clicking index.html also mostly works, but a server avoids path quirks.)

### Structure
```
index.html        — the whole page (12 sections), inline behaviour script at the bottom
styles.css        — full design system + all section styles (~2900 lines)
lib/
  image-slot.js   — custom <image-slot> web component (SEE THE CAVEAT in §5)
assets/
  remax-vintage-horizontal.png        — LIVE: logo in nav + footer
  hero-ribeira.png                    — LIVE: hero background
  hero-porto-douro.png                — spare: alternate hero (not referenced)
  remax-collection-vintage-logo.png   — spare (not referenced)
  remax-vintage-logo.svg              — BROKEN placeholder (empty <image>, no href)
  remax-collection-vintage-logo.svg   — BROKEN placeholder (empty <image>, no href)
```

> **index.html must stay at the project root.** The `<image-slot>` component assumes it.

---

## 3. Design system (already defined in styles.css `:root`)

This is the **RE/MAX Collection** palette — gold + navy + cream. Note: this is *gold*,
not the standard RE/MAX red. Gold is correct for the Collection (luxury) sub-brand — do
not "correct" it back to red.

- **Navy:** `--navy-ink #0B1A2E` · `--navy #102742` · `--navy-soft #1A3656`
- **Cream:** `--cream #F4EDDE` · `--cream-soft #FAF6EC` · `--cream-warm #EFE6D1`
- **Gold (sole accent):** `--gold #B89968` · `--gold-light #D4BB85` · `--gold-deep #9A7E50`
- **Type tokens:** `--font-serif` (Cormorant) for display/headings, `--font-sans` (Jost)
  for everything else. Fluid sizes via `clamp()` (`--fs-display`, `--fs-h1`, …).
- **Layout:** `--max 1440px`, fluid `--gutter`, radius + transition tokens all defined.

**Rule: never hardcode a hex or a font.** Always use the tokens. If a new token is needed,
add it to `:root` with a clear name.

Accessibility is already taken seriously (aria labels, `prefers-reduced-motion` guard on
parallax). Keep that bar — don't regress it.

---

## 4. Page anatomy (12 sections, top to bottom)

1. Hero — headline "A coleção mais rara do Porto." + search box (Comprar/Arrendar/Vender)
2. Identidade — trust strip
3. Posicionamento (`#sobre`)
4. Método (`#metodo`)
5. Próximo passo (bridge)
6. Coleção (`#imoveis`) — property showcase
7. Bairros (`#bairros`) — navy section with an interactive map
8. Caminhos (match)
9. Avaliação (seller-eval)
10. Pedir avaliação (`#valuation`) — the main seller-lead form
11. Questões (FAQ)
12. CTA Final (`#contacto`) + footer

Behaviour (inline script at bottom of index.html): search-box tabs, reveal-on-scroll
(IntersectionObserver), subtle hero parallax, mobile nav toggle, sticky nav state, map-pin
stagger, valuation success state.

---

## 5. Known issues / work items — in priority order

These are the open fronts. **#1 is the single highest-leverage fix.**

### P1 — Hero image weight (CRITICAL, do this first)
`assets/hero-ribeira.png` is **9.2 MB**; `hero-porto-douro.png` is **2 MB**. A multi-MB
hero destroys load time and mobile data cost — fatal for a site that sells "premium".
- Convert the chosen hero to **WebP/AVIF**, target **~200–400 KB**.
- Serve **responsive sizes** via `<picture>` / `srcset` (e.g. 1920 / 1280 / 768 wide).
- Add `loading`/`decoding` hints appropriately (hero is above-the-fold → eager + high
  priority; everything else lazy).

### P2 — Logo assets
`remax-vintage-horizontal.png` (live, nav + footer) is **456 KB** — heavy for a logo. The
two `.svg` files that should replace it are **empty placeholders** (an `<image>` tag with
no `href`, so they render nothing).
- Best fix: obtain/recreate a **real vector SVG** of the horizontal logo and use it
  (crisp at any size, tiny file). Otherwise, optimize the PNG hard.
- Delete or replace the two broken SVGs so they don't mislead.

### P3 — `<image-slot>` portability
`lib/image-slot.js` is a 31 KB web component built for the **builder environment it came
from** (it reads/writes a `.image-slots.state.json` sidecar via `window.omelette`).
- **Outside that environment it is read-only** and simply renders the `src` fallback —
  so the site looks correct, but the 31 KB of drag-to-fill / persistence logic is dead
  weight, and you can no longer swap images by dragging.
- Recommendation: for production, **replace `<image-slot>` with standard responsive
  `<img>` / `<picture>`** and drop the component. You'll be editing images via code now
  anyway. (Tie this into P1 — do them together.)
- Check the showcase (§4.6) and bairros (§4.7) for image slots that are still empty
  placeholders = missing real property/neighbourhood photography.

### P4 — Asset hygiene
Only 3 assets are referenced. Decide what to do with the spares (`hero-porto-douro.png`,
`remax-collection-vintage-logo.png`) — keep as intentional alternates or remove.

### P5 — Functionality is front-end only (future)
The search box and valuation form are visual (`preventDefault`, no backend). Before
launch they need real handling: a form endpoint / email, basic validation, a privacy
note, and (for search) a real property data source. Likely the trigger to move to a
**framework** (Next.js/Astro + components) — see §6.

---

## 6. Direction for growth

When this outgrows a single static page (property listing pages, a real search, a CMS for
the team to add properties), the natural move is a component-based framework
(**Astro** is a great fit for a content/marketing-led property site; **Next.js** if it
becomes app-like). At that point, decompose into reusable components (Nav, Hero,
SearchBox, SectionShell, PropertyCard, ValuationForm, Footer) and lift content/data out of
the markup. Don't do this prematurely — only when real listings or a CMS force it.

---

## 7. SEO / launch checklist (not yet done — track it)
- `<title>` exists; **meta description, Open Graph + Twitter card, favicon** missing.
- Add structured data (`RealEstateAgent` / `LocalBusiness` schema) — strong for local SEO.
- `lang="pt-PT"` is set (good). Add canonical URL, sitemap, robots.txt at launch.
- Replace placeholder contact details (`+351 220 000 000`, `collection@vintage.pt`) with
  the real ones before going live.

---

*Last updated when the project was migrated into Claude Code. Keep this file current — it
is the source of truth for context and standards.*
