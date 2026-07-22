import type { AssessmentSection } from "../types/assessment";

export const assessment: AssessmentSection[] = [

{
id:"company",

title:"Business Profile",

description:
"Tell us about your organisation.",

questions:[

{
id:"industry",

title:"Industry",

type:"select",

options:[
"Manufacturing",
"Construction",
"Retail",
"Healthcare",
"Professional Services",
"Education",
"Logistics",
"Hospitality",
"Finance",
"Others"
]
},

{
id:"employees",

title:"Employees",

type:"radio",

options:[
"1-10",
"11-50",
"51-200",
"201-500",
"500+"
]
}

]

},

{
id:"priorities",

title:"Business Priorities",

description:
"What is most important?",

questions:[

{
id:"priority",

title:"Select up to three",

type:"checkbox",

options:[

"Reduce Costs",

"Increase Productivity",

"Improve Customer Service",

"Business Growth",

"Automation",

"Compliance",

"AI Innovation"

]

}

]

}

];