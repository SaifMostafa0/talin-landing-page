import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ArticleCard, PlannedArticleCard } from "../../components/site/ArticleCard";
import { PageHero } from "../../components/site/PageHero";
import { Section } from "../../components/site/Section";
import { plannedArticles } from "../../content/planned-articles";
import { fetchArticles } from "../../lib/content/functions";
import { topicSchema, topics } from "../../lib/content/schema";
import { seo } from "../../lib/seo";

export const Route = createFileRoute("/insights/")({
  validateSearch: z.object({ topic: topicSchema.optional().catch(undefined) }),
  loader: async () => ({ articles: await fetchArticles() }),
  head: () =>
    seo({
      title: "Insights | Talin",
      description: "Ideas and perspectives from Talin on turning technology and AI investment into measurable business value.",
      path: "/insights",
    }),
  component: Insights,
});

function Insights() {
  const { articles } = Route.useLoaderData();
  const { topic } = Route.useSearch();
  const visible = topic ? articles.filter((article) => article.topic === topic) : articles;
  // Planned titles have no topic yet, so they only appear under "All".
  const published = new Set(articles.map((article) => article.title.trim().toLowerCase()));
  const planned = topic ? [] : plannedArticles.filter((title) => !published.has(title.toLowerCase()));

  return (
    <>
      <PageHero headline="Insights" subheading="Ideas and perspectives on turning technology investment into measurable business value." />

      <Section tone="pastel" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        <nav aria-label="Filter articles by topic" className="topic-filter" data-reveal>
          <Link to="/insights" search={{}} className="topic-filter__chip focus-ring" aria-current={!topic ? "true" : undefined} resetScroll={false}>
            All
          </Link>
          {topics.map((item) => (
            <Link
              key={item.value}
              to="/insights"
              search={{ topic: item.value }}
              className="topic-filter__chip focus-ring"
              aria-current={topic === item.value ? "true" : undefined}
              resetScroll={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? "article" : "articles"} shown
        </p>

        {visible.length + planned.length > 0 ? (
          <div className="article-grid">
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
            {planned.map((title) => (
              <PlannedArticleCard key={title} title={title} />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            {articles.length === 0 ? "No articles have been published yet." : "No articles in this topic yet."}
          </p>
        )}
      </Section>
    </>
  );
}
