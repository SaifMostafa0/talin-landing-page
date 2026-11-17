import "@tanstack/react-start/server-only";
import { articleSummarySchema, roleSchema, type Article, type ArticleSummary, type Json, type Role } from "./schema";

// Read-only access to the Talin Sanity dataset over the HTTP query API.
// Only published documents are read; drafts never reach the website.

const API_VERSION = "2025-02-19";
const TIMEOUT_MS = 5000;

export function sanityConfig() {
  const projectId = process.env["SANITY_PROJECT_ID"]?.trim();
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) return null;
  const dataset = process.env["SANITY_DATASET"]?.trim() || "production";
  const token = process.env["SANITY_READ_TOKEN"]?.trim() || undefined;
  return { projectId, dataset, token };
}

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  const config = sanityConfig();
  if (!config) throw new Error("Sanity is not configured");
  const host = config.token ? "api.sanity.io" : "apicdn.sanity.io";
  const url = new URL(`https://${config.projectId}.${host}/v${API_VERSION}/data/query/${config.dataset}`);
  url.searchParams.set("query", groq);
  url.searchParams.set("perspective", "published");
  for (const [key, value] of Object.entries(params)) url.searchParams.set(`$${key}`, JSON.stringify(value));
  const response = await fetch(url, {
    headers: config.token ? { Authorization: `Bearer ${config.token}` } : {},
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Sanity query failed with HTTP ${response.status}`);
  const payload = (await response.json()) as { result: T };
  return payload.result;
}

const SUMMARY_FIELDS = `"slug": slug.current, title, summary, topic, "date": publishedAt`;

/** Drops (and logs) documents that fail validation, so one bad entry never breaks a page. */
function keepValid<T>(items: unknown[], parse: (item: unknown) => T | null, kind: string) {
  const valid: T[] = [];
  for (const item of items) {
    const parsed = parse(item);
    if (parsed) valid.push(parsed);
    else console.warn(`[content] Skipped an invalid ${kind} from Sanity:`, JSON.stringify(item).slice(0, 300));
  }
  return valid;
}

function parseSummary(item: unknown): ArticleSummary | null {
  const parsed = articleSummarySchema.safeParse(item);
  return parsed.success ? { ...parsed.data, source: "sanity" } : null;
}

export async function sanityArticleSummaries(): Promise<ArticleSummary[]> {
  const items = await query<unknown[]>(
    `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) { ${SUMMARY_FIELDS} }`,
  );
  return keepValid(items ?? [], parseSummary, "article");
}

export async function sanityArticle(slug: string): Promise<Article | null> {
  const config = sanityConfig();
  if (!config) return null;
  const item = await query<(Record<string, unknown> & { body?: unknown }) | null>(
    `*[_type == "article" && slug.current == $slug][0] { ${SUMMARY_FIELDS}, body }`,
    { slug },
  );
  if (!item) return null;
  const summary = parseSummary(item);
  if (!summary || !Array.isArray(item.body) || item.body.length === 0) {
    console.warn(`[content] Sanity article "${slug}" is incomplete and was not shown.`);
    return null;
  }
  return {
    ...summary,
    body: { format: "portableText", blocks: item.body as Json[], image: { projectId: config.projectId, dataset: config.dataset } },
  };
}

export async function sanityRoles(): Promise<Role[]> {
  const items = await query<unknown[]>(
    `*[_type == "openRole" && defined(title) && defined(url)] | order(coalesce(position, 1000) asc, _createdAt desc) { "id": _id, title, url }`,
  );
  return keepValid(
    items ?? [],
    (item) => {
      const parsed = roleSchema.safeParse(item);
      return parsed.success ? parsed.data : null;
    },
    "role",
  );
}
