export interface AnswerOption {
  label: string;
  value: string;
}

export interface QuestionConfig {
  id: string;
  label: string;
  subtitle?: string;
  multiple?: boolean;
  required?: boolean;        // Marks field mandatory
  hasOtherOption?: boolean;  // Enables custom "Others" input
  options: AnswerOption[];
}

export interface StepConfig {
  id: number;
  title: string;
  description?: string;
  questions: QuestionConfig[];
}

export const assessmentSteps: StepConfig[] = [
  {
    id: 1,
    title: "Company Profile",
    description: "Tell us about your organization's scale and core sector.",
    questions: [
      {
        id: "companySize",
        label: "What is your company size?",
        required: true,
        options: [
          { label: "1-10 Employees", value: "1-10" },
          { label: "11-50 Employees", value: "11-50" },
          { label: "50-100 Employees", value: "50-100" },
          { label: "100+ Employees", value: "100+" }
        ]
      },
      {
        id: "industry",
        label: "Which industry sector best describes your business?",
        required: true,
        hasOtherOption: true,
        options: [
          { label: "Professional Services & Consulting", value: "Professional Services" },
          { label: "E-Commerce & Retail", value: "E-Commerce" },
          { label: "Software & Tech", value: "Software & Tech" },
          { label: "Healthcare & Life Sciences", value: "Healthcare" },
          { label: "Others", value: "Others" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Operational Bottlenecks",
    description: "Help us pinpoint where manual overhead slows down operations.",
    questions: [
      {
        id: "challenges",
        label: "What are your main operational bottlenecks?",
        subtitle: "Select all that apply.",
        multiple: true,
        required: true,
        hasOtherOption: true,
        options: [
          { label: "Manual document lookups & slow search", value: "Document Search" },
          { label: "High volume customer email handling", value: "Email Handling" },
          { label: "Repetitive manual data entry", value: "Data Entry" },
          { label: "Others", value: "Others" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Technology Stack",
    description: "Tell us about your current software, databases, and infrastructure.",
    questions: [
      {
        id: "currentTools",
        label: "Which core software & platforms do you use daily?",
        subtitle: "Select all that apply.",
        multiple: true,
        required: true,
        hasOtherOption: true,
        options: [
          { label: "Google Workspace / Microsoft 365", value: "Office Suites" },
          { label: "CRM (HubSpot, Salesforce, Zoho)", value: "CRM" },
          { label: "ERP / Accounting (SAP, QuickBooks, Xero)", value: "ERP" },
          { label: "Custom Internal Databases / SQL", value: "Databases" },
          { label: "Others", value: "Others" }
        ]
      },
      {
        id: "cloudInfra",
        label: "Where are your company files and databases hosted?",
        required: true,
        options: [
          { label: "Cloud (AWS, GCP, Azure)", value: "Cloud" },
          { label: "SaaS / Cloud Storage (Google Drive, SharePoint, OneDrive)", value: "SaaS Storage" },
          { label: "On-Premises Servers", value: "On-Prem" },
          { label: "Hybrid / Mixed", value: "Hybrid" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "AI Adoption & Readiness",
    description: "Evaluate your team's current AI maturity and data infrastructure.",
    questions: [
      {
        id: "aiUsage",
        label: "What is your current AI adoption stage?",
        required: true,
        options: [
          { label: "Not using AI yet", value: "None" },
          { label: "Using public ChatGPT/Claude casually", value: "Ad-hoc" },
          { label: "Testing internal AI tools & custom prompts", value: "Piloting" },
          { label: "Integrated custom RAG / workflows in production", value: "Advanced" }
        ]
      },
      {
        id: "dataReadiness",
        label: "How organized is your company's internal knowledge base?",
        required: true,
        options: [
          { label: "Scattered across local PCs and personal drives", value: "Unorganized" },
          { label: "Centralized in cloud folders (PDFs, Docs, Sheets)", value: "Semi-Structured" },
          { label: "Structured internal wiki / Knowledge Base / Notion", value: "Structured" },
          { label: "Clean API-accessible database & vectors", value: "API Ready" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Goals & Timeline",
    description: "Tell us what you want to achieve with AI automation.",
    questions: [
      {
        id: "primaryGoal",
        label: "What is your primary goal for implementing AI?",
        required: true,
        options: [
          { label: "Save employee time on repetitive tasks", value: "Efficiency" },
          { label: "Improve response time to customers", value: "Customer Service" },
          { label: "Extract insights from company documents (RAG)", value: "Knowledge Search" },
          { label: "Automate complex end-to-end workflows", value: "Automation" }
        ]
      },
      {
        id: "implementationTimeline",
        label: "What is your target timeline for AI implementation?",
        required: true,
        options: [
          { label: "Immediately (Within 30 days)", value: "Immediate" },
          { label: "Next 1 - 3 months", value: "1-3 Months" },
          { label: "3 - 6 months", value: "3-6 Months" },
          { label: "Exploring options / Planning phase", value: "Exploring" }
        ]
      }
    ]
  }
];