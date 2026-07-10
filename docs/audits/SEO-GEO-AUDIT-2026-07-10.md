# SEO + GEO Audit — RE/MAX Collection Vintage
**Phase 1: Indexation diagnosis and evidence-based implementation plan**

| | |
|---|---|
| **Date** | 2026-07-10 |
| **Production domain** | https://remaxcollectionvintage.pt |
| **Repository** | https://github.com/mAZU27/remax-vintage-site.git |
| **Branch / commit audited** | `main` @ `e4dae30878227f7c255660f5a5a05ee2acbca933` (0 ahead / 0 behind `origin/main`, clean tree) |
| **Stack** | Astro 5 static (prerendered) + `@astrojs/vercel`, hosted on Vercel |
| **Method** | Live production probing (curl/DNS/whois) + full source & built-HTML (`dist/client`) audit by 10 parallel audit passes, each independently re-verified by an adversarial verification pass, plus a completeness review. 21 agent passes, 611 tool operations. All 100 raw findings survived adversarial re-verification (0 refuted); 23 cross-dimension duplicates were consolidated → **77 unique findings: 0 P0 · 13 P1 · 27 P2 · 37 P3**. |
| **Labels** | Every finding is labelled **CONFIRMED** (evidence directly observed this session), **LIKELY** (strong inference), or **UNVERIFIED** (requires owner data / external accounts). |

> Language note: CLAUDE.md asks that communication with G happen in European Portuguese. This mission brief was issued in English with an English report structure, so the report follows the brief. A pt-PT translation can be produced on request.

---

## 1. Executive verdict

**The site is not absent from Google because of a technical defect. It is absent because the domain is two days old and nothing has told Google it exists yet.** `remaxcollectionvintage.pt` was registered on **2026-07-08** (whois, confirmed this session), has zero Wayback Machine history, no known external links, and — as far as can be determined without account access — no Google Search Console property, no sitemap submission, and no indexing request. For a brand-new domain with no inbound links, zero `site:` results two days after registration is expected Google behaviour, not a symptom.

The technical indexation layer is in unusually good shape for a launch-week site: correct host canonicalization (all variants 308 → `https://remaxcollectionvintage.pt`), a valid spec-compliant robots.txt that declares a valid, prerendered, 14-URL sitemap with perfect parity against the built routes, unique titles/descriptions/canonicals on every page, server-rendered content throughout (zero JS-dependency for indexable copy), real HTTP 404s, intentional-only `noindex`, and clean JSON-LD on every page. **Zero P0 indexation blockers were found in the code or the production configuration.**

The real risk lives one layer up: **the site's business facts are placeholders, live in production.** The phone number, e-mail, street address, WhatsApp link and AMI licence render as fake data on every page; 12 invented client testimonials (plus 8 invented employee voices) are published under "Histórias reais"; AI-generated portraits sit beside 54 real staff names; the privacy policy states it is unfinished; literal `[INSERIR NÚMERO REAL]` tokens render on /carreiras/. None of this blocks indexation — but it poisons every downstream discovery channel that matters for a local business (Google Business Profile, local pack, AI answer engines quoting contact facts) and it is what Google's quality systems and any human evaluator will see first when the site *does* get crawled. **The highest-leverage sequence is therefore: (1) submit the site to Google/Bing today; (2) replace placeholder business facts before driving any traffic; (3) build out the thin/valuable content surfaces (zone guides, valuation page, insights depth).**

## 2. Most likely reason the site is absent from Google

Ranked by likelihood, with evidence:

1. **CONFIRMED — The domain is 2 days old with no discovery signals.** whois: `Creation Date: 08/07/2026 23:57:19` (expiry 08/07/2027 confirms DD/MM format). Wayback Machine: zero snapshots (`archived_snapshots: {}`). The commit that shipped the current SEO layer landed **today** (`e4dae30`, "SEO/i18n implementation", 2026-07-10 05:28 +0100). Google discovers new domains via links (none exist yet — footer social links are `#`, no RE/MAX profile links back to this domain that we could verify) or via Search Console submission (see 2 below).
2. **UNVERIFIED (owner must check) — No Google Search Console property / sitemap submission / indexing request.** Nothing in the repo or production suggests GSC verification (no HTML verification file, no `google-site-verification` meta tag in any built page — grep of `dist/client` confirms). If GSC has not been set up, Google has never been told to crawl this domain. This is the single most impactful manual action available today (§17).
3. **CONFIRMED as absent — no technical blocker.** All classic causes were tested and ruled out this session: no `noindex` outside 404/mobile-preview, no `X-Robots-Tag` on any response, no robots.txt block, no Vercel deployment protection/password, no redirect loops, valid SSL, real 404s, no soft-404s, no JS-only content, no canonical pointing off-site (§4).

Not a plausible cause: penalties (2-day-old domain, no history), duplicate content (vercel.app duplicate is canonicalized to production — §6), or crawl budget (14 pages).

**Expected recovery once §17 manual actions are done:** for a submitted sitemap + URL-inspection request on a technically clean site of this size, first indexation of the homepage typically follows within days; meaningful branded-query visibility ("remax collection vintage") usually within 1–3 weeks. No guarantee is possible — indexation and ranking are Google's decision.

## 3. Confirmed blockers versus suspected risks

**Confirmed indexation blockers (P0): none.** The production site is crawlable and the homepage is technically indexable as served today (evidence in §4).

**Confirmed high-impact risks (P1, will hurt once crawled/quoted — full detail in §6–§12):**

| # | Risk | Label |
|---|---|---|
| 1 | Entire NAP (phone, e-mail, address, WhatsApp) is placeholder data live on every page | CONFIRMED |
| 2 | "AMI 0000" placeholder licence + no legal entity name/NIF anywhere (Portuguese legal requirement for estate agents) | CONFIRMED |
| 3 | 12 invented client testimonials + 8 invented employee voices live, labelled as real stories | CONFIRMED |
| 4 | AI-generated portraits beside 54 real staff names on /sobre-nos/ | CONFIRMED |
| 5 | ≥17 explicitly-flagged unconfirmed factual claims (network stats, awards belt, "desde 2014") live in crawlable HTML, some with leaked `<!-- CONFIRMAR COM AGÊNCIA -->` comments | CONFIRMED |
| 6 | Privacy policy is a 78-word stub that says the real policy "será publicado antes do lançamento" — while forms collect personal data | CONFIRMED |
| 7 | Literal `[INSERIR NÚMERO REAL]` placeholder tokens render 4× on /carreiras/ | CONFIRMED |
| 8 | /apoio/ (the site's only FAQPage, its best AI-answers asset) is a complete orphan — zero internal links | CONFIRMED |
| 9 | All four insight articles are self-declared placeholder copy, 140–273 words, with reading times overstating length 5–10× | CONFIRMED |
| 10 | English exists only as a client-side DOM swap → zero EN content is crawlable/citable (and the toggle is currently dead code anyway) | CONFIRMED |
| 11 | Google Business Profile: no link/embed on site; existence of a GBP listing unknown | CONFIRMED (on-site) / UNVERIFIED (listing) |
| 12 | 2.1 MB lazy-loaded JPEG is the probable LCP element on /alugar/ | CONFIRMED |
| 13 | vercel.json header ordering neutralizes all long-cache rules in production; /media/ has no cache rule at all | CONFIRMED |

**Suspected risks (UNVERIFIED — need owner/account access):** GSC/Bing account status; whether `collection@vintage.pt` (an off-domain mailbox) is controlled by the agency; whether "desde 2014", the 9 named network awards, and the 4 network stats are accurate and approved; GBP listing state; social profile URLs.

## 4. Production crawl/indexation status

All checks performed live this session (2026-07-10) with curl/dig/whois from this machine.

### Host variants and redirect topology

| Variant | DNS | Chain | Final | Type | SSL |
|---|---|---|---|---|---|
| `http://remaxcollectionvintage.pt` | A 216.198.79.1 (Vercel) | 1 hop | `https://remaxcollectionvintage.pt/` 200 | 308 Permanent | valid |
| `https://remaxcollectionvintage.pt` | A 216.198.79.1 | 0 hops | 200 | — | valid |
| `http://www.remaxcollectionvintage.pt` | CNAME → vercel-dns-017.com | 2 hops (http→https www → apex) | `https://remaxcollectionvintage.pt/` 200 | 308 + 308 | valid |
| `https://www.remaxcollectionvintage.pt` | CNAME → vercel-dns-017.com | 1 hop | `https://remaxcollectionvintage.pt/` 200 | 308 Permanent | valid |

- **Canonical host: `https://remaxcollectionvintage.pt` (apex).** All other variants permanently redirect to it. The www→apex path via http takes 2 hops (http→https, then www→apex) — harmless and normal on Vercel (P3 note only).
- **No `X-Robots-Tag` header on any response.** No deployment protection or auth. Nameservers: `dns1–4.host-redirect.com` (registrar service — relevant to GSC DNS verification, §17).
- HTML responses: `HTTP/2 200`, `content-type: text/html; charset=utf-8`, `cache-control: public, max-age=3600, must-revalidate`, served compressed (brotli confirmed on text assets).

### Key URLs

| URL | Status | Verdict |
|---|---|---|
| `/` | 200 | Indexable: full head (unique title, description, self-canonical `https://remaxcollectionvintage.pt/`), `lang="pt-PT"`, JSON-LD graph, no robots meta |
| `/robots.txt` | 200 | Valid; byte-identical to `public/robots.txt`; allows all UAs; disallows `/api/` and `/mobile-preview`; declares the sitemap |
| `/sitemap.xml` | 200 | Valid XML, 14 URLs, all canonical-host + trailing slash, 1:1 parity with the 14 indexable built routes; insights posts carry `lastmod` |
| `/sitemap-index.xml` | 404 | Correct (no index file needed; robots.txt points at the real sitemap) |
| `/comprar` and `/comprar/` | both 200 | Duplicate slash variants both served — both emit identical canonical `…/comprar/`, so consolidation is handled (P2 consistency finding in §6; `/comprar/index.html` is a third live variant, same canonical) |
| Representative PT page (`/comprar/`) | 200 | Fully server-rendered; built HTML byte-equivalent to live |
| "English equivalent" | n/a | **Does not exist as a URL.** EN is a client-side DOM swap (§7) — nothing to fetch, nothing for Google to index |
| Nonexistent URL | 404 | Real HTTP 404 + `noindex, nofollow`; no soft-404 |
| `remax-vintage-site.vercel.app` | 200 | Full duplicate of the site, no `X-Robots-Tag`; mitigated: its canonical points to the production domain (verified live) |

### Indexation status

- **Owner-reported:** `site:remaxcollectionvintage.pt` returns no results in Google (premise of this mission; consistent with all evidence above).
- **Session limitation:** direct SERP verification (Google/Bing `site:` checks) was not possible — programmatic SERP scraping is not permissible/reliable and the Chrome browser extension was not connected this session. GSC/Bing account state could not be inspected (no access). PageSpeed Insights API returned 429 (anonymous quota exhausted) — no Lighthouse numbers; performance findings are static-analysis based (§12).
- **Crawlable:** YES (confirmed). **Homepage technically indexable:** YES (confirmed). **Indexed:** NO per owner report — explained by domain age + no submission, not by a defect.

## 5. Full route matrix

18 routes (14 indexable pages + sitemap + 3 intentionally non-indexable). Built from `src/pages/` + `dist/client/` + live curls of all 16 production routes this session. Word counts are approximate rendered-text counts (full page); "main" counts in the notes strip nav/footer/dialog chrome.

| Route | Live | Indexable | Sitemap | H1s | Words (main/page) | Schema types | Inbound links | Alt missing |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | YES | yes | 1 | 2243 | REA, WS, WP | 79 | 4 |
| `/comprar/` | 200 | YES | yes | 1 | 1612 | REA, WS, WP | 60 | 1 |
| `/vender/` | 200 | YES | yes | 1 | 1590 | REA, WS, WP | 59 | 1 |
| `/alugar/` | 200 | YES | yes | 0 | 514 | REA, WS, WP | 56 | 1 |
| `/sobre-nos/` | 200 | YES | yes | 1 | 1563 | REA, WS, AboutPage | 42 | 10 |
| `/contacto/` | 200 | YES | yes | 1 | 561 | REA, WS, ContactPage | 44 | 1 |
| `/apoio/` | 200 | YES | yes | 1 | 1051 | REA, WS, WP, FAQPage | 0 | 5 |
| `/carreiras/` | 200 | YES | yes | 1 | 1601 | REA, WS, WP | 14 | 8 |
| `/insights/` | 200 | YES | yes | 1 | 619 | REA, WS, WP | 51 | 1 |
| `/privacidade/` | 200 | YES | yes | 1 | 510 | REA, WS, WP | 30 | 1 |
| `/insights/mercado-premium-porto-2026/` | 200 | YES | yes | 1 | 785 | REA, WS, WP, Article, BreadcrumbList | 8 | 1 |
| `/insights/foz-do-douro-guia-da-zona/` | 200 | YES | yes | 1 | 693 | REA, WS, WP, Article, BreadcrumbList | 8 | 1 |
| `/insights/vender-imovel-premium-sem-pressa/` | 200 | YES | yes | 1 | 688 | REA, WS, WP, Article, BreadcrumbList | 8 | 1 |
| `/insights/viver-no-porto-arte-de-receber/` | 200 | YES | yes | 1 | 654 | REA, WS, WP, Article, BreadcrumbList | 8 | 1 |
| `/mobile-preview/` | 200 | NO | — | 0 | 25 | — | 0 | 0 |
| `/404` | 404 | NO | — | 1 | 460 | REA, WS, WP | 0 | 1 |
| `/api/lead` | 500/other | NO | — | 0 | 0 | — | 0 | 0 |
| `/sitemap.xml` | 200 | n/a | — | 0 | 0 | — | 0 | 0 |

**Per-route detail (title · description · canonical · notes):**

- **`/`** — title: “RE/MAX Collection Vintage — A coleção mais rara do Porto.” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/`
  - Strongest page: 1,811 words inside <main>. 4 of 6 imgs have empty alt.
- **`/comprar/`** — title: “O método de compra · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/comprar/`
  - 1,180 main-words — solid. Established fact: /comprar and /comprar/ both 200, both canonical → /comprar/ (soft duplicate resolved by canonical).
- **`/vender/`** — title: “Vender · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/vender/`
  - 1,158 main-words — solid.
- **`/alugar/`** — title: “Arrendar · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/alugar/`
  - ANOMALY: only indexable page with 0 H1s; only 82 words inside <main>; listings CTA points to EXTERNAL_LISTINGS_URL (off-site).
- **`/sobre-nos/`** — title: “Sobre nós · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/sobre-nos/`
  - 119 <img> tags — team marquee duplicates ~51 team-NN.jpg twice each (DOM bloat). 'desde 2014' claim in description: flag for owner confirmation. Uses AboutPage schema (good).
- **`/contacto/`** — title: “Contacto · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/contacto/`
  - 129 main-words — acceptable for a contact page. ContactPage schema (good). Submits to /api/lead via JS fetch.
- **`/apoio/`** — title: “Apoio ao cliente · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/apoio/` · **ORPHAN**
  - ANOMALY: TRUE ORPHAN — zero <a href> to it in any other dist page or any src component; only src reference is sitemap.xml.ts. Site's only FAQPage schema. Only form action on site: action="#faq".
- **`/carreiras/`** — title: “Carreiras · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/carreiras/`
  - 1,169 main-words. 8 of 11 imgs missing alt (worst ratio on site). No JobPosting schema (opportunity, other dimension).
- **`/insights/`** — title: “Insights · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/insights/`
  - 187 main-words — fine for a listing hub. Links all 4 posts. No Blog/CollectionPage schema (minor, other dimension).
- **`/privacidade/`** — title: “Política de Privacidade · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/privacidade/`
  - ANOMALY: only 78 main-words; live text states full policy 'em preparação e será publicado antes do lançamento do site'. Cites off-domain email collection@vintage.pt (site.ts:24). Shortest description on site (53 chars).
- **`/insights/mercado-premium-porto-2026/`** — title: “O mercado premium do Porto em 2026 · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/insights/mercado-premium-porto-2026/`
  - 353 main-words of article body — thin for an Article. Longest of the 4 posts.
- **`/insights/foz-do-douro-guia-da-zona/`** — title: “Foz do Douro: guia de uma zona à beira-mar · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/insights/foz-do-douro-guia-da-zona/`
  - 261 main-words — thin for a 'zone guide' targeting the site's key neighbourhood.
- **`/insights/vender-imovel-premium-sem-pressa/`** — title: “Como vender um imóvel premium sem pressa (e por mais) · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/insights/vender-imovel-premium-sem-pressa/`
  - 256 main-words — thin Article.
- **`/insights/viver-no-porto-arte-de-receber/`** — title: “Viver no Porto: a arte de receber · Collection Vintage” · lang pt-PT · hreflang none (expected) · robots (none) · canonical `https://remaxcollectionvintage.pt/insights/viver-no-porto-arte-de-receber/`
  - 222 main-words — thinnest Article on site.
- **`/mobile-preview/`** — title: “Mobile Preview (QA) — RE/MAX Collection Vintage” · lang pt-PT · hreflang none · robots noindex, nofollow · canonical `(none)` · **ORPHAN**
  - Intentional QA tool; orphan + noindex + disallow is the correct treatment. No anomaly.
- **`/404`** — title: “Página não encontrada · Collection Vintage” · lang pt-PT · hreflang none · robots noindex, nofollow · canonical `https://remaxcollectionvintage.pt/404/` · **ORPHAN**
  - ANOMALY (cosmetic): emits canonical /404/ (Base.astro:47 pathname-derived) and duplicates homepage default description (404.astro:5 passes none → Base.astro:36 fallback). Harmless under noindex + HTTP 404.
- **`/api/lead`** — title: “n/a” · lang n/a · hreflang none · robots n/a (no X-Robots-Tag header — established) · canonical `n/a` · **ORPHAN**
  - ANOMALY (minor): GET returns 500 instead of 405 — no GET/ALL handler exported. No SEO impact (disallowed + unlinked).
- **`/sitemap.xml`** — title: “n/a” · lang n/a · hreflang none · robots n/a · canonical `n/a`
  - 14 <loc> entries verified live this session — exact 1:1 match with the 14 indexable routes, all canonical host + trailing slash, insights posts carry lastmod. No noindexed/disallowed URLs included.


Matrix anomalies are filed as findings: orphan `/apoio/` (P1), `/alugar/` zero H1 (P2), thin main content (P1/P2), 404-page canonical (P3), `/api/lead` 500-on-GET (P3).

## 6. Technical SEO findings

The strongest layer of the site. Zero P0s; the P1/P2 set is consistency and internal-architecture work, not blockers. What is already right (verified): intentional-only noindex; spec-valid robots.txt identical in repo and production; prerendered sitemap with 1:1 route parity that cannot drift for insights posts (single `articles` source drives both pages and sitemap — `src/data/insights.ts`); zero broken internal links; zero links to localhost/preview/old domains; self-consistent canonicals on every variant tested; all critical content (including every FAQ answer) server-rendered; unique titles and descriptions on all 14 indexable pages; single-source metadata (`src/layouts/Base.astro` is the only meta emitter); clean 404 semantics.


### Route inventory anomalies

#### `routes-apoio-orphan-page` — /apoio/ is a fully orphaned page — zero internal links site-wide, discoverable only via sitemap

**P1 · CONFIRMED** · effort S · dimension: routes

- *Evidence:* grep of all 16 dist/client/**/*.html files for href containing 'apoio' returns only 2 hits, both inside /apoio/'s own page: its stylesheet link (href="/assets/apoio.DE-HBbLx.css") and its own canonical (href="https://remaxcollectionvintage.pt/apoio/") — no <a> from any other page
- *Evidence:* grep of src/**/*.{astro,ts,tsx} for '/apoio' matches only src/pages/sitemap.xml.ts — no component (header/footer/nav) links to it
- *Evidence:* Live sitemap.xml contains <loc>https://remaxcollectionvintage.pt/apoio/</loc>; live curl of /apoio/ returned HTTP 200 with title 'Apoio ao cliente · Collection Vintage'
- *Evidence:* dist/client/apoio/index.html is the ONLY page carrying FAQPage JSON-LD (structuredDataTypes: RealEstateAgent, WebSite, WebPage, FAQPage) and has 619 words of main content — one of the richest pages on the site
- *Impact:* Google treats sitemap-only URLs as low-priority; with zero inbound links the page receives no internal PageRank and may be crawled late or ranked poorly. This is the site's only FAQPage — the highest-value page for AI answer engines (GEO) — and it is invisible to any link-following crawler.
- *Fix:* Add a link to /apoio/ in the site footer (e.g., 'Apoio ao cliente' next to Privacidade) and/or in the contact page. One footer link instantly gives it ~15 inbound links.
- *Files:* src/components/Footer.astro (or equivalent footer component)
- *Fix risk:* None — purely additive navigation link.
- *Consolidates duplicate findings:* `crawl-apoio-orphan-page`, `semantic-apoio-orphan-page`
- *Independent verification:* Re-ran grep over all dist/client/**/*.html for href containing 'apoio': only 2 hits, both inside /apoio/'s own page (its CSS link and its own canonical) — zero inbound <a> from any other page, while every other route has 8-64 inbound hrefs. Re-grepped src: besides sitemap.xml.ts, '/apoio' also appears in src/pages/mobile-preview.astro:16 ({ label: 

#### `routes-privacidade-placeholder-policy` — Privacy policy page is a live placeholder: text says the real policy 'will be published before the site launch' — but the site is launched

**P1 · CONFIRMED** · effort M · dimension: routes

- *Evidence:* dist/client/privacidade/index.html <main> visible text ends with: 'O texto integral desta política encontra-se em preparação e será publicado antes do lançamento do site.' — only 78 words of main content total
- *Evidence:* Live curl https://remaxcollectionvintage.pt/privacidade/ → HTTP 200, same content, indexable (no robots meta), in sitemap, linked from 30 internal anchors (cookie banner + footer)
- *Evidence:* Page cites contact email 'collection@vintage.pt' which comes from src/data/site.ts:24 (email: 'collection@vintage.pt') — an off-domain address (vintage.pt, not remaxcollectionvintage.pt); whether this mailbox is real needs owner confirmation (UNVERIFIED aspect)
- *Impact:* An indexable, sitemap-listed legal page that openly states it is unfinished damages E-E-A-T/trust signals for a brand-new domain, and the site collects personal data via /api/lead forms while the GDPR-required policy is a stub — a legal exposure beyond SEO. The 53-character meta description ('Política de privacidade da RE/MAX Collection Vintage.') is also the shortest on the site.
- *Fix:* Publish the full privacy policy (controller identity, purposes, retention, rights, complaints authority) before driving traffic; confirm with owner whether collection@vintage.pt is the correct DPO/contact address. If the full text cannot ship immediately, at minimum remove the 'em preparação / antes do lançamento' sentence.
- *Files:* src/pages/privacidade.astro, src/data/site.ts (email confirmation)
- *Fix risk:* Low — content-only change; legal text requires owner/legal review, do not fabricate.
- *Consolidates duplicate findings:* `content-privacy-policy-unfinished`, `local-privacy-page-interim-text-and-placeholder-gdpr-contact`
- *Independent verification:* Live /privacidade/ → 200 and byte-identical to dist (diff → IDENTICAL). Extracted <main> text: 78 words ending 'O texto integral desta política encontra-se em preparação e será publicado antes do lançamento do site.' — present on the LIVE page (my first line-based grep missed it due to a mid-sentence line break; re-verified with 'O texto integral[^

#### `routes-alugar-missing-h1` — /alugar/ has no H1 — its hero heading is an <h2> (only indexable page with zero H1s)

**P2 · CONFIRMED** · effort S · dimension: routes

- *Evidence:* src/pages/alugar.astro:19 — '<h2 class="h2 alg__title" data-reveal style="--reveal-delay:100ms">' wrapping the hero title 'Viver o Porto com a casa certa.'
- *Evidence:* dist/client/alugar/index.html: 0 matches for <h1; live curl https://remaxcollectionvintage.pt/alugar/ | grep -c '<h1' → 0
- *Evidence:* All 13 other indexable pages have exactly one H1 (matrix h1Count column)
- *Impact:* Missing the primary heading weakens topical signals for 'arrendar imóveis Porto' queries on a page that is already the thinnest commercial page (82 words inside <main>); the page's rental-intent relevance is nearly unstated to crawlers.
- *Fix:* Change the hero <h2> to <h1> (the existing 'h2' utility class can stay for visual styling, so no CSS change needed). Consider expanding the page copy at the same time — see thin-content finding.
- *Files:* src/pages/alugar.astro
- *Fix risk:* None if the visual class is retained; verify no duplicate-H1 introduced (page currently has zero).
- *Consolidates duplicate findings:* `semantic-alugar-missing-h1`
- *Independent verification:* src/pages/alugar.astro:19 reads exactly '<h2 class="h2 alg__title" data-reveal style="--reveal-delay:100ms">' wrapping 'Viver o Porto…casa certa.'. grep -c '<h1' on dist/client/alugar/index.html → 0; live curl /alugar/ → 200 with 0 '<h1'. Recounted h1 across all 16 built pages: all 13 other indexable pages plus 404.html have exactly 1; only alugar 

#### `routes-images-missing-alt` — 38 <img> tags across built pages have missing or empty alt, including content-bearing team gallery photos

**P2 · CONFIRMED** · effort M · dimension: routes

- *Evidence:* Per-page imagesMissingAlt from dist HTML: sobre-nos 10, carreiras 8, apoio 5, home 4, and 1 on each of 11 other pages (total 38 of 197 img tags)
- *Evidence:* dist/client/sobre-nos/index.html examples: '<img src="/images/equipa-gallery/equipa-1.webp" alt="" loading="lazy"...' (9 team gallery photos) and '<img src="/images/porto/porto-douro-poente-1920.webp" ... alt="" width="1920" height="1081"' (full-width scenic image)
- *Evidence:* sobre-nos has 119 total <img> tags — the team marquee duplicates each of ~51 team-NN.jpg twice for the infinite-scroll effect
- *Impact:* Empty alt is correct for purely decorative images, but team/equipa photos and the Douro panorama are content: they lose image-search visibility and accessibility signal. The duplicated 119-image marquee also bloats the DOM (crawl/render cost).
- *Fix:* Audit each empty-alt image: give descriptive pt-PT alt to content images (team photos, cityscape) and keep alt="" only for true decoration; add aria-hidden="true" to the duplicated marquee copy so assistive tech and crawlers see each face once.
- *Files:* src/pages/sobre-nos.astro, src/pages/carreiras.astro, src/pages/apoio.astro, src/pages/index.astro, relevant src/components/*
- *Fix risk:* None — attribute-only changes.
- *Independent verification:* Reproduced the count with an independent parser: 38 of 197 <img> tags missing/empty alt; per-page distribution matches exactly (sobre-nos 10, carreiras 8, apoio 5, home 4, 1 each on 11 others). Verified both cited examples verbatim in dist/client/sobre-nos/index.html: equipa-gallery/equipa-1.webp with alt="" and porto-douro-poente-1920.webp with al

#### `routes-api-lead-500-on-get` — GET /api/lead returns HTTP 500 instead of 405 (endpoint only exports POST)

**P3 · CONFIRMED** · effort S · dimension: routes

- *Evidence:* curl -s -o /dev/null -w '%{http_code}' https://remaxcollectionvintage.pt/api/lead → HTTP 500
- *Evidence:* src/pages/api/lead.ts:22 'export const POST: APIRoute = ...' is the only method handler (prerender=false at line 11); no GET export
- *Evidence:* Mitigation: robots.txt 'Disallow: /api/' (established fact) keeps compliant crawlers away; endpoint is invoked only via JS fetch from ValueSimulator.astro / ValuationForm.astro / contacto.astro — no <a href> or form action to it in any dist HTML (only form action found site-wide is action="#faq" on /apoio/)
- *Impact:* No indexation impact (disallowed, unlinked), but any stray hit — link previewers, security scanners, non-compliant bots — generates a server error (500) that pollutes Vercel error monitoring and could mask real function failures.
- *Fix:* Export a GET (and fallback ALL) handler returning 405 with Allow: POST.
- *Files:* src/pages/api/lead.ts
- *Fix risk:* None — additive handler; keep POST behavior untouched.
- *Independent verification:* Live curl GET https://remaxcollectionvintage.pt/api/lead → 500, reproduced. grep of exports in src/pages/api/lead.ts: only 'export const prerender = false' (line 11) and 'export const POST' (line 22) — no GET/ALL handler. Mitigations verified: the only form action in all dist HTML is action="#faq" (on /apoio/), zero href/action references to /api/l


### Crawlability, indexability & sitemap

#### `crawl-internal-links-noncanonical-slash` — Every internal link uses the non-trailing-slash URL form while canonicals and sitemap use trailing slash

**P2 · CONFIRMED** · effort M · dimension: crawl

- *Evidence:* dist/client href census: 64x href="/comprar", 63x href="/vender", 60x href="/alugar", 45x href="/sobre-nos", 44x href="/contacto", 32x href="/privacidade", 15x href="/carreiras", 8x each insights post — all WITHOUT trailing slash
- *Evidence:* /Users/seraf/Desktop/Vintage-Website/src/data/site.ts:52-59 — nav array: { label: 'Comprar', href: '/comprar' } etc. (no trailing slash); Footer.astro:74-78,100 same pattern
- *Evidence:* Live: curl https://remaxcollectionvintage.pt/comprar → HTTP 200 (no redirect) with <link rel="canonical" href="https://remaxcollectionvintage.pt/comprar/"> — link form and canonical form differ
- *Evidence:* /Users/seraf/Desktop/Vintage-Website/astro.config.mjs — trailingSlash: 'ignore', build.format: 'directory'; vercel.json contains ONLY a headers block (no trailingSlash/cleanUrls), so Vercel serves both variants 200 (established fact)
- *Impact:* Googlebot discovers ~13 pages via their slash-less variant (200, not redirected) but every page self-canonicalizes to the trailing-slash variant, so two live URLs exist per page and consolidation rests entirely on the canonical hint (which Google treats as a hint, not a directive). Wastes crawl budget on a 2-day-old site and slightly dilutes internal-link signals to the canonical URLs. Not a duplicate-content emergency because canonicals are consistent everywhere.
- *Fix:* Pick one form and enforce it end-to-end: add "trailingSlash": true to vercel.json (Vercel then 308s /comprar → /comprar/) AND update internal hrefs in src/data/site.ts, Footer.astro and page bodies to the trailing-slash form so internal clicks/crawls never hit the redirect. Alternatively set astro trailingSlash: 'always' to catch mismatches at build time.
- *Files:* vercel.json, src/data/site.ts, src/components/Footer.astro, src/components/Nav.astro, src/pages/*.astro (inline hrefs), src/data/supportKnowledge.ts / supportResponses.ts (chip hrefs)
- *Fix risk:* Low. Adding the Vercel 308 alone (without href updates) makes every internal link a redirect hop — do both together. Verify no hardcoded slash-less URL is referenced externally (site is 2 days old, unlikely).
- *Independent verification:* Re-counted every cited href in dist/client HTML — exact match: 64x /comprar, 63x /vender, 60x /alugar, 45x /sobre-nos, 44x /contacto, 32x /privacidade, 15x /carreiras, 8x each of the 4 insights posts (plus 54x /insights), zero trailing-slash body links anywhere. src/data/site.ts:52-58 nav hrefs have no trailing slash; Footer.astro:74-78 and :100 sa

#### `crawl-vercel-app-duplicate-host` — remax-vintage-site.vercel.app serves the full site (200, no X-Robots-Tag) — duplicate host mitigated only by cross-host canonicals

**P2 · CONFIRMED** · effort S · dimension: crawl

- *Evidence:* Established fact: remax-vintage-site.vercel.app serves the full site, 200, no X-Robots-Tag, canonical points to production domain
- *Evidence:* Verified live this session: curl https://remax-vintage-site.vercel.app/robots.txt → same robots.txt (Allow: /) and https://remax-vintage-site.vercel.app/sitemap.xml → 200 sitemap listing production URLs
- *Evidence:* vercel.json (all 40 lines read) contains only Cache-Control headers — no host-conditional redirect or X-Robots-Tag rule
- *Impact:* A fully crawlable duplicate of the entire site on a second host. Cross-domain canonicals point to production, which Google usually honors, but it is a hint; the vercel.app URL can leak (shared links, Vercel bot crawls) and compete or waste crawl budget. On a brand-new domain, consolidating all signals to one host matters more than usual.
- *Fix:* Add a host-conditional rule to vercel.json — preferred: redirects entry with has:[{type:'host', value:'remax-vintage-site.vercel.app'}] → 308 to https://remaxcollectionvintage.pt/$1; alternative: a headers rule with the same has condition setting X-Robots-Tag: noindex for that host (do NOT set it unconditionally — it would deindex production).
- *Files:* vercel.json
- *Fix risk:* Low; test the has-host rule on a preview deploy first — a mistake in the source pattern could redirect production. Note preview deployment URLs (*-git-*.vercel.app) would still exist; Vercel already serves those with X-Robots-Tag: noindex by default for preview (not production alias) deployments.
- *Independent verification:* Re-curled this session: https://remax-vintage-site.vercel.app/robots.txt → 200 with identical Allow:/ robots.txt; homepage → HTTP/2 200, NO x-robots-tag header in response, canonical <link> points to https://remaxcollectionvintage.pt/. vercel.json read in full — only Cache-Control headers blocks, no host-conditional redirect or header rule. Fully c

#### `crawl-sitemap-handmaintained-drift-risk` — Sitemap STATIC_ROUTES is a hand-maintained list — currently complete (14/14) but will silently drift when pages are added

**P3 · CONFIRMED** · effort S · dimension: crawl

- *Evidence:* /Users/seraf/Desktop/Vintage-Website/src/pages/sitemap.xml.ts:7-18 — const STATIC_ROUTES = ['/', '/comprar/', ... '/privacidade/'] (hand-typed array of 10)
- *Evidence:* Cross-checked against src/pages/: 10 indexable static pages exist (index, comprar, vender, alugar, sobre-nos, contacto, apoio, carreiras, insights/index, privacidade) — exact match; 404, mobile-preview, api/lead correctly excluded
- *Evidence:* Insights posts are auto-synced: sitemap.xml.ts:24-27 and insights/[slug].astro:7-9 both iterate the same `articles` array from src/data/insights.ts (4 articles, 4 built pages, 4 sitemap entries)
- *Evidence:* Prerendered correctly: dist/client/sitemap.xml and .vercel/output/static/sitemap.xml exist (1283 bytes each) and diff IDENTICAL to live https://remaxcollectionvintage.pt/sitemap.xml
- *Impact:* No current harm — every URL in the sitemap resolves 200 and every indexable page is listed. Risk is future: a new .astro page won't enter the sitemap unless someone remembers to edit the array (and conversely, a deleted page would leave a 404 in the sitemap).
- *Fix:* Generate STATIC_ROUTES from import.meta.glob('../pages/**/*.astro') with an exclusion list, or adopt @astrojs/sitemap with a filter for noindex routes. At minimum add a code comment/test asserting page-count parity.
- *Files:* src/pages/sitemap.xml.ts
- *Fix risk:* Auto-generation must keep excluding 404/mobile-preview/api; keep the trailing-slash normalization consistent with canonicals.
- *Independent verification:* sitemap.xml.ts:7-18 STATIC_ROUTES = exactly 10 hand-typed paths. Listed src/pages/: exactly 10 indexable static pages exist (404, mobile-preview, api/lead correctly excluded) — parity holds today. insights.ts articles array has 4 entries (the 5th 'slug:' grep hit is the interface field at line 7); insights/[slug].astro:7-9 getStaticPaths maps the s

#### `crawl-mobile-preview-disallow-noindex-conflict` — /mobile-preview is both robots.txt-disallowed and noindex — Google cannot see the noindex; acceptable today, cleaner to pick one

**P3 · CONFIRMED** · effort S · dimension: crawl

- *Evidence:* public/robots.txt:4 'Disallow: /mobile-preview' AND dist/client/mobile-preview/index.html contains <meta name="robots" content="noindex, nofollow"> (grep confirmed)
- *Evidence:* Per Google robots spec, a disallowed URL is never fetched, so the noindex meta is invisible; if the URL gains external links it can appear as 'Indexed, though blocked by robots.txt' (URL-only)
- *Evidence:* Zero internal links to /mobile-preview in any built HTML (href grep census) — exposure is effectively nil
- *Evidence:* Prefix-matching check: 'Disallow: /mobile-preview' matches any path starting with that string; dist/client listing shows no other route/file beginning with 'mobile-preview', so no collateral blocking. 'Disallow: /api/' correctly blocks only the POST-only lead endpoint
- *Impact:* Negligible today (no links to it anywhere). Theoretical: URL-only indexing if the preview URL is ever shared publicly.
- *Fix:* Best: delete the page as its own comment intends (site is launched). Otherwise drop the robots.txt Disallow and rely on the noindex meta, which guarantees exclusion once crawled.
- *Files:* src/pages/mobile-preview.astro (delete), public/robots.txt
- *Fix risk:* None.
- *Independent verification:* public/robots.txt line 4 = 'Disallow: /mobile-preview'; dist/client/mobile-preview/index.html contains <meta name="robots" content="noindex, nofollow">; zero href="/mobile-preview" in any built HTML; dist/client root listing shows no other path starting with 'mobile-preview' (no collateral prefix blocking); mobile-preview.astro line 6 says 'Safe to

#### `crawl-query-param-internal-links` — Two internal links carry a query string (/contacto?assunto=estudo-mercado) — duplication fully neutralized by canonical

**P3 · CONFIRMED** · effort S · dimension: crawl

- *Evidence:* dist/client/index.html and dist/client/vender/index.html each contain href="/contacto?assunto=estudo-mercado" (href census: 2 occurrences)
- *Evidence:* Live: curl 'https://remaxcollectionvintage.pt/contacto?assunto=estudo-mercado' → 200 with <link rel="canonical" href="https://remaxcollectionvintage.pt/contacto/"> — Base.astro:46 builds canonical from pathname only, dropping the query
- *Impact:* Google may crawl the parameterized URL but will consolidate to /contacto/ via the self-referencing clean canonical. No action strictly required; listed for completeness — this is the only query-string internal link on the site.
- *Fix:* Leave as-is (the param presumably prefills the contact form). If more param variants appear later, keep the pathname-only canonical pattern.
- *Fix risk:* None.
- *Independent verification:* Full query-string href census of dist/client: exactly 2 occurrences, both href="/contacto?assunto=estudo-mercado" (index.html and vender/index.html) — confirmed it is the ONLY parameterized internal link. Live curl of the parameterized URL → 200 with <link rel="canonical" href="https://remaxcollectionvintage.pt/contacto/"> (Base.astro:47 builds can


### Page metadata

#### `meta-favicon-no-ico-no-apple-touch-png` — Favicon coverage is SVG-only: /favicon.ico returns 404 and apple-touch-icon points to an SVG (non-functional on iOS)

**P2 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* src/layouts/Base.astro:117-118 — `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` and `<link rel="apple-touch-icon" href="/favicon.svg" />` (only two icon links on every page)
- *Evidence:* public/ contains only favicon.svg (272 bytes, 64x64 viewBox 'V' monogram); no favicon.ico, no apple-touch-icon.png, no manifest (ls confirmed: 'no matches found: apple*')
- *Evidence:* Live: curl https://remaxcollectionvintage.pt/favicon.ico → 404 text/html; /favicon.svg → 200 image/svg+xml
- *Evidence:* Apple's documented requirement for apple-touch-icon is a PNG raster (180x180 for current devices); iOS Safari does not rasterize SVG for home-screen icons and falls back to a page screenshot. Desktop/iOS Safari also do not render standard rel=icon SVG favicons in tabs.
- *Impact:* Safari users (desktop tabs and iOS bookmarks/home-screen) see no brand icon; crawlers and tools that blind-request /favicon.ico get a 404; Google Search shows a generic globe next to results if it cannot resolve a supported favicon for some contexts. For a luxury brand, a missing tab/home-screen icon is a visible polish gap and slightly weakens SERP brand presence.
- *Fix:* Generate raster fallbacks from the existing monogram: /favicon.ico (32x32 or multi-size), /apple-touch-icon.png (180x180), and reference them in Base.astro: keep the SVG icon link, add `<link rel="icon" href="/favicon.ico" sizes="32x32">` and change apple-touch-icon to the 180x180 PNG. Optionally add a minimal site.webmanifest with 192/512 PNGs.
- *Files:* src/layouts/Base.astro, public/favicon.ico (new), public/apple-touch-icon.png (new)
- *Fix risk:* None — purely additive static assets plus two link tags.
- *Independent verification:* Re-read Base.astro:117-118 — exactly the two cited icon links (SVG rel=icon + apple-touch-icon pointing to /favicon.svg), nothing else. ls public/ shows only favicon.svg (272 bytes; re-read it: 64x64 viewBox navy/gold 'V' monogram, matching the description). Live re-curl: /favicon.ico → 404 text/html, /favicon.svg → 200 image/svg+xml. Apple's docs 

#### `meta-og-image-webp-share-compat` — Four pages use WebP files as og:image, which several share platforms (notably WhatsApp) render unreliably

**P2 · LIKELY** · effort S · dimension: metadata

- *Evidence:* dist/client/apoio/index.html — og:image = https://remaxcollectionvintage.pt/images/porto/porto-douro-arrabida.webp
- *Evidence:* dist/client/sobre-nos/index.html — og:image = .../editorial-entrada.webp; dist/client/insights/foz-do-douro-guia-da-zona/index.html — .../porto-foz-promenade.webp; dist/client/insights/vender-imovel-premium-sem-pressa/index.html — .../editorial-curadoria.webp
- *Evidence:* Files exist in public/images/porto/ (1600x900, 76K–200K, sips-confirmed), so the URLs are valid — the risk is consumer-side format support
- *Evidence:* WhatsApp link previews and LinkedIn's Post Inspector have documented/long-standing inconsistencies rendering WebP og:images; JPG/PNG are the universally-supported formats. Not directly testable here (no platform debugger access), hence LIKELY.
- *Impact:* WhatsApp is a primary sharing channel for Portuguese real-estate clients; a link to /sobre-nos/ or two of the four insights posts may show no preview image on WhatsApp/LinkedIn, reducing click-through on exactly the shareable pages. Pages using hero-poster.jpg (home, comprar, vender, etc.) are unaffected.
- *Fix:* Keep WebP for in-page <img> use, but point og:image/twitter:image at JPG variants (export 1200x630 JPGs of the four WebP images). Verify with the Facebook Sharing Debugger and LinkedIn Post Inspector after deploy.
- *Files:* src/pages/apoio.astro, src/pages/sobre-nos.astro, src/data/insights.ts (or wherever a.image is defined per post), public/images/porto/ (new JPG exports)
- *Fix risk:* None — only changes the image= prop values passed to Base; in-page images untouched.
- *Independent verification:* Directly re-verified the observable half: grep of dist/client og:image values finds exactly 4 WebP pages and they are the 4 cited (apoio, sobre-nos, insights/vender-imovel-premium-sem-pressa, insights/foz-do-douro-guia-da-zona); sips confirms all four files exist at 1600x900 (74-205 KB). The consumer-side claim (WhatsApp/LinkedIn unreliable WebP re

#### `meta-article-og-tags-missing` — Insights posts declare og:type=article but emit no article:published_time / article:author / article:modified_time tags

**P3 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* grep -c "article:" dist/client/insights/mercado-premium-porto-2026/index.html → 0 (same for all four posts)
- *Evidence:* src/layouts/Base.astro:121 emits `<meta property="og:type" content={ogType} />` but has no article-specific meta branch
- *Evidence:* src/pages/insights/[slug].astro:38 passes ogType="article" and the JSON-LD Article at lines 16-27 does carry datePublished and author — so the data exists but never reaches OG meta
- *Impact:* Google reads the JSON-LD (already good), but Facebook/LinkedIn/Slack and some AI answer engines read Open Graph article tags for byline/date attribution on shared links. Minor loss of freshness/authorship signals on social shares of the blog content.
- *Fix:* Extend Base.astro props with optional publishedTime/author and emit `article:published_time`, `article:author`, and `article:section` when ogType === 'article'; pass a.date and a.author from [slug].astro (values already available).
- *Files:* src/layouts/Base.astro, src/pages/insights/[slug].astro
- *Fix risk:* Very low — additive meta tags gated behind the article type.
- *Independent verification:* grep -c 'article:' returns 0 for all four dist insights posts while og:type='article' is present. Base.astro:121 emits only the og:type meta with no article branch anywhere in the file (read in full). [slug].astro:38 passes ogType='article' and the JSON-LD at lines 16-27 carries datePublished (line 22, a.date) and author (line 23, a.author) — data 

#### `meta-description-length-outliers` — Four meta descriptions exceed 160 chars (165–174, mild SERP truncation) and /privacidade/ is only 53 chars

**P3 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* Measured from dist HTML: /comprar/ 174 chars (src/pages/comprar.astro:36), /carreiras/ 173 (carreiras.astro:16), /vender/ 172 (vender.astro:47), /sobre-nos/ 165 (sobre-nos.astro:34)
- *Evidence:* /privacidade/ 53 chars: "Política de privacidade da RE/MAX Collection Vintage." (src/pages/privacidade.astro:13) — below the 70-char floor
- *Evidence:* All 14 indexable descriptions are unique (0 duplicates) and the remaining 9 fall in the 95–160 range
- *Impact:* The four long ones will be ellipsed in Google after ~155-160 chars — the truncated tail in each case is secondary detail, so damage is small. The privacidade one is thin but it's a legal page with negligible search intent.
- *Fix:* Trim the four long descriptions to ≤160 chars keeping the differentiator up front (e.g. cut the final clause). Optionally pad privacidade to ~90 chars mentioning RGPD/data-handling scope. Low priority.
- *Files:* src/pages/comprar.astro, src/pages/vender.astro, src/pages/carreiras.astro, src/pages/sobre-nos.astro, src/pages/privacidade.astro
- *Fix risk:* None.
- *Independent verification:* Independently measured every dist description with Python (HTML-unescaped): comprar 174, carreiras 173, vender 172, sobre-nos 165, privacidade 53 — all five exactly as claimed. Source line citations all exact (comprar.astro:36, carreiras.astro:16, vender.astro:47, sobre-nos.astro:34, privacidade.astro:13). Re-counted: 14 indexable pages, 14 unique 

#### `meta-title-truncation-two-posts` — Two insights titles exceed 60 chars (63 and 74) — only the brand suffix gets truncated in SERPs

**P3 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* "Como vender um imóvel premium sem pressa (e por mais) · Collection Vintage" = 74 chars (dist/client/insights/vender-imovel-premium-sem-pressa/index.html)
- *Evidence:* "Foz do Douro: guia de uma zona à beira-mar · Collection Vintage" = 63 chars (dist/client/insights/foz-do-douro-guia-da-zona/index.html)
- *Evidence:* All 15 titles are unique; the other 13 are 27–57 chars. Suffix pattern `· Collection Vintage` from Base.astro:46.
- *Impact:* Google truncates by pixel width (~600px); in both cases only "· Collection Vintage" is at risk, and og:site_name already carries the brand for social. Effectively cosmetic.
- *Fix:* Accept as-is, or shorten the 74-char headline in the insights data source if a rewrite is ever done. Do not strip the brand suffix pattern — it is working well for the other pages.
- *Files:* src/data/insights.ts (title of vender-imovel-premium-sem-pressa)
- *Fix risk:* None.
- *Independent verification:* Measured all dist <title> values: 'Como vender um imóvel premium sem pressa (e por mais) · Collection Vintage' = 74 chars and 'Foz do Douro: guia de uma zona à beira-mar · Collection Vintage' = 63 chars, exactly as claimed. Suffix pattern confirmed at Base.astro:46. The '15 titles' count holds if the noindex QA page /mobile-preview/ is excluded (16

#### `meta-og-image-dimension-tags-absent` — No og:image:width/height/alt or twitter:image:alt; default share image is 1.77:1 instead of the ideal 1.91:1

**P3 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* src/layouts/Base.astro:126 emits only `<meta property="og:image" content={ogImage} />` — no width/height/alt companion tags anywhere in dist HTML
- *Evidence:* public/media/hero-poster.jpg = 1920x1082 (sips), 268K, live 200 image/jpeg — above the 1200x630 minimum, aspect 1.77:1 vs recommended 1.91:1 (slight edge-crop on Facebook/LinkedIn cards)
- *Evidence:* Per-post images 1600x900 / 1500x843 — all comfortably above minimum size
- *Impact:* Without og:image:width/height, Facebook may render the first-ever share of a URL without an image (it fetches dimensions asynchronously). Missing image alt slightly weakens accessibility of shares. Aspect mismatch causes minor cropping only.
- *Fix:* Add og:image:width, og:image:height (accept a dimensions prop or hardcode for the known set) and og:image:alt / twitter:image:alt derived from the page title. Optionally export a dedicated 1200x630 crop of hero-poster.jpg.
- *Files:* src/layouts/Base.astro
- *Fix risk:* Very low — additive tags.
- *Independent verification:* grep for og:image:width|height|alt and twitter:image:alt across dist HTML → 0 matches; Base.astro:126 emits only the bare og:image tag (verified by reading the whole head). sips: hero-poster.jpg = 1920x1082 (1.77:1, 272 KB — auditor said 268K, same file within rounding), live-known 200. Per-post images verified: WebPs 1600x900, the two JPGs (editor

#### `meta-404-emits-canonical-and-default-description` — 404 page emits canonical/og:url https://remaxcollectionvintage.pt/404/ and duplicates the homepage description

**P3 · CONFIRMED** · effort S · dimension: metadata

- *Evidence:* dist/client/404.html — `<link rel="canonical" href="https://remaxcollectionvintage.pt/404/">`, `og:url .../404/`, description identical to homepage default (Base.astro:36 fallback), plus `<meta name="robots" content="noindex, nofollow">`
- *Evidence:* Established fact: test URLs return real HTTP 404 status, so search engines ignore the page anyway
- *Impact:* Effectively nil for SEO (hard 404 + noindex win). Purely a hygiene nit: a canonical on an error page is meaningless and the duplicated homepage description could confuse an auditor or a social scraper that follows a dead link.
- *Fix:* In Base.astro, skip the canonical link (and optionally og:url) when noindex is true, or pass a short bespoke description from 404.astro. Lowest priority.
- *Files:* src/layouts/Base.astro, src/pages/404.astro
- *Fix risk:* None.
- *Consolidates duplicate findings:* `routes-404-canonical-and-duplicate-description`, `crawl-404-canonical-on-noindex-page`
- *Independent verification:* dist/client/404.html contains canonical https://remaxcollectionvintage.pt/404/, og:url .../404/, and meta robots noindex,nofollow — all three grepped directly. Python string comparison confirms the 404 description is byte-identical to the homepage description (the Base.astro:36 site.description fallback). Combined with the established hard-404 stat

#### `meta-twitter-site-and-social-handles-unknown` — No twitter:site/creator handle and site.ts social links are '#' placeholders — needs owner data before adding

**P3 · UNVERIFIED** · effort S · dimension: metadata

- *Evidence:* src/layouts/Base.astro:130-133 emits card/title/description/image but no twitter:site
- *Evidence:* src/data/site.ts:31-37 — `// TODO(social): substituir '#' pelos perfis reais antes do lançamento.` with all four hrefs = '#' (Base.astro:54 correctly filters these out of sameAs)
- *Impact:* Cards still render (summary_large_image works without a handle); attribution to a brand account on X is absent. Cannot be fixed without knowing whether the agency has real profiles — inventing one would violate accuracy.
- *Fix:* Owner action: supply real social profile URLs (and X handle if one exists). Then populate site.social and optionally add twitter:site in Base.astro. Do not add fabricated handles.
- *Files:* src/data/site.ts, src/layouts/Base.astro
- *Fix risk:* None once real handles are confirmed.
- *Independent verification:* The observable evidence holds: Base.astro:130-133 emits twitter:card/title/description/image and no twitter:site anywhere in the file; site.ts:31-37 has the exact TODO(social) comment with all four hrefs '#'; Base.astro:54 filters '#' out of sameAs as claimed. Whether real profiles exist requires owner data, so UNVERIFIED is the correct label and t


### Semantic HTML & internal architecture

#### `semantic-no-crosslinks-insights-services` — Insight posts never link to service pages (and service/home pages never link to insight posts)

**P2 · CONFIRMED** · effort M · dimension: semantic

- *Evidence:* Extracted every <a href> inside <main> for all 16 built pages: each of the 4 insight posts contains exactly 7 internal links — '← Todos os insights' plus 6 links to the other 3 posts ('Continuar a ler' cards). Zero links to /vender, /comprar, /contacto or /alugar in any post body
- *Evidence:* dist/client/insights/vender-imovel-premium-sem-pressa/index.html — a post specifically about selling — has no link to /vender/
- *Evidence:* dist/client/index.html <main> has 10 internal links, none to /insights or any post; the homepage 'Zonas' section renders 'Foz do Douro' as <button class="pin" data-slug="foz-do-douro" ...> (a non-link map hotspot) even though the post /insights/foz-do-douro-guia-da-zona/ exists
- *Evidence:* dist/client/apoio/index.html: all 4 'guide' cards ('Guia do Comprador', 'Guia do Vendedor', 'Como funciona a Avaliação', 'Mercado Imobiliário no Porto') point to the generic /insights index, not to specific articles
- *Impact:* The blog cluster and the money pages are two disconnected link islands; contextual anchor-text links are the strongest internal relevance signal for both classic ranking and AI-answer citation. On a 14-page site this is a cheap, high-leverage fix.
- *Fix:* In each insight post body add 1-2 contextual links to the relevant service page (selling post → /vender/; Foz guide → /comprar/ and /contacto/); link the homepage Zonas 'Foz do Douro' entry (or its info card) to the Foz guide; point the /apoio guide cards at the actual matching posts.
- *Files:* src/pages/insights/[slug].astro or post content source, src/components/Neighborhoods.astro, src/data/faqs.ts (supportGuides hrefs), src/pages/index.astro
- *Fix risk:* Low — editorial changes only; keep anchors natural to avoid over-optimization.
- *Independent verification:* Core claims all re-derived: zero links to /vender/, /comprar/, /contacto/ or /alugar/ pages in any post <main>; homepage <main> has 10 internal links, none to /insights; Foz pin is <button type="button" class="pin" data-slug="foz-do-douro"> (non-link); all 4 apoio guide cards href="/insights" (faqs.ts:132). CORRECTION: each post has 8 internal link

#### `semantic-mobile-hero-pseudo-h1` — Mobile hero title is a <p role="heading" aria-level="1"> with different wording than the real desktop h1

**P3 · CONFIRMED** · effort S · dimension: semantic

- *Evidence:* src/components/HeroMobile.astro:46: '<p class="hm__title" role="heading" aria-level="1">' with text 'A coleção mais exclusiva do Porto.'
- *Evidence:* src/components/Hero.astro:41-43: real '<h1 class="display hero__title">A coleção mais rara do Porto.</h1>'
- *Evidence:* Gating is pure CSS: Hero.astro:184-186 '@media (max-width: 560px) { .hero { display: none; } }' and HeroMobile.astro:112-114 '.hm { display: none; }' + '@media (max-width: 560px)' — both blocks ship in the same static HTML (confirmed on live homepage: h1 count 1, role="heading" count 1)
- *Impact:* Googlebot (mobile rendering) still finds the real <h1> in the DOM even though it is display:none at mobile widths, so this does not break the one-H1 rule; but the visually-presented mobile headline differs from the indexed H1 ('mais exclusiva' vs 'mais rara'), splitting the key brand claim, and HTML-heading extraction by AI crawlers that skip ARIA will only see the desktop wording.
- *Fix:* Align the two hero headline texts, and preferably keep role="heading" markup but match the h1's wording; alternatively restructure so a single <h1> serves both breakpoints with CSS-only line-break differences.
- *Files:* src/components/HeroMobile.astro, src/components/Hero.astro
- *Fix risk:* Low — copy/markup change inside one component.
- *Independent verification:* HeroMobile.astro:46 '<p class="hm__title" role="heading" aria-level="1">' with 'A coleção mais exclusiva do Porto.' vs Hero.astro:41-43 h1 'A coleção mais rara do Porto.' — both verified at cited lines. CSS gating verified (Hero.astro:184-186 hides .hero ≤560px; HeroMobile .hm display:none until ≤560px, lines 112-118). Live homepage: h1 count 1, ro

#### `semantic-no-visible-breadcrumbs` — BreadcrumbList JSON-LD exists on insight posts but there is no visible breadcrumb trail anywhere

**P3 · CONFIRMED** · effort M · dimension: semantic

- *Evidence:* src/pages/insights/[slug].astro:29: "'@type': 'BreadcrumbList'" — emitted in all 4 built posts (verified in dist/client/insights/*/index.html JSON-LD: types ['Article','BreadcrumbList'])
- *Evidence:* grep for aria-label="breadcrumb" / visible breadcrumb nav markup in dist/client returns nothing; posts only show a '← Todos os insights' back-link
- *Evidence:* Service pages (/comprar/, /vender/, /alugar/, /apoio/) have neither breadcrumb markup nor BreadcrumbList JSON-LD
- *Impact:* Google recommends structured data mirror visible content; a visible Início → Insights → [Post] trail would reinforce site hierarchy for crawlers and add a secondary crawl path. Minor on a 2-level site — the JSON-LD alone is still usually honored for breadcrumb rich results.
- *Fix:* Add a small visible breadcrumb nav (<nav aria-label="breadcrumb">) above the article h1 in [slug].astro that mirrors the existing BreadcrumbList; optionally extend both to /apoio and service pages.
- *Files:* src/pages/insights/[slug].astro
- *Fix risk:* Low — additive markup; keep it consistent with the JSON-LD already emitted.
- *Independent verification:* [slug].astro:29 '@type': 'BreadcrumbList' verified; built Foz post carries three JSON-LD blocks (RealEstateAgent/WebSite/WebPage graph, Article, BreadcrumbList). grep for aria-label="breadcrumb" across dist/client returns nothing; service pages' JSON-LD types are WebPage/WebSite/RealEstateAgent/PostalAddress (+FAQPage on apoio) with no BreadcrumbLi

#### `semantic-sitewide-hidden-modal-headings` — Hidden ValueSimulator modal injects boilerplate h2 + five h3s into every page's heading outline

**P3 · CONFIRMED** · effort S · dimension: semantic

- *Evidence:* src/layouts/Base.astro:156-157: '<ValueSimulator /> <CustomerSupport />' — mounted site-wide
- *Evidence:* src/components/ValueSimulator.astro:33 '<div class="vsim" data-vsim hidden>' and :51 '<h2 id="vsim-title">Quanto vale, hoje, o seu imóvel?</h2>' plus step h3s ('Que tipo de imóvel tem?' etc.)
- *Evidence:* Extracted heading sequences show the identical h2+5×h3 block at the end of every page, including all 4 insight posts and /comprar/; on the homepage the h2 text additionally duplicates the visible hero-card h2 (Hero.astro:56)
- *Impact:* Every page — including articles — ends its outline with an off-topic seller-lead form heading set; hidden-but-in-DOM content is indexed under mobile-first indexing, so it mildly dilutes per-page heading relevance and repeats identical boilerplate across all 14 URLs.
- *Fix:* Demote the modal's headings to <p> elements with appropriate classes (keep aria-labelledby pointing at the title element — role="dialog" only needs an accessible name, not heading tags), or keep the h2 but drop the five step h3s to styled <p>/<legend>.
- *Files:* src/components/ValueSimulator.astro, src/components/MobileValuationSheet.astro
- *Fix risk:* Low — verify the dialog keeps its accessible name (aria-labelledby target must still exist).
- *Independent verification:* Base.astro mounts <ValueSimulator/> + <CustomerSupport/> sitewide (lines ~155-157); ValueSimulator.astro:33 '<div class="vsim" data-vsim hidden>' and h2#vsim-title at line 51 verified; identical hidden block confirmed at the tail of built /comprar/, /alugar/ and insight posts. CORRECTION: there are SIX vsim h3s per page, not five (5 question steps 

#### `semantic-footer-missing-contacto` — Footer contains no link to /contacto/ (the primary conversion page)

**P3 · CONFIRMED** · effort S · dimension: semantic

- *Evidence:* src/components/Footer.astro:31 'nav.slice(0, 5)' truncates the nav array after 'Sobre nós', dropping 'Blog' and 'Contacto' (src/data/site.ts:57-58); 'Blog & Insights' is re-added manually in the Serviços column (Footer.astro:78) but Contacto is not
- *Evidence:* Footer 'Contactos' column has tel:/mailto: links and a plain-text address (Footer.astro:47-66) but no <a href="/contacto">
- *Impact:* Minor: /contacto/ is well-linked from page bodies (15 files link to it) and the header nav, so it is not orphaned — but the sitewide footer, the most consistent link block, skips the site's main conversion page.
- *Fix:* Add <a href="/contacto">Contacto</a> to the footer Contactos or Serviços column (or slice(0,7) minus the external item).
- *Files:* src/components/Footer.astro
- *Fix risk:* None.
- *Independent verification:* Footer.astro:31 slice(0,5) keeps Comprar/Vender/Imóveis(ext)/Arrendar/Sobre nós, dropping Blog and Contacto (site.ts:57-58); 'Blog & Insights' is manually re-added at Footer.astro:78 but Contacto is not; Contactos column (lines 47-66) has only tel:/mailto:/plain-text address+hours; legal nav has only /privacidade. Re-counted inbound links: 15 built

#### `semantic-chat-content-js-only` — CustomerSupport chat knowledge (502 lines of reply content) is runtime-only — acceptable, verify no unique facts live only there

**P3 · CONFIRMED** · effort S · dimension: semantic

- *Evidence:* src/components/CustomerSupport.astro:26: '<div class="cs__thread" data-cs-thread role="log" aria-live="polite" ...></div>' — thread is empty in static HTML; replies are built client-side from src/data/supportResponses.ts (375 lines) + supportKnowledge.ts (127 lines)
- *Evidence:* supportKnowledge.ts header comment: 'real, honest content (composed from site.ts/faqs.ts)' — most content mirrors indexable pages, e.g. supportResponses.ts:170 sell-process reply parallels /vender/ copy
- *Impact:* Chat-only text is invisible to crawlers; currently most of it duplicates page content (so nothing significant is lost), but any future answer added only to the chat brain will never be indexable.
- *Fix:* Keep the chat as-is; adopt a rule that every substantive chat answer must also exist on /apoio/ FAQ or a service page (the FAQ accordion already renders statically, so that is the right home).
- *Files:* src/data/supportResponses.ts (policy only)
- *Fix risk:* None — process recommendation.
- *Independent verification:* Empty thread div verified — actually CustomerSupport.astro line 25, not 26 (immaterial off-by-one): '<div class="cs__thread" data-cs-thread role="log" ...></div>' with no static content. Line counts exact: supportResponses.ts 375 + supportKnowledge.ts 127 = 502. Header comment is paraphrased, not verbatim — actual text: 'Composes REAL site content 


## 7. International SEO findings

**Architecture summary (the finding that frames all others):** the site is monolingual pt-PT at the URL level. `src/i18n/dict.ts` (1,296 entries) + `src/i18n/apply.ts` implement a client-side DOM text-swap EN toggle persisted in localStorage — no `/en/` routes, no hreflang (correctly none: with no alternate URLs, hreflang would be invalid), and `apply.ts` even updates `document.documentElement.lang` on swap (well engineered). But two facts change the picture:

1. **The toggle is dead code.** `initI18n()` is never imported by any layout or page; no toggle UI exists; zero i18n code ships in `dist/client`. The EN experience currently does not exist for users either.
2. **Even if wired, DOM-swap EN is invisible to every crawler and answer engine.** Google indexes the pt-PT DOM; ChatGPT Search/Perplexity/Bing quote pt-PT only. For a Porto luxury agency whose buyer pool is substantially international, EN discoverability is a real commercial question — but it is an **owner decision** (stay PT-only vs. build static `/en/` routes with reciprocal hreflang + `x-default`), not a defect to patch silently.

**The reported "23 untranslated strings across 15 pages":** re-run and confirmed this session (`npm run i18n:check`, dict 1,296 entries). The 23 gaps sit on the homepage and /404 (chrome strings shared across pages explain the "15 pages" figure). **For SEO today this is moot** — the strings only matter the moment the EN toggle ships; they are catalogued in the finding below as pre-launch QA for that path. PT-PT source quality is excellent: zero PT-BR contamination in indexable HTML (greps for registro/contato/planejamento/gerenciar/equipe/aluguel/você etc. — clean), consistent formal register (one 'tu'-mixing exception on /carreiras/, filed under content).


### International SEO

#### `intl-en-invisible-to-crawlers-by-design` — Even when wired, the client-side DOM-swap EN architecture is invisible to Google, Bing and AI answer engines — only pt-PT is indexable

**P1 · CONFIRMED** · effort L · dimension: i18n

- *Evidence:* src/i18n/apply.ts:16-23,212-215 — EN activates only from localStorage ('rvc-lang') or a user click; the initial render is always PT ('const initial: Lang = getStored() ?? 'pt''), so any crawler's rendered snapshot is Portuguese
- *Evidence:* No EN URLs exist: src/pages/ has no /en/ tree; dist/client/ contains 16 HTML files, all with <html lang="pt-PT"> (grep count: 16) and og:locale pt_PT on 15 pages (Base.astro:127)
- *Evidence:* Live sitemap.xml (14 URLs, per established facts) contains 0 'xhtml'/'hreflang' entries — no alternate-language URLs are declared anywhere
- *Evidence:* Google's localized-versions documentation (developers.google.com/search/docs/specialty/international/localized-versions) requires distinct URLs per language variant; content swapped by user interaction on one URL is not indexed as a second language; most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) fetch raw HTML without executing JS
- *Impact:* Zero EN discoverability: the site cannot rank for English queries ('luxury real estate Porto', 'buy apartment Porto', 'Porto property for sale') and cannot be cited in English by AI answer engines, regardless of whether the toggle is wired. All 1,296 dict entries have no search value in the current architecture. Whether this matters is a business decision — if the target buyer is international (typical for Porto luxury), this is the single largest international-SEO constraint of the site.
- *Fix:* State clearly to the owner: the current architecture makes EN a UX-only feature with no SEO/GEO value. Needs owner confirmation on whether EN organic/AI discoverability is a business goal (UNVERIFIED — cannot be determined from the repo). If yes, the only honest fix is separate EN URLs (see the decision-paths finding). If no, the PT-only architecture is coherent and correct as-is.
- *Fix risk:* None from the finding itself; risk lies in choosing a path without confirming the target-audience goal.
- *Consolidates duplicate findings:* `geo-en-invisible-to-crawlers`
- *Independent verification:* apply.ts:16-23 (getStored reads localStorage 'rvc-lang') and :212-215 ('const initial: Lang = getStored() ?? 'pt'') verified verbatim — initial render is always PT. src/pages/ has no en/ tree (ls verified); astro.config.mjs has zero i18n/locale config (grep verified); dist/client has exactly 16 HTML files, all 16 with <html lang="pt-PT">, 15 with o

#### `intl-en-toggle-dormant-never-wired` — The entire EN language system is dead code — initI18n() is never imported, no toggle UI exists, zero i18n code ships to production

**P2 · CONFIRMED** · effort S · dimension: i18n

- *Evidence:* src/i18n/apply.ts:212 — 'export const initI18n = () => {' is the only occurrence of initI18n in the repo outside dist; grep across all src/*.astro/*.ts files for 'initI18n', 'i18n/apply', 'from ../i18n' returns only src/i18n/apply.ts itself
- *Evidence:* src/layouts/Base.astro:2-8 — imports are only global.css, performance.css, Nav, Footer, ValueSimulator, CustomerSupport, site data; no i18n import. Its only inline script (Base.astro:159-179) is the reveal-on-scroll observer
- *Evidence:* src/components/Nav.astro:1-270 — full file contains no language toggle; grep for 'data-lang-switch'/'data-lang-value' across src/components/ and src/layouts/ returns 0 hits (those selectors exist only inside apply.ts:105-108,219-222)
- *Evidence:* Built output: grep -rl 'rvc-lang|initI18n|__i18nPt' dist/client/ → 0 files; dist/client/assets/ contains only ValueSimulator and CustomerSupport bundles, both with 0 hits for 'i18nPt|rvc-lang'
- *Impact:* The EN experience does not exist on the production site at all — not for crawlers AND not for human visitors. ~1,660 lines of i18n code (dict.ts 1,430 lines / 1,296 entries + apply.ts 229 lines) are fully dormant. English-speaking prospects — typically a core audience for Porto luxury/vintage property — see only Portuguese with no way to switch. This is a bigger gap than the briefed 'client-side toggle is crawler-invisible': the toggle is user-invisible too.
- *Fix:* Owner must confirm intent: (1) If EN is meant to be live now, wire it: render a [data-lang-switch] control with two [data-lang-value] buttons in Nav.astro, and call initI18n() from a client script in Base.astro. Effort is small; the runtime is well-built and ready. (2) If EN was descoped, remove src/i18n/* and the i18n:check script to stop carrying dead code. Do NOT treat wiring the toggle as an SEO fix — it only serves humans (see the architecture finding).
- *Files:* src/components/Nav.astro, src/layouts/Base.astro, src/i18n/apply.ts
- *Fix risk:* Low — the runtime already handles restore, MutationObserver re-translation, and head swaps; main risk is visual fit of the toggle in the nav capsule and the 23 known dictionary gaps becoming user-visible.
- *Independent verification:* Re-derived everything: grep for initI18n across src+dist returns only its definition at src/i18n/apply.ts:212 — zero imports anywhere; Base.astro imports (lines 2-8) are css/Nav/Footer/ValueSimulator/CustomerSupport/site only, and its sole inline script (lines 159-179) is the reveal-on-scroll observer; data-lang-switch/data-lang-value/rvc-lang exis

#### `intl-two-paths-decision-pt-only-vs-en-routes` — Owner decision required: stay PT-only (correct today, incl. correctly having NO hreflang) vs. build static /en/ routes with proper hreflang

**P2 · CONFIRMED** · effort L · dimension: i18n

- *Evidence:* grep -rc 'hreflang' dist/client/**/*.html → 0 hits on all 16 pages; sitemap has 0 xhtml:link alternates — correct for a single-language-URL site (hreflang annotations must reference alternate URLs; with no EN URLs there is nothing valid to annotate)
- *Evidence:* src/layouts/Base.astro:93 '<html lang="pt-PT">' and :127 '<meta property="og:locale" content="pt_PT">' — single hardcoded locale in the one layout used by all pages
- *Evidence:* src/i18n/dict.ts:1214-1234 — the dictionary already contains EN translations for every page title and meta description ('---------- Page meta ----------' section), i.e. most EN content needed for real EN pages already exists
- *Impact:* Path A (stay PT-only): zero effort, zero risk, but forfeits all EN search/AI traffic. Path B (static /en/ routes): unlocks EN indexation and AI-engine citability for international buyers; costs a content-maintenance doubling and a build refactor. The current no-hreflang state is CORRECT and must not be 'fixed' in isolation — adding hreflang tags without separate EN URLs would be invalid markup that references non-existent alternates.
- *Fix:* Present both paths; do NOT naively add hreflang today. Path A (effort S): keep PT-only, optionally wire the toggle as a human-only convenience, delete or keep the dormant dict. Path B (effort L): use Astro's built-in i18n routing (astro.config i18n.locales ['pt-PT','en'] with prefixDefaultLocale:false, or a manual src/pages/en/ tree) to emit real /en/... pages reusing dict.ts content; on BOTH variants add reciprocal <link rel="alternate" hreflang="pt-PT"> / hreflang="en" / hreflang="x-default" (x-default → pt-PT root); set <html lang="en"> and og:locale en_GB (plus og:locale:alternate pt_PT) on EN pages; translate title/meta/JSON-LD (dict.ts:1214-1234 already covers titles/descriptions); extend sitemap.xml.ts with the EN URLs (optionally xhtml:link alternates). If Path B is chosen, the client-side swap should be retired in favour of real navigation between /  and /en/.
- *Files:* astro.config.mjs, src/layouts/Base.astro, src/pages/sitemap.xml.ts, src/pages/ (new en/ tree), src/i18n/dict.ts
- *Fix risk:* Path B risks: thin/duplicate EN content if translations are partial (the 23 known gaps + any new copy), doubled QA surface, and incorrect hreflang reciprocity if the pairs are not emitted on both sides.
- *Independent verification:* hreflang: 0 occurrences across all 16 dist/client HTML files (grep verified) and 0 in live sitemap.xml (curl verified); Base.astro:93 '<html lang="pt-PT">' and :127 '<meta property="og:locale" content="pt_PT">' verified verbatim; dict.ts page-meta section verified — the '---------- Page meta ----------' comment sits at line 1214 with EN translation

#### `intl-23-untranslated-strings` — 23 dictionary gaps (all on homepage and 404) would surface as mixed-language text the moment EN goes live; fragmented keys reveal a split-text-node fragility

**P3 · CONFIRMED** · effort S · dimension: i18n

- *Evidence:* npm run i18n:check output (scripts/i18n-coverage.mjs, which replays apply.ts's exact skip rules against dist/client): '23 untranslated strings across 15 pages; dict has 1296 entries' — note 15 is the count of HTML files SCANNED; the gaps sit on only 2 pages
- *Evidence:* Homepage / (17): 'A coleção' · 'Abrir avaliação de imóvel' [aria-label] · 'avaliação' · 'Discrição absoluta' · 'do' · 'Faça a sua' · 'Faça a sua avaliação' [aria-label] · 'Imóveis de exceção no Porto' · 'Imóveis extraordinários para quem valoriza o que é verdadeiramente raro.' · 'Imóveis únicos. Padrão incomparável.' · 'mais exclusiva' · 'O valor real do seu imóvel no mercado do Porto — confidencial e sem compromisso.' · 'Privacidade total em cada negociação.' · 'RE/MAX Collection Vintage — a coleção mais exclusiva do Porto' [aria-label] · 'Seleção curada' · 'Serviço bespoke' · 'Um serviço tão exclusivo quanto os imóveis.'
- *Evidence:* /404.html (6): 'Erro 404' · 'Esta página não' · 'existe' · 'O endereço pode ter mudado ou nunca ter existido. Continue a partir de uma destas páginas.' · 'Página não encontrada · Collection Vintage' (<title>) · 'Voltar ao início'
- *Evidence:* Fragment keys 'A coleção' / 'mais exclusiva' / 'do' / 'Faça a sua' / 'avaliação' / 'Esta página não' / 'existe' show sentences split across multiple inline elements — apply.ts translates per text node (apply.ts:47-66), so split phrases can never be translated as a unit
- *Impact:* None today (system dormant). If the toggle is wired: the homepage hero — the most visible copy on the site — and the 404 page would show Portuguese fragments mid-English-page, and word-by-word entries for fragments ('do' → 'of/the'?) are inherently ambiguous and untranslatable in isolation.
- *Fix:* Before any EN launch: add the 23 entries to dict.ts, but for the fragmented hero/404 sentences restructure the markup so each translatable phrase lives in one text node (or wrap with a single element and translate the whole phrase), since per-word dictionary entries cannot express EN word order. Re-run npm run i18n:check until 0.
- *Files:* src/i18n/dict.ts, src/pages/index.astro, src/pages/404.astro
- *Fix risk:* Low; purely additive dictionary/markup work.
- *Independent verification:* Re-ran npm run i18n:check --json against the fresh dist: exactly 23 strings, matching the auditor's list verbatim, and the page attribution is exact — 17 on '/' (3 of them [aria-label], incl. the three cited) and 6 on /404.html (incl. the <title>). Confirmed '15 pages' = HTML files scanned (script excludes mobile-preview, scripts/i18n-coverage.mjs:

#### `intl-dict-quality-mistranslation-and-us-uk-mix` — EN dictionary quality: one real mistranslation ('à medida' → 'to measure') and a US/UK spelling mix in an otherwise strong, idiomatic translation

**P3 · CONFIRMED** · effort S · dimension: i18n

- *Evidence:* src/i18n/dict.ts:1327-1328 — '• Selecionamos imóveis à medida — incluindo oportunidades fora do mercado.': '• We select properties to measure — including off-market opportunities.' — 'à medida' means 'tailored/bespoke'; 'to measure' is a calque that reads as machine translation
- *Evidence:* US/UK inconsistency: dict.ts:8 ''Zonas': 'Neighborhoods'' and dict.ts:62 ''Zonas selecionadas': 'Selected neighborhoods'' (US) versus 33 occurrences of UK 'neighbourhood(s)' elsewhere (e.g. dict.ts:482, :486, :545); dict.ts:158 'analyze' (US) versus 4× 'analyse'; the rest is consistently UK — 6× 'centre', 2× 'licence', 2× 'organise', 5× 'personalised', 2× 'recognise', 5× 'specialise'
- *Evidence:* Job-title mapping drifts: dict.ts:491-495 — 'Consultor': 'Agent', 'Consultor Imobiliário': 'Real Estate Agent', 'Consultora Imobiliária': 'Estate Agent' (three different EN renderings of near-identical PT titles)
- *Evidence:* Spot-check of 100+ entries across nav/hero/zones/method/FAQ/legal-docs/meta/assistant sections found otherwise natural, market-appropriate English — e.g. dict.ts:509 'Promissory contract of purchase and sale' (correct CPCV term), :447 'a confidential, no-obligation valuation', :490 'Turnkey construction.', :1216 'eight select neighbourhoods'
- *Impact:* None while dormant. If EN ships (toggle or /en/ routes), 'properties to measure' is a visible credibility slip on a luxury brand, and the US/UK mix ('Neighborhoods' is a top-nav label — the most-seen EN word on the site — clashing with 33 UK spellings elsewhere) reads as unedited.
- *Fix:* Fix dict.ts:1328 to 'We select properties tailored to you — including off-market opportunities.' Standardise on UK English (already the dominant variant, appropriate for a European audience): change dict.ts:8/:62 to 'Neighbourhoods'/'Selected neighbourhoods' and :158 'analyze'→'analyse'. Pick one EN title per PT job title (suggest 'Estate Agent' family) at dict.ts:491-495.
- *Files:* src/i18n/dict.ts
- *Fix risk:* None; string-only edits, no runtime behaviour change.
- *Independent verification:* dict.ts:1327-1328 verified verbatim: '• Selecionamos imóveis à medida…' → '• We select properties to measure — including off-market opportunities.' — a genuine calque ('à medida' = tailored/bespoke). US/UK mix verified: 'Neighborhoods' at :8 and 'Selected neighborhoods' at :62 are the ONLY 2 US spellings vs UK 'neighbourhood' (I count 41 occurrence

#### `intl-pt-source-nit-curacao` — PT source copy uses non-standard 'Curação' for 'curation' where the site itself uses the correct 'Curadoria' elsewhere (chat-bundle only, not indexable HTML)

**P3 · CONFIRMED** · effort S · dimension: i18n

- *Evidence:* src/data/site.ts:89 — "{ num: '01', name: 'Curação', icon: 'search', text: 'Entendemos o imóvel, o contexto e o seu potencial real.' }" — 'Curação' is not standard European Portuguese for curation; the standard term is 'Curadoria'
- *Evidence:* src/i18n/dict.ts:54 ''Curadoria': 'Curation'' and dict.ts:100 ''Curação': 'Curation'' — both forms coexist in the same codebase
- *Evidence:* grep -rln 'Curação' dist/ → only dist/client/assets/CustomerSupport.astro_astro_type_script_index_0_lang.B1PLZgKY.js (the chat assistant bundle); 0 hits in any indexable .html file; curl of https://remaxcollectionvintage.pt/vender/ shows neither term in the page
- *Impact:* No SEO impact (never rendered in indexable HTML — it only appears in chat-assistant reply text). Brand-language consistency nit for a luxury positioning: native pt-PT speakers reading the chat's method steps will notice the non-word.
- *Fix:* Change 'Curação' to 'Curadoria' in src/data/site.ts:89 and update the matching dict keys (dict.ts:100 and the '• Curação — …' bullet at dict.ts:1333) so chat translations keep working. Flag to owner in case 'Curação' was an intentional brand coinage.
- *Files:* src/data/site.ts, src/i18n/dict.ts
- *Fix risk:* Must update dict keys in the same change or the chat line loses its EN translation (keys are exact-match strings).
- *Independent verification:* site.ts:89 verified verbatim ({ num: '01', name: 'Curação', … }); the same file uses the standard 'Curadoria' at site.ts:72 and :83, and 'Curadoria' renders in indexable HTML (2 occurrences in dist/client/index.html), while grep -rln 'Curação' dist/ hits ONLY the CustomerSupport chat bundle — 0 indexable .html files; curl of live /vender/ shows 0 o


## 8. Local SEO findings

The architecture is right (single-source NAP in `src/data/site.ts`, honest schema that refuses to emit placeholders, genuine remax.pt office-12382 entity links) — but **the business data inside it is almost entirely placeholder and it is live**. This is the worst-scoring dimension (38/100) and the one that blocks every off-site local channel: a Google Business Profile cannot be created/linked with a fake address; citations cannot be built on a fake phone; the AMI licence is a legal requirement for Portuguese mediação imobiliária.


### Local SEO & business entity

#### `local-nap-placeholders-live-in-production` — Entire NAP (phone, email, address, WhatsApp) is placeholder data, live on every production page

**P1 · CONFIRMED** · effort S · dimension: local

- *Evidence:* src/data/site.ts:21-25 — "// TODO(contacto): substituir pelos contactos reais antes do lançamento." → phone: '+351 220 000 000', email: 'collection@vintage.pt', whatsappHref: 'https://wa.me/351220000000'
- *Evidence:* src/data/site.ts:27-29 — "// TODO(contacto): morada e horário reais" → address: ['Av. da Boavista 0000', '4100-000 Porto, Portugal'], hours: ['Segunda a Sexta', '09:00 – 18:00']
- *Evidence:* LIVE https://remaxcollectionvintage.pt/contacto/ — grep returned 5× '+351 220 000 000', 4× 'collection@vintage.pt', 2× 'Av. da Boavista 0000', 2× '4100-000', 4× tel/wa '351220000000'
- *Evidence:* LIVE https://remaxcollectionvintage.pt/ — 4× phone, 2× email, 1× 'Av. da Boavista 0000' (footer renders NAP sitewide via src/components/Footer.astro:47-66)
- *Impact:* Local SEO is non-functional: there is no real citable NAP, so no citations, no GBP, no local pack eligibility. Users calling get a dead number; the placeholder email is on vintage.pt, a domain the business does not appear to control, so leads emailed there are lost or delivered to a third party. Placeholder street number '0000' and postal code '4100-000' visibly signal an unfinished/untrustworthy site to both users and AI answer engines extracting business facts.
- *Fix:* Owner supplies real phone, email on own domain, street address and postal code; edit only src/data/site.ts:22-28 — the single source of truth propagates automatically to footer, /contacto, /apoio contact channels, WhatsApp link, chat assistant and EN dict. Then also add telephone/email/streetAddress to the JSON-LD (see local-schema-local-fields-pending).
- *Files:* src/data/site.ts
- *Fix risk:* None — data swap in one file; i18n dict keys containing the phone string must be updated in the same pass (src/i18n/dict.ts) or the EN toggle shows the old number.
- *Consolidates duplicate findings:* `geo-placeholder-nap-ami-in-crawlable-text`, `semantic-placeholder-ami-and-phone`
- *Independent verification:* Re-read src/data/site.ts:21-28 (TODO comments + phone '+351 220 000 000', email 'collection@vintage.pt', whatsappHref wa.me/351220000000, address 'Av. da Boavista 0000', '4100-000 Porto') and Footer.astro:47-66 rendering NAP sitewide. Re-curled production: /contacto/ = 5x phone, 4x email, 2x 'Av. da Boavista 0000', 2x '4100-000', 4x tel/wa links — 

#### `local-ami-licence-placeholder-and-no-legal-entity` — AMI licence rendered as 'AMI 0000' placeholder sitewide; no legal entity name or NIF anywhere (Portuguese legal requirement)

**P1 · CONFIRMED** · effort S · dimension: local

- *Evidence:* src/components/Footer.astro:96 — "© {year} {site.brandLine}. Licença AMI 0000 · Cada agência é juridicamente independente."
- *Evidence:* dist/client/*/index.html — 'AMI 0000' present in all 16 built pages (grep word-boundary \bAMI\b)
- *Evidence:* LIVE https://remaxcollectionvintage.pt/ and /contacto/ — 1× 'AMI 0000' each (footer)
- *Evidence:* grep -rniE '\bNIF\b|contribuinte|NIPC|pessoa coletiva' src → only a seller-documents checklist item (src/content/metodo-vender.ts:195); the agency's own legal name/NIF is published nowhere
- *Impact:* Portuguese law (Lei 15/2013, real-estate mediation) requires the real AMI licence number on all the agency's communications and advertising; a visibly fake '0000' is a legal exposure and a strong anti-trust signal for users, Google quality raters and AI engines verifying the business entity. Absence of the legal entity name/NIF also weakens entity reconciliation (site ↔ official registries ↔ RE/MAX directory).
- *Fix:* Obtain the real AMI number and legal entity name (e.g. '<Sociedade> — Mediação Imobiliária, Lda. · AMI XXXXX') from the owner and put them in the footer legal line; keep the honest 'Cada agência é juridicamente independente' RE/MAX disclaimer. Do not invent any value.
- *Files:* src/components/Footer.astro, src/i18n/dict.ts, src/data/site.ts
- *Fix risk:* None once real values are supplied; blocking on owner data.
- *Independent verification:* Footer.astro:96 quote verified verbatim ('Licença AMI 0000 · Cada agência é juridicamente independente'). Minor count correction: 'AMI 0000' is in 15 of 16 built HTML files, not all 16 — dist/client/mobile-preview/index.html lacks it (immaterial: that page is noindexed). Live homepage shows 1x 'AMI 0000' (re-curled). grep for NIF/contribuinte/NIPC/

#### `local-gbp-absent-no-map-presence` — No Google Business Profile link or map embed anywhere on the site; GBP status unknown

**P1 · CONFIRMED (no on-site GBP/map presence) / UNVERIFIED (whether a GBP listing exists)** · effort M · dimension: local

- *Evidence:* grep -rliE 'maps.google|goo.gl/maps|google.com/maps' dist/client → only dist/client/apoio/index.html and its CustomerSupport JS bundle; both are a generic maps *search* URL, not a GBP/place link
- *Evidence:* src/data/faqs.ts:89-90 — mapsHref = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(site.address.join(', ')) — built from the placeholder address
- *Evidence:* Whether a GBP listing exists cannot be verified from the repo or site — requires owner's Google account
- *Impact:* For a local agency, GBP is the single highest-leverage local-SEO asset (local pack, Maps, knowledge panel, reviews). Nothing on the site references one, and one cannot honestly be created until the real address/phone exist (see local-nap-placeholders finding). Two-day-old domain plus no GBP means zero local surface for 'imobiliária Porto'-type queries.
- *Fix:* After real NAP lands: owner creates/claims the GBP with categories 'Agência imobiliária' / 'Real estate agency', identical NAP to the site, link to https://remaxcollectionvintage.pt/; then add the GBP place URL as the 'Ver no mapa' target and to JSON-LD hasMap/sameAs. Also claim/verify the agency's page on remax.pt (office 12382, already linked from the site).
- *Files:* src/data/faqs.ts, src/layouts/Base.astro
- *Fix risk:* None to the site; GBP verification is an owner-side process (postcard/video) that needs the real premises.
- *Independent verification:* On-site portion re-verified: grep -rliE 'maps.google|goo.gl/maps|google.com/maps' over dist/client hits only dist/client/apoio/index.html and the CustomerSupport JS bundle, and the URL is a generic /maps/search/?api=1 query built from the placeholder address (faqs.ts:89-90 re-read, matches). No GBP place link, no map embed, no hasMap in the live JS

#### `local-livro-reclamacoes-missing` — No link to Livro de Reclamações Eletrónico (mandatory for Portuguese consumer-facing businesses)

**P2 · CONFIRMED** · effort S · dimension: local

- *Evidence:* grep -rliE 'livro.?de.?reclama|livroreclamacoes' src dist/client → zero matches (verified in this audit)
- *Evidence:* src/components/Footer.astro:99-103 — legal-links nav contains only 'Política de Privacidade'
- *Impact:* DL 74/2017 obliges businesses serving consumers to display a visible link to livroreclamacoes.pt on their website. Missing it is a compliance gap (ASAE-fineable) and another trust signal absent from the footer where users and evaluators expect it.
- *Fix:* Owner confirms/completes registration on the Livro de Reclamações Eletrónico platform, then add the standard link (and official logo if desired) to the footer legal-links nav next to 'Política de Privacidade'.
- *Files:* src/components/Footer.astro, src/i18n/dict.ts
- *Fix risk:* None; requires owner's platform registration first.
- *Independent verification:* Re-ran grep -rliE 'livro.?de.?reclama|livroreclamacoes' over src and dist/client: zero matches. Footer.astro:99-103 legal nav contains only the /privacidade link (plus a TODO comment about a future /termos). Finding is factually correct. Severity recalibrated to P2 for this SEO/GEO audit: it is a real Portuguese legal-compliance gap (owner-urgent),

#### `local-maps-link-points-to-fictitious-address` — Live 'Ver no mapa' CTA on /apoio sends users to Google Maps for the fictitious address 'Av. da Boavista 0000'

**P2 · CONFIRMED** · effort S · dimension: local

- *Evidence:* LIVE https://remaxcollectionvintage.pt/apoio/ — contains https://www.google.com/maps/search/?api=1&query=Av.%20da%20Boavista%200000%2C%204100-000%20Porto%2C%20Portugal (curl-verified)
- *Evidence:* src/data/faqs.ts:98 — { icon: 'pin', label: 'Visita', detail: site.address.join(', '), ... cta: { label: 'Ver no mapa', href: mapsHref }, external: true }
- *Impact:* Users planning an office visit are routed to a non-existent location; Google Maps will show an arbitrary or empty result for street number 0000. Direct trust damage on the support page whose purpose is contact.
- *Fix:* Fix automatically resolves when site.ts address is real (mapsHref derives from it). Interim option until then: hide the 'Visita' channel card so a fake destination is never offered.
- *Files:* src/data/site.ts, src/data/faqs.ts
- *Fix risk:* None.
- *Independent verification:* Re-curled https://remaxcollectionvintage.pt/apoio/ — it contains exactly https://www.google.com/maps/search/?api=1&query=Av.%20da%20Boavista%200000%2C%204100-000%20Porto%2C%20Portugal (byte-identical to the cited URL). faqs.ts:98 'Visita' channel with cta 'Ver no mapa' href=mapsHref verified. P2 correct.

#### `local-social-links-placeholder-hash` — All four social links (Instagram, LinkedIn, YouTube, Facebook) are dead href="#" on every page

**P2 · CONFIRMED** · effort S · dimension: local

- *Evidence:* src/data/site.ts:31-37 — "// TODO(social): substituir '#' pelos perfis reais" → all four href: '#'
- *Evidence:* dist/client/index.html — 'href="#" aria-label="Instagram"' (+LinkedIn/YouTube/Facebook), each with target="_blank"; /contacto renders 8 total '#' anchors (footer + contact aside)
- *Evidence:* src/layouts/Base.astro:54 — sameAs correctly filters '#' out of JSON-LD, so structured data is unpolluted (verified live: no sameAs key)
- *Impact:* Dead social buttons on every page hurt UX/trust, and the entity graph has zero sameAs corroboration — social profiles are a primary way Google/AI engines confirm a business entity exists. New domain + no social + no GBP = nearly unverifiable entity.
- *Fix:* Owner supplies real profile URLs (or the section is hidden until they exist). Once site.ts social hrefs are real, sameAs auto-populates in JSON-LD via the existing filter — no schema work needed.
- *Files:* src/data/site.ts
- *Fix risk:* None.
- *Consolidates duplicate findings:* `crawl-stray-public-script-and-placeholder-links`
- *Independent verification:* site.ts:31-37 verified: TODO(social) comment + all four social entries href '#'. dist/client/index.html contains exactly 4 dead anchors (href="#" aria-label Instagram/LinkedIn/YouTube/Facebook, re-grepped); dist/client/contacto/index.html has 8 total href="#" anchors as claimed. Base.astro:54 sameAs filter (h !== '#') verified in source, and the li

#### `local-schema-local-fields-pending` — RealEstateAgent schema lacks telephone, streetAddress/postalCode, geo, openingHoursSpecification and hasMap — currently deliberate, must follow real NAP

**P2 · CONFIRMED** · effort S · dimension: local

- *Evidence:* src/layouts/Base.astro:51-53 — "Contact details (phone/email) are deliberately NOT emitted while site.ts still carries launch placeholders; only verified facts go into structured data."
- *Evidence:* src/layouts/Base.astro:67 — address: { '@type': 'PostalAddress', addressLocality: 'Porto', addressCountry: 'PT' } — no streetAddress/postalCode
- *Evidence:* LIVE https://remaxcollectionvintage.pt/ JSON-LD (curl-extracted) — RealEstateAgent has name/logo/url/areaServed/priceRange/foundingDate but no telephone, geo, openingHours, sameAs
- *Impact:* Until real NAP exists this omission is CORRECT (honest schema). But local rich-result eligibility and AI fact extraction need telephone, full PostalAddress, geo coordinates and openingHoursSpecification on the RealEstateAgent node once real data lands — this is the follow-through step that makes the local entity machine-readable.
- *Fix:* When site.ts gets real values: extend the RealEstateAgent node with telephone, email, full address (streetAddress, postalCode, addressLocality, addressCountry), geo (GeoCoordinates from the real premises), openingHoursSpecification derived from site.hours, and hasMap → GBP URL. Keep the existing only-verified-facts discipline.
- *Files:* src/layouts/Base.astro, src/data/site.ts
- *Fix risk:* Low — additive schema; validate with Google Rich Results test after deploy.
- *Consolidates duplicate findings:* `schema-agency-node-thin-pending-owner-nap`
- *Independent verification:* Base.astro:51-53 deliberate-omission comment and line 67 minimal PostalAddress (addressLocality Porto + addressCountry PT only) verified in source. Re-extracted the live homepage JSON-LD: RealEstateAgent node has name/description/logo/image/url/areaServed/address/priceRange/foundingDate and nothing else — no telephone, email, streetAddress, postalC


### Branded & local search-theme map (no keyword stuffing — natural coverage assessment)

| Theme | Best current page | Current title/H1 evidence | Gap |
|---|---|---|---|
| "RE/MAX Collection Vintage" (brand) | `/` | Title carries full brand + tagline | Covered once indexed |
| "Remax Vintage" / "RE/MAX Vintage Porto" (brand variants) | `/` | 0 occurrences of "Remax Vintage" in any built page (entity naming is disciplined: 255× full name) | Acceptable — Google handles brand variants; GBP matters more |
| "imobiliária de luxo no Porto" / "imóveis de luxo no Porto" | `/` or `/sobre-nos/` | **No page ever says "imobiliária" or "mediação imobiliária" in body copy** (geo-lexical-gap finding) | Real gap — one natural self-description sentence on / and /sobre-nos/ |
| "avaliação de imóvel no Porto" / "quanto vale a minha casa" | `/#vender` anchor + sitewide simulator + `/vender/` | Intent split across three surfaces, no dedicated URL | Real gap — valuation landing page (content-valuation-intent-split, content-new-pages-spec) |
| "comprar casa no Porto" | `/comprar/` | Title "O método de compra · Collection Vintage" — no "Porto", H1 mismatch | Title/H1 localization (content-titles finding) |
| "vender casa no Porto" | `/vender/` | Title "Vender · Collection Vintage" — no "Porto" | Same |
| "arrendar no Porto" | `/alugar/` | 82 words, no H1, CTA → external BUY search | Weakest commercial surface (content-thin-alugar) |
| Foz do Douro / Boavista / Nevogilde / … (8 zonas) | 1-sentence cards on `/`; 1 thin insight for Foz | 7 of 8 zones have no dedicated URL | Highest-value content gap (geo-no-per-zone-pages) |

## 9. Structured-data findings

One of the strongest dimensions (84/100). All 21 JSON-LD blocks across 16 built pages parse cleanly; a stable `#agency`/`#website` @graph (RealEstateAgent + WebSite + WebPage) is emitted from a single source (`Base.astro:55-89`); correct page subtypes (ContactPage, AboutPage, FAQPage on /apoio, Article + BreadcrumbList on all four posts); and — rare in the wild — **integrity by design**: placeholder phone/e-mail/address are deliberately excluded from schema ("only verified facts go into structured data", `Base.astro:51-53`), `#` socials are filtered from sameAs, and there is zero fabricated Review/AggregateRating/Offer markup anywhere.


### Structured data

#### `schema-founding-date-2014-unsourced` — foundingDate "2014" in schema (and "Desde 2014" site-wide) is an unsourced business fact on a 2-day-old domain — needs owner confirmation

**P2 · CONFIRMED (emission) / UNVERIFIED (truth of "2014")** · effort S · dimension: schema

- *Evidence:* src/data/site.ts:30 — `established: 2014,` — the ONLY business fact in the file with NO source/TODO comment, while every neighbour is flagged as placeholder (line 21 `// TODO(contacto): substituir pelos contactos reais`, line 27 `// TODO(contacto): morada e horário reais`, line 31 `// TODO(social): substituir '#' pelos perfis reais`)
- *Evidence:* src/layouts/Base.astro:69 — `foundingDate: String(site.established),` — emits it into the RealEstateAgent node on every page
- *Evidence:* Live https://remaxcollectionvintage.pt/ homepage JSON-LD (curl, 2026-07-10): `"foundingDate": "2014"` confirmed in production
- *Evidence:* src/i18n/dict.ts:305 — visible copy claims "A RE/MAX Collection Vintage nasceu em 2014 no Porto"; dict.ts:133-135 and 1369 repeat "Desde 2014" / "Estamos presentes no Porto desde 2014"
- *Impact:* If 2014 is the real founding year of the physical RE/MAX Collection Vintage office, this is a legitimate and valuable trust signal. If it was invented during design, it is a fabricated fact inside structured data AND visible copy — exactly the kind of inconsistency that erodes trust with Google and AI answer engines once they cross-check the entity. Format itself is valid (year-only is valid ISO 8601 for schema.org Date).
- *Fix:* Owner must confirm the office founding year against a verifiable record (AMI licence issue date, company registration, RE/MAX Portugal franchise records). If confirmed, add a source comment at src/data/site.ts:30 and keep. If unconfirmable, remove foundingDate from Base.astro:69 and the ~6 "desde 2014" strings from copy/dict.
- *Files:* src/data/site.ts, src/layouts/Base.astro, src/i18n/dict.ts
- *Fix risk:* None — confirmation only; removal (if needed) has no technical risk
- *Consolidates duplicate findings:* `meta-desde-2014-claim-owner-confirm`, `local-established-2014-needs-owner-verification`
- *Independent verification:* Re-read site.ts:30 ('established: 2014,' with no TODO while lines 21/27/31 flag every neighbouring fact as placeholder), Base.astro:69 ('foundingDate: String(site.established)'), and dict.ts:133-135/305/1223/1369. Live curl of https://remaxcollectionvintage.pt/ confirms '"foundingDate":"2014"' in the RealEstateAgent node. All evidence holds. One nu

#### `schema-sameas-empty-no-entity-corroboration` — sameAs is empty (all 4 social hrefs are '#' placeholders) — a 2-day-old entity has zero corroborating profile links in its graph

**P2 · CONFIRMED** · effort S · dimension: schema

- *Evidence:* src/data/site.ts:32-37 — all four entries `{ label: 'Instagram', href: '#', ... }` etc., under `// TODO(social): substituir '#' pelos perfis reais antes do lançamento.`
- *Evidence:* src/layouts/Base.astro:54 — `const sameAs = site.social.map((s) => s.href).filter((h) => h && h !== '#');` and line 70 `...(sameAs.length ? { sameAs } : {})` — placeholders correctly filtered, key correctly omitted rather than emitted as junk
- *Evidence:* Live https://remaxcollectionvintage.pt/ JSON-LD (curl): agency node has NO sameAs key — filter verified working in production
- *Impact:* sameAs links to established profiles (RE/MAX Portugal agency page, Instagram, LinkedIn, Facebook, Google Business Profile) are one of the strongest entity-reconciliation signals available to a brand-new domain — for both Knowledge Graph and AI answer engines. The code path already works; only the data is missing. (The filtering itself is exemplary — emitting '#' would have been actively harmful.)
- *Fix:* Owner supplies real profile URLs (at minimum the official RE/MAX network page for this agency, which already exists per the team roster comment, plus Google Business Profile once created). Drop them into site.ts social[] — sameAs emission is automatic.
- *Files:* src/data/site.ts
- *Fix risk:* None
- *Independent verification:* Re-read site.ts:32-37 (all four social hrefs '#' under TODO(social)) and Base.astro:54 (filter drops '#') + line 70 (conditional spread omits key when empty). Live homepage JSON-LD has no sameAs key — filter verified working in production. Evidence exact; the filtering-is-exemplary positive is accurate. P2 appropriate for a 2-day-old entity needing

#### `schema-article-author-team-typed-as-person` — Article author "Equipa Collection Vintage" (the team) is typed as Person instead of Organization

**P3 · CONFIRMED** · effort S · dimension: schema

- *Evidence:* src/pages/insights/[slug].astro:23 — `author: { '@type': 'Person', name: a.author },`
- *Evidence:* src/data/insights.ts:27,59,83,106 — all 4 posts have `author: 'Equipa Collection Vintage'` ("Equipa" = team, i.e. an organizational author)
- *Evidence:* Built HTML dist/client/insights/mercado-premium-porto-2026/index.html — Article block emits `"author": {"@type": "Person", "name": "Equipa Collection Vintage"}`
- *Evidence:* Google article structured-data docs (developers.google.com/search/docs/appearance/structured-data/article): use Organization type when the author is an organization; the name DOES match the visible byline ([slug].astro:46 renders `{a.author}`), which is correct
- *Impact:* Won't break parsing or eligibility outright, but it mislabels an organization as a human — sloppy for entity extraction and it forfeits the chance to link authorship to the already-defined agency entity. Google explicitly asks for the correct author type.
- *Fix:* Change [slug].astro:23 to `author: { '@id': `${origin}#agency` }` (reusing the RealEstateAgent node, which is a valid Organization subtype) or `{ '@type': 'Organization', name: a.author }`. If real named authors arrive later (insights.ts:3 TODO says articles are placeholders), switch to Person per post at that point.
- *Files:* src/pages/insights/[slug].astro
- *Fix risk:* None
- *Consolidates duplicate findings:* `geo-article-author-org-as-person`
- *Independent verification:* Re-read [slug].astro:23 ('author: { '@type': 'Person', name: a.author }') and insights.ts:27/59/83/106 (all four posts 'Equipa Collection Vintage'). Verified in dist/client/insights/mercado-premium-porto-2026/index.html AND live curl: '"author":{"@type":"Person","name":"Equipa Collection Vintage"}'. Visible byline at [slug].astro:46 matches the sch

#### `schema-article-dates-predate-domain-no-datemodified` — Article datePublished values (Mar–May 2026) predate the domain's existence (registered 2026-07-08); no dateModified emitted

**P3 · CONFIRMED** · effort S · dimension: schema

- *Evidence:* src/data/insights.ts:25,57,81,104 — dates '2026-05-18', '2026-04-30', '2026-04-12', '2026-03-22'; line 3 — `// TODO(content): replace with real articles + author photos.`
- *Evidence:* grep dateModified over dist/client/insights/** — zero occurrences on all 4 posts
- *Evidence:* src/pages/sitemap.xml.ts:26 — `<lastmod>${a.date}</lastmod>` — sitemap lastmod reuses the same (pre-domain) dates, so signals are at least internally consistent
- *Evidence:* Established fact: domain registered 2026-07-08; today 2026-07-10 — Google's first crawl will postdate every claimed publish date by 2-4 months
- *Impact:* Backdated datePublished on a domain that did not exist reads as manipulated freshness signaling; Google cross-checks claimed dates against first-crawl dates. Missing dateModified is a lost (Google-recommended) freshness signal, though it is optional.
- *Fix:* When the placeholder articles are replaced with real ones (already TODO'd), set datePublished to the actual publish dates (post-launch) and add `dateModified: a.updated ?? a.date` to the Article schema and an `updated` field to the article type. Keep sitemap lastmod sourced from the same field so all three stay consistent.
- *Files:* src/data/insights.ts, src/pages/insights/[slug].astro
- *Fix risk:* None
- *Consolidates duplicate findings:* `geo-post-dates-predate-domain`
- *Independent verification:* Re-read insights.ts:25/57/81/104 — dates 2026-05-18/2026-04-30/2026-04-12/2026-03-22, all pre-dating the 2026-07-08 domain registration; line 3 TODO confirms articles are placeholders. grep dateModified over dist/client/insights/** returned 0 occurrences; live article JSON-LD also has no dateModified. sitemap.xml.ts:26 confirmed: lastmod = a.date (

#### `schema-faq-rich-result-expectations` — FAQPage markup is well-formed but will not produce Google rich results (2023 restriction to authoritative gov/health sites) — keep, expect nothing in SERPs

**P3 · CONFIRMED** · effort S · dimension: schema

- *Evidence:* src/pages/apoio.astro:25-32 — `const faqSchema = { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }` — built from the SAME `faqs` array the visible accordion renders (line 24 comment: "mirrors the accordion rendered below (same source)")
- *Evidence:* dist/client/apoio/index.html — FAQPage block parses valid with 9 Q&A pairs; answer text (e.g. "caderneta predial") appears twice in the HTML: once in JSON-LD, once in the visible accordion — satisfies Google's content-visibility requirement
- *Evidence:* Google Search Central (Aug 2023 update, developers.google.com/search/docs/appearance/structured-data/faqpage): FAQ rich results are only shown for well-known, authoritative government and health websites
- *Impact:* Zero SERP-feature upside for a real-estate agency, but the markup is harmless, correctly mirrors visible content, and gives AI answer engines cleanly parseable Q&A about documents, fees and process — genuinely useful for GEO. One caution: FAQ answers repeat the unverified "desde 2014" claim (dict.ts:1369), which is covered by the founding-date finding.
- *Fix:* Keep as-is; set stakeholder expectations that no FAQ rich result will appear. No code change needed.
- *Fix risk:* None — no change proposed
- *Independent verification:* Core finding holds: apoio.astro:25-32 builds FAQPage from the same faqs array the accordion renders; live /apoio/ FAQPage parses with Question/Answer pairs mirrored in visible HTML ('caderneta predial' appears 2x: JSON-LD + accordion); Google's Aug 2023 restriction of FAQ rich results to authoritative gov/health sites is accurately cited. TWO CORRE

#### `schema-webpage-id-and-minor-graph-hygiene` — Minor graph hygiene: WebPage node has no @id, Article.mainEntityOfPage is a bare URL string, insights index is generic WebPage, logo PNG is 456KB

**P3 · CONFIRMED** · effort S · dimension: schema

- *Evidence:* src/layouts/Base.astro:80-87 — WebPage node has url/name/description/inLanguage/isPartOf but no `@id` (agency and website nodes have @id at lines 60, 74)
- *Evidence:* src/pages/insights/[slug].astro:25 — `mainEntityOfPage: articleUrl` (string, not a `{'@id': …}` reference to the WebPage node)
- *Evidence:* dist/client/insights/index.html — listing page emits plain WebPage; Blog/CollectionPage would be more precise
- *Evidence:* public/assets/remax-vintage-horizontal.png — 463,651 bytes, 2587x386 PNG (file command); live URL returns 200 image/png — crawlable and exceeds Google's 112x112px minimum for Organization logo, so currently VALID; weight is just wasteful
- *Impact:* All cosmetic — nothing here affects parsing or eligibility. Adding a WebPage @id and pointing mainEntityOfPage at it tightens the graph for entity-graph consumers; a compressed logo (PNG can likely drop to <100KB at same dimensions) saves crawler and social-preview bandwidth.
- *Fix:* Optional cleanup: (1) add `'@id': canonical` to the WebPage node in Base.astro; (2) in [slug].astro set `mainEntityOfPage: { '@id': articleUrl }`; (3) pass a Blog or CollectionPage pageType from insights/index.astro; (4) recompress the logo PNG. Bundle with any other Base.astro change — not worth a deploy alone.
- *Files:* src/layouts/Base.astro, src/pages/insights/[slug].astro, src/pages/insights/index.astro, public/assets/remax-vintage-horizontal.png
- *Fix risk:* Very low — pure additions; verify with Rich Results Test after change
- *Independent verification:* All four pieces re-verified: (1) Base.astro:80-87 WebPage node has no @id while agency (line 60) and website (line 74) do — also confirmed in live homepage JSON-LD; (2) [slug].astro:25 mainEntityOfPage is a bare URL string — confirmed live; (3) dist/client/insights/index.html emits plain '"@type":"WebPage"' (full dist type inventory shows zero Blog

#### `schema-person-team-future-only` — No Person schema for the 30+ real team members — correct today (no individual profile pages exist); revisit only if agent pages are built

**P3 · CONFIRMED** · effort M · dimension: schema

- *Evidence:* src/data/team.ts:66-70 — `// REAL roster — names + roles verbatim from the official RE/MAX Collection` … `const REAL_TEAM: { name: string; role: string }[] = [ { name: 'Alexandrina Magalhães', role: 'Agente Associado' }, …` — roster is real, not invented
- *Evidence:* grep for `@type` Person across all dist/client/**/*.html — the ONLY Person node anywhere is the Article author; no team Person markup emitted
- *Evidence:* src/pages/ contains no per-agent route (routes: index, comprar, vender, alugar, sobre-nos, contacto, apoio, carreiras, privacidade, insights/*, mobile-preview, 404)
- *Impact:* Emitting Person nodes for people who have no crawlable profile page adds unanchorable entities with no benefit. Current restraint is correct. If dedicated broker profile pages are ever built (a genuine GEO asset for "agente imobiliário Foz do Douro"-type queries), each should get Person + jobTitle + memberOf {'@id': '#agency'}.
- *Fix:* No action now. Record as a conditional future task tied to building agent profile pages.
- *Fix risk:* None — no change proposed
- *Independent verification:* Re-read team.ts:66-70 — 'REAL roster — names + roles verbatim from the official RE/MAX Collection Vintage team page… 59 people' (finding said '30+', understated but not wrong). grep of dist/client/**/*.html: exactly 4 Person nodes, all Article authors — no team Person markup. src/pages/ listing confirms no per-agent route exists. Restraint assessme


## 10. GEO / AI-discovery findings

Architecture is near-ideal for answer engines: everything is server-rendered (live HTML byte-identical to `dist/client` on every page tested), robots.txt allows **all** user agents — so `OAI-SearchBot` (ChatGPT Search discovery), `PerplexityBot`, `bingbot` and Google are all admitted; there are real FAQ passages (8 self-contained Q&As on /apoio in both visible HTML and FAQPage schema), extraction-friendly method content on /vender/, and disciplined entity naming (255× "RE/MAX Collection Vintage", 0× "Remax"). The limiting factor is the same as §8/§11: **the facts an answer engine would quote are placeholders, and 7 of 8 zonas have no citable content.**

**Bot-policy separation (explicit recommendation, per mission):** search/answer discovery bots (`OAI-SearchBot`, `bingbot`, `PerplexityBot`, Googlebot) and **training** crawlers (`GPTBot`, `Google-Extended`, `CCBot`, `anthropic-ai`) are different policies. Today the wildcard `robots.txt` allows both **as a side effect**, not as a decision. Recommendation: keep all search/discovery bots allowed (they are the GEO channel); make the training-crawler stance an explicit owner decision and only then encode it. **Do not change training-crawler policy without G's approval** — current allow-all is a reasonable default for a business that wants AI visibility.

`llms.txt`: not present; **optional** — it is not a requirement of Google, AI Overviews, or any major engine, and carries no known ranking benefit. Listed only as a P3 option.


### GEO / AI discovery

#### `geo-insights-placeholder-thin-content` — All 4 insight articles are self-declared placeholder copy, 140-273 words each, with reading times overstating length 5-10x

**P1 · CONFIRMED** · effort L · dimension: geo

- *Evidence:* src/data/insights.ts:2-3 — '// Editorial / insights content — illustrative placeholder copy. // TODO(content): replace with real articles + author photos.'
- *Evidence:* Measured article body word counts in dist/client/insights/: mercado-premium-porto-2026 = 273 words (claims '6 min'), foz-do-douro-guia-da-zona = 181 words ('5 min'), vender-imovel-premium-sem-pressa = 172 words ('7 min'), viver-no-porto-arte-de-receber = 140 words ('4 min')
- *Evidence:* foz post total substantive content is 3 paragraphs + 1 heading (insights.ts:62-74)
- *Impact:* These are the pages meant to win AI citations for 'mercado premium Porto', 'guia Foz do Douro' and 'como vender imóvel premium', but at ~200 words they contain one or two citable sentences and no data, steps, or specifics — answer engines will prefer richer competitor pages (idealista, Athena Advisers, Porto agency blogs). The visible reading-time claims contradicting actual length is a small but detectable credibility defect.
- *Fix:* Rewrite the 4 posts as genuine 800-1500-word resources (the /vender method page proves the house can do structured factual content), or fix readingTime to match reality in the interim. Prioritise the Foz guide (already the only zone asset) and the seller guide. Add named authors when possible.
- *Files:* src/data/insights.ts
- *Fix risk:* None technical; requires real editorial input to avoid inventing market figures (respect the existing no-fake-data policy).
- *Consolidates duplicate findings:* `content-thin-insights-posts`, `routes-thin-main-content`
- *Independent verification:* insights.ts:2-3 placeholder comment verbatim. Independently re-measured <article> body word counts in dist/client/insights/: mercado=273 ('6 min', readingTime:6 at insights.ts:26), foz=181 ('5 min'), vender-sem-pressa=172 ('7 min'), viver-no-porto=140 ('4 min') — all four match the finding exactly. Two nitpicks: overstatement is ~4.4-8x at 200wpm, 

#### `geo-lexical-gap-category-terms` — The site never calls itself an 'agência imobiliária' / 'imobiliária de luxo' / 'mediação imobiliária' in body copy — no passage lexically matches the money queries

**P2 · CONFIRMED** · effort S · dimension: geo

- *Evidence:* grep across dist/client/**/*.html: 'agência imobiliária' = 0 occurrences, 'mediação imobiliária' = 0, 'imobiliária de luxo' = 0; the 29 'imobiliári*' tokens are in award names ('Nº 1 · Agências Imobiliárias'), 'mercado imobiliário' and support copy — never as a self-description
- *Evidence:* Best existing passage for 'imobiliária de luxo no Porto' is the /apoio FAQ: 'Somos especializados em imóveis de carácter no Porto — em oito zonas de eleição…' (dist/client/apoio/index.html) — rated 2.5/5 self-containedness: no category noun, no brand-in-sentence
- *Evidence:* Homepage h1 is purely evocative: 'A coleção mais rara do Porto.' (dist/client/index.html, single h1)
- *Impact:* Passage-retrieval systems (Perplexity, ChatGPT Search, AI Overviews) match query vocabulary. For the highest-intent query class — 'imobiliária de luxo no Porto', 'agência imobiliária Porto premium' — the site offers no sentence containing both the category term and the location, so it cannot be the quoted answer even when crawled. The RealEstateAgent JSON-LD mitigates for entity understanding but not for quotable passages.
- *Fix:* Add one plain-language definitional paragraph in crawlable text, e.g. in the homepage 'A casa' section and /sobre-nos intro: 'A RE/MAX Collection Vintage é uma agência de mediação imobiliária especializada no segmento de luxo no Porto (RE/MAX Collection®), dedicada a imóveis premium e vintage em oito zonas da cidade.' Keep the evocative copy; this is one added sentence per key page, not keyword stuffing.
- *Files:* src/data/site.ts, src/pages/sobre-nos.astro, src/i18n/dict.ts
- *Fix risk:* Minimal — must fit brand voice; one factual sentence, no invented claims.
- *Independent verification:* Re-grepped dist/client/**/*.html: 'agência imobiliária' = 0, 'mediação imobiliária' = 0, 'imobiliária de luxo' = 0 (case-insensitive). Count correction: total imobiliári* tokens = 39, not 29; inspected all contexts — every one is 'mercado imobiliário', 'outras imobiliárias', 'portal imobiliário' or careers copy, never a self-description of the agen

#### `geo-no-per-zone-pages` — 7 of 8 zonas have zero dedicated content — only 1-sentence card blurbs; the entire local-question space is unclaimed

**P2 · CONFIRMED** · effort L · dimension: geo

- *Evidence:* src/content/zonas.ts:44-199 — each of the 8 active zones has a single 'descricao' sentence + 3 tag labels (e.g. Boavista: 'Centralidade, conveniência e imóveis com forte potencial residencial e empresarial.'); slugs exist (slug: 'boavista' etc.) but no route consumes them
- *Evidence:* dist/client/ directory listing contains no /zonas/* routes — only the 14 known pages
- *Evidence:* Only Foz do Douro has an article (insights/foz-do-douro-guia-da-zona, 181 words); Boavista, Ribeira, Cedofeita, Nevogilde, Lordelo do Ouro & Massarelos, Bonfim, Baixa & Aliados have none
- *Impact:* The questions a Porto luxury agency should own in AI answers — 'onde comprar casa de luxo no Porto', 'viver na Foz do Douro', 'melhores zonas do Porto para investir', 'apartamentos com vista rio na Ribeira' — have no dedicated crawlable page. This is the single largest GEO content gap: zone expertise is the site's declared differentiator ('oito zonas de eleição') yet is expressed in 8 sentences total.
- *Fix:* Build /zonas/[slug]/ guide pages (the data scaffold in zonas.ts already provides slug/nome/kicker/descricao/tags/image) with 600+ words each of qualitative local knowledge (character, architecture typology, lifestyle, buyer profile — no invented price data), internally linked from the homepage zone cards and the Foz article. Sequence: Foz, Boavista, Baixa & Aliados first (highest query volume).
- *Files:* src/pages/zonas/[slug].astro (new), src/content/zonas.ts, src/pages/sitemap.xml.ts
- *Fix risk:* Requires real local-expertise copy from the team; thin generated pages would be worse than none.
- *Independent verification:* zonas.ts holds 11 zone entries (8 active + Antas/Matosinhos-Sul etc. marked 'opcional — Prepared but disabled'), each with exactly one 'descricao' sentence and slugs (e.g. slug:'boavista' line 79). src/pages/ contains no zonas route ([slug] exists only under insights/); ls dist/client/ shows no /zonas directory — only the 14 known routes. Only Foz 

#### `geo-content-gap-guides` — Valuation, buyer and seller guide topics advertised on /apoio have no destination pages — cards link to the generic /insights hub

**P2 · CONFIRMED** · effort M · dimension: geo

- *Evidence:* src/data/faqs.ts:128-136 — '// PLACEHOLDER(guias): conteúdo dos guias por escrever. CTA aponta para /insights (hub de conteúdo) até cada guia ter página própria.' — Guia do Comprador, Guia do Vendedor, Como funciona a Avaliação, Mercado Imobiliário no Porto all href:'/insights'
- *Evidence:* For 'quanto vale a minha casa no Porto' the best passages are the /vender simulator intro ('Em menos de um minuto, uma estimativa indicativa para o mercado do Porto.') and the /apoio FAQ on what the free valuation includes — process statements only; no page explains what determines a Porto property's value
- *Impact:* Four high-intent informational queries (valuation process, buying process, selling process, Porto market overview) are promised in the UI but unanswerable by a dedicated URL, so AI engines cannot cite the agency for them. The 'quanto vale a minha casa' query class — the site's primary lead generator — is served only by a widget teaser and one FAQ answer (rated 3/5 self-containedness).
- *Fix:* Publish the four guides as real pages/articles (the /vender content model — lists, tables, accordions from a verified source document — is the proven pattern). The valuation guide is highest priority: explain the confidential-strategic-analysis process, the factors considered (zone, state, light, comparables), timeline and that it is free and non-binding — all facts already asserted in the FAQ.
- *Files:* src/data/faqs.ts, src/data/insights.ts
- *Fix risk:* Low; content must come from the agency's actual process to stay honest.
- *Independent verification:* faqs.ts:128-130 PLACEHOLDER(guias) comment verbatim; all four guide cards (Guia do Comprador, Guia do Vendedor, Como funciona a Avaliação, Mercado Imobiliário no Porto) have href:'/insights' at faqs.ts:132-135. The /vender simulator teaser 'Em menos de um minuto, uma estimativa indicativa para o mercado do Porto.' confirmed present in dist/client/v

#### `geo-ai-training-policy-implicit` — AI-bot policy is implicit: the wildcard robots.txt allows training crawlers (GPTBot, Google-Extended, CCBot, anthropic) as a side effect — an owner decision, not a defect

**P3 · CONFIRMED** · effort S · dimension: geo

- *Evidence:* public/robots.txt (matches live): 'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /mobile-preview' — no UA-specific groups anywhere (grep for GPTBot/OAI-SearchBot/PerplexityBot/Google-Extended/CCBot/anthropic/bingbot in robots.txt, vercel.json, Base.astro: 0 matches)
- *Evidence:* Live curl with OAI-SearchBot and PerplexityBot user-agents → HTTP 200 (no edge-level UA blocking); established fact: no X-Robots-Tag on any response
- *Impact:* Current state is optimal for DISCOVERY: OAI-SearchBot (ChatGPT Search), PerplexityBot, bingbot (Copilot) and Googlebot (AI Overviews) can all crawl and cite the site. It also permits TRAINING crawlers — per OpenAI's own docs (platform.openai.com/docs/bots) OAI-SearchBot and GPTBot are separately controllable and serve different purposes, as do Googlebot vs Google-Extended. Allowing training is a legitimate choice (arguably beneficial for brand presence in future models) but it is currently un-made rather than made.
- *Fix:* No change recommended without owner approval. Present the owner the explicit choice: keep the wildcard (maximum reach, training allowed) or add narrow Disallow groups for training-only UAs (GPTBot, Google-Extended, CCBot) while keeping search UAs (OAI-SearchBot, PerplexityBot, bingbot) fully allowed. Blocking search UAs would directly harm GEO and should not be done.
- *Files:* public/robots.txt (only if owner opts in)
- *Fix risk:* Adding training-bot blocks reduces presence in future model knowledge; misconfigured UA groups could accidentally block search bots — test after any edit.
- *Independent verification:* public/robots.txt re-read: wildcard-only, exactly matches the established live version; grep for GPTBot/OAI-SearchBot/PerplexityBot/Google-Extended/CCBot/anthropic/bingbot/ClaudeBot across robots.txt, vercel.json and Base.astro = 0 matches (vercel.json contains only Cache-Control headers). Re-curled production with OAI-SearchBot and PerplexityBot U

#### `geo-bing-indexnow-optional` — Nothing blocks bingbot; IndexNow is not configured — optional fast-lane for Bing/Copilot on a 2-day-old domain

**P3 · CONFIRMED** · effort S · dimension: geo

- *Evidence:* robots.txt wildcard covers bingbot (no specific rules); established facts: valid sitemap.xml with 14 URLs and lastmod, no X-Robots-Tag, canonical host consistent — nothing Bing-hostile found in any audited response
- *Evidence:* No IndexNow key file exists: dist/client/ contains no *.txt key at root (directory listing shows only robots.txt, sitemap.xml, favicon.svg, 404.html + page dirs)
- *Impact:* Bing powers Copilot and (partly) ChatGPT Search browsing; a brand-new domain benefits disproportionately from push-based discovery instead of waiting for organic crawl. IndexNow is free, supported by Bing, and trivial on a static Vercel site.
- *Fix:* Optional: register in Bing Webmaster Tools (import from GSC), verify, submit the sitemap (owner action, UNVERIFIED here), and add IndexNow — a static key file in public/ plus a one-shot POST of the 14 URLs on deploy. Not required for indexation; sitemap + BWT submission alone is sufficient.
- *Files:* public/<indexnow-key>.txt (new), optional deploy hook
- *Fix risk:* None; IndexNow is fire-and-forget.
- *Independent verification:* ls dist/client/*.txt shows only robots.txt — no IndexNow key file; public/ likewise has none. Nothing bingbot-specific or hostile in robots.txt/headers (re-verified; established facts cover sitemap validity and absent X-Robots-Tag). The BWT-registration part is properly framed as owner action. P3 correct — genuinely optional.

#### `geo-vender-faq-no-schema` — /vender's substantial FAQ and documents content carries no FAQPage markup (only /apoio has it)

**P3 · CONFIRMED** · effort S · dimension: geo

- *Evidence:* dist/client/vender/index.html JSON-LD types: only RealEstateAgent, WebPage, WebSite, PostalAddress (grep '"@type"' — no FAQPage/Question)
- *Evidence:* The page contains real Q&A in HTML: 'Quem é o responsável pela venda do meu imóvel?' etc. (faqAngariacao, src/content/metodo-vender.ts:219-258) and a documents accordion ('caderneta predial', 'Certificado energético' present in static HTML)
- *Impact:* Minor: Google now restricts FAQ rich results to authoritative government/health sites, so no SERP feature is lost; but FAQPage/Question markup still helps non-Google engines and entity extractors segment the Q&A pairs. The content itself is already crawlable, which is what matters most.
- *Fix:* Optional: emit a FAQPage node on /vender from faqAngariacao (same pattern as /apoio, src/pages/apoio.astro). Only mark up Q&A that is visible on the page (it is).
- *Files:* src/pages/vender.astro
- *Fix risk:* None if markup mirrors visible content exactly.
- *Independent verification:* JSON-LD @type values in dist/client/vender/index.html: PostalAddress, RealEstateAgent, WebPage, WebSite only — no FAQPage/Question. /apoio does emit FAQPage (verified). 'Quem é o responsável pela venda do meu imóvel?' present in vender HTML (faqAngariacao at metodo-vender.ts:219, consumed at vender.astro:282); 'caderneta predial' and 'certificado e

#### `geo-llms-txt-absent-optional` — No llms.txt — strictly optional, not a requirement of any major engine

**P3 · CONFIRMED** · effort S · dimension: geo

- *Evidence:* curl https://remaxcollectionvintage.pt/llms.txt → HTTP 404
- *Evidence:* Neither Google (developers.google.com/search docs) nor OpenAI/Bing require or commit to consuming llms.txt; it is a community proposal
- *Impact:* None measurable today. Listed only for completeness; its absence costs nothing with ChatGPT Search, Perplexity, Copilot or AI Overviews, all of which rely on standard crawling + robots.txt.
- *Fix:* OPTIONAL and low priority: if ever added, a short llms.txt indexing the 14 canonical URLs is harmless, but it is NOT a ranking or citation mechanism and must not displace real content work.
- *Files:* public/llms.txt (optional, new)
- *Fix risk:* None.
- *Independent verification:* Re-curled https://remaxcollectionvintage.pt/llms.txt → HTTP 404; no llms.txt in public/ or dist/client/. The characterization (community proposal, not consumed/required by Google, OpenAI or Bing per their official crawler docs) is accurate, and the finding correctly refuses to oversell it. P3/informational correct.


## 11. Content-quality findings

A tale of two content systems (42/100). The method pages are genuinely good: `/comprar/` (1,180 main-words) and `/vender/` (1,158) are substantive, unique, sourced from official RE/MAX printed guides, in excellent European Portuguese — better than anything on remax.pt or the portals. The governance instincts are also right: unverified numbers are flagged `confirmar: true` in code, zone prices are always "Sob consulta", stats are qualitative by design. But the site shipped with its scaffolding visible: fabricated testimonials, AI faces, `[INSERIR NÚMERO REAL]` tokens, an admittedly-unfinished privacy policy, self-declared placeholder articles, and 17+ unconfirmed claims — all live and crawlable.


### Content quality

#### `content-fabricated-testimonials-live` — Twelve invented client testimonials and two fictitious employee testimonials are live in production

**P1 · CONFIRMED** · effort S · dimension: content

- *Evidence:* src/data/site.ts:210-212 — 'NOTE(testimonials): placeholder — 12 testemunhos ilustrativos. Substituir por testemunhos reais com autorização do cliente'
- *Evidence:* src/data/site.ts:103-105 — fabricated quote 'Venderam a nossa casa da Foz acima do que esperávamos…' attributed to 'Helena & Rui M.'
- *Evidence:* curl https://remaxcollectionvintage.pt/ returns 'Venderam a nossa casa da Foz acima do que esperávamos' and 'Helena &amp; Rui M.' (live, homepage); same block also on /sobre-nos/ (dist/client/sobre-nos/index.html contains 'Helena & Rui M.')
- *Evidence:* src/data/carreiras.ts:183 — '[PLACEHOLDER — substituir antes de publicar] testemunhos da equipa fictícios'; :194 'Carla Soares', :201 'Tiago Ferreira'
- *Impact:* Fabricated social proof presented as 'Histórias reais' is deceptive content: it violates Google's spam/E-E-A-T expectations for review content, exposes the business to Portuguese consumer-protection risk, and if any reviewer/competitor/AI engine flags it, brand trust for a 2-day-old domain is destroyed at birth. It also poisons any future Review/Testimonial structured data.
- *Fix:* Remove or hide the testimonial carousels on /, /sobre-nos/ and /carreiras/ until real, client-authorised testimonials exist (the code already anticipates the swap). At minimum change the section heading so invented copy is not labelled 'Histórias reais'.
- *Files:* src/data/site.ts, src/data/carreiras.ts, src/components/Testimonials.astro, src/pages/index.astro, src/pages/sobre-nos.astro, src/pages/carreiras.astro
- *Fix risk:* Low — sections are self-contained components; removing them loses some page length on / and /sobre-nos/ but both remain >1,000 words.
- *Consolidates duplicate findings:* `local-fabricated-testimonials-live`, `geo-fabricated-testimonials-ai-faces`
- *Independent verification:* Re-read site.ts:100-212 (12 invented testimonials + note 'placeholder — 12 testemunhos ilustrativos') and carreiras.ts:183-249. Re-curled production: homepage returns 'Venderam a nossa casa da Foz', 'Helena &amp; Rui M.' and the H2 'Histórias reais. Confiança que se vê.' (verified closing </h2> in dist/client/index.html); /carreiras/ live returns '

#### `content-ai-portraits-real-names` — AI-generated portraits are published next to real staff names on /sobre-nos/

**P1 · CONFIRMED** · effort S · dimension: content

- *Evidence:* src/data/team.ts:8-11 — '⚠️ MOST PHOTOS ARE STILL PLACEHOLDERS — NOT FOR PRODUCTION. … reuses an AI-generated portrait … these are NOT the real person and are misleading next to a real name.'
- *Evidence:* src/data/team.ts:4-5 — 'NAMES & ROLES: REAL — taken verbatim from the official RE/MAX Collection Vintage roster'
- *Evidence:* dist/client/sobre-nos/index.html references images/team/team-51.jpg, team-50.jpg, team-48.jpg… and curl https://remaxcollectionvintage.pt/sobre-nos/ returns 'team-51.jpg' (live)
- *Impact:* Real, named consultants are shown with faces that are not theirs. This is a personality-rights and trust liability, undermines the page's E-E-A-T value (the team section is the site's main 'experience' signal), and any person on the roster can legitimately demand takedown.
- *Fix:* Flip every consultant without a real headshot to image: null so the existing dignified gold-monogram fallback renders (the mechanism already exists — team.ts:157-162). Re-add faces only as real headshots arrive via REAL_PHOTOS.
- *Files:* src/data/team.ts
- *Fix risk:* Very low — the monogram fallback is already designed and used for 3 people.
- *Independent verification:* Re-read team.ts: lines 4-5 ('NAMES & ROLES: REAL — taken verbatim from the official RE/MAX Collection Vintage roster') and 8-16 ('MOST PHOTOS ARE STILL PLACEHOLDERS — NOT FOR PRODUCTION … AI-generated portrait … NOT the real person'). dist/client/sobre-nos/index.html references team-51.jpg/team-50.jpg/team-48.jpg (2× each) and live /sobre-nos/ retu

#### `content-visible-placeholder-tokens` — Literal '[INSERIR NÚMERO REAL]' renders four times on the live /carreiras/ page

**P1 · CONFIRMED** · effort S · dimension: content

- *Evidence:* src/data/carreiras.ts:279-282 — four metrics with value: '[INSERIR NÚMERO REAL]' ('Consultores especialistas', 'Volume de negócio anual', 'Imóveis exclusivos em carteira', 'Satisfação de clientes')
- *Evidence:* dist/client/carreiras/index.html — '<span class="cmetrics__value cmetrics__value--ph" …>[INSERIR NÚMERO REAL]</span>' appears 4 times
- *Evidence:* curl https://remaxcollectionvintage.pt/carreiras/ — the string is present in the live response
- *Impact:* Raw editorial placeholders visible to every visitor and crawler scream 'unfinished site'; for quality raters and AI answer engines this is a strong low-quality signal on an otherwise substantial (1,169-word) page.
- *Fix:* Hide the metric strip until real KPIs are confirmed (render conditionally when value is numeric), or replace with the qualitative-values strip already used at carreiras.ts:70-73.
- *Files:* src/data/carreiras.ts, src/components (careers metrics component), src/pages/carreiras.astro
- *Fix risk:* None — purely removing broken placeholders.
- *Independent verification:* carreiras.ts:279-282 defines the four '[INSERIR NÚMERO REAL]' metrics exactly as cited. grep -o counts 4 occurrences of the literal token (and 4× cmetrics__value--ph) in dist/client/carreiras/index.html, and the live /carreiras/ response contains the string 4 times. The qualitative alternative strip exists at carreiras.ts:69-74 as claimed. P1 stand

#### `content-unconfirmed-claims-live` — At least 17 explicitly-flagged unconfirmed factual claims are live, plus the awards belt and 'desde 2014' pending owner sign-off

**P1 · CONFIRMED** · effort M · dimension: content

- *Evidence:* Live claims flagged confirmar:true in source and confirmed rendering in dist/live HTML: (1-4) homepage network band — '10.000 consultores', '+400 agências a angariar', 'N.º 1 portal mais visitado do sector', '+60% das transações começam online' (src/content/rede.ts:11-14; src/pages/index.astro:270 comment 'CONFIRMAR COM AGÊNCIA: todos os números desta faixa'; all four strings present in dist/client/index.html)
- *Evidence:* (5-10) /vender/ — 'portal imobiliário com mais audiência em Portugal' (metodo-vender.ts:46-47), '1000 flyers de divulgação por mês' (:58), 'Inserção no site RE/MAX' maior-plataforma formulation (:72), '10.000 consultores' (:90), 'o maior «armazém» de angariações do mercado' (:92-93), 'MaxFinance a apoiar os compradores' (:162-163) — dist/client/vender/index.html carries 6 'CONFIRMAR COM AGÊNCIA' comments
- *Evidence:* (11) /comprar/ — 'O maior «armazém de imóveis» do mercado / Mais de 400 agências' (metodo-comprar.ts:203-205, comment 'number needs agency confirmation')
- *Evidence:* (12-15) four zone demand labels 'Elevada/Crescente' with confirmarProcura:true (zonas.ts:133,152,171,190) render on / and /sobre-nos/ — dist/client/index.html has 4× 'CONFIRMAR COM AGÊNCIA: rótulo de procura desta zona'
- *Impact:* The site's own governance system says these numbers are unverified, yet they are public. If any figure is wrong (flyer volume, consultant count, 'most visited portal'), the agency is publishing false advertising under the RE/MAX brand — and superlatives ('maior', 'mais premiada', 'Nº 1') are exactly what AI answer engines extract and repeat.
- *Fix:* Run the sign-off list with the owner NOW (the CONFIRMAR markers make it a 30-minute checklist). Remove or soften any claim that cannot be confirmed in writing; reconcile '4h úteis'/'7 dias' with the footer hours; obtain RE/MAX Portugal's current award sheet before keeping the belt.
- *Files:* src/content/rede.ts, src/content/metodo-vender.ts, src/content/metodo-comprar.ts, src/content/zonas.ts, src/data/faqs.ts, src/data/awards.ts, src/data/site.ts
- *Fix risk:* Softening superlatives slightly weakens copy punch; that is preferable to unverifiable claims.
- *Independent verification:* Re-derived all 17: rede.ts:11-14 (four confirmar:true items; all four values live on homepage — '10.000', '+400', 'N.º 1', '+60%' each 1× in the fetched live HTML, plus index.astro:270 comment); metodo-vender.ts:46-47,58,72,90,92-93,162-163 (six confirmar:true; dist/vender carries 7 — not 6 — 'CONFIRMAR COM AGÊNCIA' comments, one more than claimed)

#### `content-thin-alugar` — /alugar/ is a 82-word doorway whose primary CTA sends users to a BUY search on remax.pt

**P2 · CONFIRMED** · effort M · dimension: content

- *Evidence:* Word counts inside <main> (dist/client): /alugar/ = 82 words vs /comprar/ = 1,180 and /vender/ = 1,158 — 14× thinner than its sibling service pages
- *Evidence:* dist/client/alugar/index.html — 'Ver imóveis para arrendar' links to https://www.remax.pt/pt/comprar/imoveis/… (the agency's buy-listings URL, EXTERNAL_LISTINGS_URL in src/lib/site.config.ts:6)
- *Evidence:* /alugar/ has NO H1 — its visible title is an <h2> (src/pages/alugar.astro:19 '<h2 class="h2 alg__title"'); H1 scan of dist shows H1x0
- *Evidence:* Entire body: hero blurb + 3 generic benefit cards + one CTA card; the sitewide ValueSimulator/footer chrome (~430 words) outweighs unique content 5:1
- *Impact:* The page is in the nav and sitemap but cannot rank for or satisfy any rental query ('arrendar casa Porto', 'arrendamento premium Porto'): no rental process, no owner-side management info, no listings, and a buy-intent outbound CTA that betrays the page promise.
- *Fix:* Either build it out (rental method for tenants + arrendamento service for owners, mirroring the /vender/ structure, with an H1) with an actually rental-filtered listings URL, or remove it from nav/sitemap until content exists.
- *Files:* src/pages/alugar.astro, src/lib/site.config.ts, src/data/site.ts
- *Fix risk:* Low; if rental is a real service line, removal loses a funnel entry — prefer the build-out.
- *Independent verification:* Re-counted <main>: /alugar/ = 82 words vs /comprar/ 1,180 and /vender/ 1,158 (exact match). H1 extraction: zero H1 on /alugar/ (visible title is <h2> at alugar.astro:19). EXTERNAL_LISTINGS_URL (site.config.ts:6-7) is a remax.pt/pt/COMPRAR search filtered to office 12382; live /alugar/ contains 5 links to remax.pt/pt/comprar including the 'Ver imóve

#### `content-hours-contradiction` — Service-availability claims contradict each other across pages

**P2 · CONFIRMED** · effort S · dimension: content

- *Evidence:* Footer on all 14 pages: 'Segunda a Sexta 09:00 – 18:00' (src/data/site.ts:29)
- *Evidence:* /apoio/ live: '7 dias/semana Disponibilidade' + 'Até 4h úteis Tempo médio de resposta' (faqs.ts:113-118; rendered in dist/client/apoio/index.html)
- *Evidence:* Sitewide valuation promise: 'Um consultor analisa o seu imóvel e contacta-o em 24h' appears on every page (duplication scan, 14/14 pages)
- *Evidence:* src/data/faqs.ts:108-110 — the code itself flags the divergence: 'este último diverge do horário em site.ts (Seg.–Sex.); confirmar disponibilidade real'
- *Impact:* Three different availability promises (Mon-Fri 9-18 vs 7 days/week vs 4h/24h response) on one small site confuse users and give AI engines contradictory facts to extract about the business.
- *Fix:* Owner picks one true set of hours + one response SLA; propagate from a single source (site.ts) to faqs.ts and the valuation copy.
- *Files:* src/data/site.ts, src/data/faqs.ts
- *Fix risk:* None.
- *Consolidates duplicate findings:* `local-hours-claims-inconsistent`, `geo-conflicting-availability-claims`
- *Independent verification:* site.ts:29 hours ['Segunda a Sexta','09:00 – 18:00'] render in the live homepage footer; live /apoio/ returns 'Até 4h úteis' and '7 dias/semana' (faqs.ts:114-115); 'contacta-o em 24h' present 1× on all 14 dist pages (counted per page). faqs.ts:108-110 self-flags the divergence exactly as quoted. P2 stands.

#### `content-valuation-intent-split` — Seller/valuation intent is split across the homepage anchor, a sitewide simulator, and /vender/ — with no dedicated valuation URL

**P2 · CONFIRMED** · effort M · dimension: content

- *Evidence:* Primary nav CTA 'Pedir avaliação' points to '/#vender' (src/data/site.ts:61) — a homepage anchor, not the /vender/ page
- *Evidence:* Homepage carries the seller funnel twice: H2 'Quanto vale, hoje, o seu imóvel?' appears 2× plus H2 'Comece pelo estudo de mercado — gratuito.' which is duplicated verbatim as an H2 on /vender/ (H1/H2 outline extraction from dist)
- *Evidence:* The full 6-step ValueSimulator markup (~200+ words: 'Passo 1 de 6 Que tipo de imóvel tem?' … 'Estimativa indicativa — não substitui uma avaliação profissional.') is embedded in all 14 pages including insights posts and /privacidade/ (duplication scan: 14/14)
- *Evidence:* 'Pedir avalia*' occurs 4-7× per page (4 = sitewide chrome baseline; 7 on /) — consistent with CLAUDE.md:84's intentional 10-CTA homepage map, so CTA count itself is by design
- *Impact:* For the money query cluster ('avaliação imóvel Porto', 'quanto vale a minha casa Porto') no single URL owns the intent: the homepage does the converting, /vender/ does the explaining, and the simulator is everywhere but addressable nowhere. On thin pages the simulator+footer chrome also makes 60-84% of the page duplicated boilerplate.
- *Fix:* Create a dedicated /avaliacao/ landing (spec in content-new-pages-spec), point the nav CTA there, and keep the homepage/vender blocks as feeders. Consider not embedding the full simulator markup on insights/legal pages (open on demand instead).
- *Files:* src/data/site.ts, src/layouts/Base.astro, src/components/ValueSimulator.astro, src/pages (new avaliacao page)
- *Fix risk:* Changing the primary CTA target needs conversion testing; anchor-based flow currently works.
- *Independent verification:* site.ts:61 primaryCta href='/#vender' verified. 'Quanto vale, hoje, o seu imóvel' occurs 2× on dist homepage; 'Comece pelo estudo de mercado' present on both / and /vender/. Simulator step-1 question 'Que tipo de imóvel tem?' present on all 14/14 dist pages (incl. /privacidade/ and every insights post), 'Estimativa indicativa' 2× per page. 'Pedir a

#### `content-titles-editorial-no-query-targeting` — Titles/H1s are editorial and brand-led; no page targets a commercial query, and /comprar/ has a title-H1 mismatch

**P2 · CONFIRMED** · effort S · dimension: content

- *Evidence:* Title/H1 matrix (dist/client): / 'RE/MAX Collection Vintage — A coleção mais rara do Porto.' / H1 'A coleção mais rara do Porto.' (aligned, brand-only); /comprar/ 'O método de compra · Collection Vintage' / H1 'Porquê procurar a sua casa connosco.' (MISMATCH — method vs why-us, neither says comprar casa Porto); /vender/ 'Vender · Collection Vintage' / H1 'O método para vender rápido e pelo melhor valor.' (aligned); /alugar/ 'Arrendar · Collection Vintage' / NO H1; /sobre-nos/ 'Sobre nós' / H1 'Imóveis distintos merecem uma apresentação distinta.' (soft mismatch); /apoio/, /contacto/, /carreiras/, /privacidade/ and all 4 posts aligned (post title == H1)
- *Evidence:* /insights/ is titled 'Insights · Collection Vintage' with H1 'Leitura do mercado premium' while the nav labels the section 'Blog' (site.ts:57) — three different names for one section
- *Evidence:* Messaging contradiction: /vender/ H1 sells 'vender rápido' while the flagship guide post is titled 'Como vender um imóvel premium sem pressa' (insights.ts:78)
- *Impact:* Zero pages carry the queries a Porto luxury agency lives on ('imobiliária de luxo Porto', 'vender casa Porto', 'avaliação imóvel Porto') in title or H1, so even after indexation the site only competes for its own brand name. The rápido/sem-pressa contradiction weakens the positioning story AI engines would summarise.
- *Fix:* Keep the editorial voice but add intent-bearing modifiers: e.g. /vender/ → 'Vender casa no Porto — o método Collection Vintage'; /comprar/ title and H1 should agree and mention comprar casa no Porto; unify Blog/Insights naming; align the rápido vs sem-pressa framing (the guide's 'bem, não depressa' angle is the more distinctive one).
- *Files:* src/pages/comprar.astro, src/pages/vender.astro, src/pages/insights/index.astro, src/data/site.ts
- *Fix risk:* Low — title edits only; avoid stuffing (one query concept per page).
- *Consolidates duplicate findings:* `local-theme-coverage-gaps-titles-lack-porto`
- *Independent verification:* Independently extracted the full title/H1 matrix from dist — matches the finding verbatim: /comprar/ title 'O método de compra · Collection Vintage' vs H1 'Porquê procurar a sua casa connosco.' (mismatch); /alugar/ H1×0; / brand-only; /vender/ H1 'O método para vender rápido e pelo melhor valor.' vs insights.ts:78 'sem pressa (e por mais)' contradi

#### `content-new-pages-spec` — Proposed new pages (specs only): 3 zone guides, a valuation landing, and a selling-costs guide

**P2 · RECOMMENDATION (premises CONFIRMED)** · effort L · dimension: content

- *Evidence:* Zone data foundation already exists and is owner-approved (zonas.ts:44-199, 8 active zones with local specifics: Serralves, Parque da Cidade, pés-direitos of Aliados); one seed article exists (foz-do-douro-guia-da-zona, 181 words)
- *Evidence:* Valuation demand surface exists sitewide but has no URL (see content-valuation-intent-split); /apoio/ FAQ already answers 'Como funciona a comissão de mediação?' and 'Quais os documentos necessários para vender' — proving the question set
- *Evidence:* The /apoio/ 'Guias úteis' section (faqs.ts:128) already promises guides that don't exist
- *Impact:* These pages convert the site's only defensible niches (local expertise + method) into rankable, citable URLs. Specs (do NOT generate content without owner facts): [1] /zonas/foz-do-douro/ (then boavista, nevogilde) — intent: research-to-transact buyers/sellers in the zone; primary query theme: 'imóveis foz do douro', 'viver na foz do douro', 'vender casa foz do douro'; unique value: micro-location knowledge (first-line scarcity, off-market dynamics already sketched in insights.ts:71), street-level character, who buys there; evidence required: owner-confirmed demand labels (currently confirmarProcura:true), any citable price context from SIR/CI with sourcing, real photos (foz promenade asset exists); internal links: from homepage zone cards, /sobre-nos/ deck, the Foz insights post, /comprar/; conversion: zone-specific 'Pedir avaliação' + contact. [2] /avaliacao/ — intent: seller ready for valuation; query theme: 'avaliação imóvel Porto', 'quanto vale a minha casa'; unique value: the existing simulator + what the 24h human study includes + honest methodology/disclaimer; evidence: valuation-config factors, confirmed SLA; internal links: nav primary CTA, every 'Pedir avaliação' button, /vender/; conversion: api/lead form. [3] /guias/custos-e-impostos-de-vender-casa/ — intent: informational pre-seller; query theme: 'impostos venda casa Portugal', 'mais-valias imóveis', 'comissão imobiliária'; unique value: pt-PT plain-language walkthrough tied to the agency's document checklist (already on /vender/); evidence REQUIRED: tax figures verified against Portal das Finanças + legal review — high accuracy bar; internal links: /vender/, /apoio/ FAQ, valuation landing; conversion: estudo de mercado gratuito CTA. Each page needs >800 words unique, one named accountable author, and owner sign-off on every number.
- *Fix:* Build in the order above (zone guide 1 proves the pattern); wire the /apoio/ 'Guias úteis' cards to the real guide URLs once live; add each to sitemap with real lastmod.
- *Files:* src/pages/zonas/ (new), src/pages/avaliacao.astro (new), src/pages/guias/ (new), src/data/faqs.ts, src/pages/sitemap.xml.ts
- *Fix risk:* Tax/legal guide carries accuracy risk — must be reviewed; zone demand labels must be confirmed before amplifying them on dedicated pages.
- *Independent verification:* This is a proposal, so LIKELY is the correct ceiling. Its evidentiary foundations all verified: zonas.ts:44-199 (8 active zones with local specifics — Serralves, Parque da Cidade, pés-direitos), the 181-word Foz seed post, faqs.ts:128 guides placeholder, no /avaliacao/ URL anywhere in dist/sitemap while 'Pedir avalia' CTAs appear 4-7× per page. Spe

#### `content-cross-page-duplication` — The full 8-zone card deck and testimonial carousel are duplicated verbatim between / and /sobre-nos/

**P3 · CONFIRMED** · effort M · dimension: content

- *Evidence:* Duplication scan of dist: all 8 zone descriptions (e.g. 'Centralidade, conveniência e imóveis com forte potencial residencial e empresarial.', 'Fachadas imponentes, pés-direitos generosos…') appear on both / and /sobre-nos/
- *Evidence:* Testimonial quotes ('Discrição e resultado — foi exatamente o que procurávamos.', 'O acompanhamento foi impecável, do primeiro contacto à escritura.') duplicated on / and /sobre-nos/
- *Evidence:* /comprar/ repeats homepage section verbatim: 'Não trabalha com um consultor isolado — tem do seu lado uma equipa completa e toda a rede.' + identical H2 'Uma estrutura inteira a trabalhar para si.'
- *Impact:* ~300+ words of /sobre-nos/'s 1,131 are recycled homepage blocks, reducing the page's unique value and blurring which page should rank for zone-related queries. Not a penalty risk at this scale, but wasted content surface.
- *Fix:* On /sobre-nos/ replace the duplicated zone deck with a condensed zone summary linking to future zone pages; give /sobre-nos/ unique history/team narrative depth instead (the 'nasceu em 2014' story is 2 sentences — expand it with real milestones once owner-confirmed).
- *Files:* src/pages/sobre-nos.astro, src/pages/index.astro
- *Fix risk:* None.
- *Independent verification:* Programmatically checked all 8 zone descriptions from zonas.ts: every one appears verbatim in BOTH dist/client/index.html and dist/client/sobre-nos/index.html (8/8 true/true). Testimonial quotes ('Discrição e resultado…', 'O acompanhamento foi impecável…') duplicated on both. /comprar/ repeats homepage: 'Não trabalha com um consultor isolado' and H

#### `content-generic-copy-passages` — Several passages are agency-agnostic boilerplate that no engine could ever cite

**P3 · CONFIRMED** · effort M · dimension: content

- *Evidence:* /alugar/ (dist): 'Arrendamento de imóveis distintos, selecionados com rigor para quem valoriza localização, conforto e qualidade. Encontre o espaço ideal para o seu próximo capítulo.' + 'Consultores experientes, ao seu lado em cada etapa.' — could sit on any agency site in Portugal
- *Evidence:* /carreiras/ (carreiras.ts:59-60): 'Acreditamos que pessoas extraordinárias constroem resultados extraordinários.' and hero lede 'o teu talento encontra propósito, formação de elite e oportunidades sem teto' (:42)
- *Evidence:* insights viver-no-porto (insights.ts:111): the entire 140-word post is mood copy ('Há uma forma de habitar o Porto que vai além dos metros quadrados…') with zero verifiable or local-specific information
- *Evidence:* Contrast (the good side): /comprar/ and /vender/ contain non-generic, citable substance — the Mandato vs Contrato Exclusivo comparison, 12-step purchase timeline incl. 'Reserva do imóvel (válida por 15 dias)', document checklists — sourced from official printed guides
- *Impact:* Generic passages are invisible to search and useless to AI engines; they occupy the exact pages that are already thinnest (/alugar/, careers hero, lifestyle post).
- *Fix:* When rewriting the thin pages, anchor every section in something only this agency can say: zones, the curation limit ('poucos imóveis de cada vez'), the exclusivity method, named local landmarks (Serralves, Parque da Cidade already appear in zonas.ts — reuse that specificity).
- *Files:* src/pages/alugar.astro, src/data/carreiras.ts, src/data/insights.ts
- *Fix risk:* None.
- *Independent verification:* Quoted passages verified at source: alugar.astro:23-24 and :39; carreiras.ts:42 and :59-60; insights.ts:111 (single-paragraph 140-word lifestyle post). The 'good side' contrast also verified: Mandato de Comprador/Contrato Exclusivo explainer at metodo-comprar.ts:22,54-92, 'Reserva do imóvel … válida por 15 dias' renders in dist/comprar, exclusivity

#### `content-register-mixing-carreiras` — PT-PT quality is otherwise excellent, but /carreiras/ mixes 'tu' and formal address on the same page

**P3 · CONFIRMED** · effort S · dimension: content

- *Evidence:* dist/client/carreiras/index.html — tu-form: 'Constrói connosco', 'Junta-te', 'a tua carreira', 'destaca-te' vs formal: 'Envie a sua candidatura', 'Faça parte', 'encontrará um ambiente' (same page)
- *Evidence:* PT-BR scan of all rendered HTML: zero hits for contato/registro/planejamento/você/equipe/aluguel/celular and no Brazilian gerund constructions — the rest of the site is consistently formal pt-PT ('estamos a…' forms, 'connosco', 'carácter', 'curadoria')
- *Evidence:* src/data/site.ts:89 dead-data note: methodSteps contains the non-word 'Curação' but it does NOT render anywhere (0 occurrences in dist and live homepage) — no action needed beyond cleanup
- *Impact:* Register inconsistency reads as unedited copy on the recruitment page — the one page addressed to industry insiders who will notice.
- *Fix:* Pick one register for /carreiras/ (informal 'tu' is defensible for recruitment; the rest of the site's formal register is correct for clients) and normalise the page.
- *Files:* src/data/carreiras.ts
- *Fix risk:* None.
- *Independent verification:* dist/client/carreiras/index.html contains tu-forms ('Constrói connosco', 'Junta-te', 'a tua carreira', 'destaca-te') AND formal forms ('Envie a sua candidatura', 'Faça parte' ×2, 'encontrará um ambiente') — register mixing confirmed. PT-BR scan of dist rendered pages: zero hits for contato/registro/planejamento/você/equipe/aluguel/celular. CORRECTI

#### `content-page-purpose-verdicts` — Page-purpose audit: two pages currently lack a defensible search purpose in their present state

**P3 · CONFIRMED** · effort M · dimension: content

- *Evidence:* Purpose verdicts (main-content word counts from dist): / (1,811w) brand+conversion hub — CLEAR; /comprar/ (1,180w) buyer-method — CLEAR & unique; /vender/ (1,158w) seller-method — CLEAR & unique; /sobre-nos/ (1,131w) about/E-E-A-T — CLEAR but ~30% recycled; /apoio/ (619w) support/FAQ hub with 13 genuine distinct questions ('Como funciona a comissão de mediação?', 'Quais os documentos necessários para vender…') — CLEAR, good AEO surface; /contacto/ (129w) functional — ACCEPTABLE; /insights/ (187w) hub — ACCEPTABLE; /carreiras/ (1,169w) recruitment — LEGITIMATE purpose but placeholder vacancies (carreiras.ts:129 'lista de vagas ilustrativa'), fake voices and INSERIR tokens currently negate it; /alugar/ (82w) — NO defensible purpose as-is; /privacidade/ (78w) — required page but substantively empty; /mobile-preview/ correctly noindexed+disallowed; 404 correct
- *Evidence:* faqs.ts:128 — 'PLACEHOLDER(guias): conteúdo dos guias por escrever' — the /apoio/ 'Guias úteis' section advertises guides that do not exist (CTA falls back to /insights)
- *Impact:* Two nav-linked, sitemap-listed pages (alugar, privacidade) and one advertised content set (guias) under-deliver on their promise, diluting an otherwise purposeful 14-URL architecture.
- *Fix:* Fix per the dedicated findings above; for /apoio/ guides, either write the 4 guides as real pages or remove the teaser section until they exist.
- *Files:* src/data/faqs.ts, src/pages/apoio.astro
- *Fix risk:* None.
- *Independent verification:* All main-content word counts re-computed from dist and match exactly (/ 1,811; /comprar 1,180; /vender 1,158; /sobre-nos 1,131; /apoio 619; /contacto 129; /insights 187; /carreiras 1,169; /alugar 82; /privacidade 78). faqs.ts:128 'PLACEHOLDER(guias): conteúdo dos guias por escrever' verified; all four guide cards point to /insights. CORRECTION: /ap

#### `content-differentiation-vs-portals` — Honest differentiation assessment: the method/guide content is the site's real asset; listings, prices and data all live elsewhere

**P3 · CONFIRMED** · effort L · dimension: content

- *Evidence:* All property CTAs point off-site to remax.pt (EXTERNAL_LISTINGS_URL, src/lib/site.config.ts:6; office id 12382 filter) — the site hosts zero listings
- *Evidence:* All zone prices are deliberately 'Sob consulta' (zonas.ts:30 '(never an invented figure)') — no price data vs Idealista's per-m2 stats
- *Evidence:* Unique assets remax.pt/Idealista do NOT offer: the Mandato de Comprador vs Contrato Exclusivo explainer, the 12-step purchase timeline, the with/without-exclusivity comparison table (metodo-vender.ts:100-134), document checklists, the 8-zone curated narrative, and the interactive valuation simulator with an honest disclaimer ('Estimativa indicativa — não substitui uma avaliação profissional', all pages)
- *Impact:* Positive-leaning: as a satellite to remax.pt the site's defensible search niche is educational/method + hyper-local zone expertise + valuation capture — not listings. Current content invests correctly in the first, not yet in the second and third.
- *Fix:* Double down on the differentiators: zone guide pages (below), a citable valuation landing, and sourced local market data no portal page personalises for Porto-premium. Do not try to compete on listings.
- *Fix risk:* None — strategic note.
- *Independent verification:* EXTERNAL_LISTINGS_URL (site.config.ts:6-7) confirmed as the only listings surface, filtered to of=12382 'RE/MAX Collection Vintage' — the site hosts zero listings. All 10 zonas.ts entries have preco:'Sob consulta' with the '(never an invented figure)' comment at :30. The claimed unique assets verified: Mandato vs Contrato Exclusivo explainer (metod


### Proposed new pages (specs only — nothing generated; each requires owner sign-off and real expertise)

Per mission §8, every proposal states intent → query theme → unique value → evidence needed → internal links → conversion goal:

1. **`/avaliacao/` (valuation landing).** Intent: seller researching value ("avaliação imóvel Porto", "quanto vale a minha casa Porto"). Unique value: the existing simulator + the 24h-consultant promise on one crawlable URL with a real explanation of method (today this intent is split across `/#vender`, a JS modal, and /vender/). Evidence: valuation methodology from the team; no invented accuracy claims. Links: from nav CTA, /vender/, homepage hero card, all zone pages. Conversion: valuation form (the site's primary lead).
2. **Zone guides for Boavista and Nevogilde (then the remaining 5).** Intent: "viver na Boavista", "comprar casa Nevogilde", zone-level luxury research. Unique value: the agency's genuinely local knowledge (zonas.ts already names Serralves, Parque da Cidade, pés-direitos dos Aliados) at real depth (800+ words), unlike portal boilerplate. Evidence: team's zone expertise; no invented price data — "Sob consulta" discipline stays. Links: from the homepage zone cards (today dead-end blurbs), /comprar/, /vender/, the Foz guide. Conversion: zone-scoped valuation/contact CTA.
3. **`/insights/custos-de-vender-casa-porto/` (selling-costs guide).** Intent: "quanto custa vender uma casa", CPCV/IMT/certidões questions pt-PT buyers actually ask (and AI engines love citing). Unique value: the printed-guide material the site already owns (documents list on /vender/), expanded with owner-confirmed specifics. Evidence: official guide content + agency confirmation; flag anything uncertain. Links: /vender/ ↔ post ↔ /avaliacao/. Conversion: "estudo de mercado gratuito" CTA.

Deepening the four existing placeholder posts to 800+ real words each precedes any *new* editorial pages (geo-insights-placeholder-thin-content, P1).

## 12. Performance findings

Static analysis only (PSI quota exhausted — limitation §4). Fundamentals are strong: exact-match responsive hero preloads with `fetchpriority=high` (desktop JPEG + mobile WebP, media-gated), 161/197 imgs lazy-loaded, 91% width/height coverage, ~36 KB total JS (all module/deferred, legacy 31 KB image-slot.js confirmed gone), brotli on text, `font-display=swap` + preconnects, a textbook lazy hero video (`preload="none"`, data-src, reduced-motion respected). Core Web Vitals risk on the highest-traffic templates: **low for LCP/CLS/INP on `/`** — with the exceptions below.


### Images & performance

#### `images-cache-catchall-overrides-immutable-and-media-uncovered` — vercel.json catch-all header rule (listed last) overrides all immutable cache rules in production, and /media/ has no long-cache rule at all

**P1 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* vercel.json:4-35 — rules for "/images/(.*)", "/assets/(.*)", "/fonts/(.*)" set "public, max-age=31536000, immutable", but the final rule "source": "/(.*)" (vercel.json:31) sets "public, max-age=3600, must-revalidate"; Vercel applies all matching header definitions with later matches overriding earlier ones for the same key
- *Evidence:* LIVE: curl -sI https://remaxcollectionvintage.pt/assets/index.h64K_q9t.css → cache-control: public, max-age=3600, must-revalidate (a content-hashed Astro bundle that should be immutable)
- *Evidence:* LIVE: curl -sI https://remaxcollectionvintage.pt/images/porto/editorial-adega.jpg → cache-control: public, max-age=3600, must-revalidate
- *Evidence:* LIVE: curl -sI https://remaxcollectionvintage.pt/media/hero-collection-1280.jpg (homepage LCP image, 126,690 B) → cache-control: public, max-age=3600, must-revalidate — /media/ is absent from vercel.json entirely, so even fixing rule order would leave the 3.4MB hero.mp4, hero posters and all LCP hero files on 1-hour cache
- *Impact:* Every repeat visit and every navigation after 1 hour revalidates all CSS/JS/images (304 round-trips at best), degrading repeat-visit LCP and wasting crawl budget; the immutable intent of the config is entirely inert in production.
- *Fix:* Reorder vercel.json: put the "/(.*)" catch-all FIRST, then the specific asset rules after it so they win; add a "/media/(.*)" rule. Use "immutable, max-age=31536000" only for the content-hashed /assets/*.css|js; for unhashed paths (/images/, /media/, the two unhashed PNG logos in /assets/) prefer "public, max-age=2592000, stale-while-revalidate=86400" or rename files when content changes, because immutable+unhashed risks permanently stale images.
- *Files:* vercel.json
- *Fix risk:* Low — header-only change; verify with curl after deploy. Keep HTML on short cache (catch-all first achieves this).
- *Independent verification:* Re-read vercel.json: /images/, /assets/, /fonts/ immutable rules at lines 4-29, catch-all "/(.*)" with max-age=3600 at lines 31-38 (last). Re-curled live: /assets/index.h64K_q9t.css, /images/porto/editorial-adega.jpg, /media/hero-collection-1280.jpg (126,690 B) and /assets/remax-vintage-horizontal-nav.png ALL return 'cache-control: public, max-age=

#### `images-alugar-2mb-single-size-jpeg` — /alugar ships a 2.1MB, 5056x3392 JPEG as a single-size card image

**P1 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* dist/client/images/porto/porto-ribeira-loja.jpg = 2,147,200 bytes
- *Evidence:* dist/client/alugar/index.html: <img class="alg__img" src="/images/porto/porto-ribeira-loja.jpg" ... width="5056" height="3392" loading="lazy"> — no srcset, no <picture>, full camera-resolution original
- *Evidence:* src/pages/alugar.astro:54: src="/images/porto/porto-ribeira-loja.jpg"
- *Impact:* Not the LCP (lazy, below fold) so CWV impact is indirect, but any user who scrolls /alugar downloads 2.1MB for an image rendered at ~600-900px — ~10x oversize; competes for bandwidth with other loads and is hostile to mobile data.
- *Fix:* Re-encode to WebP (or AVIF) at 3 widths (e.g. 800/1280/1920w, quality ~75-80 WebP → roughly 80-250KB per variant) and serve via srcset+sizes; keep the intrinsic width/height attributes matching the largest variant. No visible quality loss at these settings for a photo displayed at card size.
- *Files:* src/pages/alugar.astro, public/images/porto/ (new re-encoded variants)
- *Fix risk:* Low — visual check of the one card on /alugar.
- *Independent verification:* File is 2,147,200 B; built tag has width=5056 height=3392 loading=lazy, no srcset (the page's only srcset belongs to the FinalBrand poente image); src/pages/alugar.astro:54 confirmed. However the auditor UNDERSOLD it: this img sits in the FIRST section of the page — dist CSS .alg__grid{grid-template-columns:1fr 1fr;min-height:clamp(620px,88vh,920px

#### `images-pagehero-css-background-lcp` — PageHero renders the full-viewport hero as an inline-style CSS background-image on 4 pages — invisible to the preload scanner, no fetchpriority/srcset possible, not preloaded

**P2 · CONFIRMED** · effort M · dimension: perf

- *Evidence:* src/components/PageHero.astro:44: <div class="phero__img" data-phero-img style={`background-image:url('${image}')...`}>
- *Evidence:* dist grep: data-phero-img present in comprar/index.html (porto-douro-arrabida.webp), vender/index.html (porto-douro-retrato.webp), apoio/index.html (porto-douro-entardecer.webp), sobre-nos/index.html (/media/hero-poster.jpg, 271,991 B)
- *Evidence:* grep '<link rel="preload"' on these pages returns nothing (only index.html has hero preloads); the homepage proves the infra exists — src/pages/index.astro:72-73 passes preload entries rendered at Base.astro:106
- *Impact:* On /comprar, /vender, /apoio and /sobre-nos the ~130-272KB hero background is almost certainly the LCP element, but the browser only discovers it after HTML+CSS parse and style resolution — typically several hundred ms later than a preloaded <img>, directly inflating LCP on those pages.
- *Fix:* Pass the hero image through the same preload prop the homepage uses (Base.astro already emits <link rel=preload as=image fetchpriority=high>), or refactor PageHero to an absolutely-positioned <img fetchpriority="high"> with object-fit:cover so srcset/responsive variants also become possible. Also re-encode hero-poster.jpg (271,991 B) — a ~1600w WebP at q78 would be ~90-120KB (keep the JPEG for og:image compatibility).
- *Files:* src/components/PageHero.astro, src/pages/comprar.astro, src/pages/vender.astro, src/pages/apoio.astro, src/pages/sobre-nos.astro
- *Fix risk:* Low-medium — background-position:center 35% and the parallax transform (data-phero-img) must be reproduced on the <img>; the preload-only variant is near-zero risk.
- *Independent verification:* PageHero.astro:44 inline-style background-image confirmed verbatim. Exactly 4 pages carry data-phero-img (grep of all dist HTML: comprar, vender, apoio, sobre-nos) and all 4 have ZERO rel="preload" links; homepage preload infra confirmed (index.astro heroPreload block ~lines 70-77, rendered at Base.astro:104-110, two preloads with fetchpriority=hig

#### `images-legacy-jpeg-no-modern-formats-below-fold` — Below-fold content images are predominantly single-format JPEG (66 jpg vs 43 webp, 0 avif in dist); ~50 team JPEGs on /sobre-nos and a 312KB insights card image ship without WebP/AVIF alternatives

**P2 · CONFIRMED** · effort M · dimension: perf

- *Evidence:* find dist/client: 66 .jpg, 43 .webp, 2 .png, 0 .avif
- *Evidence:* dist/client/sobre-nos/index.html: 106 <picture> wrappers contain NO <source> elements — e.g. <picture><img src="/images/team/team-48.jpg" ... width="600" height="800" loading="lazy"></picture>; ~50 team JPEGs at ~60-130KB each (~4MB if fully scrolled)
- *Evidence:* dist/client/images/team/ contains ready-made WebP variants for 5 people (jose-vieira-400/600.webp, ligia-mofreita-400/600.webp, ...) proving a conversion pipeline existed but was not applied to the other ~50 portraits
- *Evidence:* images/porto/editorial-adega.jpg = 311,941 B (1600x1067), single-size JPEG, referenced on insights/index.html and all 4 insight posts as card image
- *Impact:* Roughly 30-45% excess bytes on the heaviest pages (sobre-nos full-scroll ~4MB of portraits; insights cards 312KB each). All lazy-loaded so LCP is protected, but scroll-time bandwidth and data cost are inflated; the desktop homepage LCP file itself could drop from 227KB to ~90-130KB as AVIF/WebP.
- *Fix:* Batch-convert team portraits to WebP q80 at 600w (they render at 600x800 — single size is fine) and add <source type="image/webp"> inside the already-present <picture> wrappers; convert editorial-adega.jpg and the other porto/*.jpg cards to WebP; add WebP/AVIF sources for the desktop hero-collection srcset. Use cwebp/avifenc at quality that passes visual review — do not push below q75 WebP / q60 AVIF on these editorial photos.
- *Files:* public/images/team/, public/images/porto/, public/media/, src/pages/sobre-nos.astro (or the team card component), src/components/Hero.astro
- *Fix risk:* Low — formats are additive via <picture>; JPEG fallback remains.
- *Independent verification:* Format census re-counted exactly: 66 jpg / 43 webp / 2 png / 0 avif in dist/client. Two evidence overstatements, substance intact: (1) sobre-nos has 106 <picture> occurrences but 4 of them DO contain <source type="image/webp"> (jose-vieira + ligia-mofreita, x2 marquee copies) — so 102/106, not all 106; (2) unique team JPEGs referenced = 53 files to

#### `images-oversized-equipa-gallery-webp` — Three equipa-gallery WebPs are 320-485KB each for a square grid tile (2-3x oversize)

**P2 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* dist/client/images/equipa-gallery/equipa-8.webp = 484,804 B; equipa-9.webp = 350,012 B; equipa-3.webp = 321,200 B — all referenced only in sobre-nos/index.html
- *Evidence:* dist/client/sobre-nos/index.html: <img src="/images/equipa-gallery/equipa-8.webp" alt="" loading="lazy" ...> — single-size, no srcset
- *Evidence:* assets/sobre-nos.C_ZtqsAN.css: .ab-gal__item{...aspect-ratio:1...} — rendered as a square grid tile, far below intrinsic resolution
- *Impact:* ~1.15MB across three lazy tiles on /sobre-nos for images displayed at roughly 400-600px square; pure bandwidth waste, no LCP effect.
- *Fix:* Re-export at ~800-1000px on the long edge, WebP q78-82 (expect 60-120KB each); optionally add a 2x srcset for retina. Same treatment for the remaining equipa-*.webp files in the 150-320KB range.
- *Files:* public/images/equipa-gallery/
- *Fix risk:* Low.
- *Independent verification:* Byte-exact match: equipa-8.webp 484,804 B, equipa-9.webp 350,012 B, equipa-3.webp 321,200 B; referenced only by sobre-nos/index.html (grep across all dist HTML); built tag is single-size no srcset with no width/height; dist CSS .ab-gal__item{...aspect-ratio:1...} confirmed (square tile, object-fit:cover). ~1.16MB across three lazy tiles. P2 is at t

#### `images-render-blocking-google-fonts` — Google Fonts stylesheet is a render-blocking cross-origin request (2 families, 7 styles); self-hosting infra half-prepared but unused

**P2 · CONFIRMED** · effort M · dimension: perf

- *Evidence:* src/layouts/Base.astro:136-141: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap"> — 5 Cormorant styles + 2 Jost styles = 7 font files; display=swap present in URL
- *Evidence:* Base.astro:134-135: preconnect to fonts.googleapis.com and fonts.gstatic.com (crossorigin) both present
- *Evidence:* vercel.json:22: a "/fonts/(.*)" immutable cache rule exists, but ls public/ shows no fonts directory — self-hosting was evidently planned and never completed
- *Impact:* FCP/LCP on cold loads pays a cross-origin CSS round trip (mitigated but not eliminated by preconnect) before first paint; typically 100-300ms on mobile. display=swap prevents invisible text but allows a fallback-to-webfont swap that can nudge CLS on the serif display headings.
- *Fix:* Self-host both families as subset woff2 (e.g. @fontsource-variable or google-webfonts-helper, latin subset) under public/fonts/ — the immutable cache rule for it already exists (once rule ordering is fixed); inline the @font-face CSS into the page. Consider trimming Cormorant italic 500 if unused. Optionally add a metric-compatible fallback (size-adjust) to zero out swap shift.
- *Files:* src/layouts/Base.astro, public/fonts/ (new), vercel.json (ordering fix from the cache finding)
- *Fix risk:* Low-medium — verify glyph coverage for pt-PT diacritics in the subset and that italics/weights map correctly.
- *Independent verification:* Base.astro:136-142 (auditor cited 134-141 — trivial line drift): both preconnects present, then render-blocking stylesheet link to fonts.googleapis.com with exactly 5 Cormorant Garamond styles + 2 Jost weights = 7, display=swap in URL. vercel.json:22 /fonts/(.*) rule with no public/fonts dir re-confirmed. It is the only third-party request on the s

#### `images-dead-assets-deployed` — 2.25MB of unreferenced assets deployed publicly, including a 1.98MB hero JPEG referenced nowhere

**P3 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* dist/client/media/hero-interior-porto.jpg = 1,976,865 B — grep -rl across ALL dist HTML/CSS/JS and all of src/ returns zero references
- *Evidence:* Unreferenced in dist/client/images/team/: luis-dinis.jpg (57,726 B), lubna-braylih.jpg (58,535 B), luis-abreu.jpg (65,180 B) plus their 6 -400/-600.webp variants (~88KB total) — no page references these three people
- *Evidence:* Live: files are publicly served from the production domain (public/ is copied verbatim to dist/client/)
- *Impact:* No runtime CWV cost (never requested by pages), but bloats every deploy, confuses future maintenance, and the 3 unreferenced team portraits may indicate people accidentally dropped from /sobre-nos (or correctly removed — owner should confirm intent).
- *Fix:* Delete public/media/hero-interior-porto.jpg; confirm with the owner whether the 3 missing team members should appear on /sobre-nos before deleting their files.
- *Files:* public/media/hero-interior-porto.jpg, public/images/team/ (3 people x 3 files)
- *Fix risk:* Low — verify zero references (already done) before removal; team files need owner confirmation.
- *Independent verification:* hero-interior-porto.jpg = 1,976,865 B, zero references in any dist HTML/CSS/JS or src file (re-grepped). The 3 team file sets (9 files, sizes match) are indeed referenced by no dist HTML — but the auditor's interpretation is wrong: they ARE listed in src/data/team.ts:138-140 inside an AI_PORTRAITS pool whose header comment (team.ts:127-128) says 'A

#### `images-legacy-optimize-script-shipped` — Dead legacy script public/optimize-images.js is deployed and publicly served but referenced by no page

**P3 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* public/optimize-images.js (2,013 B) → dist/client/optimize-images.js; grep -rl 'optimize-images' across all dist HTML returns nothing
- *Evidence:* LIVE: https://remaxcollectionvintage.pt/optimize-images.js → HTTP 200, content-encoding: br
- *Evidence:* public/optimize-images.js:29-30 references '/assets/hero-ribeira.webp' and '/assets/hero-porto-douro.webp' — files that do not exist anywhere in public/ or dist/; lines 44-63 re-implement lazy loading that would double-observe every loading="lazy" img if ever included
- *Impact:* Zero current CWV impact (never loaded), but it is dead code exposed at a public URL, from an earlier architecture; if a future page ever includes it, it would inject broken preloads and redundant observers.
- *Fix:* Delete public/optimize-images.js.
- *Files:* public/optimize-images.js
- *Fix risk:* None — confirmed unreferenced.
- *Independent verification:* public/optimize-images.js = 2,013 B; zero references in any dist HTML (re-grepped); live URL returns HTTP 200 content-length 2013 (br only when Accept-Encoding sent — the cited 'content-encoding: br' requires the header, trivial nit). criticalImages at ~lines 28-31 reference /assets/hero-ribeira.webp and /assets/hero-porto-douro.webp which do not e

#### `images-missing-width-height-17-imgs` — 17 of 197 built <img> tags lack width/height — CLS risk largely mitigated by CSS aspect-ratio containers, but worth closing

**P3 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* Scan of all dist HTML: 197 <img> total; 17 missing width or height — 9 equipa-gallery imgs in sobre-nos/index.html (e.g. <img src="/images/equipa-gallery/equipa-1.webp" alt="" loading="lazy" decoding="async"> ) and 8 in carreiras/index.html (editorial-*.webp, porto-ribeira-barcos.webp, sonia-santos.jpg)
- *Evidence:* Mitigation confirmed in CSS: assets/sobre-nos.C_ZtqsAN.css .ab-gal__item{...aspect-ratio:1...}; assets/carreiras.XQg9PylV.css .otile{...aspect-ratio:3/4} and .capply__media-img{...aspect-ratio:16/11} — the containers reserve space, so layout shift on image load is unlikely
- *Impact:* Residual CLS risk is low (containers are aspect-ratio sized), but explicit dimensions are defense-in-depth if the CSS ever changes and help the browser pre-layout.
- *Fix:* Add intrinsic width/height attributes to the 17 imgs (values already known: equipa gallery are square-cropped; carreiras editorials are 3:4/16:11 crops).
- *Files:* src/pages/sobre-nos.astro (equipa gallery block), src/pages/carreiras.astro (or its components)
- *Fix risk:* None.
- *Independent verification:* Independently re-counted with a regex scan of every dist HTML file: 197 <img> tags total, exactly 17 missing width or height — 9 equipa-gallery webps in sobre-nos + 8 in carreiras (7 editorial/porto webps + sonia-santos.jpg), matching the finding file-for-file. CSS mitigation re-confirmed in dist: .ab-gal__item aspect-ratio:1; carreiras .otile aspe

#### `images-oversized-schema-logo-and-nav-png` — 463KB PNG used as JSON-LD organization logo; 55KB PNG nav+footer logo could be a fraction of the size

**P3 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* dist/client/assets/remax-vintage-horizontal.png = 463,651 B — referenced ONLY as "logo":"https://remaxcollectionvintage.pt/assets/remax-vintage-horizontal.png" inside JSON-LD (src/data/site.ts:17: logoFull: '/assets/remax-vintage-horizontal.png'), never rendered in HTML
- *Evidence:* assets/remax-vintage-horizontal-nav.png = 55,144 B (643x96), rendered twice per page (header + footer) on all 15 pages; footer instance has no loading attribute
- *Evidence:* Live cache on both is currently only max-age=3600 (see cache finding)
- *Impact:* The 463KB logo is fetched by Google/Bing/AI crawlers when parsing structured data — wasteful but not user-facing. The 55KB nav PNG is on every page view; at ~200px rendered width it could be ~10-15KB (or an SVG, matching the existing favicon.svg approach).
- *Fix:* Re-export the schema logo at ~600px wide optimized PNG (~40-80KB, Google requires min 112x112); replace/optimize the nav logo (SVG ideal for a wordmark, else palettized PNG or WebP with PNG fallback); add loading="lazy" to the footer logo instance.
- *Files:* public/assets/remax-vintage-horizontal.png, public/assets/remax-vintage-horizontal-nav.png, src/components/ (header/footer logo markup)
- *Fix risk:* Low — keep the same filenames/URLs so JSON-LD references stay valid, or update site.ts:17 in lockstep.
- *Independent verification:* remax-vintage-horizontal.png = 463,651 B; in dist HTML it appears only inside JSON-LD as "logo":"https://remaxcollectionvintage.pt/assets/remax-vintage-horizontal.png" (regex context check on index.html — no <img> uses it); src/data/site.ts:17 confirmed verbatim. Nav PNG = 55,144 B, 643x96, rendered twice per page (header + footer .foot__section-lo

#### `images-insights-hero-no-preload` — Insight post hero images are eager+fetchpriority=high but not preloaded

**P3 · CONFIRMED** · effort S · dimension: perf

- *Evidence:* dist/client/insights/foz-do-douro-guia-da-zona/index.html: <img src="/images/porto/porto-foz-promenade.webp" ... width="1600" height="900" fetchpriority="high"> with no <link rel="preload"> in head (grep returned none); same pattern on the other 3 posts (~130-190KB webp heroes)
- *Evidence:* Homepage demonstrates the preload mechanism already exists (src/pages/index.astro:72-73 → Base.astro:106)
- *Impact:* Minor LCP left on the table for the 4 insight posts — the img is early in the DOM so discovery is fast; preload would save roughly 50-150ms.
- *Fix:* Pass the post hero image through the layout's existing preload prop in insights/[slug].astro.
- *Files:* src/pages/insights/[slug].astro
- *Fix risk:* None.
- *Independent verification:* All 4 insight posts re-checked: each hero is <img ... width=1600 height=900 fetchpriority="high"> with ZERO rel="preload" in the page. Evidence nit: the heroes are NOT all '~130-190KB webp' — 2 of 4 are JPEG: porto-ponte-luis-noite.jpg 198,859 B and editorial-adega.jpg 311,941 B (the heaviest, on viver-no-porto-arte-de-receber); the webps are 145,0


## 13. Evidence standard

Every finding above embeds its own evidence (file:line quotes from `main @ e4dae30` and/or live-URL observations from this session, 2026-07-10). Quantitative claims (link counts, word counts, byte sizes, image counts) were re-derived independently by a second adversarial pass before inclusion; the verification notes are attached per finding. Raw agent transcripts: session workflow `wf_66a07666-68d` (21 agents). Zero findings were refuted on re-verification; 23 duplicates were consolidated (consolidation noted inline on each kept finding).

## 14. Prioritised backlog

**P0 — indexation blockers: none in code or configuration.** The P0-equivalent work is off-repository: Google/Bing submission (§17, "immediate" tier) — without it the site stays undiscovered regardless of code quality.


### P1 — high-impact fixes (13 findings)

| ID | Finding | Label | Effort |
|---|---|---|---|
| `content-ai-portraits-real-names` | AI-generated portraits are published next to real staff names on /sobre-nos/ | CONFIRMED | S |
| `content-fabricated-testimonials-live` | Twelve invented client testimonials and two fictitious employee testimonials are live in production | CONFIRMED | S |
| `content-unconfirmed-claims-live` | At least 17 explicitly-flagged unconfirmed factual claims are live, plus the awards belt and 'desde 2014' pending owner  | CONFIRMED | M |
| `content-visible-placeholder-tokens` | Literal '[INSERIR NÚMERO REAL]' renders four times on the live /carreiras/ page | CONFIRMED | S |
| `geo-insights-placeholder-thin-content` | All 4 insight articles are self-declared placeholder copy, 140-273 words each, with reading times overstating length 5-1 | CONFIRMED | L |
| `intl-en-invisible-to-crawlers-by-design` | Even when wired, the client-side DOM-swap EN architecture is invisible to Google, Bing and AI answer engines — only pt-P | CONFIRMED | L |
| `local-ami-licence-placeholder-and-no-legal-entity` | AMI licence rendered as 'AMI 0000' placeholder sitewide; no legal entity name or NIF anywhere (Portuguese legal requirem | CONFIRMED | S |
| `local-gbp-absent-no-map-presence` | No Google Business Profile link or map embed anywhere on the site; GBP status unknown | CONFIRMED | M |
| `local-nap-placeholders-live-in-production` | Entire NAP (phone, email, address, WhatsApp) is placeholder data, live on every production page | CONFIRMED | S |
| `images-alugar-2mb-single-size-jpeg` | /alugar ships a 2.1MB, 5056x3392 JPEG as a single-size card image | CONFIRMED | S |
| `images-cache-catchall-overrides-immutable-and-media-uncovered` | vercel.json catch-all header rule (listed last) overrides all immutable cache rules in production, and /media/ has no lo | CONFIRMED | S |
| `routes-apoio-orphan-page` | /apoio/ is a fully orphaned page — zero internal links site-wide, discoverable only via sitemap | CONFIRMED | S |
| `routes-privacidade-placeholder-policy` | Privacy policy page is a live placeholder: text says the real policy 'will be published before the site launch' — but th | CONFIRMED | M |

### P2 — important improvements (27 findings)

| ID | Finding | Label | Effort |
|---|---|---|---|
| `content-hours-contradiction` | Service-availability claims contradict each other across pages | CONFIRMED | S |
| `content-new-pages-spec` | Proposed new pages (specs only): 3 zone guides, a valuation landing, and a selling-costs guide | RECOMMENDATION | L |
| `content-thin-alugar` | /alugar/ is a 82-word doorway whose primary CTA sends users to a BUY search on remax.pt | CONFIRMED | M |
| `content-titles-editorial-no-query-targeting` | Titles/H1s are editorial and brand-led; no page targets a commercial query, and /comprar/ has a title-H1 mismatch | CONFIRMED | S |
| `content-valuation-intent-split` | Seller/valuation intent is split across the homepage anchor, a sitewide simulator, and /vender/ — with no dedicated valu | CONFIRMED | M |
| `crawl-internal-links-noncanonical-slash` | Every internal link uses the non-trailing-slash URL form while canonicals and sitemap use trailing slash | CONFIRMED | M |
| `crawl-vercel-app-duplicate-host` | remax-vintage-site.vercel.app serves the full site (200, no X-Robots-Tag) — duplicate host mitigated only by cross-host  | CONFIRMED | S |
| `geo-content-gap-guides` | Valuation, buyer and seller guide topics advertised on /apoio have no destination pages — cards link to the generic /ins | CONFIRMED | M |
| `geo-lexical-gap-category-terms` | The site never calls itself an 'agência imobiliária' / 'imobiliária de luxo' / 'mediação imobiliária' in body copy — no  | CONFIRMED | S |
| `geo-no-per-zone-pages` | 7 of 8 zonas have zero dedicated content — only 1-sentence card blurbs; the entire local-question space is unclaimed | CONFIRMED | L |
| `intl-en-toggle-dormant-never-wired` | The entire EN language system is dead code — initI18n() is never imported, no toggle UI exists, zero i18n code ships to  | CONFIRMED | S |
| `intl-two-paths-decision-pt-only-vs-en-routes` | Owner decision required: stay PT-only (correct today, incl. correctly having NO hreflang) vs. build static /en/ routes w | CONFIRMED | L |
| `local-livro-reclamacoes-missing` | No link to Livro de Reclamações Eletrónico (mandatory for Portuguese consumer-facing businesses) | CONFIRMED | S |
| `local-maps-link-points-to-fictitious-address` | Live 'Ver no mapa' CTA on /apoio sends users to Google Maps for the fictitious address 'Av. da Boavista 0000' | CONFIRMED | S |
| `local-schema-local-fields-pending` | RealEstateAgent schema lacks telephone, streetAddress/postalCode, geo, openingHoursSpecification and hasMap — currently  | CONFIRMED | S |
| `local-social-links-placeholder-hash` | All four social links (Instagram, LinkedIn, YouTube, Facebook) are dead href="#" on every page | CONFIRMED | S |
| `meta-favicon-no-ico-no-apple-touch-png` | Favicon coverage is SVG-only: /favicon.ico returns 404 and apple-touch-icon points to an SVG (non-functional on iOS) | CONFIRMED | S |
| `meta-og-image-webp-share-compat` | Four pages use WebP files as og:image, which several share platforms (notably WhatsApp) render unreliably | LIKELY | S |
| `images-legacy-jpeg-no-modern-formats-below-fold` | Below-fold content images are predominantly single-format JPEG (66 jpg vs 43 webp, 0 avif in dist); ~50 team JPEGs on /s | CONFIRMED | M |
| `images-oversized-equipa-gallery-webp` | Three equipa-gallery WebPs are 320-485KB each for a square grid tile (2-3x oversize) | CONFIRMED | S |
| `images-pagehero-css-background-lcp` | PageHero renders the full-viewport hero as an inline-style CSS background-image on 4 pages — invisible to the preload sc | CONFIRMED | M |
| `images-render-blocking-google-fonts` | Google Fonts stylesheet is a render-blocking cross-origin request (2 families, 7 styles); self-hosting infra half-prepar | CONFIRMED | M |
| `routes-alugar-missing-h1` | /alugar/ has no H1 — its hero heading is an <h2> (only indexable page with zero H1s) | CONFIRMED | S |
| `routes-images-missing-alt` | 38 <img> tags across built pages have missing or empty alt, including content-bearing team gallery photos | CONFIRMED | M |
| `schema-founding-date-2014-unsourced` | foundingDate "2014" in schema (and "Desde 2014" site-wide) is an unsourced business fact on a 2-day-old domain — needs o | CONFIRMED | S |
| `schema-sameas-empty-no-entity-corroboration` | sameAs is empty (all 4 social hrefs are '#' placeholders) — a 2-day-old entity has zero corroborating profile links in i | CONFIRMED | S |
| `semantic-no-crosslinks-insights-services` | Insight posts never link to service pages (and service/home pages never link to insight posts) | CONFIRMED | M |

### P3 — optional refinements (37 findings)

| ID | Finding | Label | Effort |
|---|---|---|---|
| `content-cross-page-duplication` | The full 8-zone card deck and testimonial carousel are duplicated verbatim between / and /sobre-nos/ | CONFIRMED | M |
| `content-differentiation-vs-portals` | Honest differentiation assessment: the method/guide content is the site's real asset; listings, prices and data all live | CONFIRMED | L |
| `content-generic-copy-passages` | Several passages are agency-agnostic boilerplate that no engine could ever cite | CONFIRMED | M |
| `content-page-purpose-verdicts` | Page-purpose audit: two pages currently lack a defensible search purpose in their present state | CONFIRMED | M |
| `content-register-mixing-carreiras` | PT-PT quality is otherwise excellent, but /carreiras/ mixes 'tu' and formal address on the same page | CONFIRMED | S |
| `crawl-mobile-preview-disallow-noindex-conflict` | /mobile-preview is both robots.txt-disallowed and noindex — Google cannot see the noindex; acceptable today, cleaner to  | CONFIRMED | S |
| `crawl-query-param-internal-links` | Two internal links carry a query string (/contacto?assunto=estudo-mercado) — duplication fully neutralized by canonical | CONFIRMED | S |
| `crawl-sitemap-handmaintained-drift-risk` | Sitemap STATIC_ROUTES is a hand-maintained list — currently complete (14/14) but will silently drift when pages are adde | CONFIRMED | S |
| `geo-ai-training-policy-implicit` | AI-bot policy is implicit: the wildcard robots.txt allows training crawlers (GPTBot, Google-Extended, CCBot, anthropic)  | CONFIRMED | S |
| `geo-bing-indexnow-optional` | Nothing blocks bingbot; IndexNow is not configured — optional fast-lane for Bing/Copilot on a 2-day-old domain | CONFIRMED | S |
| `geo-llms-txt-absent-optional` | No llms.txt — strictly optional, not a requirement of any major engine | CONFIRMED | S |
| `geo-vender-faq-no-schema` | /vender's substantial FAQ and documents content carries no FAQPage markup (only /apoio has it) | CONFIRMED | S |
| `intl-23-untranslated-strings` | 23 dictionary gaps (all on homepage and 404) would surface as mixed-language text the moment EN goes live; fragmented ke | CONFIRMED | S |
| `intl-dict-quality-mistranslation-and-us-uk-mix` | EN dictionary quality: one real mistranslation ('à medida' → 'to measure') and a US/UK spelling mix in an otherwise stro | CONFIRMED | S |
| `intl-pt-source-nit-curacao` | PT source copy uses non-standard 'Curação' for 'curation' where the site itself uses the correct 'Curadoria' elsewhere ( | CONFIRMED | S |
| `meta-404-emits-canonical-and-default-description` | 404 page emits canonical/og:url https://remaxcollectionvintage.pt/404/ and duplicates the homepage description | CONFIRMED | S |
| `meta-article-og-tags-missing` | Insights posts declare og:type=article but emit no article:published_time / article:author / article:modified_time tags | CONFIRMED | S |
| `meta-description-length-outliers` | Four meta descriptions exceed 160 chars (165–174, mild SERP truncation) and /privacidade/ is only 53 chars | CONFIRMED | S |
| `meta-og-image-dimension-tags-absent` | No og:image:width/height/alt or twitter:image:alt; default share image is 1.77:1 instead of the ideal 1.91:1 | CONFIRMED | S |
| `meta-title-truncation-two-posts` | Two insights titles exceed 60 chars (63 and 74) — only the brand suffix gets truncated in SERPs | CONFIRMED | S |
| `meta-twitter-site-and-social-handles-unknown` | No twitter:site/creator handle and site.ts social links are '#' placeholders — needs owner data before adding | UNVERIFIED | S |
| `images-dead-assets-deployed` | 2.25MB of unreferenced assets deployed publicly, including a 1.98MB hero JPEG referenced nowhere | CONFIRMED | S |
| `images-insights-hero-no-preload` | Insight post hero images are eager+fetchpriority=high but not preloaded | CONFIRMED | S |
| `images-legacy-optimize-script-shipped` | Dead legacy script public/optimize-images.js is deployed and publicly served but referenced by no page | CONFIRMED | S |
| `images-missing-width-height-17-imgs` | 17 of 197 built <img> tags lack width/height — CLS risk largely mitigated by CSS aspect-ratio containers, but worth clos | CONFIRMED | S |
| `images-oversized-schema-logo-and-nav-png` | 463KB PNG used as JSON-LD organization logo; 55KB PNG nav+footer logo could be a fraction of the size | CONFIRMED | S |
| `routes-api-lead-500-on-get` | GET /api/lead returns HTTP 500 instead of 405 (endpoint only exports POST) | CONFIRMED | S |
| `schema-article-author-team-typed-as-person` | Article author "Equipa Collection Vintage" (the team) is typed as Person instead of Organization | CONFIRMED | S |
| `schema-article-dates-predate-domain-no-datemodified` | Article datePublished values (Mar–May 2026) predate the domain's existence (registered 2026-07-08); no dateModified emit | CONFIRMED | S |
| `schema-faq-rich-result-expectations` | FAQPage markup is well-formed but will not produce Google rich results (2023 restriction to authoritative gov/health sit | CONFIRMED | S |
| `schema-person-team-future-only` | No Person schema for the 30+ real team members — correct today (no individual profile pages exist); revisit only if agen | CONFIRMED | M |
| `schema-webpage-id-and-minor-graph-hygiene` | Minor graph hygiene: WebPage node has no @id, Article.mainEntityOfPage is a bare URL string, insights index is generic W | CONFIRMED | S |
| `semantic-chat-content-js-only` | CustomerSupport chat knowledge (502 lines of reply content) is runtime-only — acceptable, verify no unique facts live on | CONFIRMED | S |
| `semantic-footer-missing-contacto` | Footer contains no link to /contacto/ (the primary conversion page) | CONFIRMED | S |
| `semantic-mobile-hero-pseudo-h1` | Mobile hero title is a <p role="heading" aria-level="1"> with different wording than the real desktop h1 | CONFIRMED | S |
| `semantic-no-visible-breadcrumbs` | BreadcrumbList JSON-LD exists on insight posts but there is no visible breadcrumb trail anywhere | CONFIRMED | M |
| `semantic-sitewide-hidden-modal-headings` | Hidden ValueSimulator modal injects boilerplate h2 + five h3s into every page's heading outline | CONFIRMED | S |


## 15. Scores (0–100)

Dimension scores come from the audit passes (each with a written rationale, adversarially reviewed); mission scores map onto them as noted. Scoring a 2-day-old unsubmitted site necessarily mixes "what is built" (high) with "what is live-and-true" (low).

| Mission score | Value | Derivation |
|---|---|---|
| **Indexation readiness** | **85** | Crawl dimension (84) + zero P0s + valid robots/sitemap/canonicals; capped by the unsubmitted/unlinked reality and the vercel.app duplicate host |
| **Technical SEO** | **79** | Crawlability 84 · route inventory 76 · cache/config issues from perf (72) weighed in |
| **On-page SEO** | **84** | Metadata 86 · semantic HTML 82 — unique titles/descriptions everywhere, one-H1 discipline (except /alugar/), crawlable nav |
| **International SEO** | **62** | Monolingual correctness is high (consistent pt-PT signals, correctly no hreflang) but the intended EN capability is unshipped dead code, invisible to crawlers by design |
| **Local SEO** | **38** | Architecture ~85, business-fact reality ~10: placeholder NAP/AMI live, no GBP link, no legal entity, fabricated testimonials feeding local trust signals |
| **Content quality** | **42** | Method pages excellent; placeholder articles, fabricated social proof, visible placeholder tokens and 17+ unconfirmed claims cap the score |
| **GEO readiness** | **64** | Server-rendered + all-bots-allowed + real FAQ/method passages (~85 architectural) minus placeholder facts an engine would quote and 7/8 zonas without citable content |
| **Overall readiness** | **60** | Weighted toward the business goal (local + branded discovery): technical layers are launch-ready; business-integrity and content layers are not yet |

## 16. Phased implementation plan (Phase 2, pending authorisation)

Each batch lists risk / effort / expected impact. Batches 2A-code and 2A-manual can run in parallel today; 2B is blocked on owner data (§18).

**2A-manual — Discovery submission (owner, no repo changes) — effort: ~1h · risk: none · impact: unlocks indexation itself.** GSC property + verification, sitemap submission, URL-inspection requests, Bing Webmaster Tools (details §17).

**2A-code — Zero-risk repo quick wins — effort: S–M (½ day) · risk: minimal · impact: high per unit effort.**
- Footer link to `/apoio/` (kills the P1 orphan; 1 line in `Footer.astro`) and a footer link to `/contacto/` (currently missing).
- `/alugar/`: `<h2>` → `<h1>` (keep the visual class); swap the 2.1 MB card JPEG for a sized WebP/AVIF ≤200 KB with eager loading (probable LCP).
- `vercel.json`: reorder headers so the catch-all rule stops overriding immutable rules; add a `/media/(.*)` cache rule.
- Remove `[INSERIR NÚMERO REAL]` section from `/carreiras/` (or hide until real numbers exist); strip `<!-- CONFIRMAR COM AGÊNCIA -->`/TODO comments from shipped HTML (Astro comment removal), keeping them in source data files only.
- Remove the "em preparação… antes do lançamento" sentence from /privacidade/ (full policy text is 2B — needs legal/owner input).
- Delete `vercel 2.json` (inert iCloud duplicate whose hardcoded `Content-Encoding: gzip` would corrupt every response if ever renamed into place) and `public/optimize-images.js` + 2.25 MB of unreferenced deployed assets.
- Redirect or `X-Robots-Tag: noindex` the `remax-vintage-site.vercel.app` host (one vercel.json/middleware host rule).

**2B — Business-facts replacement (blocked on §18 owner data) — effort: S code + owner legwork · risk: low (data swap in `site.ts`) · impact: unblocks GBP, citations, schema enrichment, trust.**
- Real phone/e-mail (on-domain)/address/hours/WhatsApp in `src/data/site.ts`; real AMI + legal entity + NIF in footer; Livro de Reclamações link; full privacy-policy text; real social URLs (auto-populates schema `sameAs`); remove or replace fabricated testimonials + AI portraits + fake employee voices; resolve hours contradiction ("Seg–Sex 09:00–18:00" vs "7 dias/semana"); confirm/remove "desde 2014", awards belt, network stats.
- Then enrich RealEstateAgent schema: `telephone`, full `PostalAddress`, `geo`, `openingHoursSpecification`, `hasMap`, `sameAs`, typed `areaServed` (the 8 zonas).
- Then (manual) create/claim GBP and start citation consistency (§17).

**2C — Content build-out — effort: L (the real work) · risk: low, content-only · impact: this is what will actually rank/get cited.**
- Deepen the four insight posts to 800+ real words (or unpublish until real); fix backdated publication dates; add visible + schema authorship.
- Expand `/alugar/` (or fold rental intent elsewhere and 301 — owner decision); fix its rent-CTA-pointing-to-buy-search defect.
- New pages per §11 specs: `/avaliacao/`, 2 zone guides, selling-costs guide; homepage zone cards link to zone guides.
- Add "imobiliária de luxo no Porto"-class natural self-description to / and /sobre-nos/ body copy; localize commercial titles/H1s ("Porto" in /comprar/, /vender/, /alugar/ titles); cross-link insights ↔ service pages.
- Descriptive alt text for the 38 content images; `aria-hidden` on the duplicated team-marquee copy.

**2D — Polish & options — effort: S each · risk: none · impact: incremental.**
- favicon.ico + PNG apple-touch-icon; og:image dimension/alt tags; JPEG og:image fallbacks for the 4 WebP pages; article: OG tags on posts.
- Normalize internal links to trailing-slash form (matches canonicals/sitemap); visible breadcrumbs on insights; `max-image-preview:large`; RSS feed (@astrojs/rss); sitemap `lastmod` for static routes at build time.
- Image-format pass (AVIF/WebP for the 66 legacy JPEGs, sized variants for the 320–485 KB gallery tiles, PageHero CSS-background → `<img>` with preload); self-host fonts; IndexNow key (optional); `llms.txt` (optional, no ranking claim); decide EN architecture (if EN: static `/en/` routes + reciprocal hreflang + `x-default`, translate with the existing 1,296-entry dict as seed; the 23 dict gaps close then).

**Explicitly deferred pending owner decision:** training-crawler robots policy (GPTBot/Google-Extended/CCBot); EN routes; testimonial replacement strategy; JobPosting schema for /carreiras/.

## 17. Manual owner actions outside the repository

Ordered; the first block should happen **today** — it is the actual unblock for the mission's headline problem.

1. **Google Search Console** — create a property for `remaxcollectionvintage.pt`. Prefer a **Domain property** (covers all hosts/protocols): requires a DNS TXT record — DNS is at the registrar's nameservers (`dns1–4.host-redirect.com`), so add the TXT wherever the .pt domain's DNS is managed. If DNS access is awkward, a URL-prefix property for `https://remaxcollectionvintage.pt/` with the meta-tag/HTML-file method works (the tag/file addition would be a 1-line Phase-2 repo change).
2. **Submit the sitemap** in GSC: `https://remaxcollectionvintage.pt/sitemap.xml`.
3. **URL Inspection → Request indexing** for `/`, `/vender/`, `/comprar/`, `/sobre-nos/` (highest-value pages first; quota-limited per day).
4. **Bing Webmaster Tools** — add the site (fastest: "Import from GSC"), submit the same sitemap. This also feeds Copilot/ChatGPT-adjacent Bing-index consumers. IndexNow is optional (needs a key file in the repo — Phase 2D).
5. **Google Business Profile** — **only after real NAP/AMI (2B)**: create or claim the listing with the exact same name/address/phone as the site, link it to `https://remaxcollectionvintage.pt`, choose the estate-agent category. The current fake address must never reach GBP.
6. **RE/MAX network profile links** — ask RE/MAX Portugal to point the office-12382 page (and any agency profile on remax.pt) at the new domain. This is the site's first authoritative backlink and its strongest entity-corroboration signal.
7. **Citation/profile consistency (after 2B)** — same NAP on Idealista/Imovirtual/portal profiles, social profiles (then wired into footer + `sameAs`), and any directory listings. Inconsistent or fake NAP across the web is the classic local-SEO failure mode.
8. **Do not run paid traffic or PR to the site until 2B lands** — placeholder phone/testimonials in front of real users is a brand-damage risk beyond SEO.

## 18. Facts requiring confirmation from G

Consolidated roster — nothing below may be invented or silently changed; every item is currently placeholder, unverified, or contradictory in the repo:

1. Real telephone (+ whether the placeholder `+351 220 000 000` might collide with a real assigned number — it uses Porto's real 22 prefix).
2. Real e-mail on a controlled domain (is `collection@vintage.pt` controlled by the agency? It is also the GDPR-rights contact on /privacidade/).
3. Real street address + postal code (replaces "Av. da Boavista 0000, 4100-000").
4. **AMI licence number** (replaces "AMI 0000" — legal requirement).
5. Legal entity name + NIF for footer/legal pages.
6. Opening hours — and resolution of "Seg–Sex 09:00–18:00" vs "/apoio 7 dias/semana".
7. Founding year: is "desde 2014" / `foundingDate: 2014` true and documentable?
8. Real social profile URLs (Instagram/LinkedIn/YouTube/Facebook — currently `#`).
9. Google Business Profile: does one exist? Who owns it?
10. Real client testimonials **with written consent** — or approval to remove the 12 invented ones (and the 8 invented employee voices on /carreiras/).
11. Real team headshots to replace the 50 AI-generated portraits currently beside 54 real staff names.
12. The 9 named network awards + "12 anos" claims in `awards.ts`, and the 4 homepage network stats ("10.000 consultores", "+400 agências", "N.º 1 portal", "+60% online") — confirm, source, or remove.
13. The ~17 `confirmar: true` / `[CONFIRMAR]` method-content claims currently live.
14. `[INSERIR NÚMERO REAL]` careers metrics (4 tokens on /carreiras/).
15. Insights: real authorship, real publication dates (current dates predate the domain), and whether the 4 placeholder articles should be deepened or unpublished until real.
16. EN strategy: does the international audience justify static `/en/` routes (real cost), or stay PT-only for now?
17. AI **training**-crawler policy (GPTBot, Google-Extended, CCBot…): explicitly allow (status quo) or block? (Search/discovery bots stay allowed either way.)
18. Livro de Reclamações Eletrónico registration status (mandatory link for consumer-facing PT businesses).
19. Zone "demand" labels on the homepage cards (Procura elevada/estável…) — real assessments or placeholders?
20. Confirmation that `remax-vintage-site.vercel.app` may be noindexed/redirected (it is the deployment's default host).

## 19. Files expected to change during implementation

From the 77 findings' fix targets (count = findings touching the file):

- `astro.config.mjs` — 1 finding(s)
- `optional deploy hook` — 1 finding(s)
- `public/<indexnow-key>.txt` — 1 finding(s)
- `public/apple-touch-icon.png` — 1 finding(s)
- `public/assets/remax-vintage-horizontal-nav.png` — 1 finding(s)
- `public/assets/remax-vintage-horizontal.png` — 2 finding(s)
- `public/favicon.ico` — 1 finding(s)
- `public/fonts/` — 1 finding(s)
- `public/images/equipa-gallery/` — 1 finding(s)
- `public/images/porto/` — 3 finding(s)
- `public/images/team/` — 2 finding(s)
- `public/llms.txt` — 1 finding(s)
- `public/media/` — 1 finding(s)
- `public/media/hero-interior-porto.jpg` — 1 finding(s)
- `public/optimize-images.js` — 1 finding(s)
- `public/robots.txt` — 2 finding(s)
- `relevant src/components/*` — 1 finding(s)
- `src/components` — 1 finding(s)
- `src/components/` — 1 finding(s)
- `src/components/Footer.astro` — 5 finding(s)
- `src/components/Hero.astro` — 2 finding(s)
- `src/components/HeroMobile.astro` — 1 finding(s)
- `src/components/MobileValuationSheet.astro` — 1 finding(s)
- `src/components/Nav.astro` — 2 finding(s)
- `src/components/Neighborhoods.astro` — 1 finding(s)
- `src/components/PageHero.astro` — 1 finding(s)
- `src/components/Testimonials.astro` — 1 finding(s)
- `src/components/ValueSimulator.astro` — 2 finding(s)
- `src/content/metodo-comprar.ts` — 1 finding(s)
- `src/content/metodo-vender.ts` — 1 finding(s)
- `src/content/rede.ts` — 1 finding(s)
- `src/content/zonas.ts` — 2 finding(s)
- `src/data/awards.ts` — 1 finding(s)
- `src/data/carreiras.ts` — 4 finding(s)
- `src/data/faqs.ts` — 8 finding(s)
- `src/data/insights.ts` — 6 finding(s)
- `src/data/site.ts` — 18 finding(s)
- `src/data/supportKnowledge.ts / supportResponses.ts` — 1 finding(s)
- `src/data/supportResponses.ts` — 1 finding(s)
- `src/data/team.ts` — 1 finding(s)
- `src/i18n/apply.ts` — 1 finding(s)
- `src/i18n/dict.ts` — 8 finding(s)
- `src/layouts/Base.astro` — 13 finding(s)
- `src/lib/site.config.ts` — 1 finding(s)
- `src/pages` — 1 finding(s)
- `src/pages/` — 1 finding(s)
- `src/pages/*.astro` — 1 finding(s)
- `src/pages/404.astro` — 2 finding(s)
- `src/pages/alugar.astro` — 4 finding(s)
- `src/pages/api/lead.ts` — 1 finding(s)
- `src/pages/apoio.astro` — 4 finding(s)
- `src/pages/avaliacao.astro` — 1 finding(s)
- `src/pages/carreiras.astro` — 5 finding(s)
- `src/pages/comprar.astro` — 3 finding(s)
- `src/pages/guias/` — 1 finding(s)
- `src/pages/index.astro` — 5 finding(s)
- `src/pages/insights/[slug].astro` — 6 finding(s)
- `src/pages/insights/[slug].astro or post content source` — 1 finding(s)
- `src/pages/insights/index.astro` — 2 finding(s)
- `src/pages/mobile-preview.astro` — 1 finding(s)
- `src/pages/privacidade.astro` — 2 finding(s)
- `src/pages/sitemap.xml.ts` — 4 finding(s)
- `src/pages/sobre-nos.astro` — 9 finding(s)
- `src/pages/vender.astro` — 4 finding(s)
- `src/pages/zonas/` — 1 finding(s)
- `src/pages/zonas/[slug].astro` — 1 finding(s)
- `vercel.json` — 4 finding(s)


Plus (from the plan): `public/favicon.ico` + PNG touch icon (new), deletion of `vercel 2.json`, deletion of `public/optimize-images.js` and unreferenced media, possible `middleware`/`vercel.json` host rule for the vercel.app duplicate, `@astrojs/rss` feed route (optional), new page files under `src/pages/` and content entries for §11 proposals, and — only if the EN path is chosen — `src/pages/en/**` + hreflang wiring in `Base.astro`.

## 20. Definition of Done for Phase 2

Phase 2 is done when all of the following are true and verified:

1. GSC + Bing WMT properties verified; sitemap submitted; homepage + 3 key pages requested for indexing; `site:remaxcollectionvintage.pt` returns ≥1 result (indexation itself is Google's call — the DoD is the submission + zero remaining blockers, with indexation tracked).
2. Zero placeholder business facts in production: real NAP + AMI + legal entity live and identical across footer, /contacto/, /apoio/, /privacidade/, and JSON-LD (schema enriched with telephone/address/geo/hours/sameAs/hasMap).
3. Zero fabricated content in production: testimonials/voices/portraits replaced with consented real ones or removed; no `[INSERIR…]` or `CONFIRMAR` markers in shipped HTML; privacy policy complete.
4. `/apoio/` reachable by internal links; `/alugar/` has an H1 and ≥300 words or a deliberate redirect decision; all commercial titles localized; insights ↔ services cross-linked.
5. Insight posts are real content (800+ words, true dates, named authorship) or unpublished.
6. Cache headers verified live (immutable on static assets including /media/); /alugar/ LCP image ≤200 KB eager; no unreferenced dev files deployed.
7. vercel.app duplicate host noindexed or redirected.
8. `npm run check` and `npm run build` green; re-crawl of all 14 indexable routes shows 200 + self-canonical + no unintended robots directives (i.e., §4's checks still pass).
9. GBP created/claimed with matching NAP and linked to the site (owner action, tracked here).
10. This audit's P1 list: every item closed or explicitly deferred by G in writing.

---

## Appendix A — What is already right (keep it that way)

Credit where due; none of this should be "fixed" into regression: host canonicalization and redirect topology; robots.txt; prerendered drift-proof-for-articles sitemap; single-source metadata in Base.astro with unique titles/descriptions and self-canonicals; integrity-by-design structured data (placeholders excluded, no fake reviews); full server-rendering incl. FAQ answers as progressive enhancement; correct absence of hreflang; immaculate pt-PT; honest "Sob consulta" pricing discipline; correctly-framed network awards; exact-match hero preloads; tiny JS budget; lazy video; `aria-label` coverage on all 174 icon-only controls; noindex hygiene; real 404s; and the decision to keep `/mobile-preview` out of the index. The team-roster names are real (54 entries, taken from the official roster) — only the portraits are not.

## Appendix B — Audit limitations

1. No GSC/Bing/analytics account access — indexation state and crawl stats are owner-reported/unverifiable from here (all such items labelled UNVERIFIED).
2. Lighthouse/PSI unavailable this session (API 429, anonymous quota; browser extension not connected) — performance findings are static-analysis; re-run PSI after Phase 2A.
3. SERP checks (`site:` on Google/Bing) not performed programmatically (ToS/reliability); premise taken from owner report and consistent with domain-age evidence.
4. Business facts (AMI, founding year, awards, GBP) cannot be verified from the repository — flagged in §18 rather than assumed.
5. whois `Creation Date` read as DD/MM/YYYY (08/07/2026) — confirmed by the one-year expiry pairing; if the registrar meant anything else, the Wayback/commit evidence still bounds the site's public existence to weeks at most.

*Report generated 2026-07-10 · repo `main @ e4dae30` · no repository files modified other than the creation of this report · nothing committed, pushed, or deployed.*
