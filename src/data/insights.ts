export interface Insight {
  id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
  featured: boolean;
}

export const insights: Insight[] = [
  {
    id: "1",
    category: "AI Strategy",
    title: "7 Practical AI Opportunities Every Singapore SME Should Explore",
    description:
      "Discover practical AI use cases that improve productivity, reduce costs and accelerate business growth.",
    readTime: "6 min read",
    slug: "/insights/7-ai-opportunities-singapore-smes",
    featured: true
  },

  {
    id: "2",
    category: "Microsoft Copilot",
    title: "Is Microsoft 365 Copilot Worth the Investment?",
    description:
      "Everything business leaders should know before deploying Microsoft 365 Copilot.",
    readTime: "8 min read",
    slug: "/insights/microsoft-365-copilot-guide",
    featured: true
  },

  {
    id: "3",
    category: "Business Automation",
    title: "10 Business Processes You Can Automate with AI",
    description:
      "Reduce repetitive work using AI-powered automation.",
    readTime: "7 min read",
    slug: "/insights/business-process-automation",
    featured: true
  },

  {
    id: "4",
    category: "Security",
    title: "AI Governance Explained",
    description:
      "Build secure and responsible AI solutions.",
    readTime: "5 min read",
    slug: "/insights/ai-governance",
    featured: false
  },

  {
    id: "5",
    category: "Cloud",
    title: "Azure AI vs AWS vs Google Cloud",
    description:
      "Choosing the right AI platform for your organisation.",
    readTime: "9 min read",
    slug: "/insights/cloud-ai-comparison",
    featured: false
  },

  {
    id: "6",
    category: "ROI",
    title: "How to Measure AI Return on Investment",
    description:
      "Understand the KPIs that demonstrate business value.",
    readTime: "6 min read",
    slug: "/insights/ai-roi",
    featured: false
  }
];