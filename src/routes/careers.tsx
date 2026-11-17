import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "../components/site/PageHero";
import { Section, SectionHeading } from "../components/site/Section";
import { fallbackCareersUrl } from "../content/roles";
import { fetchRoles } from "../lib/content/functions";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/careers")({
  loader: async () => ({ roles: await fetchRoles() }),
  head: () =>
    seo({
      title: "Careers at Talin | Talin",
      description:
        "Careers at Talin. Technology, data, AI, and business expertise, working together on real transformation challenges. View open roles.",
      path: "/careers",
    }),
  component: Careers,
});

function Careers() {
  const { roles } = Route.useLoaderData();

  return (
    <>
      <PageHero headline="Careers at Talin" />

      <Section tone="pastel" labelledBy="careers-intro" className="section--flush-bottom">
        <h2 id="careers-intro" className="sr-only">
          Introduction
        </h2>
        <p className="lead lead--large" data-reveal>
          Talin brings together technology, data, AI, and business expertise to deliver measurable results for organizations. Technology is paired with a holistic
          understanding of the business it serves, and advisory work stays connected to implementation, so strategies are followed through to real business
          outcomes. The work spans real transformation challenges across industries, alongside experienced business and technology leaders.
        </p>
      </Section>

      <Section tone="pastel" labelledBy="roles-title">
        <SectionHeading id="roles-title" title="Open roles" />
        {roles.length > 0 ? (
          <ul className="role-list">
            {roles.map((role) => (
              <li key={role.id} data-reveal>
                <a className="role focus-ring" href={role.url} target="_blank" rel="noreferrer">
                  <span className="role__title">{role.title}</span>
                  <span className="role__cta">
                    View role <ArrowUpRight aria-hidden="true" size={17} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass-card roles-empty" data-reveal>
            <p>Open roles are listed on the CID Consulting careers page.</p>
            <a className="button button--primary focus-ring" href={fallbackCareersUrl} target="_blank" rel="noreferrer">
              View open roles <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        )}
      </Section>
    </>
  );
}
