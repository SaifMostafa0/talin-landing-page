import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { ContactCta } from "../components/site/ContactCta";
import { EngagementFlow } from "../components/site/EngagementFlow";
import { RevealText } from "../components/site/Motion";
import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { principleIcons } from "../components/site/icons";
import { clientsReceive, howWeWorkHero, principles, valueMethod } from "../content/how-we-work";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/how-we-work")({
  head: () =>
    seo({
      title: "How we work | Talin",
      description: "A business-first, tech-agnostic approach with people at the center, from discovery to sustained results.",
      path: "/how-we-work",
    }),
  component: HowWeWork,
});

function HowWeWork() {
  const activePhase = useActivePhase();
  return (
    <>
      <PageHero headline={howWeWorkHero.headline} subheading={howWeWorkHero.subheading} />

      <Section tone="navy" labelledBy="partner-title">
        <SectionHeading id="partner-title" title="How we partner" />
        <div className="principle-grid">
          {principles.map((principle) => {
            const Icon = principleIcons[principle.id];
            return (
              <article key={principle.id} className="principle-card" data-reveal>
                <Icon aria-hidden="true" size={32} strokeWidth={1.5} />
                <h3 className="card-title">{principle.title}</h3>
                <p className="card-copy">{principle.copy}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="pastel" labelledBy="receive-title">
        <SectionHeading id="receive-title" title="What clients receive" />
        <div className="receive-grid">
          {clientsReceive.map((group) => (
            <article key={group.title} className="glass-card receive-card" data-reveal>
              <h3 className="receive-card__title">{group.title}</h3>
              <ul>
                {group.items.map(([name, description]) => (
                  <li key={name}>
                    <Check aria-hidden="true" size={16} />
                    <span>
                      <strong>{name}:</strong> {description}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="navy" labelledBy="flow-title">
        <SectionHeading id="flow-title" title="Engagement flow" />
        <EngagementFlow />
      </Section>

      <Section tone="mist" labelledBy="value-title">
        <SectionHeading id="value-title" title={valueMethod.headline} intro={valueMethod.introduction} />
        <blockquote className="value-principle text-reveal" data-reveal>
          <p>
            <RevealText text={valueMethod.principle} />
          </p>
        </blockquote>
        <nav aria-label="VALUE phases" className="value-nav" data-reveal>
          <ol className="value-word">
            {valueMethod.phases.map((phase) => (
              <li key={phase.letter}>
                <a
                  className={`focus-ring ${activePhase === phase.letter ? "is-active" : ""}`}
                  href={`#phase-${phase.name.toLowerCase()}`}
                >
                  <span aria-hidden="true">{phase.letter}</span>
                  {phase.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="value-note" data-reveal>
          {valueMethod.offeringsNote}
        </p>
        <div className="phase-list rail" data-progress>
          <span className="rail__head" aria-hidden="true" />
          {valueMethod.phases.map((phase) => (
            <article key={phase.letter} id={`phase-${phase.name.toLowerCase()}`} className="glass-card phase" data-reveal>
              <div className="phase__letter" aria-hidden="true">
                {phase.letter}
              </div>
              <div className="phase__body">
                <h3 className="phase__name">
                  <span className="sr-only">{phase.letter}: </span>
                  {phase.name}
                </h3>
                <dl className="phase__facts">
                  <div>
                    <dt>Question.</dt>
                    <dd>{phase.question}</dd>
                  </div>
                  <div>
                    <dt>Decision gate.</dt>
                    <dd>{phase.gate}</dd>
                  </div>
                  <div>
                    <dt>Tools.</dt>
                    <dd>{phase.tools}</dd>
                  </div>
                </dl>
                <h4 className="phase__offerings-title">Offerings in this phase</h4>
                <ul className="phase__offerings">
                  {phase.offerings.map(([name, copy]) => (
                    <li key={name}>
                      <strong>{name}.</strong> {copy}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}

/* The VALUE letter for the phase being read lights up as the reader scrolls. */
function useActivePhase() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const phases = valueMethod.phases
      .map((phase) => ({ letter: phase.letter, element: document.getElementById(`phase-${phase.name.toLowerCase()}`) }))
      .filter((item): item is typeof item & { element: HTMLElement } => Boolean(item.element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const match = phases.find((item) => visible.some((entry) => entry.target === item.element));
        if (match) setActive(match.letter);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    phases.forEach((item) => observer.observe(item.element));
    return () => observer.disconnect();
  }, []);
  return active;
}
