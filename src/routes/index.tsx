import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import cidLogo from "../assets/brand/cid-logo-white.png";
import ahmedPortrait from "../assets/people/ahmed-salama.webp";
import daliaPortrait from "../assets/people/dalia-wahba.avif";
import { ArticleCard } from "../components/site/ArticleCard";
import { ButtonLink } from "../components/site/ButtonLink";
import { ContactCta } from "../components/site/ContactCta";
import { EngagementFlow } from "../components/site/EngagementFlow";
import { RevealText } from "../components/site/Motion";
import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { serviceIcons } from "../components/site/icons";
import { people, whyTalin } from "../content/about";
import { serviceOfferingIntro, services } from "../content/services";
import { capabilities, connectedModes, primaryCta, whoWeAre } from "../content/site";
import { fetchArticles } from "../lib/content/functions";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => ({ latest: (await fetchArticles()).slice(0, 3) }),
  head: () =>
    seo({
      title: "Talin | Human-Led Intelligence",
      description:
        "We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.",
      path: "/",
    }),
  component: Home,
});

// Links shared before the multi-page site pointed at sections of the old one-page site.
const legacyAnchors: Record<string, { to: "/about" | "/what-we-do" | "/how-we-work" | "/contact" | "/careers"; hash?: string }> = {
  "#about": { to: "/about" },
  "#services": { to: "/what-we-do" },
  "#approach": { to: "/how-we-work" },
  "#engagement-flow": { to: "/how-we-work" },
  "#leadership": { to: "/about", hash: "leadership" },
  "#careers": { to: "/careers" },
  "#contact": { to: "/contact" },
};

function Home() {
  const { latest } = Route.useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const target = legacyAnchors[window.location.hash];
    if (target) void navigate({ ...target, replace: true });
  }, [navigate]);

  return (
    <>
      <PageHero
        size="home"
        headline={
          <>
            Human-Led <em>Intelligence.</em>
          </>
        }
        subheading="We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value."
      >
        <ul className="capabilities capabilities--hero" aria-label="Capabilities">
          {capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="hero__actions">
          <ButtonLink to={primaryCta.to}>{primaryCta.label}</ButtonLink>
        </div>
      </PageHero>

      <Section tone="pastel" labelledBy="who-we-are" className="section--flush-bottom">
        <div className="statement text-reveal" data-reveal>
          <h2 id="who-we-are" className="eyebrow">
            {whoWeAre.label}
          </h2>
          <div className="statement__copy">
            {whoWeAre.paragraphs.map((paragraph, index) => (
              <p key={paragraph}>
                <RevealText text={paragraph} start={index === 0 ? 0 : whoWeAre.paragraphs[0].split(/\s+/).length} />
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="pastel" labelledBy="modes-title">
        <div className="split">
          <SectionHeading id="modes-title" title="Two connected modes" />
          <div className="split__body">
            <div className="mode-grid">
              {connectedModes.map((mode) => (
                <article key={mode.title} className="glass-card mode-card" data-reveal>
                  <h3 className="card-title">{mode.title}</h3>
                  <p className="card-copy">{mode.copy}</p>
                </article>
              ))}
            </div>
            <ButtonLink to="/how-we-work" variant="ghost-dark" className="split__action">
              See how we work
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="offering-title">
        <SectionHeading id="offering-title" title="Our service offering" intro={serviceOfferingIntro} />
        <div className="service-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <article key={service.id} className="glass-card service-card" data-reveal>
                <div className="service-card__top">
                  <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-copy">{service.summary}</p>
              </article>
            );
          })}
        </div>
        <div className="section-actions">
          <ButtonLink to="/what-we-do" variant="ghost-dark">
            See what we do
          </ButtonLink>
        </div>
      </Section>

      <Section tone="navy" labelledBy="why-title">
        <SectionHeading id="why-title" title="Why Talin" />
        <ol className="why-grid">
          {whyTalin.map((statement) => (
            <li key={statement} className="why-card" data-reveal>
              <p>{statement}</p>
            </li>
          ))}
        </ol>

        <div className="navy-divider" />

        <SectionHeading
          id="home-flow-title"
          title="How we work"
          intro="Every engagement moves through five steps, from understanding the goal to sustaining what works."
        />
        <EngagementFlow />
        <div className="section-actions">
          <ButtonLink to="/how-we-work" variant="ghost-light">
            See how we work
          </ButtonLink>
        </div>
      </Section>

      {latest.length > 0 && (
        <Section tone="pastel" labelledBy="insights-title">
          <SectionHeading
            id="insights-title"
            title="Latest insights"
            intro="Ideas and perspectives on turning technology investment into measurable business value."
          />
          <div className="article-grid">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} showDate={false} />
            ))}
          </div>
          <div className="section-actions">
            <ButtonLink to="/insights" variant="ghost-dark">
              See all insights
            </ButtonLink>
          </div>
        </Section>
      )}

      <Section tone="white" labelledBy="minds-title">
        <SectionHeading id="minds-title" title="The minds behind Talin" />
        <ul className="people-grid">
          <li className="person-tile" data-reveal>
            <img className="person-tile__portrait" src={ahmedPortrait} alt="Portrait of Ahmed Salama" width={400} height={400} loading="lazy" />
            <h3 className="person-tile__name">{people.ahmed.name}</h3>
            <p className="person-tile__role">{people.ahmed.role}</p>
          </li>
          <li className="person-tile" data-reveal>
            <img className="person-tile__portrait person-tile__portrait--dalia" src={daliaPortrait} alt="Portrait of Dalia Wahba" width={400} height={400} loading="lazy" />
            <h3 className="person-tile__name">{people.dalia.name}</h3>
            <p className="person-tile__role">{people.dalia.role}</p>
          </li>
          <li className="person-tile" data-reveal>
            <span className="person-tile__portrait person-tile__portrait--logo">
              <img src={cidLogo} alt="CID Consulting logo" loading="lazy" />
            </span>
            <h3 className="person-tile__name">{people.cid.name}</h3>
            <p className="person-tile__role">{people.cid.role}</p>
          </li>
        </ul>
        <div className="section-actions section-actions--center">
          <ButtonLink to="/about" hash="leadership" variant="ghost-dark">
            Meet the team
          </ButtonLink>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
