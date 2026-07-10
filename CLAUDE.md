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
"vintage" properties across 8 curated Porto zones (Foz do Douro, Boavista, Ribeira,
Cedofeita, Nevogilde, Lordelo do Ouro & Massarelos, Bonfim, Baixa & Aliados — data in
src/content/zonas.ts, two optional zones prepared but disabled), and captures two kinds of
leads: buyers/renters searching, and **sellers requesting a valuation** ("Pedir avaliação").

**Register / aesthetic:** *Heightened reality — Vintage Editorial.* Premium but grounded,
never fantastical, never generic. Think Wallpaper*/editorial restraint applied to Porto.

The whole site is in **European Portuguese**.

---

## 2. Tech stack & how to run it

- **Astro 5** (migrated from the original static page), Vercel adapter; pages
  prerender statically, only `src/pages/api/lead.ts` runs on-demand (keeps the
  lead-ingest token server-side).
- Fonts: **Cormorant Garamond** (serif display) + **Jost** (sans).
- Run locally: `npm run dev` → http://localhost:4321. Build: `npm run build`.
  QA: `/mobile-preview` renders any page in a phone frame (dev-only).

### Structure
```
src/pages/       index (homepage) · comprar · vender · alugar · sobre-nos ·
                 contacto · apoio · carreiras · insights/ · privacidade ·
                 mobile-preview · api/lead.ts
src/components/  Nav, Footer, Hero (desktop >560px) + HeroMobile (≤560px) +
                 MobileValuationSheet (mobile conversion sheet), PageHero,
                 Button, Icon, SectionEyebrow, StructureDiagram, FaqAccordion,
                 ValuationForm, ValueSimulator, Neighborhoods, Testimonials,
                 AwardsBelt/Grid, Careers*, …
src/content/     metodo-comprar.ts · metodo-vender.ts · rede.ts — method-page
                 content transcribed from the OFFICIAL printed guides (Grupo
                 RE/MAX Dragão); items flagged confirmar:true await agency
                 sign-off (rendered with <!-- CONFIRMAR COM AGÊNCIA -->).
src/data/        site.ts (nav/journeys/zones/about) · faqs · awards · team ·
                 carreiras · insights · support* (AI assistant) · valuation-config
src/lib/         site.config.ts — EXTERNAL_LISTINGS_URL (single source for the
                 official RE/MAX agency listings page; ALL property CTAs point
                 there, target=_blank rel=noopener)
src/i18n/        PT→EN client-side toggle dictionaries
legacy/          the original static site (kept for reference)
_archive/        retired property catalog (properties.ts + photos) — the site
                 NO LONGER lists properties internally (business decision):
                 /imoveis and /imoveis/[slug] were removed; search happens on
                 the official RE/MAX site via EXTERNAL_LISTINGS_URL.
```

### Key rules in force
- The homepage carries EXACTLY **11 conversion CTAs** (map documented at the
  top of `src/pages/index.astro`). Only #1 (hero card → simulator) and #7
  (estudo de mercado banner) are full gold buttons. #11 is the quiet hero
  recruitment link «Venha trabalhar connosco» → /carreiras (owner ask
  2026-07-10); recruitment leads flow to Novus via CareersApplication →
  /api/lead (form: 'careers-application').
- Method content comes EXCLUSIVELY from the printed guides — never invent
  facts, numbers or services. `[CONFIRMAR]` items stay flagged until the
  agency confirms them in writing.
- Nav has 7 items (Comprar · Vender · Imóveis↗ · Arrendar · Sobre nós ·
  Carreiras · Contacto) + the "Pedir avaliação" button. Carreiras promoted
  from the footer (2026-07-10, owner ask); «Blog» temporarily out of the menu
  (phase 2A SEO: the 4 articles are declared placeholders, noindex + out of
  the sitemap — restore the item together with real blog content).
- Never repeat the same image across different heros/sections.

## 3. Design system (defined in src/styles/global.css `:root`)

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

1. Hero — headline "A coleção mais rara do Porto." + valuation card.
   ≤560px this is replaced by HeroMobile.astro (dark editorial "Douro ao
   entardecer" plate, staged load animations, benefit cards, destaque card)
   plus MobileValuationSheet.astro — a floating «Faça a sua avaliação» sheet
   (auto-shows once per session, collapses to a re-open pill; «Pedir
   avaliação» opens the global ValueSimulator). Both heros mirror each
   other's <picture> sources so only one image downloads per viewport.
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

---

## 8. Estado — Fase 2A (2026-07-10): integridade SEO/GEO

Implementada a Fase 2A da auditoria (`docs/audits/SEO-GEO-AUDIT-2026-07-10.md`).
O que mudou (e NÃO deve ser revertido sem dados reais):

- **NAP/AMI reais** em `src/data/site.ts`, verificados no perfil oficial
  remax.pt (agência 12382): telefone +351 226 181 031, Avenida da Boavista
  3191/3195, 4100-137 Porto, Vintage Patamar - Mediação Imobiliária, Lda,
  AMI 10092, fundada em 2014. **Email/horário/redes sociais/WhatsApp: ainda
  por confirmar — deliberadamente ausentes. NUNCA inventar.**
- **Removidos do site** (dados fabricados/por confirmar): 12 testemunhos de
  clientes + 8 vozes de colaboradores (inventados), retratos gerados por IA
  (ficheiros apagados; monograma dourado como fallback), faixa e grelha de
  prémios, números da rede (10.000/+400/N.º 1/+60%), tokens
  `[INSERIR NÚMERO REAL]`, campo de CV sem backend, caixa da «diretora de RH»,
  lista de vagas fictícia, links sociais `#`.
- **/insights**: os 4 artigos são placeholders → `noindex, follow`, fora do
  sitemap e da navegação («Blog» saiu do menu → 6 itens temporariamente).
- **/apoio** deixou de ser órfã (links no footer) e /alugar ganhou H1 +
  imagem responsiva (o original de 2,1 MB está em `_archive/images/`).
- **/privacidade**: política interina factual — requer revisão jurídica antes
  do lançamento comercial.
- Comentários internos (`CONFIRMAR COM AGÊNCIA`, TODOs) deixaram de ser
  emitidos no HTML publicado; as flags `confirmar:` mantêm-se no código.
- `vercel.json`: regra catch-all movida para PRIMEIRO lugar (a última regra
  vence no Vercel) + cache imutável para `/media/`.

Lista completa de factos pendentes de G: secção 18 da auditoria.
