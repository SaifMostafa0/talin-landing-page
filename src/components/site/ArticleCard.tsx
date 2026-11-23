import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatArticleDate, topicLabel, type ArticleSummary } from "../../lib/content/schema";

export function ArticleCard({ article, showDate = true }: { article: ArticleSummary; showDate?: boolean }) {
  return (
    <article className="article-card glass-card" data-reveal>
      <p className="article-card__meta">
        <span>{topicLabel(article.topic)}</span>
        {showDate && <time dateTime={article.date}>{formatArticleDate(article.date)}</time>}
      </p>
      <h3 className="article-card__title">
        <Link to="/insights/$slug" params={{ slug: article.slug }} className="article-card__link focus-ring">
          {article.title}
        </Link>
      </h3>
      <p className="article-card__summary">{article.summary}</p>
      <span className="article-card__cta" aria-hidden="true">
        Read article <ArrowUpRight size={16} />
      </span>
    </article>
  );
}

/* A title that is announced but not yet published. Not a link. */
export function PlannedArticleCard({ title }: { title: string }) {
  return (
    <article className="article-card article-card--planned glass-card" data-reveal>
      <p className="article-card__meta">
        <span className="article-card__tag">Planned</span>
      </p>
      <h3 className="article-card__title">{title}</h3>
      <p className="article-card__summary">One of the first two articles planned for publication.</p>
      <span className="article-card__cta article-card__cta--muted">Coming soon</span>
    </article>
  );
}
