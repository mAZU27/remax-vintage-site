# Implementation, validation and release

## Source changes

| Area | Files | Result |
|---|---|---|
| Metadata/entity/indexing | src/layouts/Base.astro; src/lib/seo.ts; src/lib/site.config.ts; src/data/site.ts; public/robots.txt | Preserved production canonicals; distinct titles/descriptions, official profile linkage, consistent graph IDs, safe JSON-LD serialization, visible breadcrumbs, preview noindex and noscript reveal fallback |
| Recruitment | src/pages/carreiras.astro; src/data/carreiras.ts; CareersApplication.astro; CareersWhyJoin.astro | Porto/commercial spontaneous application, claim moderation, candidate answers, accurate optional filename-only CV description, semantic list repair |
| Buyers/contact | src/pages/comprar.astro; src/pages/contacto.astro; src/data/search-intent.ts; IntentAnswers.astro | Explicit external inventory, buyer criteria and viewing CTAs/subject prefill, verified agency link and contextual answers |
| Supporting pages | src/pages/vender.astro; sobre-nos.astro; privacidade.astro | Location/service metadata, non-guaranteed selling opening, CV privacy disclosure |
| Assessment | ValueSimulator.astro; ValuationForm.astro; src/data/valuation-config.ts; src/pages/index.astro | Assessment request replaces unsupported computed range and estimate payload; four forms dispatch confirmed outcome hooks |
| Measurement | src/lib/measurement.ts | Controlled local events; no tracker, storage or external transmission |
| Verification/docs | tests/seo-measurement.test.ts; package.json; scripts/validate-seo.py; scripts/qa-preview.py; README.md; docs/audits/seo-geo-2026-09-16 | Regression checks, safe UI harness, evidence/action/maintenance handoff |
| Evidence hygiene | .gitignore | Raw .firecrawl data excluded from commits |

No dependency/package-lock upgrade, route rename, database change or backend delivery configuration change.

## Checks actually completed

| Check | Result and boundary |
|---|---|
| Baseline test suite | 78 passed before edits |
| Updated npm test | 82 passed, 0 failed; four added canonical/schema/event tests plus existing lead/router/footer coverage |
| npm run check | 0 errors,0 warnings; one pre-existing unused-import hint in Footer.astro |
| npm run build | Passed with existing Vercel adapter |
| Production built HTML audit | 16 HTML files,9 sitemap URLs,748 internal links/anchors; errors[] |
| Preview build | VERCEL_ENV=preview build + --preview audit passed; nine sitemap pages noindex, placeholders noindex; production canonicals retained |
| JSON-LD | Parsed on all built pages, required local graph/crumb assertions passed, official agency ID checked; not a hosted Google Rich Results Test |
| Link/metadata/content | PT-PT, distinct nonempty sitemap page metadata, canonical/sitemap agreement, one source H1 per standard commercial page; intentional responsive homepage heading alternatives preserved |
| Mobile UI | 390×844 buyer/career/home layout and no horizontal overflow on checked pages; mobile menu opens and navigates to careers; candidate FAQ aria-expanded toggles |
| Desktop UI | 1440×1000 buyer hero/CTAs inspected; no horizontal overflow; contact/viewing path works |
| Buyer form | Local502 failure retains data/noevent;200 delivered:false remains failure/noevent; retry200 delivered:true shows success and one buyer_enquiry |
| Recruitment form | Local502 failure retains data/noevent; retryconfirmed success yields one recruitment_submission; optional CV instructions match source filename-only payload |
| Valuation modal | Six steps complete, property details shown without estimate;502 error/noevent; retryconfirmed success yields one seller_enquiry; captured payload field names omit estimate_low/high |
| Inline assessment form | Local failure shows error/noevent; confirmed retry success yields one seller_enquiry |
| Viewing route | /contacto?assunto=visita#formulario preselects visit; confirmed mock submission emits viewing_request |
| Interaction classification | Unit-tested official inventory buy and telephone mapping; no claim of actual completed phone calls or portal conversions |
| Console | No browser errors/warnings returned for inspected buyer page; expected mock502 responses in form tests are intentional |
| Diff hygiene | git diff --check passed |

Synthetic tests used `seo-test@example.invalid` and the loopback mock endpoint. The harness never forwards requests. No real emails, CV uploads, external CRM leads or appointment bookings were created. End-to-end live delivery/inbox receipt is not proven by these tests.

## Limits and outstanding checks

Search Console indexing/positions, GA4 reporting, GBP activity and field Core Web Vitals were unavailable. No Lighthouse benchmark or external rich-result validator run is claimed. Google/AI inclusion has not been measured. Browser QA samples representative viewports/journeys; it is not a full assistive-technology audit or exhaustive device matrix.

The added FAQs use the existing accordion and accessible buttons/regions, with answers in source HTML. No JobPosting is appropriate for this evergreen page: [Google requires a specific single job posting](https://developers.google.com/search/docs/appearance/structured-data/job-posting). Existing /apoio FAQ vocabulary is not a rich-result promise.

## Exact release workflow

1. Review the draft PR and Vercel branch preview associated with its current SHA. Verify /carreiras/, /comprar/, /contacto?assunto=comprar#formulario and the assessment flow visually. Do not submit preview forms unless their backend is explicitly a safe test environment.
2. Confirm preview HTML has noindex and production canonical URLs. Deployment authentication may also protect preview; noindex is not access control.
3. Agency confirms the revised copy and release. Production was not authorized merely by this SEO request, so no main merge is performed here.
4. Maintainer merges the reviewed branch into main through the existing GitHub workflow. Vercel automatically builds production. Preserve existing server-only delivery variables. Ensure production VERCEL_ENV=production and SITE_NOINDEX is not true.
5. Record production SHA/deployment URL/time. GET the six priority pages, sitemap.xml and robots.txt; check200, page metadata/canonicals, absence of priority noindex, genuine404 for a missing path and HTTPS/apex redirects.
6. With the receiving team's agreement, run one clearly labeled end-to-end form check if required, verify receipt and exclude it from reports. Keep personal values out of evidence.
7. Connect GSC, submit sitemap and inspect priority URLs. Record crawl/indexing state honestly; request recrawl only after the new content is live.

Rollback: use the existing Vercel deployment history to restore the last known-good production deployment, or revert this PR on main and let Vercel rebuild. No database migration or credential rollback is required. Repeat production HTTP/indexing and delivery checks after rollback. Local test fixtures and ignored raw research must never become a public server endpoint.
