import { createFileRoute } from "@tanstack/react-router";
import { getCareersFeed } from "../lib/careers.server";

export const Route = createFileRoute("/api/careers")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await getCareersFeed(), {
            headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
          });
        } catch {
          // Do not expose provider errors, credentials, or raw recruitment data.
          return Response.json(
            { error: "Opportunities are temporarily unavailable" },
            {
              status: 503,
              headers: { "Cache-Control": "no-store", "Retry-After": "60" },
            },
          );
        }
      },
    },
  },
});
