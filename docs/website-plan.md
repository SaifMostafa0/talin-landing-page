# Talin website: implementation status

Source of truth for copy: **Talin Full Website Content v1.3**, in `talin-assets/`. Built on 2026-11-17 on the `full-website` branch.

## Built

- **Pages.** Home, About, What we do, How we work, Insights (list with topic filter, plus article pages), Careers, Contact and a 404 page. Every section follows the content document's order and wording. An automated diff checked the visible text of every page against the PDF.
- **Header and footer on every page.** The header has the six nav links and a "Get in touch" button to `/contact`. On mobile, the menu keeps keyboard focus inside it and closes on Escape.
- **Articles and open roles.** Talin's team edits them in Sanity Studio (`studio/`). Repository files override Sanity, and `CONTENT_SOURCE=local` switches Sanity off entirely. Invalid entries are dropped, the site falls back when Sanity is down, and the build checks repository files.
- **Contact form.** It has Name, Organization, Work email, Message and "Send message", followed by the exact confirmation text. Delivery goes through Resend, with honeypot, timing, rate-limit and origin checks. Until Resend is configured, the page shows an email button instead.
- **Search and sharing.** Per-page search titles and descriptions from the document, canonical URLs, Open Graph and Twitter tags, a 1200×630 sharing image, `sitemap.xml` (including articles), `robots.txt`, Organization and Article data for search engines.
- **Old links.** One-page anchors (`/#about`, `/#services` and so on) forward to the new pages.
- **Cleanup.** Removed the prototype routes, about 16 MB of unused assets, the Lovable error reporting, 46 unused UI-kit files, the Zoho careers scaffold, and the 4,300-line layered stylesheet. The new stylesheet is one organized file.
- **Checks passed.**
  - Type check, lint (0 warnings) and build.
  - axe accessibility scan on every page (0 violations after one fix).
  - No horizontal scroll at 375 px.
  - Reviewed at 375 and 1440 px.
  - Reveal animations are pure CSS, so there's no hydration mismatch, and they're off for reduced motion.

## Waiting on Talin or the owner

| # | Item | Effect until then |
| --- | --- | --- |
| 1 | Sanity project: create it, deploy the Studio, invite editors, set `SANITY_PROJECT_ID` in Vercel (README → Sanity Studio) | Articles and roles come from the repository only (none yet) |
| 2 | Article content: only the two titles exist ("The Disappearing Apprenticeship", "The Cost Centre Trap") | Insights shows "No articles have been published yet."; Home hides "Latest insights" |
| 3 | Resend account, `talindata.com` verified for sending, `RESEND_API_KEY` and `CONTACT_FROM` in Vercel | Contact page shows an email button instead of the form |
| 4 | Privacy notice for the form (personal data; PDPL). The content document has none | Should be added before the form goes live |
| 5 | Open roles and how applications are received ("to be confirmed" in the document) | Careers links to cidconsulting.com/careers |
| 6 | Higher-resolution approved portraits (Ahmed's is 400 px) | Current photos, shown at small sizes |
| 7 | Dalia's bio says "Co-Founder and Chairperson of CID Consulting"; her card says "Co-Founder & Chairperson". Used verbatim; worth confirming | — |
| 8 | Push the branch, check the Vercel preview, point the domain | Nothing is deployed |
| 9 | Optional: analytics (Vercel Web Analytics is cookieless) | None |
