export interface AssessmentResult {

  score: number;

  maturity: string;

  strengths: string[];

  recommendations: string[];

}


interface Answers {

  [key:string]: string | string[];

}



export function calculateAssessmentScore(

  answers: Answers

): AssessmentResult {



let score = 40;



const strengths:string[] = [];

const recommendations:string[] = [];



/*
----------------------------------
Technology Readiness
----------------------------------
*/


const technology =

answers.technology;



if(

technology === "Microsoft 365"

){

score += 15;


strengths.push(

"Existing cloud productivity platform"

);


recommendations.push(

"Microsoft Copilot Assessment"

);


}



if(

technology === "CRM system"

){

score += 10;


recommendations.push(

"AI Sales Assistant"

);

}



/*
----------------------------------
AI Adoption
----------------------------------
*/


const aiUsage =

answers.ai_usage;



if(

aiUsage === "We are exploring AI opportunities"

){

score += 10;


strengths.push(

"Ready to explore AI opportunities"

);


}



if(

aiUsage === "AI is already part of our business operations"

){

score += 20;


strengths.push(

"Strong AI adoption foundation"

);

}



/*
----------------------------------
Business Challenges
----------------------------------
*/


const challenge =

answers.challenge;



if(

challenge === "Too much manual work"

){

score += 10;


recommendations.push(

"Workflow Automation"

);

}



if(

challenge === "Customer enquiries take too long to handle"

){

score += 10;


recommendations.push(

"AI Customer Assistant"

);

}



if(

challenge === "Information is difficult to find"

){

recommendations.push(

"AI Knowledge Assistant"

);

}



/*
----------------------------------
Business Goals
----------------------------------
*/


const goal =

answers.goal;



if(

goal === "Save time on daily tasks"

){

recommendations.push(

"AI Process Optimisation"

);

}



if(

goal === "Generate better business insights"

){

recommendations.push(

"AI Analytics & Reporting"

);

}



/*
----------------------------------
Limit Score
----------------------------------
*/


if(score > 100){

score = 100;

}



/*
----------------------------------
Maturity Level
----------------------------------
*/


let maturity;



if(score < 30){

maturity = "Getting Started";

}

else if(score < 50){

maturity = "Developing";

}

else if(score < 70){

maturity = "Emerging";

}

else if(score < 85){

maturity = "AI Ready";

}

else{

maturity = "Advanced";

}



/*
----------------------------------
Remove duplicates
----------------------------------
*/


const uniqueRecommendations =

[

...new Set(recommendations)

];



return {


score,

maturity,

strengths,

recommendations:

uniqueRecommendations.slice(0,4)


};


}