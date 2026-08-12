export interface BusinessVelocityLead {
  campaign: string;

  lead: {
    name: string;
    designation: string;
    company: string;
    email: string;
    phone: string;
  };

  business: {
    industry: string;
    companySize: string;
    systems: string[];
  };

  challenges: string[];

  priorities: string[];

  interests: string[];

  timeline: string;

  answers: Record<string, any>;

  createdAt: string;

  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";

  source: {
    page: string;
    campaign: string;
  };
}


export function generateLeadSummary(
  data: BusinessVelocityLead
) {

  return `
NEW BUSINESS VELOCITY LEAD

Company:
${data.lead.company}

Contact:
${data.lead.name}
${data.lead.designation}


Industry:
${data.business.industry}


Company Size:
${data.business.companySize}


Challenges:

${data.challenges
  .map(x => "• " + x)
  .join("\n")}


Current Technology:

${data.business.systems
  .map(x => "• " + x)
  .join("\n")}


Priorities:

${data.priorities
  .map(x => "• " + x)
  .join("\n")}


AI Interests:

${data.interests
  .map(x => "• " + x)
  .join("\n")}


Timeline:

${data.timeline}


Recommended Services:

✓ AI Strategy Workshop

✓ Workflow Automation

✓ Knowledge Management

✓ Microsoft Copilot Enablement


Status:

NEW
`;
}