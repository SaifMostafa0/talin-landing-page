// Source: Talin Website Content v1.3 — How we work §1–5.

export const howWeWorkHero = {
  headline: "How we work",
  subheading: "Advisory and delivery, working as one team.",
} as const;

export type PrincipleId = "business-first" | "tech-agnostic" | "people-centered";

export const principles: { id: PrincipleId; title: string; copy: string }[] = [
  {
    id: "business-first",
    title: "Business-first philosophy",
    copy: "We start with the business problem, not the technology. Every engagement is judged by the business value it creates, not the sophistication of the tools involved.",
  },
  {
    id: "tech-agnostic",
    title: "Tech-agnostic stance",
    copy: "We recommend what is right for the business, not what is easiest for us to sell. Our recommendations are independent of any single vendor or platform.",
  },
  {
    id: "people-centered",
    title: "People-centered delivery",
    copy: "We treat people and communication as part of delivery, not an afterthought to it. Every implementation includes deliberate change management, so the teams who use what we build are ready and equipped to adopt it.",
  },
];

/** Each item is "Name: description" in the source; split for display. */
export const clientsReceive = [
  {
    title: "Advisory",
    items: [
      ["Data maturity assessment", "a diagnostic to understand current capabilities"],
      ["AI readiness diagnostic", "an evaluation of the organization's preparedness"],
      ["Use-case roadmap", "identifying and prioritizing AI and data opportunities"],
      ["Governance framework", "policies, controls, and ethics guidelines"],
      ["Business case and ROI modeling", "financial justification and value projections"],
      ["Tech-agnostic stack recommendations", "unbiased technology guidance"],
    ],
  },
  {
    title: "Delivery",
    items: [
      ["Data pipeline architecture", "building scalable data infrastructure"],
      ["Interactive dashboards and analytics", "business intelligence tools"],
      ["AI model development and integration", "custom machine learning solutions"],
      ["Team training and capability building", "upskilling internal teams"],
      ["Performance monitoring and optimization", "tracking and improving results"],
      ["Continuous improvement framework", "ensuring long-term success"],
    ],
  },
] as const;

export const valueMethod = {
  headline: "VALUE: five phases, each closed by a decision gate",
  introduction:
    "VALUE is the methodology Talin uses to deliver specific projects. It works within the engagement flow, which is Talin's higher-level approach.",
  principle: "Value sets the baseline. Evidence measures against it. Every phase ends in a decision, not a report.",
  offeringsNote: "The offerings in each phase are deliverables that can run across different client engagements.",
  phases: [
    {
      letter: "V",
      name: "Value",
      question: "What business outcomes are we trying to create?",
      gate: "Target outcomes and KPIs agreed",
      tools: "Use Case Library",
      offerings: [
        ["Executive AI Briefing", "A short session that gives leaders a clear view of what AI can and cannot do for their business."],
        ["AI Ideation Workshop", "A facilitated workshop that turns business problems into a first list of AI opportunities."],
      ],
    },
    {
      letter: "A",
      name: "Assess",
      question: "Where do strategy, data, technology, people and governance stand?",
      gate: "Baseline and gaps agreed",
      tools: "Maturity Index",
      offerings: [
        ["Maturity Diagnostic", "Measures where strategy, data, technology, people and governance stand today."],
        ["Program Health Check", "Reviews a running program to show what is on track and what needs attention."],
        ["AI System Inventory and Risk", "Lists the AI systems in use and rates the risks each one carries."],
        ["PDPL Readiness", "Checks how ready the organization is to comply with the Personal Data Protection Law (PDPL)."],
      ],
    },
    {
      letter: "L",
      name: "Link",
      question: "Which use cases, capabilities and investments serve those outcomes?",
      gate: "Prioritized, funded portfolio approved",
      tools: "Use Case Library, Value Model",
      offerings: [
        ["Prioritization Matrix", "Ranks use cases by value, effort and risk, so leaders know what to do first."],
        ["Data Readiness", "Checks whether the data behind a use case is available, trusted and usable."],
        ["Business Case", "Sets out the expected value, cost and KPIs of an investment."],
        ["Strategy and Roadmap", "Defines the direction and a sequenced plan for data, AI and digital."],
        ["Data Strategy and Governance", "Sets how data is owned, managed, protected and used to support the business."],
        ["Agentic AI Readiness", "Assesses whether the organization, data and controls are ready for AI agents."],
        ["Data Monetization", "Identifies how data can create new revenue, improve customer value, or optimize operations."],
      ],
    },
    {
      letter: "U",
      name: "Unlock",
      question: "What data, AI, technology, operating model and people changes are needed?",
      gate: "Owners, controls and platform in place",
      tools: "Responsible AI by Design",
      offerings: [
        ["Operating Model and CoE", "Designs how work is organized and governed, including a Center of Excellence (CoE) for AI and data."],
        ["Architecture and Sourcing", "Defines the target architecture and helps choose the right platforms and partners."],
        ["Responsible AI and Governance", "Puts policies, controls and accountability in place for the safe and ethical use of AI."],
        ["GenAI Guardrails", "Sets practical rules and technical limits for the use of generative AI."],
        ["Workforce and Change", "Prepares people and teams for new ways of working through change management and capability building."],
        ["AI Literacy", "Builds a shared understanding of AI across leaders and teams."],
      ],
    },
    {
      letter: "E",
      name: "Evidence",
      question: "Did we get the value: adoption, KPIs, ROI and TCO (total cost of ownership)?",
      gate: "Results measured against the Value baseline",
      tools: "Value Model",
      offerings: [
        ["Value Realization Tracking", "Tracks adoption, KPIs and ROI against the value baseline agreed at the start."],
        ["Data and AI Spend Review", "Reviews what is being spent on data and AI, and whether it is paying off."],
      ],
    },
  ],
} as const;
