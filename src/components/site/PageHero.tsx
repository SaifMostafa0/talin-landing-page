import type { ReactNode } from "react";

export function PageHero({
  headline,
  subheading,
  children,
  size = "page",
}: {
  headline: ReactNode;
  subheading?: ReactNode;
  children?: ReactNode;
  size?: "home" | "page";
}) {
  return (
    <section className={`hero hero--${size}`}>
      <div aria-hidden="true" className="hero__orbit hero__orbit--a" />
      <div aria-hidden="true" className="hero__orbit hero__orbit--b" />
      <div className="shell hero__inner">
        <h1 className="hero__title">{headline}</h1>
        {subheading && <p className="hero__subheading">{subheading}</p>}
        {children}
      </div>
    </section>
  );
}
