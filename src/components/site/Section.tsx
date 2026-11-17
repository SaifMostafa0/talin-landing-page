import type { ReactNode } from "react";

export type Tone = "pastel" | "white" | "mist" | "navy";

export function Section({
  id,
  tone = "pastel",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section section--${tone} ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  level = 2,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className={`section-heading section-heading--${align}`} data-reveal>
      {eyebrow &&
        (title ? (
          <p className="eyebrow">{eyebrow}</p>
        ) : (
          <Heading id={id} className="eyebrow">
            {eyebrow}
          </Heading>
        ))}
      {title && (
        <Heading id={id} className="section-title">
          {title}
        </Heading>
      )}
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
