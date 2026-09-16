# Measurement and maintenance

Primary question: are relevant people finding the right pages and producing useful enquiries/applications? Audit scores and raw clicks are supporting diagnostics.

## Baseline and collection boundary

As of 16 September 2026, Search Console property access and GA4 reporting are unavailable. No numeric visibility/conversion baseline is invented. CRM schema access exists, but ingestion coverage, test-record exclusion and qualification definitions are unverified. No claim of “zero leads” follows from missing reporting.

This release adds in-memory DOM hooks only. They create no cookies, storage or network requests and retain the existing form consent behavior. A future collector must be explicitly configured and reviewed for consent/privacy before forwarding. Form contact consent is not automatically analytics consent. Do not add raw form fields, URLs, UTM free text, submission IDs or CV filenames to analytics.

## Outcome contract

| Event | Trigger/grain | Meaning | Not equivalent to |
|---|---|---|---|
| recruitment_submission | Once per submission ID in a page session after HTTP success and delivered:true | Backend-confirmed application submission | Suitable candidate, interview or hire |
| buyer_enquiry | Same; contacto subject Comprar um imóvel | Buyer enquiry accepted by backend | Qualified buyer |
| seller_enquiry | Same; assessment forms or seller/market-study contact subject | Seller/assessment enquiry accepted | Instruction or verified valuation |
| viewing_request | Same; contacto subject Agendar uma visita | Request received | Confirmed appointment or attended viewing |
| contact_enquiry | Same; other contacto subject | Other contact request | Qualified opportunity |
| property_search_click | Click to configured official buy/rent inventory | Outbound interaction (inventory=buy/rent) | Lead, listing page view or sale |
| phone_click | Click on tel link | Call intent | Connected call or qualified lead |

Details contain only controlled `event`, `form` or `inventory` values. Deduplication IDs remain local and are not in event details. A new page/reload has a new memory context; downstream collection must define its own retry/deduplication. Existing server idempotency remains the delivery authority. Provider acceptance does not prove inbox reading or CRM qualification.

## Implementable reporting once access is granted

1. Search Console owner connects the exact production property; export last 28 complete days and preceding 28, allowing the reporting lag. Use Portugal country and mobile/desktop breakdowns; retain all-country view for international buyers.
2. Group pages: careers, buying, selling, brand/contact. Split branded queries (RE/MAX/rem ax variants + Vintage/Collection Vintage) from nonbrand, recognizing RE/MAX-only searches are franchise brand, not necessarily office brand.
3. Report impressions, clicks, CTR=clicks/impressions and Google-reported average position. Do not average page CTRs or positions blindly. Query anonymization means query sums can differ from total property counts.
4. Data/CRM owner verifies website source mapping and organization scope. Deduplicate by lead/submission key, exclude documented tests/spam and erased records. Do not filter personal content in public exports.
5. Report accepted submissions separately from unique CRM leads. Define qualified candidate (reviewed, role/location fit and willingness to discuss terms), qualified buyer (criteria/budget/timing reviewed), qualified seller (property/authority/contact confirmed), and confirmed viewing (agency explicitly schedules). Owner must approve definitions before baselining.
6. Reconcile form→delivery→CRM using a consented controlled end-to-end test with the receiving team; no such live test was performed here. Explain gaps rather than silently joining mismatched totals.
7. Choose an existing licensed analytics destination if one exists; otherwise evaluate a low-cost solution and its consent/privacy requirements. No purchase is needed to keep the code hooks or monthly GSC/CRM exports.
8. GBP owner exports views/searches/calls/website actions when available; phone/click counts remain interactions. AI referral grouping requires a functioning analytics destination and non-sensitive referrer data; unattributed/dark traffic remains unknown.

Conversion rates require matching denominators. Do not divide all CRM leads by organic clicks unless attribution coverage is known. For recruitment, use qualified applications/accepted applications as a quality rate once both are complete. If counts are small, show counts and uncertainty instead of overinterpreting percentage swings.

## Review schedule

| Checkpoint | Owner/actions | Decision evidence |
|---|---|---|
| Release/day 0 | Developer + agency approve preview; verify production noindex absent and API configuration preserved; owner connects GSC | Deployment SHA, live HTTP/meta/sitemap checks, access proof; mark baseline unknown until available |
| Day30 | SEO/data: indexing/canonical exclusions, sitemap coverage, audience/page/device/country trends; agency: review enquiry quality and response process | Last28 complete days against comparable pre-release 28; annotate seasonality and missing collection periods |
| Day60 | Agency + SEO: refine FAQs based on actual candidate/buyer questions, review CTR at comparable positions, verify hours/claims and profile activity | Qualified outcomes and query/page gaps; no new neighbourhood pages without distinct verified content |
| Day90 | Agency + developer: assess native inventory business case, content usefulness and maintenance costs; continue/revise priorities | Visibility plus qualified outcomes, feed access/rights and freshness cost, not ranking promises |

If published 16 September, provisional dates are 16 October, 15 November and 15 December 2026; otherwise shift from the actual publication date. These are review checkpoints, not ranking deadlines.

Monthly: check404s/redirects, crawl/noindex/sitemap drift, lead error rates, unsupported claims, third-party listing links and dependency advisories. Quarterly: rights/identity/profile review, local content accuracy, form privacy and analytics consent review. Record owner/date/evidence for changes. Keep property availability current if a feed is later approved.
