export const assessmentOptions = {
  industries: ["Manufacturing", "Logistics", "Construction", "Professional Services", "Healthcare", "Retail", "Financial Services", "Other"],
  companySizes: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
  challenges: ["Too much manual work", "Slow processes", "Customer service", "Sales follow-up", "Reporting", "Knowledge sharing", "Employee productivity", "Compliance", "Rising operating costs"],
  systems: ["Microsoft 365", "Google Workspace", "CRM", "ERP", "HRMS", "Accounting", "Custom Applications"],
  priorities: ["Reduce costs", "Increase productivity", "Improve customer experience", "Grow revenue", "Improve compliance", "Scale operations"],
  interests: ["AI Consulting & Strategy", "Business Process Automation", "Microsoft Copilot Practice", "AI Training & Workshops", "Custom Software Solutions", "Managed Technical Support"],
  timelines: ["Immediately", "1-3 months", "3-6 months", "Exploring options"],
} as const;

export interface BusinessVelocitySubmission {
  name: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  systems: string[];
  challenges: string[];
  priorities: string[];
  interests: string[];
  timeline: string;
  pdpaConsent: true;
}

type ValidationResult =
  | { success: true; data: BusinessVelocitySubmission }
  | { success: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, maxLength = 200): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readSelection(value: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string" && allowed.includes(item)))];
}

export function validateBusinessVelocitySubmission(value: unknown): ValidationResult {
  if (!isRecord(value)) return { success: false, error: "Invalid submission payload." };

  const name = readString(value.name);
  const company = readString(value.company);
  const email = readString(value.email, 320).toLowerCase();
  const systems = readSelection(value.systems, assessmentOptions.systems);
  const challenges = readSelection(value.challenges, assessmentOptions.challenges);
  const priorities = readSelection(value.priorities, assessmentOptions.priorities);
  const interests = readSelection(value.interests, assessmentOptions.interests);

  if (!name || !company || !emailPattern.test(email)) {
    return { success: false, error: "Name, company, and a valid business email are required." };
  }
  if (value.pdpaConsent !== true) {
    return { success: false, error: "Consent is required to process your assessment." };
  }

  const missingSections: string[] = [];
  if (systems.length === 0) missingSections.push("Current Technology");
  if (challenges.length === 0) missingSections.push("Business Challenges");
  if (priorities.length === 0) missingSections.push("Business Priorities");
  if (interests.length === 0) missingSections.push("Solutions of Interest");
  if (missingSections.length > 0) {
    return { success: false, error: `Please select at least one option for: ${missingSections.join(", ")}.` };
  }

  const industry = readString(value.industry);
  const companySize = readString(value.companySize);
  const timeline = readString(value.timeline);
  if (
    !assessmentOptions.industries.includes(industry as (typeof assessmentOptions.industries)[number]) ||
    !assessmentOptions.companySizes.includes(companySize as (typeof assessmentOptions.companySizes)[number]) ||
    !assessmentOptions.timelines.includes(timeline as (typeof assessmentOptions.timelines)[number])
  ) {
    return { success: false, error: "One or more assessment selections are invalid." };
  }

  return { success: true, data: {
    name, designation: readString(value.designation), company, email,
    phone: readString(value.phone, 50), industry, companySize, systems,
    challenges, priorities, interests, timeline, pdpaConsent: true,
  } };
}

export function calculateOperationalEfficiency(
  submission: Pick<BusinessVelocitySubmission, "challenges" | "systems" | "timeline">
): number {
  let score = 90 - submission.challenges.length * 6;
  if (!submission.systems.includes("ERP")) score -= 10;
  if (!submission.systems.includes("CRM")) score -= 10;
  if (!submission.systems.includes("HRMS")) score -= 5;
  if (submission.timeline === "Exploring options") score -= 10;
  return Math.min(Math.max(score, 10), 100);
}
