// Source: Talin Website Content v1.3 — Home §4 and What we do §3–5.

export type ServiceId =
  | "digital-strategy"
  | "data-foundations"
  | "business-intelligence"
  | "applied-ai"
  | "commercial-transformation"
  | "technology-advisory"
  | "data-monetization"
  | "transformation-governance";

export interface Service {
  id: ServiceId;
  title: string;
  summary: string;
  includes: string[];
  note?: string;
}

export const serviceOfferingIntro =
  "Translating digital ambition into measurable corporate growth requires end-to-end capabilities across strategy, technology, and organizational adoption.";

export const services: Service[] = [
  {
    id: "digital-strategy",
    title: "Digital Strategy & Transformation Advisory",
    summary:
      "Defining digital roadmaps, maturity baselines, and operating models aligned directly with corporate objectives.",
    includes: [
      "Digital maturity assessments",
      "Transformation roadmaps",
      "Operating model design",
      "Capability planning",
      "Executive alignment",
    ],
  },
  {
    id: "data-foundations",
    title: "Enterprise Data Foundations & Governance",
    summary:
      "Establishing structured data architecture, compliance frameworks, and ownership models to secure enterprise data as a managed asset.",
    includes: [
      "Data strategy and roadmap",
      "Data assessment and maturity review",
      "Data architecture and modernization",
      "AI-ready data foundation",
      "Data governance and quality",
    ],
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence & Decision Analytics",
    summary:
      "Delivering executive dashboards and decision analytics that improve operational visibility and reporting consistency.",
    includes: [
      "Executive and operational dashboards",
      "KPIs and BI reporting",
      "Self-service analytics",
      "Industry-specific analytics",
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI & Intelligent Automation",
    summary:
      "Deploying practical artificial intelligence and automated workflows focused on clear operational ROI.",
    includes: [
      "AI opportunity assessment and use case design",
      "Business case development and AI roadmap",
      "Adoption planning and responsible AI governance",
      "AI agents, copilots, and retrieval-augmented generation",
      "Workflow orchestration with human-in-the-loop processes",
    ],
    note: "Agentic AI is treated as part of a broader operating model connected to business processes, data foundations, risk controls, and measurable outcomes, not as a standalone experiment.",
  },
  {
    id: "commercial-transformation",
    title: "Commercial Transformation",
    summary:
      "Improving how organizations sell, serve, and engage customers, with CRM and customer data brought into one view.",
    includes: [
      "CRM implementation across sales, service, and marketing",
      "Customer data brought into one view",
      "Support for faster deal closing, quicker issue resolution, and more relevant campaigns",
    ],
  },
  {
    id: "technology-advisory",
    title: "Technology Advisory & Integration",
    summary:
      "Evaluating platforms from an independent perspective to ensure system compatibility and long-term scalability.",
    includes: [
      "Platform evaluation",
      "Solution architecture",
      "Vendor alignment",
      "Implementation advisory",
      "Integration considerations",
      "Technology roadmap support",
    ],
  },
  {
    id: "data-monetization",
    title: "Data Monetization & Value Creation",
    summary:
      "Cataloging and structuring unmapped data assets to unlock operational efficiencies and commercial opportunities.",
    includes: [
      "Identifying new revenue streams",
      "Improving customer value",
      "Optimizing operations",
      "Supporting new business models",
    ],
  },
  {
    id: "transformation-governance",
    title: "Transformation Governance & Capacity Building",
    summary:
      "Establishing program oversight, tracking benefits, and enabling workforce adoption to ensure lasting value realization.",
    includes: [
      "Change management planning and leadership alignment",
      "Stakeholder communication and culture change",
      "Training programs and capacity building",
      "Program governance: success KPIs, adoption tracking, and benefits realization",
      "Executive reporting",
      "Clear roles, decision rights, and accountability",
    ],
  },
];

export const acrossAllPhases = {
  label: "Across all phases",
  title: "Chief AI Officer (CAIO) as a Service",
  copy: "Senior AI leadership without a full-time hire.",
} as const;

export type PillarId = "strategy" | "data" | "ai" | "commercial" | "people";

export const pillarsHeadline = "Advisory and delivery, end to end. Five connected pillars.";

export const pillars: { id: PillarId; title: string; copy: string }[] = [
  {
    id: "strategy",
    title: "Strategy & Digital Advisory",
    copy: "We help leadership teams set clear digital priorities aligned to business strategy, then turn them into practical roadmaps, operating models, and capability plans.",
  },
  {
    id: "data",
    title: "Data, Analytics & BI",
    copy: "We help organizations build the data foundations and governance behind confident decisions, from strategy and assessments to executive dashboards and reporting.",
  },
  {
    id: "ai",
    title: "AI & Intelligent Automation",
    copy: "We help organizations identify and implement AI and automation use cases with the clearest path to value, from predictive models to AI agents and workflows.",
  },
  {
    id: "commercial",
    title: "Commercial Transformation",
    copy: "We help organizations improve how they sell, serve, and engage customers, using CRM and customer data brought into one view so teams can close deals faster, resolve issues sooner, and run more relevant campaigns.",
  },
  {
    id: "people",
    title: "People & Governance",
    copy: "We prepare people for change through enablement, training, communication, and capacity building, while putting in place the governance that keeps transformation efforts on track. Preparing people and processes to work in new ways.",
  },
];

/* Each gain has a one-word label naming the area it improves, shown large beside the full sentence. */
export const clientGains = [
  { label: "Strategy", text: "Clearer digital, data, BI, and AI strategies aligned with business objectives" },
  { label: "Decisions", text: "Better executive decision-making through trusted data and insights" },
  { label: "Foundations", text: "Stronger data foundations that support analytics, automation, AI, and monetization" },
  { label: "Use cases", text: "Prioritized AI, agentic AI, and data monetization use cases with measurable business value" },
  { label: "Adoption", text: "Stronger adoption and lasting culture change through people-centered enablement" },
  { label: "Governance", text: "Stronger governance, accountability, and transformation execution" },
] as const;
