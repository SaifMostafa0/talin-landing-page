import { createFileRoute } from "@tanstack/react-router";
import { Eye, Linkedin, Target } from "lucide-react";

import cidLogo from "../assets/brand/cid-logo-white.png";
import ahmedPortrait from "../assets/people/ahmed-salama.webp";
import daliaPortrait from "../assets/people/dalia-wahba.avif";
import { ContactCta } from "../components/site/ContactCta";
import { CountUp, RevealText } from "../components/site/Motion";
import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { valueIcons } from "../components/site/icons";
import { aboutHero, byCid, commitments, people, positioning, values, valuesHeadline, visionMission } from "../content/about";
import { capabilities, whoWeAre } from "../content/site";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Talin | Talin, by CID Consulting",
      description:
        "Talin is the data, AI, and digital strategy company launched by CID Consulting. Our vision, mission, values, and the people behind Talin.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero headline={aboutHero.headline} subheading={aboutHero.subheading} />

      <Section tone="pastel" labelledBy="who-we-are">
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
        <ul className="capabilities" aria-label="Capabilities" data-reveal>
          {capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="positioning" data-reveal>
          {positioning.map((line) => (
            <p key={line}>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="vision-title">
        <h2 id="vision-title" className="sr-only">
          Vision and mission
        </h2>
        <div className="vm-grid">
          <article className="glass-card vm-card" data-reveal>
            <Eye className="vm-card__glyph" aria-hidden="true" strokeWidth={1} />
            <h3 className="eyebrow">Vision</h3>
            <p>{visionMission.vision}</p>
          </article>
          <article className="glass-card vm-card" data-reveal>
            <Target className="vm-card__glyph" aria-hidden="true" strokeWidth={1} />
            <h3 className="eyebrow">Mission</h3>
            <p>{visionMission.mission}</p>
          </article>
        </div>
      </Section>

      <Section tone="navy" labelledBy="cid-title">
        <SectionHeading id="cid-title" title={byCid.headline} />
        <div className="cid-panel" data-reveal>
          <div className="cid-panel__figures">
            <img className="cid-panel__logo" src={cidLogo} alt="CID Consulting logo" loading="lazy" />
            <dl className="figures">
              {byCid.figures.map((figure) => (
                <div key={figure.value} className="figures__item">
                  <dt className="sr-only">{figure.label}</dt>
                  <dd>
                    <strong>
                      <CountUp value={figure.value} />
                    </strong>
                    <span>{figure.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="cid-panel__copy">
            {byCid.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="brings-grid" data-reveal>
          {byCid.columns.map((column) => (
            <article key={column.title} className={`brings-card ${column.title === "Together" ? "brings-card--together" : ""}`} data-reveal>
              <h3>{column.title}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="pastel" labelledBy="values-title">
        <SectionHeading id="values-title" title={valuesHeadline} />
        <div className="values-grid">
          {values.map((value) => {
            const Icon = valueIcons[value.id];
            return (
              <article key={value.id} className="glass-card value-card" data-reveal>
                <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
                <h3 className="card-title">{value.title}</h3>
                <p className="card-copy">{value.copy}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="mist" labelledBy="commitments-title">
        <div className="split">
          <SectionHeading id="commitments-title" title={commitments.headline} />
          <div className="split__body">
            <p className="lead" data-reveal>
              {commitments.intro}
            </p>
            <ul className="commitments" data-reveal>
              {commitments.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white" id="leadership" labelledBy="leadership-title">
        <SectionHeading id="leadership-title" title="The minds behind Talin" />
        <div className="profile-grid">
          <Profile name={people.ahmed.name} role={people.ahmed.role} bio={people.ahmed.bio} linkedin={people.ahmed.linkedin}>
            <img src={ahmedPortrait} alt="Portrait of Ahmed Salama" width={400} height={400} loading="lazy" />
          </Profile>
          <Profile name={people.dalia.name} role={people.dalia.role} bio={people.dalia.bio} linkedin={people.dalia.linkedin}>
            <img className="portrait--dalia" src={daliaPortrait} alt="Portrait of Dalia Wahba" width={400} height={400} loading="lazy" />
          </Profile>
          <Profile name={people.cid.name} role={people.cid.role} bio={people.cid.bio} logo>
            <img src={cidLogo} alt="CID Consulting logo" loading="lazy" />
          </Profile>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}

function Profile({
  name,
  role,
  bio,
  linkedin,
  logo = false,
  children,
}: {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  logo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className={`profile-card ${logo ? "profile-card--org" : ""}`} data-reveal>
      <div className="profile-card__head">
        <div className={`profile-card__portrait ${logo ? "profile-card__portrait--logo" : ""}`}>{children}</div>
        <div>
          <h3 className="profile-card__name">{name}</h3>
          <p className="profile-card__role">{role}</p>
          {linkedin && (
            <a className="profile-card__linkedin focus-ring" href={linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" size={16} />
              <span>
                LinkedIn<span className="sr-only">: {name}</span>
              </span>
            </a>
          )}
        </div>
      </div>
      <p className="profile-card__bio">{bio}</p>
    </article>
  );
}
