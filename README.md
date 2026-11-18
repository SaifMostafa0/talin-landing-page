# Talin website

The Talin website (talindata.com), built with React 19, TypeScript, TanStack Start, Tailwind CSS 4 and Vite, and deployed on Vercel.

The copy comes from **Talin Full Website Content v1.3** (`talin-assets/Talin Full Website Content_261116_131419.pdf`) and is used word for word.

## Development

```sh
npm install
cp .env.example .env   # optional: Sanity and contact-form settings
npm run dev
```

## Checks

```sh
npm run typecheck
npm run lint
npm run build          # runs the content check first
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/routes/index.tsx` |
| `/about` (`#leadership` for the team) | `src/routes/about.tsx` |
| `/what-we-do` | `src/routes/what-we-do.tsx` |
| `/how-we-work` | `src/routes/how-we-work.tsx` |
| `/insights`, `/insights/<slug>` | `src/routes/insights/` |
| `/careers` | `src/routes/careers.tsx` |
| `/contact` | `src/routes/contact.tsx` |
| `/api/contact` | `src/routes/api.contact.ts` (form endpoint) |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.ts` |

The header, footer, 404 page and organization data for search engines live in `src/routes/__root.tsx`. Shared building blocks are in `src/components/site/`, and all styles are in `src/styles.css`.

Old one-page links (`/#about`, `/#services`, `/#contact` and so on) are forwarded to the new pages.

## Where content lives

| Content | Source | Who edits |
| --- | --- | --- |
| Page copy | `src/content/*.ts` | Developers, only when the content document changes |
| Insights articles | Sanity (`article`) + `src/content/insights/*.md` | Talin team in Sanity Studio; developers in the repo |
| Open roles | Sanity (`openRole`) + `src/content/roles.ts` | Talin team in Sanity Studio; developers in the repo |

### Developer overrides for Sanity content

Sanity is the main source. The repository always wins, so a bad CMS entry can be fixed without touching the CMS:

- **Replace an article:** add `src/content/insights/<same-slug>.md` (format in that folder's README).
- **Hide an article or role:** add its slug or id to `src/content/overrides.ts`.
- **Add a role:** add it to `src/content/roles.ts`.
- **Ignore Sanity entirely:** set `CONTENT_SOURCE=local` in Vercel and redeploy.
- **Check what a deployment sees:** open `/api/content-status`. It shows whether the Sanity project ID is set, whether Sanity answers, and how many articles and roles it returns (no secrets).

Safety nets:

- Sanity entries that fail validation (missing title, invalid topic, non-HTTPS role link) are skipped and logged, not shown.
- If Sanity is unreachable, the site serves the last good content, or the repository content alone.
- A malformed repository file fails `npm run build`, so it never reaches production.
- Sanity responses are cached for 60 seconds per server instance, so a published change appears within about a minute.

## Sanity Studio

The Studio is in `studio/` (a separate package). The one-time setup needs a Sanity account:

```sh
cd studio
npm install
npx sanity login
npx sanity init --env            # create/select the Talin project; note the project id
SANITY_STUDIO_PROJECT_ID=<id> npm run deploy   # hosts the Studio at https://talin.sanity.studio
```

Then:

1. In Vercel, set `SANITY_PROJECT_ID` (and `SANITY_DATASET` if not `production`).
2. In sanity.io/manage → API → CORS origins, nothing is needed for the website, because it reads server-side.
3. Invite the Talin team as **Editors** in sanity.io/manage → Members.

Editor instructions are in `docs/studio-guide.md`.

## Contact form

The form posts to `/api/contact`, which validates the input and sends it through Resend. It has a hidden honeypot field, a submit-timing check, a per-instance rate limit, and a same-origin check. Until `RESEND_API_KEY` and `CONTACT_FROM` are set, the Contact page shows an email button instead of the form. See `.env.example`.

## Other folders

- `talin-assets/`: source brand files, content documents and design feedback (not served).
- `lovable-version/`: retained copy of the original Lovable export (not built).
