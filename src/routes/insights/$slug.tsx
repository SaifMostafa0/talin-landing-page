import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Linkedin } from "lucide-react";

import { ArticleBody } from "../../components/site/ArticleBody";
import { ArticleCard } from "../../components/site/ArticleCard";
import { ButtonLink } from "../../components/site/ButtonLink";
import { ContactCta } from "../../components/site/ContactCta";
import { HeroBackdrop } from "../../components/site/PageHero";
import { Section } from "../../components/site/Section";
import { SITE_URL, primaryCta } from "../../content/site";
import { fetchArticle } from "../../lib/content/functions";
import { formatArticleDate, topicLabel } from "../../lib/content/schema";
import { jsonLd } from "../../lib/json-ld";
import { seo } from "../../lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const result = await fetchArticle({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Insights | Talin" }] };
    const { article } = loaderData;
    const tags = seo({ title: `${article.title} | Talin`, description: article.summary, path: `/insights/${params.slug}`, type: "article" });
    return {
      ...tags,
      meta: [...tags.meta, { property: "article:published_time", content: article.date }],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            datePublished: article.date,
            author: { "@type": "Organization", name: "Talin" },
            publisher: { "@type": "Organization", name: "Talin" },
            mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/insights/${article.slug}`)}`;

  return (
    <>
      <header className="hero hero--article">
        <HeroBackdrop />
        <div className="shell hero__inner article-head">
          <Link to="/insights" className="back-link focus-ring">
            <ArrowLeft aria-hidden="true" size={16} /> Back to insights
          </Link>
          <h1 className="hero__title hero__title--article">{article.title}</h1>
          <p className="hero__subheading">{article.summary}</p>
          <p className="article-head__meta">
            <span>{topicLabel(article.topic)}</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          </p>
        </div>
      </header>

      <Section tone="white" className="article-section reading" progress>
        <div className="article-layout">
          <ArticleBody body={article.body} />
          <footer className="article-foot">
            <p className="article-foot__source">Published by Talin.</p>
            <div className="article-foot__actions">
              <a className="button button--ghost-dark focus-ring" href={shareUrl} target="_blank" rel="noreferrer">
                <Linkedin aria-hidden="true" size={17} /> Share on LinkedIn
              </a>
              <ButtonLink to={primaryCta.to}>{primaryCta.label}</ButtonLink>
            </div>
            <Link to="/insights" className="back-link back-link--dark focus-ring">
              <ArrowLeft aria-hidden="true" size={16} /> Back to insights
            </Link>
          </footer>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="pastel" labelledBy="more-title">
          <h2 id="more-title" className="section-title">
            More insights
          </h2>
          <div className="article-grid article-grid--two">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </Section>
      )}

      <ContactCta />
    </>
  );
}
