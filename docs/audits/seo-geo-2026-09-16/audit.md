# Audit and evidence

Observed 16 September 2026, Europe/Lisbon. Sources: repository and built HTML, direct HTTP requests, Firecrawl live extraction/map and Portuguese public search, GitHub/Vercel deployment records, read-only Supabase schema/aggregate inspection, and GSC Wizard connection checks. No private lead values are included in this report. Raw Firecrawl data remains in ignored `.firecrawl/`; public evidence is summarized below.

## Implementation and control

- Repository: [mAZU27/remax-vintage-site](https://github.com/mAZU27/remax-vintage-site). Main baseline: `c7f20a8e1935acfe346fe7654775d91481db2d97`.
- Vercel production deployment `dpl_HkaabYD29b16GkiV5FjjNcpDfk52` uses that exact commit. Locally built HTML for all six priority routes matched live HTML by SHA-256 before edits.
- Astro 5, TypeScript, vanilla browser scripts; static page output plus on-demand `src/pages/api/lead.ts`. No CMS connection discovered. Content lives in `src/pages`, `src/data`, `src/content`.
- `Base.astro` generates titles, metadata, canonicals and an agency/site/page JSON-LD graph. `site.ts` owns NAP; `site.config.ts` owns external inventory URLs.
- Forms use same-origin API and require HTTP success plus `delivered:true`. Existing API uses Resend and optional Novus ingestion. Client filenames are not CV uploads. Retry idempotency already existed and was preserved.
- Our domain controls the service/career pages and enquiry routing. RE/MAX controls external listing publication, search, property metadata and availability.
- The matching Supabase project is healthy; inspected public tables have RLS enabled, the properties table is empty, and there are no deployed edge functions. CRM tables exist, but that is not evidence that every website lead is ingested or attributable. No private CRM counts are published as a baseline.

## Crawl and index baseline

| Test | Observation | Interpretation |
|---|---|---|
| Six priority pages | HTTP 200, page-specific content, source HTML, self-canonical | Crawlable, not proof of indexing |
| HTTP apex | 308 to HTTPS apex | Correct |
| HTTPS www | 308 to HTTPS apex | Correct |
| HTTP www | 308 to HTTPS www, then 308 apex | Two-hop chain; no blocker |
| Slash variants, e.g. /comprar | Both variants 200, same content; canonical /comprar/ | Existing consistency preserved; no speculative redirect change |
| robots.txt | Public crawling allowed, sitemap declared | Training permissions unchanged |
| Priority robots/X-Robots | No noindex on production priority routes | Eligible for indexing |
| XML sitemap | 9 URLs, all match production canonicals | No sitemap rewrite needed |
| Missing URL /seo-audit-missing-20260916 | Genuine 404 with noindex | Not a soft 404 |
| /insights and four article placeholders | noindex, excluded from sitemap | Retain until factual substantial articles exist |
| /mobile-preview | 200 and noindex, also disallowed in robots baseline | Removed disallow so crawlers can observe noindex |
| Preview builds | No explicit shared layout environment guard before change | Added and tested noindex guard |

Python's default redirect handler did not automatically follow 308 in the baseline script. Header inspection and separate destination requests confirmed the chain; this tool limitation was not reported as a site failure.

Indexable routes: `/`, `/comprar/`, `/vender/`, `/carreiras/`, `/sobre-nos/`, `/contacto/`, `/alugar/`, `/apoio/`, `/privacidade/`. Navigation connects the commercial pages; no commercial orphan was found. No new route or slug was introduced.

## On-page findings

Recruitment had broad benefit/commission/progression claims, ambiguous CV selection, and insufficient answers about the actual spontaneous-application process. Buyer content explained the process but did not sufficiently distinguish live property inventory from assistance, nor route a criteria-led enquiry prominently. Metadata was differentiated but some service/location signals were weak.

The valuation modal contained placeholder pricing inputs in `valuation-config.ts`. The displayed range was already blank, but its runtime still calculated and sent `estimate_low/high`, and the interface suggested an immediate estimate. The revised journey sends property details for agency assessment, without calculated prices.

Responsive homepage markup intentionally contains alternative desktop/mobile hero text. A mobile role-based heading replaces the visually hidden desktop H1. Repeated extraction was not treated as keyword duplication or grounds for a redesign. Relevant imagery has alt attributes in inspected buyer/career/home DOM. Editorial recruitment imagery is now labeled illustrative rather than presented as actual office photography.

Existing legal/tax examples, credit services, 24-hour response promises, training/mentoring detail, limited portfolio claims and neighbourhood demand language need business/professional confirmation. They were not expanded or used as validated market evidence. Specific unresolved items are in the manual checklist.

## Performance and usability

Existing responsive WebP imagery and preload configuration already avoid the historical multi-megabyte hero issue described in the old README. Sample source assets: desktop 1280 hero about 124 KiB; mobile 720 hero about 52 KiB; careers background about 168 KiB. Google Fonts remain external with preconnect and swap. Scroll reveals, mobile navigation and modal scripts are existing implementation costs; no new dependency or heavy library was introduced.

Browser QA used the Codex in-app browser on this Mac, loopback built assets, 390×844 and 1440×1000 viewports, without CPU/network throttling. Priority buyer/career layouts showed no horizontal overflow at the checked sizes. A noscript fallback now exposes reveal content. Form error/retry states, navigation and FAQ expansion were checked.

These are functional/visual observations, not Lighthouse or field Core Web Vitals. No reproducible LCP/INP/CLS benchmark was obtained. GSC Wizard's Core Web Vitals request could not run because the property was not connected. Do not claim a performance-score improvement.

## Verified entity and trust

[Official RE/MAX office 12382](https://www.remax.pt/pt/agencia/remax-collection-vintage/12382) was fetched live and confirmed:

- RE/MAX Collection Vintage; legal entity Vintage Patamar - Mediação Imobiliária, Lda.
- AMI 10092; founded 2014.
- Avenida da Boavista 3191/3195, 4100-137 Porto; +351 226 181 031.
- Official profile links to [Facebook](https://www.facebook.com/vintageremax), [Instagram](https://www.instagram.com/remax.vintage/) and [LinkedIn](https://www.linkedin.com/company/11261087). Social account ownership/content was not separately audited.

Website identity agrees with these core facts. Opening hours were not corroborated by the fetched profile. The profile's data-protection email is not assumed to be a general enquiry address. No Google Business Profile management access was available. The graph links to the official agency profile and does not add unverified hours, ratings, price ranges or email.

## Search account baseline

GSC Wizard reports no connected sites. Attempts to connect both `sc-domain:remaxcollectionvintage.pt` and `https://remaxcollectionvintage.pt/` returned not-found/no-property-permission. The Google account has Search Console scope, but this is not property access. No impressions, clicks, CTR, positions, indexing status or sitemap submission status were available. GA4 is not connected and no analytics collection code was found in this repository. Existing privacy copy says there is no traffic analytics.

Supabase's schema can support CRM outcomes later, but test records, ingestion coverage and lead qualification definitions must first be reconciled. It is not a substitute for Search Console or website analytics.

## Public search evidence

Firecrawl web search, location parameter “Porto, Portugal”, Portuguese queries, 16 September 2026, five results per query. This is a small search-provider sample, not a signed-in Google SERP, Maps audit, volume estimate or universal ranking measurement. Some returned pages cover Porto district rather than city. Listed competitors describe result types; their claims were not copied.

| Sample | Observed result mix | Consequence |
|---|---|---|
| recrutamento consultor imobiliário Porto RE/MAX | RE/MAX national recruitment; job boards including Net-Empregos, Indeed, LinkedIn and SAPO | Explain the local agency and application terms; do not pretend a spontaneous application is a listed vacancy |
| trabalhar numa imobiliária no Porto ser consultor imobiliário | Engel & Völkers career explainer, consultant-owned explanation, job board, discussion/video | Career-change questions are useful alongside the application |
| comprar casa no Porto apartamentos moradias à venda | Idealista, Supercasa, Casa Yes, Imovirtual, Sotheby's inventory collection | Strong live-inventory intent; a service page cannot fully satisfy it |
| comprar apartamento na Foz do Douro Porto | Engel & Völkers and Luximos collections plus property portals | Neighbourhood+type pages need real current inventory or distinct verified expertise |
| agência imobiliária Porto vender casa avaliação imóvel | Agency pages (Boa Venda, Maison Porto, Vila Mais) and valuation services (Idealista, iad) | Clear assessment/service intent fits /vender |

Representative primary competitor pages: [RE/MAX recruitment](https://www.remax.pt/pt/recrutamento), [Engel & Völkers career explainer](https://www.engelvoelkers.com/pt/pt/resources/consultor-imobiliario-part-time), [Sotheby's Porto collection](https://www.sothebysrealtypt.com/imoveis/venda/apartamentos+moradias/porto/porto). Search result counts and property prices are intentionally not reproduced as research facts.

## Inventory decision

Current property inventory is external-only, linked with office filter 12382; no active local listing route or embed supplies property data. Removed content is documented in `docs/PROPERTY-REMOVAL-AUDIT.md`. An empty Supabase properties table and archived sample pages are not an authorized feed.

Option A is implemented: clearer /comprar, buyer criteria, agency/local links and distinct visit requests, with explicit official-inventory CTAs. Our domain can answer service questions and earn enquiries; detailed listing searches primarily land on the external portal.

Option B needs a separate data agreement and maintained integration:

| Requirement | Decision needed before implementation |
|---|---|
| Source/access | Agency/RE/MAX-approved API or export with stable IDs, timestamps, availability and contact ownership; no scraping substitute |
| Rights | Written rights for descriptions, photos, floor plans and portal/photographer licenses, including withdrawal and retention |
| Sync | Agreed freshness SLA, incremental imports, removals, retries, failure alerts; hide availability if data is stale |
| Ownership | Named agency inventory owner and developer for ingestion/monitoring; agency verifies changed/withdrawn records |
| URL/content | Stable individual property URLs; self-canonicals for useful native pages. Confirm syndication constraints, don't point all properties to homepage or blindly to portal |
| Collections/filters | Only useful populated collections in sitemap; pagination crawlable, parameter combinations controlled; no empty near-duplicate neighbourhood pages |
| Sold/withdrawn | Remove from active search promptly; clear status if retained usefully. 404/410 when permanently removed; redirect only to a genuine successor, never unrelated listings |
| Effort | Planning estimate: 2–5 developer days for access/rights/data discovery, then 5–15 for a small import/collection/detail prototype and QA; re-estimate after sample feed |
| Recurring cost | Feed/license fee unknown; sync hosting/storage and maintenance depend on media volume/freshness. No subscription or spend authorized or started |

## GEO eligibility and limits

[Google AI search documentation](https://developers.google.com/search/docs/appearance/ai-features) states normal SEO/indexing and snippet eligibility apply; no additional special technical requirement. [OpenAI bot documentation](https://developers.openai.com/api/docs/bots) distinguishes OAI-SearchBot discovery from GPTBot training. Existing wildcard crawling permissions were preserved; no new model-training policy was introduced.

Readable service answers, agency identity and verifiable attribution improve factual clarity. This is a technical/content hypothesis, not proof of AI citations. No live AI mention sample or referral baseline was measured. No llms.txt, special AI schema, fabricated market data or guarantees were added.

RealEstateAgent is valid Schema.org vocabulary; it does not guarantee a Google rich result. Breadcrumbs follow [Google's two-item guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). New FAQs remain useful visible content without a promise of FAQ displays. No JobPosting was added to evergreen recruitment. [Astro's site/configuration reference](https://docs.astro.build/en/reference/configuration-reference/) informed canonical handling; installed Astro 5 builds were the compatibility check.
