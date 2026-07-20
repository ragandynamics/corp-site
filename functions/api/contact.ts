interface Env {
  CONTACTS: R2Bucket;
}


export const onRequestPost: PagesFunction<Env> = async ({
  request,
  env,
}) => {

  try {

    const body = await request.json();


    const {
      name,
      email,
      company,
      phone,
      service,
      message
    } = body;


    // Validation

    if (!name || !email || !message) {

      return Response.json(
        {
          success: false,
          error: "Missing required fields"
        },
        {
          status:400
        }
      );

    }


    // Create unique ID

    const id =
      `${Date.now()}-${crypto.randomUUID()}`;


    const submission = {

      id,

      name,

      email,

      company: company || "",

      phone: phone || "",

      service: service || "",

      message,

      createdAt:
        new Date().toISOString()

    };


    // Save to R2

    await env.CONTACTS.put(

      `contacts/${id}.json`,

      JSON.stringify(
        submission,
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


    return Response.json({

      success:true,

      message:
      "Submission received"

    });


  }

  catch(error){

    console.error(error);


    return Response.json(

      {
        success:false,
        error:"Server error"
      },

      {
        status:500
      }

    );

  }

};