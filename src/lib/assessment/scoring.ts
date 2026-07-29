// src/lib/assessment/scoring.ts

export interface AssessmentFormValues {
  companySize?: string;
  currentTools?: string | string[];
  aiUsage?: string;
  challenges?: string[];
  primaryGoal?: string;
  priorityArea?: string;
}

export interface CalculatorResult {
  readinessScore: number;
  maturity: "AI Beginner" | "AI Explorer" | "AI Adopter" | "AI Leader";
  estimatedHoursSavedAnnual: number;
  estimatedCostSavingsAnnual: number;
  projectedRoiPercent: number;
  paybackPeriodMonths: number;
  topPriority: string;
  recommendations: Array<{ title: string; description: string; impact: string }>;
  recommendedServices: Array<{ title: string; description: string }>;
}

export function calculateRoiAndReadiness(data: AssessmentFormValues): CalculatorResult {
  let score = 20;

  // 1. Employee Count Multipliers & Readiness Base
  let employeeCount = 20; // Default SME estimate
  const size = data.companySize || "";

  if (size === "1-10") { score += 10; employeeCount = 5; }
  else if (size === "11-50") { score += 15; employeeCount = 30; }
  else if (size === "50-100") { score += 20; employeeCount = 75; }
  else if (size === "100+" || size === "201-500" || size === "500+") { score += 30; employeeCount = 250; }

  // 2. Tool Maturity
  const tools = Array.isArray(data.currentTools) ? data.currentTools : data.currentTools ? [data.currentTools] : [];
  if (tools.length > 0 && !tools.includes("none")) {
    score += Math.min(tools.length * 5, 20);
  }

  // 3. AI Usage Maturity
  const aiUsage = (data.aiUsage || "").toLowerCase();
  if (["ad-hoc", "individual", "experimenting"].includes(aiUsage)) score += 10;
  else if (["piloting", "department"].includes(aiUsage)) score += 20;
  else if (["advanced", "companywide"].includes(aiUsage)) score += 35;

  const finalScore = Math.min(score, 100);

  // 4. Maturity Classification
  let maturity: CalculatorResult["maturity"] = "AI Beginner";
  if (finalScore >= 75) maturity = "AI Leader";
  else if (finalScore >= 55) maturity = "AI Adopter";
  else if (finalScore >= 35) maturity = "AI Explorer";

  // 5. Financial & Hours Efficiency ROI Estimations
  const avgHourlyCost = 40; // ~$80k base salary + overhead
  const hoursSavedPerEmployeePerWeek = 4; // ~10% operational efficiency gain
  const weeksPerYear = 48;

  const estimatedHoursSavedAnnual = Math.round(employeeCount * hoursSavedPerEmployeePerWeek * weeksPerYear);
  const estimatedCostSavingsAnnual = Math.round(estimatedHoursSavedAnnual * avgHourlyCost);

  // Implementation Investment calculation
  const estimatedInvestment = Math.max(12000, Math.round(employeeCount * 350));
  const netSavingsFirstYear = Math.max(0, estimatedCostSavingsAnnual - estimatedInvestment);
  
  // Safe Financial Ratios
  const calculatedRoi = Math.round((netSavingsFirstYear / estimatedInvestment) * 100);
  const projectedRoiPercent = !isNaN(calculatedRoi) && calculatedRoi > 0 ? calculatedRoi : 150;

  const monthlySavings = estimatedCostSavingsAnnual / 12;
  const calculatedPayback = monthlySavings > 0 ? Number((estimatedInvestment / monthlySavings).toFixed(1)) : 4.5;
  const paybackPeriodMonths = !isNaN(calculatedPayback) && calculatedPayback > 0 ? Math.min(calculatedPayback, 24) : 4.5;

  // 6. Strategic Priorities & Recommendations
  const challenges = (Array.isArray(data.challenges) ? data.challenges : []).map(c => c.toLowerCase());
  const primaryGoal = (data.primaryGoal || data.priorityArea || "").toLowerCase();

  const hasManualWorkflows = challenges.some(c => ["data entry", "document search", "manual-processes"].includes(c));
  const hasSupportChallenges = challenges.some(c => ["email handling", "customer-service"].includes(c));

  let topPriority = "Identify high-impact AI opportunities to eliminate operational bottlenecks.";
  
  if (hasManualWorkflows) {
    topPriority = "Automate repetitive manual workflows and document handling.";
  } else if (hasSupportChallenges) {
    topPriority = "Deploy AI customer support assistants to handle high inquiry volume.";
  }

  const recommendations: CalculatorResult["recommendations"] = [];

  if (hasManualWorkflows || ["automation", "efficiency"].includes(primaryGoal)) {
    recommendations.push({
      title: "Agentic Process Automation",
      description: "Replace repetitive manual data extraction, routing, and processing across your CRM and ERP.",
      impact: "High ROI • ~15-20 hours saved/week per team member"
    });
  }

  if (hasSupportChallenges || primaryGoal === "customer service") {
    recommendations.push({
      title: "Enterprise Knowledge & Support Assistant",
      description: "Deploy internal or customer-facing RAG bots to instantly query company documentation.",
      impact: "Immediate Impact • Up to 60% reduction in response latency"
    });
  }

  if (primaryGoal === "knowledge search") {
    recommendations.push({
      title: "Custom RAG & Enterprise Knowledge Base",
      description: "Unify company documentation into a secure, searchable AI vector database.",
      impact: "High Efficiency • Instant retrieval across team files"
    });
  }

  // Baseline recommendation
  recommendations.push({
    title: "AI Strategy & Governance Roadmap",
    description: "Build an executive-level roadmap to scale AI tools safely without compromising data privacy.",
    impact: "Strategic Value • Enterprise Security & Compliance"
  });

  const recommendedServices: CalculatorResult["recommendedServices"] = [
    { 
      title: "AI Strategy & Executive Roadmap", 
      description: "Tailored AI investment analysis and deployment timeline for leadership." 
    },
    { 
      title: "Custom RAG & Enterprise Search", 
      description: "Secure, real-time search over company documents, PDFs, and internal databases." 
    },
    { 
      title: "Custom Workflow Automation", 
      description: "Automate legacy operational workflows using custom AI agents and cloud APIs." 
    }
  ];

  return {
    readinessScore: finalScore,
    maturity,
    estimatedHoursSavedAnnual,
    estimatedCostSavingsAnnual,
    projectedRoiPercent,
    paybackPeriodMonths,
    topPriority,
    recommendations,
    recommendedServices
  };
}