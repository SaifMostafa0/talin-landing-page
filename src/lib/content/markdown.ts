// Parses repository articles (src/content/insights/*.md). Pure module: used by
// the server at runtime and by scripts/check-content.ts during the build.
import { marked } from "marked";
import { articleSummarySchema, type Article } from "./schema.ts";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(block: string) {
  const data: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const match = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!match) throw new Error(`Unreadable frontmatter line: "${line}"`);
    const [, key = "", rawValue = ""] = match;
    data[key] = rawValue.trim().replace(/^(['"])(.*)\1$/, "$2");
  }
  return data;
}

export function parseMarkdownArticle(slug: string, raw: string): Article {
  const match = FRONTMATTER.exec(raw);
  if (!match) throw new Error(`${slug}.md: missing the --- frontmatter --- block`);
  const [, frontmatter = "", markdown = ""] = match;
  const parsed = articleSummarySchema.safeParse({ ...parseFrontmatter(frontmatter), slug });
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join(".") || "file"}: ${issue.message}`);
    throw new Error(`${slug}.md: ${issues.join("; ")}`);
  }
  if (!markdown.trim()) throw new Error(`${slug}.md: the article body is empty`);
  // Repository content is trusted (it goes through code review), so raw HTML is allowed.
  const html = marked.parse(markdown, { async: false, gfm: true });
  return { ...parsed.data, source: "local", body: { format: "html", html } };
}

export function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}
