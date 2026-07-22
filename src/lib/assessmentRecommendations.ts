export interface Recommendation {

  title: string;

  description: string;

  service: string;

  impact: string;

  complexity: string;

}



export const recommendationMap: Record<string, Recommendation> = {


"Workflow Automation":

{

title:
"AI Workflow Automation",

description:
"Automate repetitive business processes and reduce manual effort using AI-powered workflows.",

service:
"AI Automation Solutions",

impact:
"High",

complexity:
"Medium"

},



"Microsoft Copilot Assessment":

{

title:
"Microsoft Copilot Readiness",

description:
"Assess how Microsoft Copilot can improve productivity across your organisation.",

service:
"AI Workplace Productivity",

impact:
"High",

complexity:
"Low"

},



"AI Customer Assistant":

{

title:
"AI Customer Service Assistant",

description:
"Improve customer response times with intelligent AI assistants.",

service:
"AI Customer Experience",

impact:
"High",

complexity:
"Medium"

},



"AI Knowledge Assistant":

{

title:
"Business Knowledge Assistant",

description:
"Help employees find information faster across documents, knowledge bases and systems.",

service:
"Enterprise AI Search",

impact:
"High",

complexity:
"Medium"

},



"AI Process Optimisation":

{

title:
"Business Process Optimisation",

description:
"Identify opportunities to streamline operations using practical AI solutions.",

service:
"AI Consulting",

impact:
"Medium",

complexity:
"Low"

},



"AI Analytics & Reporting":

{

title:
"AI Business Analytics",

description:
"Transform business data into faster insights and better decisions.",

service:
"AI Data Solutions",

impact:
"High",

complexity:
"Medium"

},



"AI Sales Assistant":

{

title:
"AI Sales Assistant",

description:
"Support sales teams with customer insights, automation and productivity tools.",

service:
"Sales AI Solutions",

impact:
"Medium",

complexity:
"Medium"

}


};



export function getRecommendations(

items:string[]

):Recommendation[]{


return items

.map(

item => recommendationMap[item]

)

.filter(Boolean);


}