# RE/MAX Collection Vintage — Website

Astro 5 website for RE/MAX Collection Vintage, Porto. Pages are prerendered; the Vercel adapter runs `/api/lead` on demand. Production: https://remaxcollectionvintage.pt/.

## Develop and check

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
python3 scripts/validate-seo.py
```

Read `CLAUDE.md` for brand and implementation conventions. Its early static-site backlog is historical; the current site is in `src/`, assets in `public/`, tests in `tests/`, and documentation in `docs/`.

## Deployment and indexing

GitHub branches use Vercel previews; `main` is the production branch. Review a preview before an authorized merge. Production canonicals use the apex domain and trailing slash. Development, `VERCEL_ENV=preview`, or `SITE_NOINDEX=true` emits `noindex, follow`; placeholders and QA routes remain noindex in production.

```sh
VERCEL_ENV=preview npm run build
python3 scripts/validate-seo.py --preview
npm run build
```

Do not set `SITE_NOINDEX=true` in production. See the [September 2026 SEO handoff](docs/audits/seo-geo-2026-09-16/README.md) for release and rollback checks.

## Forms and safe testing

Forms submit to `/api/lead`; confirmed delivery requires `delivered: true`. Existing Resend/optional CRM configuration remains server-side. Read the lead implementation and current sections of `CLAUDE.md` before changing delivery. Do not expose credentials in client code or commit `.env` files.

For synthetic UI tests without external delivery:

```sh
npm run build
python3 scripts/qa-preview.py
# Open http://127.0.0.1:4322
# Choose a mock response in another terminal:
curl http://127.0.0.1:4322/__qa__/failure
curl http://127.0.0.1:4322/__qa__/unconfirmed
curl http://127.0.0.1:4322/__qa__/success
```

This loopback-only harness never forwards submissions and logs field names only. It serves built HTML and injects DOM event receipts solely for QA; it is not a deployment server. Use synthetic values only.

`vintage:measurement` hooks distinguish confirmed submissions from interactions. They send no network requests and are not a reporting system; a consent-reviewed collection destination is still required. CV selection sends only a filename, not a file upload, as disclosed in the form.

Property browsing remains on the official RE/MAX inventory. Do not restore archived listing content without an authorized, maintained feed and image/description rights.
