import "@tanstack/react-start/server-only";
import { hiddenArticleSlugs, hiddenRoleIds } from "../../content/overrides";
import { localRoles } from "../../content/roles";
import { parseMarkdownArticle, slugFromPath } from "./markdown";
import type { Article, ArticleSummary, Role } from "./schema";
import { sanityArticle, sanityArticleSummaries, sanityConfig, sanityRoles } from "./sanity.server";

// Merges Sanity content with repository overrides.
// Precedence: hidden list > repository file > Sanity.

const rawFiles = import.meta.glob<string>("/src/content/insights/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const localArticles = new Map<string, Article>();
for (const [path, raw] of Object.entries(rawFiles)) {
  if (path.endsWith("/README.md")) continue;
  const slug = slugFromPath(path);
  try {
    localArticles.set(slug, parseMarkdownArticle(slug, raw));
  } catch (error) {
    // scripts/check-content.ts blocks this at build time; never take the site down for it.
    console.error(`[content] ${(error as Error).message}`);
  }
}

function sanityEnabled() {
  return process.env["CONTENT_SOURCE"] !== "local" && sanityConfig() !== null;
}

// Short in-memory cache so a burst of visits does not hit Sanity on every request.
const TTL_MS = 60_000;
const cache = new Map<string, { at: number; value: unknown }>();

async function cached<T>(key: string, load: () => Promise<T>, fallback: T): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as T;
  try {
    const value = await load();
    cache.set(key, { at: Date.now(), value });
    return value;
  } catch (error) {
    console.error(`[content] ${key}: ${(error as Error).message}`);
    // Serve the last good value if there is one, otherwise the repository-only fallback.
    // Remember the outcome for 15s so an outage doesn't make every visit wait for a timeout.
    const value = hit ? (hit.value as T) : fallback;
    cache.set(key, { at: Date.now() - TTL_MS + 15_000, value });
    return value;
  }
}

const hiddenSlugs = new Set(hiddenArticleSlugs);
const hiddenRoles = new Set(hiddenRoleIds);

function summaryOf({ body: _body, ...summary }: Article): ArticleSummary {
  return summary;
}

export async function listArticles(): Promise<ArticleSummary[]> {
  const remote = sanityEnabled() ? await cached("articles", sanityArticleSummaries, []) : [];
  const bySlug = new Map<string, ArticleSummary>();
  for (const article of remote) bySlug.set(article.slug, article);
  for (const article of localArticles.values()) bySlug.set(article.slug, summaryOf(article));
  return [...bySlug.values()]
    .filter((article) => !hiddenSlugs.has(article.slug))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (hiddenSlugs.has(slug)) return null;
  const local = localArticles.get(slug);
  if (local) return local;
  if (!sanityEnabled()) return null;
  // Only fetch bodies for published slugs, so unknown URLs never hit Sanity or grow the cache.
  const known = await listArticles();
  if (!known.some((article) => article.slug === slug && article.source === "sanity")) return null;
  return cached(`article:${slug}`, () => sanityArticle(slug), null);
}

export async function listRoles(): Promise<Role[]> {
  const remote = sanityEnabled() ? await cached("roles", sanityRoles, []) : [];
  const byId = new Map<string, Role>();
  for (const role of remote) byId.set(role.id, role);
  for (const role of localRoles) byId.set(role.id, role);
  return [...byId.values()].filter((role) => !hiddenRoles.has(role.id));
}
