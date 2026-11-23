// Source: Talin Website Content v1.3 — Home §5, §8 and About §1–7.

export const aboutHero = {
  headline: "About Talin",
  subheading:
    "Talin turns technology investment into measurable, sustainable growth by aligning strategy, technology, and people around real business value.",
} as const;

export const positioning = [
  "A business-led Data, AI and Digital Transformation firm.",
  "From business problem to measured business value.",
] as const;

export const visionMission = {
  vision:
    "To become the trusted advisor for data, AI, business intelligence, and digital transformation across Egypt and the region, delivering measurable, ethical, and human-centered value.",
  mission:
    "To close the gap between technology ambition and business results, so that every investment in data, AI, and digital transformation creates value leadership can see, measure, and build on.",
} as const;

export const byCid = {
  headline: "By CID Consulting",
  paragraphs: [
    "CID Consulting is a business and development management consulting company, with more than three decades of experience, delivering 500+ projects for 300+ clients across the public and private sectors.",
    "That legacy in management consulting, together with strategic AI partnerships and access to global AI governance frameworks, is part of what Talin brings to every engagement.",
  ],
  columns: [
    {
      title: "CID brings",
      items: [
        "30+ years, 500+ projects and 300+ clients",
        "Strategic advisory, public-private partnerships and transformation",
        "Institutional trust and relationships",
      ],
    },
    {
      title: "Talin brings",
      items: ["Data, AI and agentic AI capability", "Egypt delivery center serving Egypt and the GCC"],
    },
    {
      title: "Together",
      items: [
        "Business-led advice that ends in implemented, measured results",
        "Credibility with enterprise and government buyers",
      ],
    },
  ],
} as const;

export type ValueId =
  | "human-centricity"
  | "foresight"
  | "intelligence"
  | "partnership"
  | "responsibility"
  | "business-value";

export const values: { id: ValueId; title: string; copy: string }[] = [
  { id: "human-centricity", title: "Human-centricity", copy: "People are at the center of every transformation." },
  { id: "foresight", title: "Foresight", copy: "Anticipating trends and future-proofing solutions." },
  { id: "intelligence", title: "Intelligence", copy: "Data-driven, rigorous analysis." },
  { id: "partnership", title: "Partnership", copy: "Collaborative, long-term relationships." },
  {
    id: "responsibility",
    title: "Responsibility",
    copy: "Acting with responsibility, internally and externally, across everything we do, recommend, and deliver.",
  },
  {
    id: "business-value",
    title: "Business value",
    copy: "Measurable, sustainable business outcomes, the central driver of our work.",
  },
];

export const valuesHeadline = "Six values guide how we work.";

export const commitments = {
  headline: "Our commitments to every client",
  intro:
    "Talin partners with organizations to turn data, BI, AI, digital capabilities, and people readiness into better decisions, stronger execution, new opportunities, and long-term competitive advantage.",
  items: ["Measurable Impact", "Business Value", "Sustainable Growth", "Human-Centric Delivery"],
} as const;

export const whyTalin = [
  "Business value first, technology second",
  "End-to-end partnership, from strategy through adoption",
  "Structured capacity building for long-term technology adoption",
  "Human Experience aligned with organization design that keeps people at the center of every transformation for lasting impact",
  "Tech-agnostic, unbiased recommendations",
  "Ethical and responsible AI in practice, delivered with local expertise to global standards",
] as const;

export const people = {
  ahmed: {
    name: "Ahmed Salama",
    role: "Co-Founder & CEO",
    bio: "Ahmed brings over 25 years of technology leadership, most recently as Regional Director for AI Business Solutions at Microsoft. He also serves as Adjunct Professor of Practice at the American University in Cairo's Onsi Sawiris School of Business. As Talin's CEO, he partners directly with C-suite leaders to ensure technology investments deliver measurable commercial value.",
    linkedin: "https://www.linkedin.com/in/salamaahmed",
  },
  dalia: {
    name: "Dalia Wahba",
    role: "Co-Founder & Chairperson",
    bio: "Dalia is Co-Founder and Chairperson of CID Consulting, bringing decades of strategic advisory experience across marketing, public-private partnerships, and organizational transformation for global institutions and private clients. She currently serves on AmCham Egypt's Board of Governors as Vice President for Membership, and on the AUC School of Business's Dean's Strategic Advisory Board.",
    linkedin: "https://www.linkedin.com/in/dalia-wahba-1102bb",
  },
  cid: {
    name: "CID Consulting",
    role: "Investor",
    bio: "CID Consulting is a business and development management consulting company, with more than three decades of experience, delivering 500+ projects for 300+ clients across the public and private sectors.",
  },
} as const;
