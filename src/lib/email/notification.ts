import {
sendLeadEmail
}
from "./resend";



export interface EmailNotificationPayload {


to:string;


subject:string;


body:string;


}




export async function sendLeadNotification(

payload:EmailNotificationPayload

){


return await sendLeadEmail(

payload

);


}