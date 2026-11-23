import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { ContactCta } from "../components/site/ContactCta";
import { EngagementFlow } from "../components/site/EngagementFlow";
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
  return (
    <>
      <PageHero headline={howWeWorkHero.headline} subheading={howWeWorkHero.subheading} />

      <Section tone="pastel" labelledBy="partner-title">
        <SectionHeading id="partner-title" title="How we partner" />
        <div className="principle-grid">
          {principles.map((principle) => {
            const Icon = principleIcons[principle.id];
            return (
              <article key={principle.id} className="glass-card principle-card" data-reveal>
                <Icon aria-hidden="true" size={32} strokeWidth={1.5} />
                <h3 className="card-title">{principle.title}</h3>
                <p className="card-copy">{principle.copy}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="white" labelledBy="receive-title">
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
        <SectionHeading id="value-title" title={valueMethod.headline} />
        <div className="value-intro">
          <p className="section-intro" data-reveal>
            {valueMethod.introduction}
          </p>
          <blockquote className="value-quote" data-reveal>
            <p>{valueMethod.principle}</p>
          </blockquote>
        </div>
        <p className="value-note" data-reveal>
          {valueMethod.offeringsNote}
        </p>
        <ValueSlides />
      </Section>

      <ContactCta />
    </>
  );
}

/*
 * VALUE phases as side-by-side slides: swipe or scroll sideways, or use the
 * letters and arrows. The letter for the slide in view stays highlighted.
 */
function ValueSlides() {
  const phases = valueMethod.phases;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The track is as tall as the slide in view, so short phases leave no empty space.
  useEffect(() => {
    const element = track.current;
    const slide = element?.children[active] as HTMLElement | undefined;
    if (!element || !slide) return;
    const fit = () => {
      element.style.height = `${slide.offsetHeight}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setActive(Math.round(element.scrollLeft / Math.max(1, element.clientWidth)));
      });
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    // Links to #phase-<name> land on that slide.
    const target = phases.findIndex((phase) => `#phase-${phase.name.toLowerCase()}` === window.location.hash);
    if (target > 0) element.scrollTo({ left: target * element.clientWidth });
    return () => {
      element.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [phases]);

  const go = (index: number) => {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(phases.length - 1, index));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: next * element.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="value-slider" data-reveal>
      <div className="value-controls">
        <div className="value-dots" role="group" aria-label="Go to a VALUE phase">
          {phases.map((phase, index) => (
            <button
              key={phase.letter}
              type="button"
              className="value-dot focus-ring"
              aria-current={active === index ? "true" : undefined}
              aria-label={phase.name}
              onClick={() => go(index)}
            >
              {phase.letter}
            </button>
          ))}
        </div>
        <div className="value-arrows">
          <button type="button" className="value-arrow focus-ring" aria-label="Previous phase" disabled={active === 0} onClick={() => go(active - 1)}>
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            className="value-arrow focus-ring"
            aria-label="Next phase"
            disabled={active === phases.length - 1}
            onClick={() => go(active + 1)}
          >
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
      <div className="value-slides" ref={track} tabIndex={0} role="region" aria-label="VALUE phases. Scroll sideways to move between them.">
        {phases.map((phase, index) => (
          <article
            key={phase.letter}
            id={`phase-${phase.name.toLowerCase()}`}
            className="value-slide"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${phases.length}: ${phase.name}`}
          >
            <span className="value-slide__letter" aria-hidden="true">
              {phase.letter}
            </span>
            <div className="value-slide__meta">
              <h3 className="value-slide__name">
                <span className="sr-only">{phase.letter}: </span>
                {phase.name}
              </h3>
              <dl className="value-slide__facts">
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
            </div>
            <div className="value-slide__offerings">
              <h4>Offerings in this phase</h4>
              <ul>
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
    </div>
  );
}
