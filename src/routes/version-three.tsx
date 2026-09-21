import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Blocks, Bot, Check, Landmark, Linkedin, Network, ShieldCheck, Users } from "lucide-react";
import talinMark from "../assets/talin-reduced-white.png";
import ahmedPhoto from "../assets/Ahmed_Salama.jfif";
import daliaPhoto from "../assets/Dalia_Wahba.avif";

export const Route = createFileRoute("/version-three")({
  head: () => ({ meta: [{ title: "Talin | Human-Led Intelligence — Version Three" }] }),
  component: VersionThree,
});

const services = [
  [Network, "Digital Strategy & Transformation", "Turn ambition into a focused roadmap for meaningful change."],
  [BarChart3, "Data & Analytics", "Build the data foundations and intelligence your decisions depend on."],
  [Bot, "AI Strategy & Agentic AI", "Move from AI curiosity to practical, responsible business value."],
  [Blocks, "Technology & Solution Advisory", "Choose platforms and solutions that fit the business, not a vendor agenda."],
  [Users, "People, Change & Capacity Building", "Help teams adopt new ways of working and make transformation stick."],
  [ShieldCheck, "Governance & Value Realization", "Keep investment accountable through clear measures and ownership."],
] as const;

const steps = [
  ["01", "Discovery", "Listen first."], ["02", "Roadmap", "Align priorities."], ["03", "Build", "Make it real."], ["04", "Adopt", "Bring people with you."], ["05", "Sustain", "Keep improving."],
] as const;

const coreValues = ["Human-centricity", "Foresight", "Intelligence", "Partnership", "Responsibility", "Business value"];
const commitments = ["Measurable impact", "Business value", "Sustainable growth"];

function VersionThree() {
  return <main className="v3-page">
    <nav className="v3-nav"><a href="#hero" className="v3-logo"><img src={talinMark} alt="Talin" /></a><div><a href="#about">About</a><a href="#services">Services</a><a href="#process">Process</a><a href="#contact">Contact</a></div><a className="v3-nav-cta" href="#contact">Let&apos;s Talk <ArrowUpRight size={16} /></a></nav>

    <section id="hero" className="v3-hero"><div className="v3-orb v3-orb-a" /><div className="v3-orb v3-orb-b" /><div className="v3-hero-inner"><p className="v3-kicker">Talin / Independent transformation advisory</p><h1>Human-Led<br /><em className="v3-text-gradient">Intelligence.</em></h1><p className="v3-hero-copy">We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.</p><a className="v3-gradient-button" href="#contact">Start a conversation <ArrowUpRight size={18} /></a></div><span className="v3-scroll">Scroll to explore ↓</span></section>

    <section id="about" className="v3-about"><div className="v3-section-head"><p className="v3-kicker">01 / Why Talin Exists</p><h2>Why Talin Exists</h2><p className="v3-section-sub">Technology only matters <span className="v3-text-gradient">when people can use it.</span></p></div><div className="v3-about-grid"><div className="v3-statements"><article><span>Vision</span><p>To become the trusted advisor for data, AI, business intelligence, and digital transformation across Egypt and the region, delivering measurable, ethical, and human-centered value.</p></article><article><span>Mission</span><p>To close the gap between technology ambition and business results, so every investment creates value leadership can see, measure, and build on.</p></article></div><TalinSpark /></div><div className="v3-facts"><FactsCard number="06" label="Core values" items={coreValues} /><FactsCard number="03" label="Commitments" items={commitments} /></div><div className="v3-heritage"><div className="v3-heritage-number">30+<span>Years of consulting heritage</span></div><div><h3 className="v3-heritage-label"><Landmark aria-hidden="true" size={22} /> A CID Consulting Company</h3><p>Talin builds on more than three decades of CID Consulting&apos;s management-consulting heritage, bringing deep change management and organizational expertise to every technology transformation.</p></div></div></section>

    <section id="services" className="v3-services"><div className="v3-section-head v3-section-head-dark"><p className="v3-kicker">02 / Intelligence in Action</p><h2>Intelligence in <span className="v3-text-gradient">Action</span></h2><p className="v3-section-sub">Built around <span className="v3-text-gradient">business value.</span></p></div><div className="v3-service-grid">{services.map(([Icon, title, copy]) => <article className="v3-service-card" key={title}><Icon size={30} strokeWidth={1.5} /><small>{title}</small><p>{copy}</p><ArrowUpRight className="v3-card-arrow" size={18} /></article>)}</div></section>

    <section id="process" className="v3-process"><div className="v3-process-intro"><div className="v3-process-head"><p className="v3-kicker">03 / How We Partner</p><h2>How We <span className="v3-text-gradient">Partner</span></h2><p className="v3-section-sub">A clear path from <span className="v3-text-gradient">question to progress.</span></p></div><div className="v3-process-notes"><p><b>Business-first.</b> We start with the problem, not the technology. Every engagement is judged by the value it creates.</p><p><b>Tech-agnostic.</b> We recommend what is right for the business, independent of any single vendor or platform.</p></div></div><div className="v3-timeline">{steps.map(([number, title, copy]) => <article key={title}><span>{number}</span><Check size={15} /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v3-leadership"><div className="v3-section-head"><p className="v3-kicker">04 / Leadership</p><h2>The Minds Behind<br /><span className="v3-text-gradient">Talin.</span></h2></div><div className="v3-leader-grid"><Leader name="Ahmed Salama" role="Founder & CEO" photo={ahmedPhoto} linkedin="https://www.linkedin.com/in/salamaahmed/">Ahmed brings more than 25 years of technology leadership, partnering with C-suite leaders to ensure technology investments deliver real commercial value.</Leader><Leader name="Dalia Wahba" role="Co-Founder" photo={daliaPhoto} linkedin="https://www.linkedin.com/in/dalia-wahba-1102bb/">Dalia brings a track record of designing high-impact marketing, public-private partnership, and organizational-transformation initiatives.</Leader></div></section>

    <section id="contact" className="v3-contact"><div><p className="v3-kicker">05 / Start a conversation</p><h2>Let&apos;s <span className="v3-text-gradient">Talk.</span></h2><p>Tell us what you&apos;re working on, and we&apos;ll tell you how we can help.</p></div><form onSubmit={(event) => event.preventDefault()}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>How can we help?<textarea name="message" rows={3} placeholder="Tell us a little about your challenge" /></label><button className="v3-gradient-button" type="submit">Get in Touch <ArrowUpRight size={18} /></button></form></section>

    <footer className="v3-footer"><div className="v3-footer-brand"><img src={talinMark} alt="Talin" /><span>A CID Consulting Company</span></div><small>© 2026 Talin. All rights reserved.</small></footer>
  </main>;
}

function FactsCard({ number, label, items }: { number: string; label: string; items: readonly string[] }) {
  return <article className="v3-facts-card"><p className="v3-facts-number">{number}</p><p className="v3-facts-label">{label}</p><ul className="v3-facts-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function Leader({ name, role, photo, linkedin, children }: { name: string; role: string; photo: string; linkedin: string; children: React.ReactNode }) {
  return <article className="v3-leader-card"><img src={photo} alt={`Portrait of ${name}`} /><div><p className="v3-kicker">{role}</p><h3>{name}</h3><p>{children}</p><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></div></article>;
}

function TalinSpark() {
  return <div className="v3-symbol">
    <svg viewBox="0 0 400 400" role="img" aria-label="Talin expanding spark symbol">
      <defs>
        <linearGradient id="v3SparkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000C3E" />
          <stop offset="0.4" stopColor="#0A0087" />
          <stop offset="0.72" stopColor="#375AE6" />
          <stop offset="1" stopColor="#32B6FB" />
        </linearGradient>
        <radialGradient id="v3SparkGlow" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#v3SparkGrad)" />
      <rect width="400" height="400" fill="url(#v3SparkGlow)" />
      <g fill="none" stroke="#FFFFFF" strokeOpacity="0.22">
        <circle cx="200" cy="200" r="82" strokeWidth="1" />
        <circle cx="200" cy="200" r="126" strokeWidth="1" />
        <circle cx="200" cy="200" r="166" strokeWidth="1" strokeDasharray="2 12" />
        <circle cx="200" cy="200" r="196" strokeWidth="1" strokeDasharray="1 16" />
      </g>
      <g fill="none" stroke="#A2D0FA" strokeOpacity="0.45" strokeWidth="1.25">
        <line x1="200" y1="40" x2="200" y2="104" />
        <line x1="200" y1="296" x2="200" y2="360" />
        <line x1="40" y1="200" x2="104" y2="200" />
        <line x1="296" y1="200" x2="360" y2="200" />
        <line x1="87" y1="87" x2="131" y2="131" />
        <line x1="269" y1="131" x2="313" y2="87" />
        <line x1="131" y1="269" x2="87" y2="313" />
        <line x1="313" y1="269" x2="269" y2="313" />
      </g>
      <g fill="#99CCFF">
        <circle cx="200" cy="38" r="3" />
        <circle cx="200" cy="362" r="3" />
        <circle cx="38" cy="200" r="3" />
        <circle cx="362" cy="200" r="3" />
      </g>
      <path fill="#FFFFFF" d="M200 88 L224 176 L310 200 L224 224 L200 312 L176 224 L90 200 L176 176 Z" />
    </svg>
  </div>;
}