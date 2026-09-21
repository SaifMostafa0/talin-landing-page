import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Blocks, Bot, Check, Landmark, Linkedin, Network, ShieldCheck, Users } from "lucide-react";
import talinMark from "../assets/talin-reduced-white.png";
import talinDarkMark from "../assets/talin-full-dark.png";
import ahmedPhoto from "../assets/Ahmed_Salama.jfif";
import daliaPhoto from "../assets/Dalia_Wahba.avif";

export const Route = createFileRoute("/version-two")({
  head: () => ({ meta: [{ title: "Talin | Human-Led Intelligence — Version Two" }] }),
  component: VersionTwo,
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

function VersionTwo() {
  return <main className="v2-page">
    <nav className="v2-nav"><a href="#hero" className="v2-logo"><img src={talinMark} alt="Talin" /></a><div><a href="#about">About</a><a href="#services">Services</a><a href="#process">Process</a><a href="#contact">Contact</a></div><a className="v2-nav-cta" href="#contact">Let&apos;s Talk <ArrowUpRight size={16} /></a></nav>

    <section id="hero" className="v2-hero"><div className="v2-glow v2-glow-a" /><div className="v2-glow v2-glow-b" /><div className="v2-hero-inner"><p className="v2-kicker">Talin / Independent transformation advisory</p><h1>Human-Led<br /><em>Intelligence.</em></h1><p className="v2-hero-copy">We turn technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.</p><a className="v2-gradient-button" href="#contact">Start a conversation <ArrowUpRight size={18} /></a></div><span className="v2-scroll">Scroll to explore ↓</span></section>

    <section id="about" className="v2-about"><div className="v2-section-head"><p className="v2-kicker">01 / Why Talin Exists</p><h2>Why Talin Exists</h2><p className="v2-section-sub">Technology only matters when people can use it.</p></div><div className="v2-about-grid"><div className="v2-statements"><article><span>Vision</span><p>To become the trusted advisor for data, AI, business intelligence, and digital transformation across Egypt and the region, delivering measurable, ethical, and human-centered value.</p></article><article><span>Mission</span><p>To close the gap between technology ambition and business results, so every investment creates value leadership can see, measure, and build on.</p></article></div><div className="v2-symbol"><img src={talinDarkMark} alt="Talin symbol" /><span>Human<br />centred by<br />design.</span></div></div><div className="v2-heritage"><div className="v2-heritage-number">30+<span>Years of consulting heritage</span></div><div><h3 className="v2-heritage-label"><Landmark aria-hidden="true" size={22} /> A CID Consulting Company</h3><p>Talin builds on more than three decades of CID Consulting&apos;s management-consulting heritage, bringing deep change management and organizational expertise to every technology transformation.</p></div></div></section>

    <section id="services" className="v2-services"><div className="v2-section-head v2-section-head-light"><p className="v2-kicker">02 / Intelligence in Action</p><h2>Intelligence in Action</h2><p className="v2-section-sub">Built around business value.</p></div><div className="v2-service-grid">{services.map(([Icon, title, copy]) => <article className="v2-service-card" key={title}><Icon size={34} strokeWidth={1.25} /><small>{title}</small><p>{copy}</p><ArrowUpRight className="v2-card-arrow" size={19} /></article>)}</div></section>

    <section id="process" className="v2-process"><div className="v2-process-intro"><div className="v2-process-head"><p className="v2-kicker">03 / How We Partner</p><h2>How We Partner</h2><p className="v2-section-sub">A clear path from question to progress.</p></div><div className="v2-process-notes"><p><b>Business-first.</b> We start with the problem, not the technology. Every engagement is judged by the value it creates.</p><p><b>Tech-agnostic.</b> We recommend what is right for the business, independent of any single vendor or platform.</p></div></div><div className="v2-timeline">{steps.map(([number, title, copy]) => <article key={title}><span>{number}</span><Check size={15} /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-leadership"><div className="v2-section-head"><p className="v2-kicker">04 / Leadership</p><h2>The Minds Behind<br /><span>Talin.</span></h2></div><div className="v2-leader-grid"><Leader name="Ahmed Salama" role="Founder & CEO" photo={ahmedPhoto} linkedin="https://www.linkedin.com/in/salamaahmed/">Ahmed brings more than 25 years of technology leadership, partnering with C-suite leaders to ensure technology investments deliver real commercial value.</Leader><Leader name="Dalia Wahba" role="Co-Founder" photo={daliaPhoto} linkedin="https://www.linkedin.com/in/dalia-wahba-1102bb/">Dalia brings a track record of designing high-impact marketing, public-private partnership, and organizational-transformation initiatives.</Leader></div></section>

    <section id="contact" className="v2-contact"><div><p className="v2-kicker">05 / Start a conversation</p><h2>Let&apos;s Talk.</h2><p>Tell us what you&apos;re working on, and we&apos;ll tell you how we can help.</p></div><form onSubmit={(event) => event.preventDefault()}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>How can we help?<textarea name="message" rows={3} placeholder="Tell us a little about your challenge" /></label><button className="v2-gradient-button" type="submit">Get in Touch <ArrowUpRight size={18} /></button></form></section>
    <footer className="v2-footer"><img src={talinMark} alt="Talin" /><span>A CID Consulting Company</span><small>© 2026 Talin. All rights reserved.</small></footer>
  </main>;
}

function Leader({ name, role, photo, linkedin, children }: { name: string; role: string; photo: string; linkedin: string; children: React.ReactNode }) { return <article className="v2-leader-card"><img src={photo} alt={`Portrait of ${name}`} /><div><p className="v2-kicker">{role}</p><h3>{name}</h3><p>{children}</p><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></div></article>; }