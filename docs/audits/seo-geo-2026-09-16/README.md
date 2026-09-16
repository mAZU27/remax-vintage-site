# SEO and GEO implementation handoff — 16 September 2026

Scope: https://remaxcollectionvintage.pt/, recruitment and buyers first, sellers supported. Report language: English; website copy: PT-PT.

The most consequential limitations are external-only property inventory and unavailable Search Console/analytics reporting. The existing technical crawl foundation is sound. This change improves recruitment and buyer intent, honest application/assessment journeys, entity markup, preview indexing controls and privacy-safe measurement hooks.

## Contents

- [Audit and evidence](audit.md)
- [Search-intent and page map](intent-map.md)
- [Prioritized actions and final implementation status](actions.md)
- [Implementation, validation and release steps](validation.md)
- [External/manual actions and prepared copy](manual-actions.md)
- [Measurement and 30/60/90-day maintenance plan](measurement.md)
- Public machine evidence: [HTTP baseline](http-baseline.json), [production build checks](built-production-checks.json), [preview build checks](built-preview-checks.json)

- [Current publication status and prepared PR](release-record.md)

## Delivery boundaries

Implemented and locally tested on `codex/seo-geo-porto-20260916`, from production baseline `c7f20a8e1935acfe346fe7654775d91481db2d97`. Published to a review branch with draft PR #2 and a READY Vercel preview; see the release record for links and authentication limits. No production merge, property feed import, CRM mutation, live form submission, analytics activation, profile edit, outreach or review request was performed.

Implemented is distinct from published; crawlable is distinct from indexed; neither implies ranking or AI citation. Search visibility and qualified-lead changes cannot yet be measured. First visibility review: 30 days after authorized publication, then day 60 and day 90. Immediate next checkpoint: review the preview, approve the release through the existing workflow, and grant property-level Search Console access.
