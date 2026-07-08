# Property-removal audit (Phase 1) — RE/MAX Collection Vintage

> Business decision: the site stops listing properties internally. Property
> search moves to the official RE/MAX site via an external link. This map is the
> Phase-1 deliverable — **nothing is deleted in Phase 1.**

External destination (Phase 3):
`https://www.remax.pt/pt/agencia/remax-collection-vintage/12382`

## 1. Property SECTIONS (on surviving pages)

- **Homepage `src/pages/index.astro`** — one property section:
  - `#imoveis` "Coleção" → `<FeaturedPropertiesExperience/>` (line 75): carousel
    of `PropertyShowcaseCard` + interactive `CompactPortoMap` + live filter bar
    that composes `/imoveis?...` URLs. **Remove this section.**
  - `#zonas` "Zonas" → `<Neighborhoods/>` (line 78): territory marketing, but
    100% of its CTAs funnel into `/imoveis`. **DECISION NEEDED** (remove vs keep).
- All other homepage sections (Hero, AwardsBelt, Posicionamento, Método,
  Sobre+Stats, Testemunhos, DualJourney, Vender/ValuationForm, FAQ) are
  brand/lead-capture — **keep**.

## 2. Dedicated property ROUTES (delete)

- `src/pages/imoveis/index.astro` → `/imoveis` — the catalog (filters + grid of
  `CatalogCard`, reads `properties.ts`).
- `src/pages/imoveis/[slug].astro` → `/imoveis/<slug>` — property detail pages
  (`getStaticPaths` over `properties.ts`; gallery, specs, related `PropertyCard`).
- `src/pages/alugar.astro` → `/alugar` — rental landing. Holds **no listings**,
  only CTAs into `/imoveis`. **DECISION NEEDED** (delete vs keep+repoint).

## 3. Components used ONLY by property surfaces (safe to delete)

| Component | Sole importer(s) |
| --- | --- |
| `FeaturedPropertiesExperience.astro` | `index.astro` (the removed section) |
| `PropertyShowcaseCard.astro` | `FeaturedPropertiesExperience.astro` |
| `CompactPortoMap.astro` | `FeaturedPropertiesExperience.astro` |
| `CatalogCard.astro` | `imoveis/index.astro` |
| `PropertyCard.astro` | `imoveis/[slug].astro` + `FeaturedPropertiesExperience.astro` |

All five become orphaned once the section + routes are removed.

## 4. SHARED components (must NOT be removed)

`Icon`, `Button`, `SectionEyebrow`, `Nav`, `Footer`, `Base` layout, plus every
other section component (Hero, AwardsBelt, Method, Stats, Testimonials,
DualJourney, ValuationForm, Crest, FaqAccordion, …) — all used by non-property
surfaces. Only their property *links* change, not the components.

## 5. Data & scripts

- **`src/data/properties.ts`** — 4 placeholder listings + helpers
  (`propertyTypes`, `categoryOf`, `formatPrice`, `statusLabel`). Only importers
  are the property routes + `FeaturedPropertiesExperience`. → **archive** to
  `/_archive/`.
- **`public/images/imoveis/`** — placeholder property photos. → **archive**.
- **No Python scraper and no `properties.json` exist** in this repo (the brief
  assumed them; `scripts/` is empty; `package.json`'s `images` script points at
  a non-existent file). Nothing to archive there.
- **No sitemap / robots.txt** of any kind (no `@astrojs/sitemap`) → nothing to
  prune there.

## 6. Internal links pointing to properties (must update)

Data files:
- `src/data/site.ts` — `nav[0]` "Imóveis" → `/imoveis`; `nav[4]` "Arrendar" →
  `/alugar`; `journeys[1].cta` "Explorar imóveis" → `/imoveis`.
- `src/data/supportKnowledge.ts` — "Comprar" → `/imoveis`; "Arrendar" →
  `/alugar` (AI support assistant knowledge).
- `src/data/faqs.ts` — "Comprar imóvel" topic → `/imoveis`.

Markup:
- `src/components/Nav.astro` + `Footer.astro` (render `nav`) + `Footer.astro`
  hardcoded lines 69 (`/imoveis`), 71 (`/alugar`).
- `src/components/Hero.astro` line 42 — homepage hero CTA "Ver a coleção".
- `src/pages/sobre-nos.astro` line 44 — PageHero CTA "Ver a coleção".
- `src/components/Neighborhoods.astro` lines 50/58/88/103 — zone CTAs (only if
  the section is kept).
- `src/pages/alugar.astro` lines 26/64 (only if the page is kept).
- `src/pages/mobile-preview.astro` — dev/QA preview list includes `/imoveis` +
  `/alugar` entries → prune.
- `src/pages/contacto.astro` lines 172-178 — reads `?imovel=REF` to prefill the
  form; once PDPs are gone no link produces that param → **dead prefill to remove**.

## 7. Open decisions (Phase 1 gate — ask before Phase 2)

1. `/alugar` — delete, or keep as a rental landing with CTAs repointed external?
2. Homepage `#zonas` (Neighborhoods) — remove, or keep as territory marketing?
3. Scattered "explorar imóveis" CTAs (Hero, DualJourney, sobre-nos, nav) —
   repoint to the external URL, or remove and rely only on the new CTA section?
