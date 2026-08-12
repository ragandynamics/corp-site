import type {
BusinessVelocityLead
}
from "./businessVelocity";


export function calculateLeadPriority(
lead: BusinessVelocityLead
){


let score = 0;



/*
Company size
*/


if(
[
"51-200",
"201-1000",
"1000+"
]
.includes(
lead.business.companySize
)
){

score += 30;

}




/*
Urgency
*/


if(
[
"Immediately",
"1-3 months"
]
.includes(
lead.timeline
)
){

score += 30;

}




/*
Business pain
*/


if(
lead.challenges.length >= 3
){

score += 20;

}




/*
AI interest
*/


if(
lead.interests.length >= 2
){

score += 20;

}





if(score >= 70)
{

return "HIGH";

}


if(score >= 40)
{

return "MEDIUM";

}


return "LOW";


}