import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Check,
  HeartHandshake,
  Landmark,
  Linkedin,
  MapPin,
  Menu,
  Network,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import reducedLogoAsset from "../assets/talin-reduced-white.png";
import ahmedSalamaPhoto from "../assets/Ahmed_Salama.jfif";
import daliaWahbaPhoto from "../assets/Dalia_Wahba.avif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talin | Human-Led Intelligence" },
      {
        name: "description",
        content:
          "Talin aligns strategy, technology, and people to turn data, AI, and digital investment into measurable business value.",
      },
      { property: "og:title", content: "Talin | Human-Led Intelligence" },
      {
        property: "og:description",
        content:
          "Independent data, AI, business intelligence, and digital strategy consulting built around measurable value.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["About", "about"],
  ["What We Do", "services"],
  ["How We Work", "approach"],
  ["Leadership", "leadership"],
  ["Contact", "contact"],
] as const;

const services = [
  {
    icon: Network,
    number: "01",
    title: "Digital Strategy & Transformation",
    copy: "Clear digital priorities aligned to business strategy.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Data & Analytics",
    copy: "Strategy, architecture, governance, and business intelligence, end to end.",
  },
  {
    icon: Bot,
    number: "03",
    title: "AI Strategy & Agentic AI",
    copy: "Practical, business-driven AI adoption, from strategy through autonomous agents and automation.",
  },
  {
    icon: Blocks,
    number: "04",
    title: "Technology & Solution Advisory",
    copy: "Selecting the right platforms and technology for business goals, independent of any single vendor.",
  },
  {
    icon: Users,
    number: "05",
    title: "People, Change & Capacity Building",
    copy: "Preparing people, not just systems, for transformation.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Governance & Value Realization",
    copy: "Clear governance, KPIs, and execution discipline that keep transformation accountable.",
  },
];

const steps = [
  ["01", "Discovery", "Understand the goal, the audience, and the constraints."],
  ["02", "Roadmap", "Align on direction, priorities, and what success looks like."],
  ["03", "Build", "Design, build, and test the solution."],
  ["04", "Adopt", "Support the people and processes that make it stick."],
  ["05", "Sustain", "Monitor, improve, and scale what works."],
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [approachVisible, setApproachVisible] = useState(false);
  const [flowVisible, setFlowVisible] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    let frame = 0;
    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
        const about = document.getElementById("about");
        const sectionOffset = about ? Number.parseFloat(window.getComputedStyle(about).scrollMarginTop) : 0;
        setHeaderSolid(hero.getBoundingClientRect().bottom <= Math.max(headerHeight, sectionOffset));
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    const approach = document.getElementById("approach");
    if (!approach) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setApproachVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(approach);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const flow = document.getElementById("engagement-flow");
    if (!flow) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlowVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <header className={`site-header fixed inset-x-0 top-0 z-50 border-b ${headerSolid || menuOpen ? "is-solid" : ""}`}>
        <div className="page-shell flex h-[4.5rem] items-center justify-between">
          <a href="#top" aria-label="Talin home" className="brand-lockup focus-ring inline-flex items-center">
            <img
              src={reducedLogoAsset}
              alt="Talin"
              className="h-11 w-44 object-contain object-left"
            />
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={headerSolid && activeSection === id ? "location" : undefined}
                className={`nav-link focus-ring ${headerSolid && activeSection === id ? "active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="button-primary focus-ring hidden lg:inline-flex">
            Get in Touch <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring flex size-11 items-center justify-center text-nav-foreground lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
          <nav aria-label="Mobile navigation" aria-hidden={!menuOpen} className={`mobile-nav absolute inset-x-0 top-full h-[calc(100svh-4.5rem)] border-t border-nav-border lg:hidden ${menuOpen ? "is-open" : ""}`}>
            <div className="page-shell flex h-full flex-col justify-between py-8">
              <div className="flex flex-col">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={headerSolid && activeSection === id ? "location" : undefined}
                  className="mobile-nav-link focus-ring border-b border-nav-border py-4 font-display text-3xl text-nav-foreground"
                >
                  {label}
                </a>
              ))}
              </div>
              <a href="#contact" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} className="button-hero focus-ring justify-between">
                Get in Touch <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </nav>
      </header>

      <section id="top" className="hero-field relative flex min-h-[97svh] items-center pt-[4.5rem]">
        <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
        <div aria-hidden="true" className="talin-star hero-star"><span /></div>
        <div className="hero-layout page-shell relative z-10 grid w-full gap-12 py-20 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="max-w-4xl">
            <h1 className="font-display text-hero-foreground text-6xl leading-[0.98] font-bold md:text-8xl lg:text-[7.5rem]">
              Human-Led
              <span className="block text-hero-accent">Intelligence.</span>
            </h1>
          </div>
          <div className="flex max-w-xl flex-col justify-end lg:pb-2">
            <p className="hero-body-copy text-hero-body">
              We turn technology investment into measurable, sustainable growth by aligning strategy,
              technology, and people around real business value.
            </p>
            <a href="#contact" className="button-hero focus-ring mt-9 self-start">
              Get in Touch <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
        <a href="#about" aria-label="Explore Talin" className="focus-ring absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-hero-muted md:bottom-7">
          <ArrowDown aria-hidden="true" className="animate-gentle-bounce" />
        </a>
      </section>

      <section id="about" className="about-field section-pad scroll-mt-10">
        <div className="content-grid">
          <div>
            <h2 className="section-title">Why Talin Exists</h2>
          </div>
          <div>
            <div className="statement-grid grid gap-px bg-strong-border md:grid-cols-2">
              <article className="bg-surface-light p-7 md:p-10 lg:p-11">
                <span className="statement-label">Vision</span>
                <p className="statement-copy">To become the trusted advisor for data, AI, business intelligence, and digital transformation across Egypt and the region, delivering measurable, ethical, and human-centered value.</p>
              </article>
              <article className="bg-surface-light p-7 md:p-10 lg:p-11">
                <span className="statement-label">Mission</span>
                <p className="statement-copy">To close the gap between technology ambition and business results, so that every investment in data, AI, and digital transformation creates value leadership can see, measure, and build on.</p>
              </article>
            </div>
          </div>
        </div>
        <div className="page-shell mt-14 lg:mt-20">
          <div className="pillar-grid grid gap-5 md:grid-cols-3">
            <article className="pillar-card p-7">
              <HeartHandshake aria-hidden="true" className="pillar-icon" strokeWidth={1.5} />
              <h3 className="principle-title">Our values</h3>
              <p className="pillar-statement text-sm leading-relaxed text-muted-foreground">Six core values guide how we work:</p>
              <ul className="pillar-list pillar-list-values mt-6">
                {["human-centricity", "foresight", "intelligence", "partnership", "responsibility", "business value"].map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
            <article className="pillar-card p-7">
              <Target aria-hidden="true" className="pillar-icon" strokeWidth={1.5} />
              <h3 className="principle-title">Our commitments</h3>
              <p className="pillar-statement text-sm leading-relaxed text-muted-foreground">Three commitments define what every client can expect:</p>
              <ul className="pillar-list mt-6">
                {["measurable impact", "business value", "sustainable growth"].map((commitment) => (
                  <li key={commitment}>{commitment}</li>
                ))}
              </ul>
            </article>
            <article className="heritage-strip">
              <div className="heritage-number">30+<span>Years of consulting heritage</span></div>
              <div>
              <h3 className="heritage-label"><Landmark aria-hidden="true" size={22} /> A CID Consulting Company</h3>
              <p className="pillar-statement text-sm leading-relaxed text-muted-foreground">Talin builds on more than three decades of CID Consulting's management-consulting heritage, bringing deep change management and organizational expertise to every technology transformation.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="services" className="section-pad scroll-mt-28">
        <div className="page-shell">
          <div className="content-grid">
            <div>
              <h2 className="section-title">Intelligence in Action</h2>
            </div>
            <p className="section-intro what-we-do-intro max-w-3xl text-muted-foreground">We work in two connected modes. Advisory helps organizations define direction, strategy, and readiness. Delivery builds, implements, and embeds the solutions that advisory defines.</p>
          </div>
          <div className="mt-16 grid border-l border-t border-border md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ icon: Icon, number, title, copy }) => (
              <article key={title} className="service-card group border-b border-r border-border p-7 md:p-9">
                <div className="flex items-start justify-between">
                  <Icon aria-hidden="true" className="text-primary" strokeWidth={1.5} size={32} />
                  <span className="font-body text-xs font-semibold text-muted-foreground">{number}</span>
                </div>
                <div className="service-content">
                  <h3 className="max-w-xs font-body text-2xl leading-tight font-semibold text-primary md:text-[1.7rem]">{title}</h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className={`approach-field section-pad relative overflow-hidden text-navy-foreground scroll-mt-28 ${approachVisible ? "approach-visible" : ""}`}>
        <div aria-hidden="true" className="talin-star approach-star"><span /></div>
        <div className="page-shell relative z-10">
          <div className="content-grid">
            <div className="approach-heading">
              <h2 className="section-title text-navy-foreground">How We Partner</h2>
            </div>
            <div className="philosophy-grid grid gap-10 md:grid-cols-2">
              <article className="philosophy-card">
                <BrainCircuit aria-hidden="true" className="text-navy-accent" strokeWidth={1.5} size={34} />
                <h3 className="mt-6 font-display text-2xl font-semibold">Business-First Philosophy</h3>
                <p className="mt-4 leading-relaxed text-navy-muted">We start with the business problem, not the technology. Every engagement is judged by the business value it creates, not the sophistication of the tools involved.</p>
              </article>
              <article className="philosophy-card">
                <Check aria-hidden="true" className="text-navy-accent" strokeWidth={1.5} size={34} />
                <h3 className="mt-6 font-display text-2xl font-semibold">Tech-Agnostic Stance</h3>
                <p className="mt-4 leading-relaxed text-navy-muted">We recommend what is right for the business, not what is easiest for us to sell. Our recommendations are independent of any single vendor or platform.</p>
              </article>
            </div>
          </div>
          <div id="engagement-flow" className={`engagement-flow mt-20 ${flowVisible ? "is-visible" : ""}`}>
            <p className="eyebrow text-navy-accent">Engagement Flow</p>
            <div className={`engagement-grid mt-7 md:grid md:grid-cols-5 ${flowVisible ? "is-visible" : ""}`}>
              {steps.map(([number, title, copy]) => (
                <article key={title} className="engagement-step group relative">
                  <span className="step-node font-body text-xs font-semibold">{number}</span>
                  <h3 className="font-display text-2xl font-semibold">{title}.</h3>
                  <p className="mt-3 leading-relaxed text-navy-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="leadership-field section-pad scroll-mt-28">
        <div className="page-shell">
          <div className="content-grid leadership-grid">
            <div>
              <h2 className="section-title leadership-title">The Minds Behind Talin</h2>
            </div>
            <div className="founder-grid">
              <Leader name="Ahmed Salama" role="Founder & CEO" photo={ahmedSalamaPhoto} linkedinUrl="https://www.linkedin.com/in/salamaahmed/">
                Ahmed Salama is the Founder and CEO of Talin. He brings more than 25 years of technology leadership, most recently as Regional Director for AI Business Solutions at Microsoft. He is an Adjunct Professor of Practice at the American University in Cairo&apos;s School of Business, and partners directly with C-suite leaders to ensure technology investments deliver real commercial value.
              </Leader>
              <Leader name="Dalia Wahba" role="Co-Founder" photo={daliaWahbaPhoto} linkedinUrl="https://www.linkedin.com/in/dalia-wahba-1102bb/">
                Dalia Wahba is Co-Founder of Talin and Chairperson of CID Consulting. She brings a track record of designing high-impact marketing, public-private partnership, and organizational-transformation initiatives for global institutions, including roles on AmCham Egypt&apos;s Board of Governors and the American University in Cairo School of Business Dean&apos;s Strategic Advisory Board.
              </Leader>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-field section-pad relative scroll-mt-28">
        <div className="page-shell relative z-10">
          <div className="contact-content mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="font-display text-5xl leading-none font-light text-contact-foreground md:text-7xl">Let&apos;s Talk</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-contact-muted md:text-xl">Tell us what you are working on, and we will tell you how we can help.</p>
            <button type="button" className="button-contact mt-9" aria-label="Get in Touch">
              Get in Touch <ArrowUpRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-nav-border bg-nav py-10 text-nav-foreground">
        <div className="page-shell">
          <div className="footer-main grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start">
            <div className="footer-lockup">
              <img src={reducedLogoAsset} alt="Talin" className="h-12 w-44 object-contain object-left" />
              <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-navy-muted">A CID Consulting Company</p>
            </div>
            <div className="footer-contact-list" aria-label="Company contact details">
              <div className="footer-contact-item">
                <MapPin aria-hidden="true" />
                <div>
                  <span className="footer-contact-label">Cairo office</span>
                  <p>Cairo, Egypt</p>
                </div>
              </div>
              <div className="footer-contact-item">
                <Linkedin aria-hidden="true" />
                <div>
                  <span className="footer-contact-label">Talin company page</span>
                  <p><a href="https://www.linkedin.com/company/talindata/home/" target="_blank" rel="noreferrer">linkedin.com/company/talindata</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-legal mt-10 md:text-right">
            <p className="font-body text-xs text-navy-muted">© 2026 Talin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Leader({ name, role, photo, linkedinUrl, children }: { name: string; role: string; photo: string; linkedinUrl: string; children: React.ReactNode }) {
  return (
    <article className="founder-card">
      <div className="founder-heading">
      <div className="leader-portrait relative aspect-square w-32 overflow-hidden bg-primary">
        <img src={photo} alt={`Portrait of ${name}`} className="h-full w-full object-contain" />
      </div>
        <div>
          <h3 className="font-display text-3xl font-semibold text-primary md:text-4xl">{name}</h3>
          <span className="mt-2 block font-body text-sm font-semibold text-muted-foreground">{role}</span>
          <a className="leader-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}>
            <Linkedin aria-hidden="true" />
            <span>LinkedIn profile</span>
          </a>
        </div>
      </div>
      <p className="leader-copy mt-5 max-w-3xl text-muted-foreground">{children}</p>
    </article>
  );
}
