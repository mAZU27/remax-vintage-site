# Production release — 16 September 2026

**Live:** https://remaxcollectionvintage.pt/  
**Application release:** [merged PR #2](https://github.com/mAZU27/remax-vintage-site/pull/2), commit `f1d219c39ccffa735e393292eda0dead06a059d2`.  
**Vercel deployment:** `dpl_HbDPMesbEHcSboHUgcpPFZRaxXUh`, production, READY at 16:25:49 UTC. Deployment build phase took approximately 15.4 seconds (the build command reported 9 seconds). Framework: Astro 5.

The user explicitly authorized production publication. PR #2 was marked ready and merged using the expected reviewed head SHA. The existing main-branch Vercel integration rebuilt with production environment settings. The preview artifact was not promoted because preview HTML contains noindex.

## Production validation

[Machine-readable HTTP evidence](production-http-checks.json) records 18 read-only checks:

- All nine sitemap pages returned 200, their own production canonicals and no accidental noindex; current recruitment/buyer titles and revised assessment content were present.
- JSON-LD parsed on the commercial pages; one source H1 was present per sitemap page.
- Sitemap and robots.txt returned 200; sitemap contained the nine expected URLs.
- Insights and mobile QA pages retained noindex.
- A nonexistent URL returned a genuine 404 and noindex.
- HTTP and www requests redirected to the HTTPS apex.
- GET /api/lead returned 405 as designed. No real form submission, email, appointment or CRM record was created.
- GitHub's Vercel status for the release commit was success. Vercel production aliases included the apex and www hostnames.

Initial deployment-scoped error/fatal runtime log scan (since 1h, immediately after release) returned no matching entries. No build errors were reported. This short observation window is not proof of long-term reliability or live delivery. Log drains were not inspected. Search Console property access and analytics collection remain outstanding.

## Earlier preview and upload history

The first GitHub connector tree upload exceeded the automatic review payload limit. After explicit user approval, the standard Git push succeeded and the draft PR/preview were created. Preview authentication was preserved. Those preview HTTP checks reached Vercel SSO, so pre-release HTML/form validation used local production/preview builds. Production HTTP evidence above now verifies the public release.

## Review and rollback

First visibility/qualified-enquiry review: 16 October 2026; subsequent reviews 15 November and 15 December, subject to available collection coverage. These are checkpoints, not promised ranking dates.

The prior production deployment is `dpl_HkaabYD29b16GkiV5FjjNcpDfk52`, baseline commit `c7f20a8e1935acfe346fe7654775d91481db2d97`. Restore it through Vercel deployment history if a material regression appears, or revert PR #2 and rebuild. Follow [validation and release procedures](validation.md); no database migration was introduced.

Documentation-only follow-ups may have later commit/deployment IDs without changing the application code validated here.
