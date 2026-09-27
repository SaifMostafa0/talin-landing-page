import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Check,
  CircleDollarSign,
  Handshake,
  Infinity as InfinityIcon,
  Linkedin,
  Lightbulb,
  MapPin,
  Menu,
  Network,
  Phone,
  Route as RouteIcon,
  Search,
  ShieldCheck,
  Sprout,
  Target,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import cidWhiteLogoAsset from "../assets/CIDWhiteLogo.png";
import talinEndorsedMarkAsset from "../assets/talin-mark-endorsed-transparent.png";
import ahmedPortraitAsset from "../assets/Ahmed_Salama.jfif";
import daliaPortraitAsset from "../assets/Dalia_Wahba.avif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talin | Human-Led Intelligence" },
      {
        name: "description",
        content:
          "We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.",
      },
      { property: "og:title", content: "Talin | Human-Led Intelligence" },
      {
        property: "og:description",
        content:
          "We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.",
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
  { icon: Search, title: "Discovery", copy: "Understand the goal, the audience, and the constraints." },
  { icon: RouteIcon, title: "Roadmap", copy: "Align on direction, priorities, and what success looks like." },
  { icon: Blocks, title: "Build", copy: "Design, build, and test the solution." },
  { icon: UserRoundCheck, title: "Adopt", copy: "Support the people and processes that make it stick." },
  { icon: InfinityIcon, title: "Sustain", copy: "Monitor, improve, and scale what works." },
] as const;

const coreValues = [
  { label: "Human-centricity", icon: Users },
  { label: "Foresight", icon: Search },
  { label: "Intelligence", icon: Lightbulb },
  { label: "Partnership", icon: Handshake },
  { label: "Responsibility", icon: ShieldCheck },
  { label: "Business value", icon: BarChart3 },
];
const commitments = [
  { label: "Measurable impact", icon: Target },
  { label: "Business value", icon: CircleDollarSign },
  { label: "Sustainable growth", icon: Sprout },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [aboutVisible, setAboutVisible] = useState(false);
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
    let frame = 0;
    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setHeaderSolid(window.scrollY > 8);
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
    const animatedElements = document.querySelectorAll<HTMLElement>(
      ".why-talin-title, .why-talin-statement, .why-talin-heritage, .why-talin-principle-group, #services .content-grid, .service-card, #approach .content-grid, .leadership-grid > div:first-child, .founder-card, .contact-content",
    );

    // Stagger per sibling group so each block reveals as its own wave.
    const groupOrder = new Map<Element, number>();
    animatedElements.forEach((element) => {
      element.classList.add("motion-reveal");
      const group = element.parentElement ?? element;
      const order = groupOrder.get(group) ?? 0;
      groupOrder.set(group, order + 1);
      element.style.setProperty("--reveal-order", String(order % 6));
    });

    const pending = new Set<HTMLElement>(animatedElements);

    const reveal = (element: HTMLElement) => {
      if (!pending.has(element)) return;
      pending.delete(element);
      element.classList.add("is-revealed");
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 12% 0px" },
    );

    animatedElements.forEach((element) => observer.observe(element));

    // A fast scroll can step an element past the observer's sample points without
    // it ever registering as intersecting, which would strand it at opacity 0.
    // Sweep the remaining ones on the next frame of any scroll or resize instead.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      if (!pending.size) return;
      const limit = window.innerHeight * 0.92;
      pending.forEach((element) => {
        if (element.getBoundingClientRect().top < limit) reveal(element);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAboutVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" },
    );

    observer.observe(about);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const approach = document.getElementById("approach");
    if (!approach) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setApproachVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" },
    );

    observer.observe(approach);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const flow = document.getElementById("engagement-flow");
    if (!flow) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setFlowVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" },
    );

    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="original-page overflow-clip bg-background text-foreground">
      <header className={`site-header fixed inset-x-0 top-0 z-50 border-b ${headerSolid || menuOpen ? "is-solid" : ""}`}>
        <div className="page-shell flex h-[4.5rem] items-center justify-between">
          <a href="#top" aria-label="Talin by CID Consulting home" className="brand-lockup focus-ring inline-flex items-center">
            <span className="logo-artwork header-logo-artwork">
              <span className="logo-wordmark"><img src={talinEndorsedMarkAsset} alt="" /></span>
              <span className="logo-endorsement">BY CID CONSULTING</span>
            </span>
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

      <section id="top" className="v2-hero relative">
        <div aria-hidden="true" className="v2-glow v2-glow-a" />
        <div aria-hidden="true" className="v2-glow v2-glow-b" />
        <div className="v2-hero-inner">
          <h1>Human-Led<br /><em>Intelligence.</em></h1>
          <p className="v2-hero-copy">We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.</p>
          <a href="#contact" className="v2-gradient-button focus-ring">Get in Touch <ArrowUpRight aria-hidden="true" size={18} /></a>
        </div>
        <a href="#about" aria-label="Explore Talin" className="focus-ring absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-hero-muted md:bottom-7">
          <ArrowDown aria-hidden="true" className="animate-gentle-bounce" />
        </a>
      </section>

      <div className={`about-services-surface ${aboutVisible ? "about-visible" : ""}`}>
        <div className="why-talin-art" aria-hidden="true">
          <span className="why-talin-art-ribbon" />
          <svg className="why-talin-art-star" viewBox="0 0 100 100" focusable="false">
            <path d="M0 0 Q50 27 100 0 Q73 50 100 100 Q50 73 0 100 Q27 50 0 0Z" />
          </svg>
        </div>
        <section id="about" className="v3-about final-about why-talin scroll-mt-10">
          <div className="why-talin-inner">
            <h2 className="why-talin-title">Why Talin Exists</h2>
            <div className="why-talin-story">
              <div className="why-talin-statements">
                <article className="why-talin-statement">
                  <h3>Vision</h3>
                  <p>To become the trusted advisor for data, AI, business intelligence, and digital transformation across Egypt and the region, delivering measurable, ethical, and human-centered value.</p>
                </article>
                <article className="why-talin-statement">
                  <h3>Mission</h3>
                  <p>To close the gap between technology ambition and business results, so that every investment in data, AI, and digital transformation creates value leadership can see, measure, and build on.</p>
                </article>
              </div>
              <aside className="why-talin-heritage" aria-label="CID Consulting heritage">
                <div className="why-talin-cid-lockup">
                  <div className="why-talin-heritage-metric">
                    <strong>30+</strong>
                  </div>
                  <img src={cidWhiteLogoAsset} alt="CID Consulting" />
                  <span className="why-talin-heritage-caption">Years of consulting heritage</span>
                </div>
                <p>Talin builds on more than three decades of CID Consulting&apos;s management-consulting heritage, bringing deep change management and organizational expertise to every technology transformation.</p>
              </aside>
            </div>
            <div className="why-talin-principles">
              <section className="why-talin-principle-group" aria-labelledby="why-values-heading">
                <h3 id="why-values-heading">Core Values</h3>
                <ul className="why-talin-values">
                  {coreValues.map(({ label, icon: Icon }) => <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>)}
                </ul>
              </section>
              <section className="why-talin-principle-group" aria-labelledby="why-commitments-heading">
                <h3 id="why-commitments-heading">Commitments</h3>
                <ul className="why-talin-commitments">
                  {commitments.map(({ label, icon: Icon }) => <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>)}
                </ul>
              </section>
            </div>
          </div>
        </section>

        <section id="services" className="section-pad scroll-mt-28">
          <div className="page-shell">
            <div className="services-layout">
              <div className="content-grid services-intro">
                <div>
                  <h2 className="section-title">Intelligence in Action</h2>
                </div>
                <div className="what-we-do-intro" aria-label="Our two connected modes">
                  <h3 className="service-intro-kicker">Two connected modes</h3>
                  <div className="service-intro-modes">
                    <div>
                      <h4>Advisory</h4>
                      <p>Helps organizations define direction, strategy, and readiness.</p>
                    </div>
                    <div>
                      <h4>Delivery</h4>
                      <p>Builds, implements, and embeds the solutions that advisory defines.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="services-capabilities">
                <div className="services-grid grid md:grid-cols-2 xl:grid-cols-3">
                  {services.map(({ icon: Icon, number, title, copy }) => (
                    <article key={title} className="service-card group p-7 md:p-9">
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
            </div>
          </div>
        </section>
      </div>

      <section id="approach" className={`approach-field section-pad relative overflow-hidden text-navy-foreground scroll-mt-28 ${approachVisible ? "approach-visible" : ""}`}>
        <div className="page-shell relative z-10">
          <div className="content-grid">
            <div className="approach-heading">
              <h2 className="section-title text-navy-foreground">How We Partner</h2>
            </div>
            <div className="philosophy-grid grid gap-10 md:grid-cols-2">
              <article className="philosophy-card">
                <BrainCircuit aria-hidden="true" className="text-navy-accent" strokeWidth={1.5} size={34} />
                <h3 className="mt-6 font-body text-2xl font-semibold">Business-First Philosophy</h3>
                <p className="mt-4 leading-relaxed text-navy-muted">We start with the business problem, not the technology. Every engagement is judged by the business value it creates, not the sophistication of the tools involved.</p>
              </article>
              <article className="philosophy-card">
                <Check aria-hidden="true" className="text-navy-accent" strokeWidth={1.5} size={34} />
                <h3 className="mt-6 font-body text-2xl font-semibold">Tech-Agnostic Stance</h3>
                <p className="mt-4 leading-relaxed text-navy-muted">We recommend what is right for the business, not what is easiest for us to sell. Our recommendations are independent of any single vendor or platform.</p>
              </article>
            </div>
          </div>
          <div id="engagement-flow" className={`engagement-flow mt-20 ${flowVisible ? "is-visible" : ""}`}>
            <h3 className="engagement-title">Engagement Flow</h3>
            <div className={`engagement-grid mt-7 md:grid md:grid-cols-5 ${flowVisible ? "is-visible" : ""}`}>
              {steps.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="engagement-step group relative">
                  <div className="step-orb">
                    <Icon className="step-orb-icon" aria-hidden="true" size={32} strokeWidth={1.6} />
                    <h4 className="font-body text-2xl font-semibold">{title}</h4>
                  </div>
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
              <Leader name="Ahmed Salama" role="Founder & CEO" portrait={ahmedPortraitAsset} linkedinUrl="https://www.linkedin.com/in/salamaahmed/">
                Ahmed Salama is the Founder and CEO of Talin. He brings more than 25 years of technology leadership, most recently as Regional Director for AI Business Solutions at Microsoft. He is an Adjunct Professor of Practice at the American University in Cairo&apos;s School of Business, and partners directly with C-suite leaders to ensure technology investments deliver real commercial value.
              </Leader>
              <Leader name="Dalia Wahba" role="Co-Founder" portrait={daliaPortraitAsset} portraitClassName="dalia-portrait" linkedinUrl="https://www.linkedin.com/in/dalia-wahba-1102bb/">
                Dalia Wahba is Co-Founder of Talin and Chairperson of CID Consulting. She brings a track record of designing high-impact marketing, public-private partnership, and organizational-transformation initiatives for global institutions, including roles on AmCham Egypt&apos;s Board of Governors and the American University in Cairo School of Business Dean&apos;s Strategic Advisory Board.
              </Leader>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-footer-surface">
        <section id="contact" className="contact-field section-pad relative scroll-mt-28">
          <div className="page-shell relative z-10">
            <div className="contact-content mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="contact-copy">
                <h2 className="font-display text-5xl leading-none font-light text-contact-foreground md:text-7xl">Let&apos;s Talk</h2>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-contact-muted md:text-xl">Tell us what you are working on, and we will tell you how we can help.</p>
                <a href="mailto:info@talindata.com" className="button-contact mt-9" aria-label="Email Talin at info@talindata.com">
                  Get in Touch
                </a>
              </div>
              <div className="footer-contact-list" aria-label="Company contact details">
                <div className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <MapPin />
                  </span>
                  <div className="footer-contact-copy">
                    <span className="footer-contact-label">Office</span>
                    <p>17 El Mara&apos;shly Street, 7th Floor, Zamalek, 11211, Cairo, Egypt.</p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <Phone />
                  </span>
                  <div className="footer-contact-copy">
                    <span className="footer-contact-label">Telephone</span>
                    <p><a href="tel:+20227364479">+ (202) 2736 4479</a></p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <Linkedin />
                  </span>
                  <div className="footer-contact-copy">
                    <span className="footer-contact-label">LinkedIn</span>
                    <p><a href="https://www.linkedin.com/company/talindata/home/" target="_blank" rel="noreferrer">Talin company page</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-nav-foreground">
          <div className="page-shell">
            <div className="footer-legal">
              <span className="logo-artwork footer-logo-artwork">
                <span className="logo-wordmark"><img src={talinEndorsedMarkAsset} alt="Talin" /></span>
                <span className="logo-endorsement">BY CID CONSULTING</span>
              </span>
              <div className="footer-details">
                <p className="font-body text-xs text-navy-muted">© 2026 Talin. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Leader({ name, role, portrait, portraitClassName, linkedinUrl, children }: { name: string; role: string; portrait: string; portraitClassName?: string; linkedinUrl: string; children: React.ReactNode }) {
  return (
    <article className="founder-card">
      <div className="founder-heading">
        <div className="leader-portrait relative aspect-square w-32 overflow-hidden bg-primary">
          <img className={portraitClassName} src={portrait} alt={name} loading="lazy" />
        </div>
        <div>
          <h3 className="font-body text-3xl font-semibold text-primary md:text-4xl">{name}</h3>
          <div className="leader-role-row mt-2">
            <span className="font-body text-sm font-semibold text-muted-foreground">{role}</span>
            <a className="leader-link focus-ring" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}><Linkedin aria-hidden="true" size={17} /></a>
          </div>
        </div>
      </div>
      <p className="leader-copy mt-5 max-w-3xl text-muted-foreground">{children}</p>
    </article>
  );
}
