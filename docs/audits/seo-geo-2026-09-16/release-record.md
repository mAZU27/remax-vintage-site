# Delivery record — 16 September 2026

Current publication status: **GitHub review branch and hosted Vercel preview**. [Draft PR #2](https://github.com/mAZU27/remax-vintage-site/pull/2) targets main and has not been merged. Production remains at baseline `c7f20a8e1935acfe346fe7654775d91481db2d97`.

- Branch: `codex/seo-geo-porto-20260916`.
- Implementation commit: `9f7bcde`; initial published head: `5de5075ecb4cadfb9bbc1c7ae8ebff36ea195bde`.
- [Branch preview](https://remax-vintage-site-git-5fe75d-henriqueaguiar2000-9493s-projects.vercel.app/).
- Verified initial preview deployment: `dpl_F8Dj53qhaGJ7Z2REMA6GkeGjQBot`, READY; GitHub Vercel status success.
- [Pinned implementation preview](https://remax-vintage-site-7eeqkix8n-henriqueaguiar2000-9493s-projects.vercel.app/).
- No production deployment, live form submission, CRM mutation or analytics activation performed.

## Approval and publication

The first connector tree upload exceeded automatic approval review's 200,000-byte limit. After the user explicitly approved publishing the branch and draft PR, the standard Git push succeeded. The initial upload block is resolved. A documentation-only follow-up records the final delivery status; the tested application code is unchanged.

## Hosted validation boundary

Vercel built the branch successfully using the existing Git integration. The hosted preview is protected by Vercel Authentication. Unauthenticated HTTP checks redirected to the Vercel login page; they are not evidence of the application's own 200/404 responses. The authenticated connector fetch also returned an SSO redirect, with `X-Robots-Tag: noindex`. No deployment-protection setting was weakened.

The application HTML noindex/canonical, sitemap,404 and form behavior checks remain those of the locally built production/preview artifacts documented in [validation](validation.md). Do not claim that protected hosted HTML was inspected. An authorized Vercel user should open the preview to review it. The local mock preview at http://127.0.0.1:4322 remains useful while `python3 scripts/qa-preview.py` is running; it never delivers submissions externally.

## Release gate

Review the draft PR and preview before separately authorizing a merge to main. Follow the exact [release and rollback steps](validation.md). The next visibility checkpoint is 30 days after actual production publication, with 60/90-day reviews thereafter.
