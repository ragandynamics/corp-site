export interface FAQ {
  id: string;
  category:
    | "General"
    | "AI Strategy"
    | "AI Security"
    | "Implementation"
    | "Microsoft"
    | "Government Support";

  question: string;
  answer: string;
  featured: boolean;
}

export const faqs: FAQ[] = [
  {
    id: "discovery",

    category: "General",

    question:
      "What happens during the complimentary AI Discovery Session?",

    answer:
      "During the session, we learn about your business objectives, operational challenges, current systems and growth plans. We'll identify practical AI opportunities, discuss expected business outcomes and recommend the most suitable next steps—without any obligation.",

    featured: true
  },

  {
    id: "ai-opportunities",

    category: "AI Strategy",

    question:
      "How do you identify the best AI opportunities for our business?",

    answer:
      "We evaluate your business processes, existing technology, operational challenges and strategic objectives. We then prioritise AI initiatives based on business impact, implementation effort, expected return on investment and time to value.",

    featured: true
  },

  {
    id: "roi",

    category: "AI Strategy",

    question:
      "What business results can we expect from AI?",

    answer:
      "Every organisation is different, but common outcomes include reduced operating costs, improved employee productivity, faster customer response times, fewer manual tasks, better business insights and increased revenue opportunities. We define measurable success criteria before implementation begins.",

    featured: true
  },

  {
    id: "cost",

    category: "AI Strategy",

    question:
      "How much does an AI implementation typically cost?",

    answer:
      "The investment depends on your business goals, project scope, integrations and deployment approach. We provide transparent pricing with a phased implementation roadmap so you can start with high-value initiatives and expand over time. During the discovery session, we can also discuss government support programmes that may be relevant to eligible Singapore SMEs.",

    featured: true
  },

  {
    id: "project-duration",

    category: "Implementation",

    question:
      "How long does an AI project take?",

    answer:
      "Many focused AI automation projects can be delivered within a few weeks, while broader digital transformation initiatives are typically implemented in phases over several months. We prioritise quick wins so you can begin seeing business value early.",

    featured: true
  },

  {
    id: "integration",

    category: "Implementation",

    question:
      "Will AI work with our existing systems?",

    answer:
      "Yes. We integrate AI solutions with Microsoft 365, Dynamics 365, SharePoint, Power Platform, SAP, Salesforce, ServiceNow, ERP platforms, CRM systems, cloud services and custom business applications using secure integration methods.",

    featured: true
  },

  {
    id: "copilot",

    category: "Microsoft",

    question:
      "Can you help us implement Microsoft 365 Copilot and Copilot Studio?",

    answer:
      "Yes. We help organisations assess readiness, deploy Microsoft 365 Copilot securely, build custom AI agents using Copilot Studio and automate business processes using the Microsoft Power Platform.",

    featured: true
  },

  {
    id: "government-support",

    category: "Government Support",

    question:
      "Can you advise on government support programmes for AI projects?",

    answer:
      "Yes. During our AI Discovery Session, we can discuss government support programmes that may be relevant to eligible Singapore SMEs and explain how they may fit into your AI implementation plans. Programme availability and eligibility depend on the specific scheme and your business circumstances. We focus on helping you build a practical business case first, then discuss funding options where appropriate.",

    featured: true
  },

  {
    id: "security",

    category: "AI Security",

    question:
      "How do you protect our business data?",

    answer:
      "Security is built into every engagement. We implement identity management, role-based access control, encryption, audit logging, responsible AI practices and governance controls. We also help clients select enterprise AI services that align with their security and compliance requirements.",

    featured: true
  },

  {
    id: "industry",

    category: "General",

    question:
      "Can AI solutions be customised for our industry?",

    answer:
      "Absolutely. Every organisation has unique processes and regulatory requirements. We tailor AI solutions for manufacturing, retail, logistics, healthcare, financial services, education, professional services and government organisations.",

    featured: false
  },

  {
    id: "post-deployment",

    category: "Implementation",

    question:
      "What happens after deployment?",

    answer:
      "We continue to support you after go-live through monitoring, optimisation, user adoption, governance reviews, AI performance improvements and ongoing advisory services to maximise long-term business value.",

    featured: false
  },

  {
    id: "llm-choice",

    category: "General",

    question:
      "Which AI platform or model is right for our business?",

    answer:
      "There is no one-size-fits-all solution. We evaluate your requirements and recommend the most suitable combination of platforms, models and cloud services based on business outcomes, security, cost, scalability and integration needs.",

    featured: false
  },

  {
    id: "data-privacy",

    category: "AI Security",

    question:
      "Will our business data be used to train public AI models?",

    answer:
      "That depends on the AI platform and deployment model. We help clients select enterprise AI services and configurations that align with their privacy, security and compliance requirements, and we explain how your data will be handled before implementation.",

    featured: false
  },
  {
  id: "start-small",

  category: "AI Strategy",

  question:
    "Can we start with a small AI project before making a larger investment?",

  answer:
    "Absolutely. We recommend starting with a focused proof of value or pilot project that addresses a specific business challenge. This allows you to validate the benefits, minimise risk and build confidence before scaling AI across your organisation.",

  featured: true
}
];