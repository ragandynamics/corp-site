export interface AssessmentOption {
  id: string;
  label: string;
  points: number;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  category?: string;
  options: AssessmentOption[];
}

export interface ScoreTier {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

export interface AssessmentData {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  scoreTiers: ScoreTier[];
}

// Friendly display labels for form keys
export const FIELD_LABELS: Record<string, string> = {
  companySize: "Company Size",
  company_size: "Company Size (Detailed)",
  industry: "Industry",
  primary_industry: "Primary Industry",
  industry_other: "Other Industry Detail",
  challenges: "Primary Challenge",
  challenges_other: "Other Challenges",
  currentTools: "Current Tools",
  aiUsage: "AI Usage Stage",
  ai_maturity_stage: "AI Maturity Level",
  primaryGoal: "Primary Goal",
  key_objectives: "Key Objectives",
  time_sink_area: "Time Sink Area",
  ai_governance: "AI Governance Status",
  annual_ai_budget: "Annual AI Budget",
  budgetHorizon: "Budget Horizon Tier",
  timeline: "Timeline Urgency",
  implementation_timeline: "Implementation Timeline",
  implementationTimeline: "Implementation Target",
  cloudInfra: "Cloud / Infrastructure",
  dataReadiness: "Data Readiness Level"
};

// Helper to format raw option values into clean display strings
export function formatValue(value: string | string[]): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return "N/A";

  if (Array.isArray(value)) {
    return value.map((v) => formatValue(v)).join(", ");
  }

  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}