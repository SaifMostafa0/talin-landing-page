import { createFileRoute } from "@tanstack/react-router";
import { contactSchema } from "../lib/contact/schema";
import { mailConfig, sendContactMessage } from "../lib/contact/mail.server";

// Best-effort per-instance rate limit. Serverless instances do not share memory,
// so this only slows down bursts; the honeypot and timing check do the rest.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!mailConfig()) return json({ ok: false, error: "unavailable" }, 503);

        const origin = request.headers.get("origin");
        if (origin && origin !== new URL(request.url).origin) {
          // Behind Vercel's proxy the request URL can differ in scheme; compare hosts, and reject unparseable origins ("null").
          let sameHost = false;
          try {
            sameHost = new URL(origin).host === new URL(request.url).host;
          } catch {
            sameHost = false;
          }
          if (!sameHost) return json({ ok: false, error: "forbidden" }, 403);
        }

        const length = Number(request.headers.get("content-length") ?? 0);
        if (length > 20_000) return json({ ok: false, error: "too-large" }, 413);

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "invalid" }, 400);
        }
        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);

        const { hp_field, elapsed, ...message } = parsed.data;
        // Bots: pretend success so they do not retry, but send nothing.
        if (hp_field || elapsed < 2500) return json({ ok: true });

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (rateLimited(ip)) return json({ ok: false, error: "rate-limited" }, 429);

        try {
          await sendContactMessage(message);
          return json({ ok: true });
        } catch (error) {
          console.error(`[contact] ${(error as Error).message}`);
          return json({ ok: false, error: "delivery-failed" }, 502);
        }
      },
    },
  },
});
