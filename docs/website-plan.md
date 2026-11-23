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

## Design revisions (2026-11-23)

Four review rounds on the `design-revisions-2` branch, merged into `main` as commit `d706651` and live at talin-landing-page.vercel.app the same day. The before/after review page with the client's notes for each round is a private Claude artifact (Talin Revision Review).

- **Every page.** Sections no longer go blank in full-page screenshots. Calmer call to action band. Footer spread evenly across the width. CID logo file reduced from 5,975 px to 960 px wide.
- **Home.** Two connected modes as one split panel. Service tiles that widen to show their summary. Why Talin as one joined grid with icons. "Who we are" label above the statement.
- **About.** Vision and mission split by a thin rule. By CID Consulting: logo beside a full-width statement with the figures (three decades, 500+ projects, 300+ clients) highlighted in the text; the separate counting figures were removed. Our commitments: title and intro beside the four words, one highlighted at a time. Flat navy leadership cards, three across.
- **What we do.** Modes stacked on the right. Five pillars in one row. Service flip cards of equal height with summaries on one baseline, a tap icon in the corner, and the agentic AI note behind an "i". What our clients gain: centred checks on a continuous line, filled in turn by a travelling light.
- **How we work.** How we partner on a light background. VALUE: full-width title, phases as slides that fit the phase in view, with the letters and arrows above.
- **Insights and Contact.** The two planned articles show as non-link "Planned" cards until an article with that title is published; no CTA band on Insights. The contact form has no preview note and matches the height of the details panel.
- **Still to review:** VALUE (round 3 change, not yet ticked by the client).

## Waiting on Talin or the owner

| # | Item | Effect until then |
| --- | --- | --- |
| 1 | Sanity: project `itvdkt2i` and Studio (talin.sanity.studio) are set up and connected. Still to do: invite Talin's editors | Only the owner can publish |
| 2 | Article content: only the two titles exist ("The Disappearing Apprenticeship", "The Cost Centre Trap") | A placeholder "Sample article for layout preview" (Sanity id `sample-layout-preview`) is published for style review. **Delete it before launch** |
| 3 | Resend account, `talindata.com` verified for sending, `RESEND_API_KEY` and `CONTACT_FROM` in Vercel | On talindata.com the Contact page shows an email button. On any other address (vercel.app) it shows the form and sends nothing. Since 2026-11-23 there is no "Preview" note, so the form shows the normal confirmation even though nothing is delivered |
| 4 | Privacy notice for the form (personal data; PDPL). The content document has none | Should be added before the form goes live |
| 5 | Open roles and how applications are received ("to be confirmed" in the document) | Careers links to cidconsulting.com/careers |
| 6 | Higher-resolution approved portraits (Ahmed's is 400 px) | Current photos, shown at small sizes |
| 7 | Dalia's bio says "Co-Founder and Chairperson of CID Consulting"; her card says "Co-Founder & Chairperson". Used verbatim; worth confirming | — |
| 8 | Point talindata.com at this site | The new site is live at talin-landing-page.vercel.app for review; talindata.com still serves the old landing page from another Vercel project |
| 9 | Optional: analytics (Vercel Web Analytics is cookieless) | None |
