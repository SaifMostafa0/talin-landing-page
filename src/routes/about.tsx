import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";

import cidLogo from "../assets/brand/cid-logo-white.png";
import ahmedPortrait from "../assets/people/ahmed-salama.webp";
import daliaPortrait from "../assets/people/dalia-wahba.avif";
import { ContactCta } from "../components/site/ContactCta";
import { RevealText } from "../components/site/Motion";
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

// The figures already in CID's paragraph, picked out where they are said.
const figurePhrases = /(three decades|500\+ projects|300\+ clients)/;

function HighlightFigures({ text }: { text: string }) {
  return (
    <>
      {text.split(figurePhrases).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={part} className="cid-figure">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

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
        <div className="positioning" data-reveal>
          {positioning.map((line) => (
            <p key={line}>
              <span>{line}</span>
            </p>
          ))}
        </div>
        <ul className="capability-line capability-line--on-light" aria-label="Capabilities" data-reveal>
          {capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="vision-title">
        <SectionHeading id="vision-title" title="Vision and mission" />
        <div className="panes">
          <article className="pane" data-reveal>
            <h3 className="eyebrow">Vision</h3>
            <p>{visionMission.vision}</p>
          </article>
          <span className="panes__divider" aria-hidden="true" />
          <article className="pane" data-reveal>
            <h3 className="eyebrow">Mission</h3>
            <p>{visionMission.mission}</p>
          </article>
        </div>
      </Section>

      <Section tone="navy" labelledBy="cid-title">
        <SectionHeading id="cid-title" title={byCid.headline} />
        <div className="cid-story" data-reveal>
          <img className="cid-story__logo" src={cidLogo} alt="CID Consulting logo" loading="eager" decoding="async" />
          <p className="cid-story__lead">
            <HighlightFigures text={byCid.paragraphs[0]} />
          </p>
          {byCid.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph} className="cid-story__more">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="brings-grid" data-reveal>
          {byCid.columns.map((column) => (
            <article key={column.title} className={`brings-card ${column.title === "Together" ? "brings-card--together" : ""}`}>
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
        <div className="commit-split">
          <SectionHeading id="commitments-title" title={commitments.headline} intro={commitments.intro} />
          <ul className="commitments" data-reveal>
            {commitments.items.map((item, index) => (
              <li key={item} style={{ "--i": index } as React.CSSProperties}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" id="leadership" labelledBy="leadership-title">
        <SectionHeading id="leadership-title" title="The minds behind Talin" />
        <div className="profile-grid">
          <Profile name={people.ahmed.name} role={people.ahmed.role} bio={people.ahmed.bio} linkedin={people.ahmed.linkedin}>
            <img src={ahmedPortrait} alt="Portrait of Ahmed Salama" width={400} height={400} loading="eager" decoding="async" />
          </Profile>
          <Profile name={people.dalia.name} role={people.dalia.role} bio={people.dalia.bio} linkedin={people.dalia.linkedin}>
            <img className="portrait--dalia" src={daliaPortrait} alt="Portrait of Dalia Wahba" width={400} height={400} loading="eager" decoding="async" />
          </Profile>
          <Profile name={people.cid.name} role={people.cid.role} bio={people.cid.bio} logo>
            <img src={cidLogo} alt="CID Consulting logo" loading="eager" decoding="async" />
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
