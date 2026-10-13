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
  }
];
