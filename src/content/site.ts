// Site-wide copy and details. Source: Talin Website Content v1.3 (November 2026).
// Copy is approved verbatim — change it only when the content document changes.

export const SITE_URL = "https://talindata.com";
export const SITE_NAME = "Talin";

export const navigation = [
  { label: "About", to: "/about" },
  { label: "What we do", to: "/what-we-do" },
  { label: "How we work", to: "/how-we-work" },
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
] as const;

export const primaryCta = { label: "Get in touch", to: "/contact" } as const;

export const contactDetails = {
  email: "info@talindata.com",
  phoneDisplay: "+ (202) 2736 4479",
  phoneHref: "tel:+20227364479",
  address: "17 El Mara'shly Street, 7th Floor, Zamalek, 11211, Cairo, Egypt",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("17 El Mara'shly Street, Zamalek, Cairo, Egypt"),
  linkedin: {
    company: { label: "Talin company page", url: "https://www.linkedin.com/company/talindata" },
    ahmed: { label: "Ahmed Salama", url: "https://www.linkedin.com/in/salamaahmed" },
    dalia: { label: "Dalia Wahba", url: "https://www.linkedin.com/in/dalia-wahba-1102bb" },
  },
} as const;

export const contactCta = {
  headline: "Where could this create the most value for your business?",
  copy: "We'd love to explore what this could look like for your organization.",
  button: "Get in touch",
} as const;

export const copyright = "© 2026 Talin. All rights reserved.";

export const capabilities = [
  "Data",
  "AI",
  "Business Intelligence",
  "Digital Transformation & Strategy",
  "Commercial Transformation",
  "Change Management & Adoption",
] as const;

export const engagementFlow = [
  { title: "Discovery", copy: "Understand the goal, the audience, and the constraints." },
  { title: "Roadmap", copy: "Align on direction, priorities, and what success looks like." },
  { title: "Build", copy: "Design, build, and test the solution." },
  { title: "Adopt", copy: "Support the people and processes that make it stick." },
  { title: "Sustain", copy: "Monitor, improve, and scale what works." },
] as const;

export const connectedModes = [
  {
    title: "Advisory",
    copy: "Helping organizations define their direction, strategy, and readiness, through assessment, planning, and roadmap development.",
  },
  {
    title: "Delivery and Implementation",
    copy: "Executing, building, and operationalizing the solutions defined in the advisory phase.",
  },
] as const;

export const whoWeAre = {
  label: "WHO WE ARE",
  paragraphs: [
    "Talin is the data, AI, business intelligence, and digital strategy company launched by CID Consulting. We work with leadership teams to turn technology and digital investments into business results, starting from the business priority and following it through to adoption.",
    "We begin in Egypt and are built to serve organizations across the region.",
  ],
} as const;

export const cidSummary =
  "CID Consulting is a business and development management consulting company, with more than three decades of experience, delivering 500+ projects for 300+ clients across the public and private sectors.";
