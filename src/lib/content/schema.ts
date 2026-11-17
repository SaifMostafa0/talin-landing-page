import { z } from "zod";

// Topics come from the content document (Insights §2). Keep in sync with
// studio/schemaTypes/article.ts.
export const topics = [
  { value: "technology-strategy", label: "Technology strategy and prioritization" },
  { value: "data-strategy", label: "Data strategy and architecture" },
  { value: "applied-ai", label: "Applied AI" },
  { value: "change-enablement", label: "Change enablement and capabilities" },
] as const;

export type TopicValue = (typeof topics)[number]["value"];
const topicValues = topics.map((topic) => topic.value) as [TopicValue, ...TopicValue[]];
export const topicSchema = z.enum(topicValues);

export function topicLabel(value: TopicValue) {
  return topics.find((topic) => topic.value === value)?.label ?? value;
}

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slugs use lowercase letters, numbers, and hyphens");

export const articleSummarySchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(400),
  topic: topicSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Use a YYYY-MM-DD date").transform((value) => value.slice(0, 10)),
});

export type ArticleSummary = z.infer<typeof articleSummarySchema> & { source: "sanity" | "local" };

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type ArticleBody =
  | { format: "portableText"; blocks: Json[]; image: { projectId: string; dataset: string } }
  | { format: "html"; html: string };

export type Article = ArticleSummary & { body: ArticleBody };

const httpsUrl = z
  .string()
  .trim()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  }, "Role links must be public HTTPS URLs");

export const roleSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(160),
  url: httpsUrl,
});

export type Role = z.infer<typeof roleSchema>;

export function formatArticleDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
