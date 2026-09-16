# Delivery record — 16 September 2026

Implementation commit: `9f7bcde` on local branch `codex/seo-geo-porto-20260916`, in this repository. The working changes were committed after all substantive checks passed.

Current publication status: **local tested preview only**. No GitHub review branch, PR, hosted Vercel preview or production release was created at this checkpoint.

The GitHub connector upload was rejected by automatic approval review because the full tree payload (312,367 bytes) exceeds its 200,000-byte review limit. No alternative publishing route was attempted. Explicit permission to publish the review branch and draft PR was requested. This is an upload-review limit, not a failing application test.

The local mock preview is served by `python3 scripts/qa-preview.py` at http://127.0.0.1:4322 while that process is running. It never delivers forms externally. See [validation](validation.md) for reproducible checks and exact production release/rollback steps.

## Prepared draft PR

Title: Improve Porto recruitment, buyer journeys and SEO integrity

Body:

The careers and buying pages lacked clear local intent and enquiry routing. The valuation journey also calculated and submitted prices from placeholder data even though no range was displayed.

This change clarifies PT-PT recruitment and buying content, discloses filename-only CV handling, routes buyer and viewing enquiries, and turns the valuation modal into a professional-assessment request without calculated prices. It preserves existing URLs and delivery integrations while adding verified agency/breadcrumb markup, preview noindex guards and privacy-safe local outcome hooks.

Validation: 82 tests passed; Astro check has 0 errors and 0 warnings (one existing hint); production and preview builds passed. Built-route audit checked 16 HTML files, nine sitemap URLs and 748 internal links/anchors. Local-only browser tests covered confirmed/failed form submissions, delivered:false, mobile navigation, FAQ behavior and representative responsive layouts. No live submissions were sent.

Review limits: analytics collection is not connected, Search Console property access is unavailable, native inventory requires an authorized feed, and business hours/benefit/guide details need agency confirmation. Full evidence, action statuses and release/rollback plan are in `docs/audits/seo-geo-2026-09-16/`.

Draft for review. Do not merge until the agency authorizes production publication.
