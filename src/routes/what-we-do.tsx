import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown } from "lucide-react";

import { ContactCta } from "../components/site/ContactCta";
import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { pillarIcons, serviceIcons } from "../components/site/icons";
import { acrossAllPhases, clientGains, pillars, pillarsHeadline, serviceOfferingIntro, services } from "../content/services";
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
        <SectionHeading
          id="modes-title"
          title="Two connected modes"
          intro="Across every service area, we work in two connected modes. Most engagements combine both, moving from strategy and assessment through roadmap design, solution enablement, people enablement, governance, adoption, and value realization."
        />
        <div className="mode-grid mode-grid--wide">
          {connectedModes.map((mode, index) => (
            <article key={mode.title} className="glass-card mode-card" data-reveal>
              <span className="mode-card__index" aria-hidden="true">
                0{index + 1}
              </span>
              <h3 className="card-title">{mode.title}</h3>
              <p className="card-copy">{mode.copy}</p>
            </article>
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
      </Section>

      <Section tone="navy" labelledBy="pillars-title">
        <SectionHeading id="pillars-title" title={pillarsHeadline} />
        <div className="pillar-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.id];
            return (
              <article key={pillar.id} className="pillar-card" data-reveal>
                <div className="pillar-card__top">
                  <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="card-title">{pillar.title}</h3>
                <p className="card-copy">{pillar.copy}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="mist" labelledBy="offering-title">
        <SectionHeading id="offering-title" title="Our service offering" />
        <div className="offering-list">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id];
            return (
              <article key={service.id} id={service.id} className="glass-card offering" data-reveal>
                <div className="offering__head">
                  <span className="offering__icon">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.5} />
                  </span>
                  <span className="offering__number" aria-hidden="true">
                    Service {index + 1}
                  </span>
                </div>
                <div className="offering__main">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-copy">{service.summary}</p>
                </div>
                <div className="offering__includes">
                  <h4>What this includes</h4>
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {service.note && <p className="offering__note">{service.note}</p>}
                </div>
              </article>
            );
          })}
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
        <div className="split">
          <SectionHeading id="gain-title" title="What our clients gain" />
          <ul className="outcomes split__body">
            {clientGains.map((gain) => (
              <li key={gain} data-reveal>
                <span className="outcomes__mark" aria-hidden="true">
                  <Check size={18} />
                </span>
                {gain}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
