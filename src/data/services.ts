export interface Service {

id:string;

title:string;

icon:string;

description:string;

features:string[];

cta:string;

featured:boolean;

}



export const services:Service[]=[


{

id:"ai-strategy",

title:"AI Strategy Consulting",

icon:"🧠",

description:
"Create an AI roadmap aligned with business objectives and measurable ROI.",


features:[

"AI Readiness Assessment",

"Business Case Development",

"ROI Analysis"

],


cta:"Learn More",

featured:true

},



{

id:"ai-automation",

title:"AI Automation",

icon:"🤖",

description:
"Automate workflows using AI agents and intelligent automation.",


features:[

"AI Agents",

"Workflow Automation",

"Process Optimisation"

],


cta:"Learn More",

featured:true

}

];