# Careers and the future Zoho Recruit connection

`/careers` is ready for review. It currently shows an honest coming-soon state; there are no sample vacancies or application submissions. Homepage desktop/mobile navigation and the footer link to it.

## Existing boundary

- `src/routes/api.careers.ts`: public `GET /api/careers`, short cache for successful responses; generic HTTP 503 with no caching on failure.
- `src/lib/careers.server.ts`: server-only `CareersProvider` interface and pending provider. Replace the pending provider with the eventual Zoho adapter here.
- `src/lib/careers.ts`: validated public contract, browser fetch function, and search/filter helper. Unknown fields are stripped by Zod; application URLs require HTTPS. Render descriptions as plain text.
- `src/routes/careers.tsx`: coming-soon, loading, unavailable/retry, live-empty, filtered-empty, and live job listing states. Search covers title, team, location, and summary. Team filters appear when jobs exist. Application links open the provider's hosted role/application page.

Successful responses:

```json
{ "status": "coming-soon", "jobs": [] }
```

Once connected, return `status: "live"`. Each job must provide `id`, `title`, `department`, `location`, `employmentType`, `summary` (plain text), and `applicationUrl` (public HTTPS). An empty live array means there are no current openings; a connection failure must throw, not return an empty list. Never publish internal records, recruiter contact details, or candidate data.

## When access becomes available

1. Confirm the Talin Zoho Recruit organization, data centre, API edition/access, published-opening rules, exact field API names, and hosted career/application URLs with its admin. Map only jobs approved for this public website; an internal "open" status alone is not proof that a job is public.
2. Configure OAuth on the server with the minimum read scope for approved job openings. Store client ID, client secret, refresh token, and the verified regional endpoints in the hosting provider's secret environment settings. Never use `VITE_` variables for secrets or put them in source control.
3. Implement a `.server.ts` provider: refresh/cache access tokens server-side; use timeouts, bounded retries, pagination and rate-limit handling; normalize approved openings into the public schema; strip rich HTML into plain text; validate application links against the confirmed hosted careers domain. Do not pass raw Zoho records through the endpoint.
4. Inject the adapter in `getCareersFeed`. Keep authentication/provider details off the client and keep failures distinct from a valid empty response. Verify the deployment supports the Start server endpoint, not just static files.
5. Test against the actual tenant: published vs. internal/closed jobs, pagination, expired tokens, quota limits, application redirects, and empty/error states. Agree any sorting/date rules before launch.

The initial application flow should use Zoho-hosted applications. A custom candidate form, CV storage, candidate writes, and privacy/consent content require a separate agreed scope. None is enabled by this scaffold. No Zoho requests or credentials are required to run the page now.

References: [TanStack server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes), [Zoho Recruit OAuth](https://www.zoho.com/recruit/developer-guide/apiv2/oauth-overview.html), [Zoho access and refresh tokens](https://www.zoho.com/recruit/developer-guide/apiv2/access-refresh.html).
