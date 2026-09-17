## Plan: Talin Dark-First Landing Page

Build a new Vite + React single-page landing page for Talin using the approved PDF copy verbatim, a dark-first deep-blue/black visual system, and the supplied Talin raster lockups. The page should move visitors through the brand story from complexity to clarity, use responsive section layouts and purposeful motion, and finish with a mailto contact CTA.

**Steps**
1. Bootstrap the empty repository as a Vite + React app with package scripts for dev, build, and lint/type validation. Establish a semantic page shell and global CSS tokens for the Talin palette, Raleway/Urbanist typography, spacing, focus states, and reduced-motion behavior.
2. Review/extract the approved text from `talin-assets/Talin Landing Page Content Phase1.pdf` and brand rules from `talin-assets/Talin Brand Identity.pdf`; preserve wording and hierarchy while converting PDF layout into accessible HTML content. Keep the DWG as source artwork only and use the supplied PNG lockups as web assets.
3. Build the shared page chrome: sticky/compact header, correct high-contrast Talin lockup, anchor navigation for About, What We Do, How We Work, Leadership, and Contact, plus a mobile menu or collapsed navigation with keyboard support.
4. Build the narrative sections in page order:
   - Hero: “Human-Led Intelligence,” value proposition, primary “Let’s Talk” mailto CTA, secondary scroll CTA, and a restrained Talin Star-inspired focus/clarity visual.
   - About: vision, mission, six core values, three commitments, and the 30+ year CID Consulting heritage statement.
   - What We Do: Advisory and Delivery modes with the six service areas as scannable, monoline-icon cards or rows.
   - How We Work: Business-First and Tech-Agnostic principles plus a five-step engagement flow with a clear progression line.
   - Leadership: Ahmed Salama and Dalia Wahba bios, using approved copy and an editorial two-person layout.
   - Contact: “Let’s Talk,” approved closing language, mailto action, and “A CID Consulting Company” endorsement.
5. Add brand-consistent interaction details: scroll reveal/stagger only where it improves hierarchy, hover/focus transitions, active navigation state if useful, and abstract star/curve background treatments that remain geometric, subtle, and never rotate or distort the logo. Respect `prefers-reduced-motion`.
6. Apply responsive layout rules for desktop, tablet, and mobile: keep logo clear space/proportions, stack service/value/leadership content cleanly, prevent wide lockups from overflowing, keep CTA targets touch-sized, and maintain readable type without viewport-scaled font sizing.
7. Validate the complete flow with the production build and local browser checks: all anchors scroll correctly, mailto CTA resolves, assets load, typography has fallbacks, keyboard focus is visible, contrast is acceptable, no horizontal overflow exists at mobile width, and the visual page is nonblank and correctly framed at desktop/mobile viewports.

**Relevant files**
- `/home/saif/talin-landing-page/package.json` — create Vite/React scripts and dependencies.
- `/home/saif/talin-landing-page/index.html` — document metadata, font loading strategy, and root mount.
- `/home/saif/talin-landing-page/src/main.jsx` — React entry point.
- `/home/saif/talin-landing-page/src/App.jsx` — semantic single-page composition and section data/rendering.
- `/home/saif/talin-landing-page/src/styles.css` — design tokens, layout, responsive rules, animations, and accessibility states.
- `/home/saif/talin-landing-page/talin-assets/Talin logo w-01.png` and `/home/saif/talin-landing-page/talin-assets/Talin logo w-02.png` — inspect and use the white/high-contrast logo variants where they are transparent and suitable; otherwise prepare a browser-safe exported asset.
- `/home/saif/talin-landing-page/talin-assets/Talin logo -01.png` through `-09.png` — inspect for approved dark/full/reduced lockup variants before selecting the header/footer asset.
- `/home/saif/talin-landing-page/talin-assets/Talin logo .dwg` — retain as source reference; do not use directly in the browser.
- `/home/saif/talin-landing-page/talin-assets/Talin Landing Page Content Phase1.pdf` — authoritative section copy and hierarchy.
- `/home/saif/talin-landing-page/talin-assets/Talin Brand Identity.pdf` — authoritative logo, typography, color, clear-space, and visual-language rules.

**Verification**
1. Run dependency install, then `npm run build` and the configured lint/type check.
2. Start the Vite dev server and inspect desktop and mobile browser renders at representative widths.
3. Check every header/footer anchor, CTA focus/hover state, and `mailto:` action.
4. Confirm all image assets return successfully and the selected lockup has correct contrast, clear space, and no distortion.
5. Check keyboard-only navigation, semantic heading order, image alt text, visible focus, reduced motion, and no horizontal overflow.
6. Take desktop/mobile screenshots and inspect the hero, section transitions, leadership, and contact closing for overlap, clipping, or unreadable text.

**Decisions**
- Use Vite + React because the repository is empty and the requested experience is a static single page.
- Preserve the approved PDF copy verbatim; only presentation and responsive grouping may change.
- Use `mailto:` for the initial contact CTA; no backend or form submission is in scope.
- Dark mode is the default and primary experience; use deep black/deep blue backgrounds with white, grey, and approved blue-spectrum accents.
- Use supplied PNGs for the first implementation; convert/export the DWG only if the PNGs cannot provide a sufficiently clear transparent lockup.
- Keep the first implementation to one page and exclude CMS, analytics, authentication, and server-side form handling.

**Further Considerations**
1. If the PDF contains contact details or a specific email address, use that exact approved address in the mailto CTA; otherwise use a clearly marked placeholder that can be replaced before launch.
2. If the supplied white PNGs are opaque white-background renders rather than transparent assets, export a transparent SVG/PNG from the DWG or a suitable logo source before final visual QA.
