import { createServerFn } from "@tanstack/react-start";
import { getArticle, listArticles, listRoles } from "./repository.server";
import { slugSchema } from "./schema";
import { z } from "zod";

export const fetchArticles = createServerFn({ method: "GET" }).handler(() => listArticles());

export const fetchArticle = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const slug = slugSchema.safeParse(data.slug);
    if (!slug.success) return null;
    const article = await getArticle(slug.data);
    if (!article) return null;
    const related = (await listArticles()).filter((item) => item.slug !== article.slug).slice(0, 2);
    return { article, related };
  });

export const fetchRoles = createServerFn({ method: "GET" }).handler(() => listRoles());
