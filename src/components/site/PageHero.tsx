import type { ReactNode } from "react";
import { useHeroParallax } from "../../lib/motion";

export function HeroBackdrop({ watermark = true }: { watermark?: boolean }) {
  return (
    <div aria-hidden="true" className="hero__backdrop">
      <div className="hero__media" />
      <div className="hero__lines" />
      <div className="hero__layer hero__layer--far">
        <div className="hero__orbit hero__orbit--a" />
      </div>
      <div className="hero__layer hero__layer--near">
        <div className="hero__orbit hero__orbit--b" />
      </div>
      {watermark && <div className="hero__watermark">TALIN</div>}
    </div>
  );
}

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
  const ref = useHeroParallax<HTMLElement>();
  return (
    <section ref={ref} className={`hero hero--${size}`}>
      <HeroBackdrop />
      <div className="shell hero__inner">
        <h1 className="hero__title">{headline}</h1>
        {subheading && <p className="hero__subheading">{subheading}</p>}
        {children}
      </div>
    </section>
  );
}
