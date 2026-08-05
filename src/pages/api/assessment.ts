import type { APIRoute } from "astro";

import {
  sendLeadNotification
}
from "../../lib/email/notification";


import {
  site
}
from "../../config/site";

import {
  generateLeadSummary,
  type BusinessVelocityLead
} from "../../lib/assessment/businessVelocity";

import {
calculateLeadPriority
}
from "../../lib/assessment/leadPriority";

interface AssessmentRequest {


name?:string;

designation?:string;

company?:string;

email?:string;

phone?:string;


industry?:string;

companySize?:string;


systems?:string[];

challenges?:string[];

priorities?:string[];

interests?:string[];


timeline?:string;


[key:string]:any;

}
export const prerender = false;


interface RuntimeEnv {

  CONTACTS: R2Bucket;

}



export const POST: APIRoute = async ({ request, locals }) => {


  try {


    const body =
      await request.json() as AssessmentRequest;



    const now =
      new Date().toISOString();



    const lead: BusinessVelocityLead = {


      campaign:
        "business-velocity",



      lead: {

        name:
          body.name || "",

        designation:
          body.designation || "",

        company:
          body.company || "",

        email:
          body.email || "",

        phone:
          body.phone || ""

      },



      business: {

        industry:
          body.industry || "",


        companySize:
          body.companySize || "",


        systems:
          body.systems || []

      },



      challenges:
        body.challenges || [],



      priorities:
        body.priorities || [],



      interests:
        body.interests || [],



      timeline:
        body.timeline || "",



      answers:
        body as Record<string,any>,



      createdAt:
        now,



      status:
        "NEW",



      source: {

        page:
          "/assessment",


        campaign:
          "business-velocity"

      }


    };
const priority =
calculateLeadPriority(
lead
);




    /*
      Cloudflare Pages runtime binding
    */

    const env =(locals as any)
.runtime
.env as RuntimeEnv;


    if (!env?.CONTACTS) {

      console.error(
        "R2 CONTACTS binding missing"
      );


      return new Response(
        JSON.stringify({
          error:
          "Storage unavailable"
        }),
        {
          status:500
        }
      );

    }





    /*
       Store lead in R2

       Example:

       contacts/
          business-velocity/
             2026-08-05_uuid.json

    */


    const id =
      crypto.randomUUID();



    const fileName =
      `contacts/business-velocity/${id}.json`;



    await env.CONTACTS.put(

      fileName,

      JSON.stringify(
        lead,
        null,
        2
      ),

      {

        httpMetadata: {

          contentType:
          "application/json"

        }

      }

    );





    /*
       Generate internal sales notification
    */


const summary =
generateLeadSummary(
  lead,
  priority
);



await sendLeadNotification({

  to:
    site.integrations
      .emailNotification
      .notificationEmail,


  subject:
    `NEW SALES LEAD | ${lead.lead.company} | ${priority}`,


  body:
    summary

});



    console.log(
      summary
    );



    /*
      Future:

      sendEmail(summary)

      createCRMLead()

      createTask()

    */





    return new Response(

      JSON.stringify({

        success:true,

        id:fileName

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


    console.error(
      "Assessment submission failed",
      error
    );


    return new Response(

      JSON.stringify({

        error:
        "Unable to process submission"

      }),

      {

        status:500,

        headers:{

          "Content-Type":
          "application/json"

        }

      }

    );

  }


};
