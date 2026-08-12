interface AssessmentAnswers {

[key:string]: string | string[];

}


const STORAGE_KEY =
"ragan_ai_assessment";


export function saveAnswer(

question:string,

answer:string

){


const existing:

AssessmentAnswers =

JSON.parse(

localStorage.getItem(STORAGE_KEY)

|| "{}"

);



existing[question]=answer;



localStorage.setItem(

STORAGE_KEY,

JSON.stringify(existing)

);


}



export function getAnswers(){

return JSON.parse(

localStorage.getItem(STORAGE_KEY)

|| "{}"

);

}



export function clearAnswers(){

localStorage.removeItem(

STORAGE_KEY

);

}