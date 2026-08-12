import { Resend } from "resend";


interface SendLeadEmailInput {

  to:string;

  subject:string;

  body:string;

}



export async function sendLeadEmail(

  input:SendLeadEmailInput

){


const apiKey =
import.meta.env.RESEND_API_KEY;



if(!apiKey){

console.error(
"Missing RESEND_API_KEY"
);


return {

success:false,

error:
"Missing RESEND_API_KEY"

};


}




const resend =
new Resend(apiKey);





try{


const response =
await resend.emails.send({

from:
"Ragan Dynamics <onboarding@resend.dev>",


to:[
input.to
],


subject:
input.subject,


html:
`

<div
style="
font-family:Arial,sans-serif;
line-height:1.6;
color:#333;
"
>


<h2>
New Business Velocity Lead
</h2>


<pre
style="
background:#f5f5f5;
padding:20px;
border-radius:8px;
font-family:monospace;
"
>
${input.body}
</pre>


</div>

`

});




return {

success:true,

data:
response

};



}
catch(error){


console.error(
"Resend error",
error
);



return {

success:false,

error

};


}



}