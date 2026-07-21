export interface Env {

  CONTACTS: R2Bucket;

}



interface ContactRequest {

  name:string;

  email:string;

  company?:string;

  phone?:string;

  service?:string;

  message:string;

}



export const onRequestPost: PagesFunction<Env> = async ({
  
  request,

  env

}) => {


  try {


    /*
      Validate request type
    */

    if(
      request.headers.get("content-type")
      !==
      "application/json"
    ){

      return Response.json(

        {
          success:false,
          error:"Invalid content type"
        },

        {
          status:400
        }

      );

    }



    /*
      Read request body
    */

    const body =
      await request.json<ContactRequest>();



    const {

      name,

      email,

      company,

      phone,

      service,

      message

    } = body;



    /*
      Required validation
    */

    if(
      !name ||
      !email ||
      !message
    ){


      return Response.json(

        {

          success:false,

          error:
          "Name, email and message are required"

        },

        {
          status:400
        }

      );


    }



    /*
      Email validation
    */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(
      !emailRegex.test(email)
    ){


      return Response.json(

        {

          success:false,

          error:
          "Invalid email address"

        },

        {
          status:400
        }

      );


    }



    /*
      Create unique ID
    */

    const id =

      `${Date.now()}-${crypto.randomUUID()}`;



    /*
      Contact object
    */

    const submission = {


      id,


      name:
      name.trim(),


      email:
      email.trim(),


      company:
      company?.trim() || "",


      phone:
      phone?.trim() || "",


      service:
      service || "",


      message:
      message.trim(),


      createdAt:
      new Date().toISOString(),


      source:
      "website-contact-form"


    };



    /*
      Store in Cloudflare R2
    */

    await env.CONTACTS.put(

      `contacts/${id}.json`,


      JSON.stringify(

        submission,

        null,

        2

      ),


      {

        httpMetadata:

        {

          contentType:
          "application/json"

        }

      }


    );



    /*
      Success response
    */

    return Response.json(

      {

        success:true,

        message:
        "Submission received"


      },


      {

        status:200

      }


    );



  }


  catch(error){


    console.error(
      "Contact API Error:",
      error
    );



    return Response.json(

      {

        success:false,

        error:
        "Internal server error"

      },


      {

        status:500

      }


    );


  }


};