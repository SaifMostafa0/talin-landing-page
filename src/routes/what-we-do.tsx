import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Info, Pointer } from "lucide-react";
import { Fragment, useState } from "react";

import { ContactCta } from "../components/site/ContactCta";
import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { pillarIcons, serviceIcons } from "../components/site/icons";
import { acrossAllPhases, clientGains, pillars, pillarsHeadline, serviceOfferingIntro, services, type Service } from "../content/services";
import { connectedModes } from "../content/site";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/what-we-do")({
  head: () =>
    seo({
      title: "What we do | Talin",
      description:
        "Eight services across digital strategy, data, BI, AI, commercial transformation, technology advisory, and governance, from advisory through delivery.",
      path: "/what-we-do",
    }),
  component: WhatWeDo,
});

const foundations = ["Culture", "Talent", "Technology", "Governance"];

function WhatWeDo() {
  return (
    <>
      <PageHero headline="What we do" subheading={serviceOfferingIntro} />

      <Section tone="pastel" labelledBy="modes-title">
        <div className="split">
          <SectionHeading
            id="modes-title"
            title="Two connected modes"
            intro="Across every service area, we work in two connected modes. Most engagements combine both, moving from strategy and assessment through roadmap design, solution enablement, people enablement, governance, adoption, and value realization."
          />
          <div className="split__body">
            <div className="mode-stack">
              {connectedModes.map((mode, index) => (
                <Fragment key={mode.title}>
                  {index > 0 && <span className="mode-stack__link" aria-hidden="true" />}
                  <article className="glass-card mode-card" data-reveal>
                    <h3 className="card-title">{mode.title}</h3>
                    <p className="card-copy">{mode.copy}</p>
                  </article>
                </Fragment>
              ))}
            </div>
            <div className="foundations" data-reveal>
              <p>Foundational capabilities underpinning both:</p>
              <ul aria-label="Foundational capabilities">
                {foundations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="navy" labelledBy="pillars-title">
        <SectionHeading id="pillars-title" title={pillarsHeadline} />
        <div className="pillar-row" data-reveal>
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id];
            return (
              <article key={pillar.id} className="pillar">
                <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__copy">{pillar.copy}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="mist" labelledBy="offering-title">
        <SectionHeading id="offering-title" title="Our service offering" intro="Select a service to see what it includes." />
        <div className="flip-grid">
          {services.map((service) => (
            <FlipCard key={service.id} service={service} />
          ))}
        </div>
        <section className="caio" aria-labelledby="caio-title" data-reveal>
          <Crown aria-hidden="true" size={32} strokeWidth={1.5} />
          <div>
            <p className="eyebrow eyebrow--light">{acrossAllPhases.label}</p>
            <h3 id="caio-title">{acrossAllPhases.title}</h3>
            <p>{acrossAllPhases.copy}</p>
          </div>
        </section>
      </Section>

      <Section tone="pastel" labelledBy="gain-title">
        <SectionHeading id="gain-title" title="What our clients gain" />
        <ol className="gains" data-reveal>
          {clientGains.map((gain, index) => (
            <li key={gain} style={{ "--step": index } as React.CSSProperties}>
              <span className="gains__dot" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
              <p>{gain}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ContactCta />
    </>
  );
}

/*
 * A service card that turns over to show what the service includes. Both faces
 * share one grid cell, so the card is as tall as its longer face and nothing
 * scrolls inside it.
 */
function FlipCard({ service }: { service: Service }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = serviceIcons[service.id];
  const backId = `includes-${service.id}`;
  return (
    <article id={service.id} className={`flip ${flipped ? "is-flipped" : ""}`} data-reveal>
      <div className="flip__inner">
        <div className="flip__face flip__face--front" aria-hidden={flipped}>
          <Icon className="flip__icon" aria-hidden="true" size={34} strokeWidth={1.5} />
          <h3 className="flip__title">{service.title}</h3>
          <div className="flip__body">
            <p className="flip__copy">{service.summary}</p>
          </div>
        </div>
        <div id={backId} className="flip__face flip__face--back" aria-hidden={!flipped}>
          <h4 className="flip__label">What this includes</h4>
          <ul className="flip__list">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {service.note && (
        <div className="flip__info" hidden={!flipped}>
          <button
            type="button"
            className="flip__info-button focus-ring"
            aria-describedby={`${backId}-note`}
            aria-label="About agentic AI"
          >
            <Info aria-hidden="true" size={18} />
          </button>
          <p id={`${backId}-note`} role="tooltip" className="flip__info-tip">
            {service.note}
          </p>
        </div>
      )}
      <button
        type="button"
        className="flip__toggle focus-ring"
        aria-expanded={flipped}
        aria-controls={backId}
        onClick={() => setFlipped((value) => !value)}
      >
        <span className="sr-only">
          {flipped ? "Show the summary of" : "Show what is included in"} {service.title}
        </span>
        <span className="flip__badge" aria-hidden="true">
          <Pointer size={17} strokeWidth={1.75} />
        </span>
      </button>
    </article>
  );
}
