import { createFileRoute } from "@tanstack/react-router";
import { contentStatus } from "../lib/content/repository.server";

// Quick check that the deployment can see Sanity. Lists counts and configuration, never secrets.
export const Route = createFileRoute("/api/content-status")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(await contentStatus(), {
          headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
        }),
    },
  },
});
