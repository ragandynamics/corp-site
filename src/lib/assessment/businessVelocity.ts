export interface BusinessVelocityLead {


  campaign:string;


  lead:{

    name:string;

    designation:string;

    company:string;

    email:string;

    phone:string;

  };


  business:{

    industry:string;

    companySize:string;

    systems:string[];

  };


  challenges:string[];


  priorities:string[];


  interests:string[];


  timeline:string;


  answers:
  Record<string,any>;


  createdAt:string;


  status:
  "NEW"
  |
  "CONTACTED"
  |
  "QUALIFIED"
  |
  "CLOSED";


  source:{

    page:string;

    campaign:string;

  };


}




export function generateLeadSummary(

  data:BusinessVelocityLead,

  priority:string="NEW"

){


const challengeText =
data.challenges.length
?
data.challenges
.map(
item=>`• ${item}`
)
.join("\n")
:
"None selected";



const technologyText =
data.business.systems.length
?
data.business.systems
.map(
item=>`• ${item}`
)
.join("\n")
:
"None selected";



const priorityText =
data.priorities.length
?
data.priorities
.map(
item=>`• ${item}`
)
.join("\n")
:
"None selected";



const interestText =
data.interests.length
?
data.interests
.map(
item=>`• ${item}`
)
.join("\n")
:
"None selected";





return `

====================================

NEW BUSINESS VELOCITY LEAD

====================================


LEAD PRIORITY

${priority}



CONTACT DETAILS

Name:
${data.lead.name}


Designation:
${data.lead.designation}


Company:
${data.lead.company}


Email:
${data.lead.email}


Phone:
${data.lead.phone}



BUSINESS PROFILE

Industry:
${data.business.industry}


Company Size:
${data.business.companySize}



CURRENT TECHNOLOGY

${technologyText}



BUSINESS CHALLENGES

${challengeText}



BUSINESS PRIORITIES

${priorityText}



AI TRANSFORMATION INTEREST

${interestText}



IMPLEMENTATION TIMELINE

${data.timeline}



RECOMMENDED SERVICES


✓ AI Strategy Workshop

✓ Business Process Automation

✓ AI Knowledge Assistant

✓ Microsoft Copilot Enablement

✓ AI Productivity Solutions



SALES OWNER

AI Consulting Team



STATUS

NEW



CREATED

${data.createdAt}


====================================

`;

}