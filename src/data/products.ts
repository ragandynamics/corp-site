export interface Product {

  id: string;

  name: string;

  icon: string;

  tagline: string;

  description: string;

  audience: string[];

  features: string[];

  benefits: string[];

  technologies: string[];

  cta: string;

  featured: boolean;

}


export const products: Product[] = [

{
  id:"enterprise-knowledge-assistant",

  name:"Enterprise Knowledge Assistant",

  icon:"🧠",

  tagline:
  "Secure AI assistant for enterprise knowledge discovery",

  description:
  "Enable employees to quickly search, understand and interact with company knowledge using AI-powered RAG technology.",


  audience:[
    "Enterprise Teams",
    "Operations",
    "Knowledge Workers"
  ],


  features:[
    "Retrieval Augmented Generation",
    "Document Intelligence",
    "AI Chat Assistant"
  ],


  benefits:[
    "Reduce information search time",
    "Improve employee productivity",
    "Centralise organisational knowledge"
  ],


  technologies:[
    "Azure AI",
    "OpenAI",
    "Vector Database"
  ],


  cta:
  "Explore Solution",


  featured:true

},



{
  id:"ai-business-analyst",

  name:"AI Business Analyst",

  icon:"📊",

  tagline:
  "Transform business data into actionable insights",

  description:
  "Analyse business information and generate reports, insights and recommendations using AI.",


  audience:[
    "Business Leaders",
    "Managers",
    "Analysts"
  ],


  features:[
    "AI Data Analysis",
    "Automated Reports",
    "Business Insights"
  ],


  benefits:[
    "Faster decisions",
    "Improved reporting",
    "Data-driven strategy"
  ],


  technologies:[
    "Cloud AI",
    "Machine Learning",
    "Analytics Platforms"
  ],


  cta:
  "Discover Product",


  featured:true

},



{
  id:"ai-customer-agent",

  name:"AI Customer Service Agent",

  icon:"🤖",

  tagline:
  "Intelligent customer engagement automation",

  description:
  "Deploy AI agents that provide faster customer support and automate common enquiries.",


  audience:[
    "Customer Service Teams",
    "Retail",
    "SMEs"
  ],


  features:[
    "AI Chat Agent",
    "Knowledge Integration",
    "Automated Responses"
  ],


  benefits:[
    "24/7 customer support",
    "Lower support workload",
    "Better customer experience"
  ],


  technologies:[
    "LLM",
    "Cloud AI",
    "Automation"
  ],


  cta:
  "Explore Product",


  featured:true

}

];