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
    id: "ai-opportunities",

    category: "AI Strategy",

    question:
      "How do we identify the best AI opportunities for our business?",

    answer:
      "We begin with an AI Discovery Workshop to understand your business goals, operational challenges and existing technology landscape. Together we prioritise use cases based on business value, implementation complexity and expected return on investment.",

    featured: true
  },

  {
    id: "project-duration",

    category: "Implementation",

    question:
      "How long does an AI transformation project typically take?",

    answer:
      "Timelines depend on the scope and complexity of the initiative. A focused proof of concept may take a few weeks, while enterprise transformation programmes are typically delivered in phases over several months. We focus on delivering incremental business value throughout the engagement.",

    featured: true
  },

  {
    id: "roi",

    category: "AI Strategy",

    question:
      "How do you measure AI return on investment (ROI)?",

    answer:
      "We measure success using business outcomes rather than technical metrics. Typical indicators include productivity improvements, reduced manual effort, faster customer response times, lower operating costs, improved decision-making and revenue growth. We establish baseline measurements and review progress throughout the project.",

    featured: true
  },

  {
    id: "integration",

    category: "Implementation",

    question:
      "Can AI integrate with our existing systems?",

    answer:
      "Yes. We integrate AI solutions with Microsoft 365, Dynamics 365, SharePoint, SAP, Salesforce, ServiceNow, ERP platforms, CRM systems, cloud services and custom applications using secure APIs and enterprise integration patterns.",

    featured: true
  },

  {
    id: "security",

    category: "AI Security",

    question:
      "How do you ensure AI security and governance?",

    answer:
      "Security is built into every engagement. We implement identity management, role-based access control, encryption, audit logging, responsible AI principles, governance frameworks and compliance controls throughout the solution lifecycle.",

    featured: true
  },

  {
    id: "copilot",

    category: "Microsoft",

    question:
      "Do you support Microsoft 365 Copilot and Copilot Studio?",

    answer:
      "Yes. We help organisations assess readiness, deploy Microsoft 365 Copilot securely, build custom copilots using Copilot Studio and automate business processes with the Microsoft Power Platform.",

    featured: true
  },

  {
    id: "industry",

    category: "General",

    question:
      "Can AI solutions be customised for our industry?",

    answer:
      "Absolutely. Every organisation has unique business processes, regulatory obligations and operational priorities. We tailor AI solutions for sectors including government, healthcare, financial services, manufacturing, retail, education and professional services.",

    featured: true
  },

  {
    id: "government-support",

    category: "Government Support",

    question:
      "Are there grants or government support available for AI projects in Singapore?",

    answer:
      "Eligible Singapore businesses may be able to access government support for digital transformation projects, depending on the programme, project scope and eligibility requirements. Funding schemes and criteria evolve over time. During our discovery session, we can discuss whether your project may align with available initiatives and direct you to the appropriate official resources.",

    featured: true
  },

  {
    id: "post-deployment",

    category: "Implementation",

    question:
      "What happens after deployment?",

    answer:
      "Our engagement continues after go-live with user adoption support, AI governance reviews, monitoring, optimisation, model improvements and ongoing advisory services to maximise long-term business value.",

    featured: true
  },

  {
    id: "data-privacy",

    category: "AI Security",

    question:
      "Will our business data be used to train public AI models?",

    answer:
      "That depends on the AI platform and deployment model selected. We help clients choose enterprise services and configurations that align with their security, privacy and compliance requirements, and we explain the relevant data handling practices before implementation.",

    featured: false
  },

  {
    id: "llm-choice",

    category: "General",

    question:
      "Which AI model is best for our organisation?",

    answer:
      "There is no single best model for every use case. We evaluate factors such as accuracy, cost, latency, security, deployment options and integration requirements to recommend the most suitable combination of models and platforms for your business.",

    featured: false
  },

  {
    id: "cost",

    category: "AI Strategy",

    question:
      "How much does an AI transformation project cost?",

    answer:
      "Investment varies based on scope, integrations, governance requirements and deployment scale. We typically begin with a discovery engagement to define priorities, estimate effort and provide a phased implementation roadmap with transparent pricing.",

    featured: false
  }
];