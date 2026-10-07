import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Linkedin,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import talinMark from "../assets/talin-mark-endorsed-transparent.png";
import { fetchCareersFeed, filterJobs } from "../lib/careers";
import "../careers.css";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Talin | Build What Comes Next" },
      {
        name: "description",
        content:
          "Bring your curiosity to the intersection of strategy, data, AI, and people. Explore careers at Talin, a CID Consulting company.",
      },
      {
        property: "og:title",
        content: "Careers at Talin | Build What Comes Next",
      },
      {
        property: "og:description",
        content:
          "Human-led intelligence starts with people. Discover your next chapter at Talin.",
      },
    ],
  }),
  component: Careers,
});

const navigation = [
  ["About", "/#about"],
  ["What We Do", "/#services"],
  ["How We Work", "/#approach"],
  ["Leadership", "/#leadership"],
  ["Careers", "/careers"],
  ["Contact", "/#contact"],
];
const principles = [
  [
    "01",
    "Start with curiosity.",
    "Ask the questions that matter. Look beyond the technology to understand the business challenge and the people behind it.",
  ],
  [
    "02",
    "Turn thinking into impact.",
    "Connect strategy with delivery. Help turn ambitious ideas into practical solutions that create measurable value.",
  ],
  [
    "03",
    "Keep people at the centre.",
    "Bring different perspectives together. Build with the people who will use our work, so that change lasts.",
  ],
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="/"
      aria-label="Talin by CID Consulting home"
      className="focus-ring brand-lockup"
    >
      <span
        className={`logo-artwork ${footer ? "footer-logo-artwork" : "header-logo-artwork"}`}
      >
        <span className="logo-wordmark">
          <img src={talinMark} alt="" />
        </span>
        <span className="logo-endorsement">BY CID CONSULTING</span>
      </span>
    </a>
  );
}

function Careers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = () => {
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const links =
          mobileNav.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButton.current?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) close();
    };
    desktop.addEventListener("change", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <div className="careers-page">
      <a className="careers-skip" href="#careers-main">
        Skip to content
      </a>
      <header className="site-header is-solid fixed inset-x-0 top-0 z-50 border-b">
        <div className="page-shell flex h-[4.5rem] items-center justify-between">
          <Brand />
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`nav-link focus-ring ${label === "Careers" ? "active" : ""}`}
                aria-current={label === "Careers" ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:info@talindata.com"
            className="button-primary focus-ring hidden lg:inline-flex"
          >
            Get in Touch <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            className="focus-ring flex size-11 items-center justify-center text-nav-foreground lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="careers-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav
            ref={mobileNav}
            id="careers-mobile-nav"
            aria-label="Mobile navigation"
            className="careers-mobile-nav lg:hidden"
          >
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={label === "Careers" ? "page" : undefined}
                className="focus-ring"
              >
                {label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="careers-main" tabIndex={-1}>
        <section className="careers-hero" aria-labelledby="careers-title">
          <div className="page-shell">
            <p className="careers-eyebrow">Careers at Talin</p>
            <div className="careers-hero-grid">
              <h1 id="careers-title">
                Build what
                <br />
                comes <em>next.</em>
              </h1>
              <div className="careers-hero-aside">
                <p>
                  Human-led intelligence.
                  <br />
                  <span>Powered by people like you.</span>
                </p>
                <p className="careers-hero-copy">
                  Bring your curiosity, your perspective, and your ambition to
                  the intersection of strategy, technology, and people.
                </p>
                <a className="careers-button focus-ring" href="#opportunities">
                  Explore opportunities{" "}
                  <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="careers-hero-bottom">
              <span>Your perspective. Real-world impact.</span>
              <span>A CID Consulting company</span>
            </div>
          </div>
        </section>

        <section
          className="careers-culture page-shell"
          aria-labelledby="culture-title"
        >
          <div className="careers-section-heading">
            <p className="careers-eyebrow">The way we think</p>
            <div>
              <h2 id="culture-title">
                Great technology.
                <br />
                <span>Even greater human potential.</span>
              </h2>
              <p>
                At Talin, we believe the value of technology is realised through
                people. Our work brings business thinking and technical
                expertise together to create meaningful, lasting change.
              </p>
            </div>
          </div>
          <div className="careers-principles">
            {principles.map(([number, title, copy]) => (
              <article key={number}>
                <span className="careers-number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="careers-disciplines"
          aria-labelledby="disciplines-title"
        >
          <div className="page-shell careers-disciplines-inner">
            <div>
              <p className="careers-eyebrow">Where we make a difference</p>
              <h2 id="disciplines-title">
                Different skills.
                <br />
                Shared purpose.
              </h2>
            </div>
            <div className="careers-discipline-list">
              {[
                "Strategy & Transformation",
                "Data & Analytics",
                "AI & Technology",
                "People & Change",
              ].map((name, index) => (
                <div key={name}>
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="opportunities"
          className="careers-opportunities page-shell"
          aria-labelledby="opportunities-title"
        >
          <div className="careers-jobs-heading">
            <div>
              <p className="careers-eyebrow">Your next chapter</p>
              <h2 id="opportunities-title">Find your place at Talin.</h2>
            </div>
            <p>Explore opportunities to put your ideas into action.</p>
          </div>
          <Opportunities />
        </section>

        <section className="careers-connect" aria-labelledby="connect-title">
          <div className="page-shell careers-connect-inner">
            <div>
              <p className="careers-eyebrow">Stay connected</p>
              <h2 id="connect-title">
                Good things start
                <br />
                with a connection.
              </h2>
              <p>
                Get to know Talin and follow our journey as we bring human-led
                intelligence to life.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/company/talindata/"
              target="_blank"
              rel="noreferrer"
              className="careers-button focus-ring"
            >
              <Linkedin size={18} aria-hidden="true" /> Follow Talin on LinkedIn{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="careers-footer">
        <div className="page-shell">
          <Brand footer />
          <a href="/" className="focus-ring">
            Explore Talin <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p>© 2026 Talin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Opportunities() {
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ["careers"],
    queryFn: ({ signal }) => fetchCareersFeed(signal),
    staleTime: 60_000,
    retry: 1,
  });
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const jobs = data?.jobs ?? [];
  const filtered = filterJobs(jobs, query, department);
  const departments = [...new Set(jobs.map((job) => job.department))].sort();

  if (isPending)
    return (
      <div className="careers-empty" role="status">
        <span className="careers-loading" aria-hidden="true" />
        <h3>Finding your next opportunity…</h3>
        <p>Loading current openings.</p>
      </div>
    );
  if (isError)
    return (
      <div className="careers-empty" role="status">
        <BriefcaseBusiness size={30} strokeWidth={1.3} aria-hidden="true" />
        <h3>We couldn’t load opportunities.</h3>
        <p>Please try again in a moment.</p>
        <button
          className="careers-text-link focus-ring"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          {isFetching ? "Trying again…" : "Try again"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    );
  if (!jobs.length)
    return (
      <div className="careers-empty">
        <div className="careers-empty-icon">
          <BriefcaseBusiness size={29} strokeWidth={1.3} aria-hidden="true" />
        </div>
        <p className="careers-eyebrow">
          {data?.status === "coming-soon"
            ? "A new chapter is taking shape"
            : "Stay in the loop"}
        </p>
        <h3>
          {data?.status === "coming-soon"
            ? "Future opportunities start here."
            : "No open roles right now."}
        </h3>
        <p>
          {data?.status === "coming-soon"
            ? "We’ll share our open roles here as they become available. Check back soon and discover where your next chapter could take you."
            : "Please check back for new opportunities. In the meantime, get to know our work and the thinking behind it."}
        </p>
        <a href="/#services" className="careers-text-link focus-ring">
          Discover what we do <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    );

  return (
    <div>
      <div className="careers-filters">
        <div>
          <label htmlFor="careers-search">Search opportunities</label>
          <div className="careers-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="careers-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Job title, keyword, or location"
            />
          </div>
        </div>
        <div>
          <label htmlFor="careers-team">Team</label>
          <select
            id="careers-team"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">All teams</option>
            {departments.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="careers-results" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "opportunity" : "opportunities"}
      </p>
      {filtered.length ? (
        <div className="careers-job-list">
          {filtered.map((job) => (
            <article key={job.id} className="careers-job">
              <div>
                <p className="careers-eyebrow">{job.department}</p>
                <h3>{job.title}</h3>
                <p className="careers-job-meta">
                  {job.location} <span aria-hidden="true">/</span>{" "}
                  {job.employmentType}
                </p>
                <p>{job.summary}</p>
              </div>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="careers-text-link focus-ring"
                aria-label={`View role and apply: ${job.title} (opens in a new tab)`}
              >
                View role & apply <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="careers-empty" role="status">
          <h3>No matching opportunities.</h3>
          <p>Try a different keyword or explore all teams.</p>
          <button
            className="careers-text-link focus-ring"
            onClick={() => {
              setQuery("");
              setDepartment("");
            }}
          >
            Clear filters <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
