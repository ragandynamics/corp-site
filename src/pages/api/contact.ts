import type { APIRoute } from "astro";

export const prerender = false;


export const POST: APIRoute = async ({ request, locals }) => {


  try {


    const body = await request.json();


    console.log("CONTACT BODY:", body);



    const env = locals.runtime.env;



    console.log(
      "R2 Binding:",
      env.CONTACTS
    );



    if (!env.CONTACTS) {

      throw new Error(
        "CONTACTS R2 binding missing"
      );

    }



    const key =
      `contacts/${crypto.randomUUID()}.json`;



    console.log(
      "Writing R2 object:",
      key
    );



    const result =
      await env.CONTACTS.put(

        key,

        JSON.stringify(
          body,
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
      "R2 WRITE COMPLETE",
      result
    );



    return new Response(

      JSON.stringify({

        success:true,

        key

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
      "CONTACT ERROR:",
      error
    );


    return new Response(

      JSON.stringify({

        success:false,

        error:String(error)

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