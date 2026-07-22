import type { APIRoute } from "astro";

import { site } from "../../config/site";


export const prerender = false;



export const POST: APIRoute = async ({
  request,
  locals
}) => {


try {


const body =
await request.json();



const {

name,

company,

email,

phone,

answers

}=body;



if(!name || !email){


return new Response(

JSON.stringify({

success:false,

message:
"Name and email required"

}),

{
status:400
}

);

}



/*
-----------------------------
Create Lead
-----------------------------
*/


const lead = {

id:

crypto.randomUUID(),

name,

company,

email,

phone,

answers,

createdAt:

new Date()

.toISOString()

};




/*
-----------------------------
Save to Cloudflare R2
-----------------------------
*/


const bucket =

locals.runtime.env.CONTACTS;



const fileName =

`assessment-leads/${

lead.createdAt.substring(0,10)

}/${lead.id}.json`;



await bucket.put(

fileName,

JSON.stringify(

lead,

null,

2

),

{

httpMetadata:{

contentType:

"application/json"

}

}

);





/*
-----------------------------
Send Email
-----------------------------
*/


if(

site.integrations.emailNotification

){

await sendMailChannelEmail(

lead

);

}




return new Response(

JSON.stringify({

success:true

}),

{

status:200,

headers:{

"Content-Type":

"application/json"

}

}

);



}

catch(error){


console.error(error);



return new Response(

JSON.stringify({

success:false,

message:

"Unable to submit"

}),

{

status:500

}

);


}

};





async function sendMailChannelEmail(

lead:any

){



const payload = {


personalizations:[

{

to:[

{

email:

site.integrations.notificationEmail

}

]

}

],


from:{


email:

site.integrations.emailFrom,


name:

site.company.name


},


subject:

`New AI Assessment Lead - ${lead.company}`,


content:[


{

type:

"text/html",


value:

`

<h2>
New AI Assessment Lead
</h2>


<p>
<b>Name:</b>
${lead.name}
</p>


<p>
<b>Company:</b>
${lead.company}
</p>


<p>
<b>Email:</b>
${lead.email}
</p>


<p>
<b>Phone:</b>
${lead.phone}
</p>



<h3>
Assessment Answers
</h3>


<pre>

${

JSON.stringify(

lead.answers,

null,

2

)

}

</pre>

`

}

]


};



await fetch(

"https://api.mailchannels.net/tx/v1/send",

{

method:

"POST",


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify(

payload

)

}

);


}