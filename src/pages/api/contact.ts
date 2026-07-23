import type { APIRoute } from "astro";

export const prerender = false;


interface ContactForm {

  name?: string;

  email?: string;

  company?: string;

  countryCode?: string;

  phone?: string;

  service?: string;

  message?: string;

}



export const POST: APIRoute = async ({ request, locals }) => {


  try {


    const body =
      await request.json() as ContactForm;



    console.log(
      "CONTACT BODY:",
      body
    );



    const submission = {


      id: crypto.randomUUID(),


      name:
        body.name ?? "",


      email:
        body.email ?? "",


      company:
        body.company ?? "",


      countryCode:
        body.countryCode ?? "+65",


      phone:
        body.phone ?? "",


      service:
        body.service ?? "",


      message:
        body.message ?? "",


      createdAt:
        new Date().toISOString()


    };



    const env =
      locals.runtime.env;



    if (!env.CONTACTS) {


      throw new Error(
        "R2 binding CONTACTS not available"
      );


    }



    const objectKey =
      `contacts/${submission.id}.json`;



    await env.CONTACTS.put(

      objectKey,

      JSON.stringify(
        submission,
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



    console.log(
      "CONTACT SAVED:",
      objectKey
    );



    return new Response(

      JSON.stringify({

        success:true,

        message:
        "Contact received"

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
      "CONTACT API ERROR:",
      error
    );



    return new Response(

      JSON.stringify({

        success:false,

        error:
        "Unable to save contact"

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