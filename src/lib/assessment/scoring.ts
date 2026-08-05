import type { Section } from "./questions";

export interface AssessmentAnswers {
  [key: string]: string | string[];
}

export interface ScoreCard {
  automation: number;
  productivity: number;
  revenue: number;
  maturity: number;
  urgency: number;
  complexity: number;
  lead: number;
}
export interface AssessmentReport {

  overallScore:number;

  maturity:

    | "Starter"
    | "Emerging"
    | "Accelerating"
    | "Transforming";

  opportunity:

    | "Low"
    | "Medium"
    | "High"
    | "Very High";

  annualSavings:{

    min:number;

    max:number;

  };

  revenueGrowth:{

    min:number;

    max:number;

  };

  productivityIncrease:{

    min:number;

    max:number;

  };

  implementation:

    |"Low"
    |"Medium"
    |"High";

  executiveSummary:string;

  topPainPoints:string[];

  recommendedServices:string[];

  roadmap:string[];

  leadScore:number;

  salesPriority:

    |"Low"
    |"Medium"
    |"High";

  nextAction:string;

}
function emptyScore():ScoreCard{

    return{

        automation:0,

        productivity:0,

        revenue:0,

        maturity:0,

        urgency:0,

        complexity:0,

        lead:0

    }

}
const serviceMap:Record<string,string[]>={

    "Knowledge Search":[

        "Enterprise Knowledge AI",

        "Microsoft Copilot"

    ],

    "Reporting":[

        "AI Executive Reporting",

        "Power BI AI"

    ],

    "Customer Service":[

        "AI Customer Service",

        "AI Agent"

    ],

    "Sales":[

        "AI Sales Assistant",

        "CRM Automation"

    ],

    "Workflow":[

        "Workflow Automation"

    ],

    "Data Entry":[

        "Intelligent Document Processing"

    ],

    "HR":[

        "HR AI Assistant"

    ]

}
const painPointMap:Record<string,string>={

    "Knowledge Search":"Knowledge Discovery",

    "Reporting":"Manual Reporting",

    "Customer Service":"Customer Service",

    "Sales":"Sales Follow-up",

    "Workflow":"Approval Processes",

    "Data Entry":"Manual Data Entry",

    "HR":"Employee Onboarding"

}
const roadmapTemplates={

    starter:[

        "Executive AI Strategy Workshop",

        "Identify Quick Wins",

        "Pilot One Business Process",

        "Measure ROI"

    ],

    emerging:[

        "Microsoft Copilot",

        "Knowledge Platform",

        "Department Pilot",

        "Governance"

    ],

    accelerating:[

        "Scale AI",

        "AI Agents",

        "Workflow Automation",

        "Executive Dashboards"

    ],

    transforming:[

        "Enterprise AI Platform",

        "Advanced Automation",

        "Predictive AI",

        "Continuous Optimisation"

    ]

}
function addScore(
  total: ScoreCard,
  partial?: Partial<ScoreCard>
) {
  if (!partial) return;

  total.automation += partial.automation ?? 0;
  total.productivity += partial.productivity ?? 0;
  total.revenue += partial.revenue ?? 0;
  total.maturity += partial.maturity ?? 0;
  total.urgency += partial.urgency ?? 0;
  total.complexity += partial.complexity ?? 0;
  total.lead += partial.lead ?? 0;
}
export function calculateScore(
  answers: AssessmentAnswers,
  sections: Section[]
): ScoreCard {

  const score = emptyScore();

  for (const section of sections) {

    for (const question of section.questions) {

      const answer = answers[question.id];

      if (!answer || !question.options) continue;

      const selected = Array.isArray(answer)
        ? answer
        : [answer];

      for (const option of question.options) {

        if (selected.includes(option.value)) {
          addScore(score, option.score);
        }

      }

    }

  }

  return score;

}
function determineMaturity(score: ScoreCard) {

  if (score.maturity < 20)
    return "Starter";

  if (score.maturity < 45)
    return "Emerging";

  if (score.maturity < 70)
    return "Accelerating";

  return "Transforming";

}
function determineOpportunity(score: ScoreCard) {

  const total =
    score.automation +
    score.productivity +
    score.revenue;

  if (total < 40)
    return "Low";

  if (total < 80)
    return "Medium";

  if (total < 120)
    return "High";

  return "Very High";

}
function estimateSavings(
  answers: AssessmentAnswers,
  score: ScoreCard
) {

  const size = answers.companySize;

  let multiplier = 1;

  switch (size) {

    case "1-10":
      multiplier = 1;
      break;

    case "11-50":
      multiplier = 4;
      break;

    case "51-200":
      multiplier = 10;
      break;

    case "201-500":
      multiplier = 25;
      break;

    case "500+":
      multiplier = 60;
      break;

  }

  const min =
    score.productivity *
    multiplier *
    1000;

  const max =
    Math.round(min * 1.8);

  return {

    min,

    max

  };

}
function estimateRevenue(score: ScoreCard) {

  const min =
    Math.round(score.revenue * 0.25);

  const max =
    Math.round(score.revenue * 0.45);

  return {

    min,

    max

  };

}

function estimateProductivity(score: ScoreCard) {

  const min =
    Math.max(
      5,
      Math.round(score.productivity * 0.3)
    );

  const max =
    Math.max(
      min + 5,
      Math.round(score.productivity * 0.5)
    );

  return {

    min,

    max

  };

}
function determineImplementation(
  score: ScoreCard
) {

  if (score.complexity < 20)
    return "Low";

  if (score.complexity < 45)
    return "Medium";

  return "High";

}
function getRecommendedServices(
  answers: AssessmentAnswers
): string[] {

  const services = new Set<string>();

  const challenges = answers.businessChallenges;

  if (Array.isArray(challenges)) {

    for (const challenge of challenges) {

      const mapped = serviceMap[challenge];

      if (!mapped) continue;

      mapped.forEach(service => services.add(service));

    }

  }

  if (answers.businessSystems &&
      Array.isArray(answers.businessSystems) &&
      answers.businessSystems.includes("Microsoft 365")) {

    services.add("Microsoft 365 Copilot");

  }

  if (answers.primaryObjective === "Revenue") {

    services.add("AI Sales Automation");
    services.add("Customer Intelligence");

  }

  if (answers.primaryObjective === "Cost Reduction") {

    services.add("Workflow Automation");

  }

  services.add("AI Strategy & Roadmap");

  return [...services];

}
function getPainPoints(
  answers: AssessmentAnswers
): string[] {

  const painPoints = new Set<string>();

  const challenges = answers.businessChallenges;

  if (!Array.isArray(challenges))
    return [];

  for (const item of challenges) {

    const mapped = painPointMap[item];

    if (mapped) {

      painPoints.add(mapped);

    }

  }

  return [...painPoints];

}
function getRoadmap(
  maturity: AssessmentReport["maturity"]
): string[] {

  switch (maturity) {

    case "Starter":
      return roadmapTemplates.starter;

    case "Emerging":
      return roadmapTemplates.emerging;

    case "Accelerating":
      return roadmapTemplates.accelerating;

    default:
      return roadmapTemplates.transforming;

  }

}
function buildExecutiveSummary(
  report: Omit<
    AssessmentReport,
    "executiveSummary"
  >
): string {

  return `
Your assessment indicates a ${report.maturity.toLowerCase()}
level of AI maturity with a ${report.opportunity.toLowerCase()}
business opportunity.

Based on your responses, your organisation could
realise annual operational savings between
SGD ${report.annualSavings.min.toLocaleString()}
and
SGD ${report.annualSavings.max.toLocaleString()}.

The highest-value initiatives are focused on
${report.topPainPoints.slice(0,2).join(" and ")}.

We recommend beginning with
${report.recommendedServices[0]}
followed by a phased implementation roadmap
to minimise risk while delivering measurable ROI.
`.trim();

}
function determineSalesPriority(
  leadScore:number
){

    if(leadScore>=80)
        return "High";

    if(leadScore>=50)
        return "Medium";

    return "Low";

}
function determineNextAction(
    priority:AssessmentReport["salesPriority"]
){

    switch(priority){

        case "High":

            return "Executive Strategy Workshop";

        case "Medium":

            return "AI Discovery Session";

        default:

            return "Send Executive Report & Nurture";

    }

}
export function calculateAssessment(
  answers: AssessmentAnswers,
  sections: Section[]
): AssessmentReport {

  const score =
    calculateScore(
      answers,
      sections
    );

  const maturity =
    determineMaturity(score);

  const opportunity =
    determineOpportunity(score);

  const annualSavings =
    estimateSavings(
      answers,
      score
    );

  const revenueGrowth =
    estimateRevenue(score);

  const productivityIncrease =
    estimateProductivity(score);

  const implementation =
    determineImplementation(score);

  const recommendedServices =
    getRecommendedServices(answers);

  const topPainPoints =
    getPainPoints(answers);

  const roadmap =
    getRoadmap(maturity);

  const leadScore =
    Math.min(
      100,
      score.lead +
      score.urgency
    );

  const salesPriority =
    determineSalesPriority(
      leadScore
    );

  const nextAction =
    determineNextAction(
      salesPriority
    );

  const report: Omit<
    AssessmentReport,
    "executiveSummary"
  > = {

    overallScore:

      Math.min(
        100,
        Math.round(
          (
            score.automation +
            score.productivity +
            score.revenue +
            score.maturity
          ) / 4
        )
      ),

    maturity,

    opportunity,

    annualSavings,

    revenueGrowth,

    productivityIncrease,

    implementation,

    topPainPoints,

    recommendedServices,

    roadmap,

    leadScore,

    salesPriority,

    nextAction

  };

  return {

    ...report,

    executiveSummary:
      buildExecutiveSummary(report)

  };

}

