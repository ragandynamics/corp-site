import type { APIRoute } from "astro";

import { sendLeadNotification } from "../../lib/email/notification";
import { site } from "../../config/site";
import {
  createBusinessVelocityLead,
  generateLeadSummary,
} from "../../lib/assessment/businessVelocity";
import {
  validateBusinessVelocitySubmission,
} from "../../lib/assessment/businessVelocitySubmission";
import { calculateLeadPriority } from "../../lib/assessment/leadPriority";

export const prerender = false;

interface RuntimeEnv {
  RD_DATA: R2Bucket;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const validation = validateBusinessVelocitySubmission(await request.json());
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const lead = createBusinessVelocityLead(validation.data);
    const score = lead.score;

    const priority = calculateLeadPriority(lead);

    /*
      Cloudflare Pages runtime binding check
    */
    const env = (locals as App.Locals)?.runtime?.env as RuntimeEnv | undefined;

    if (!env?.RD_DATA) {
      console.error("R2 RD_DATA binding missing");

      return new Response(
        JSON.stringify({ error: "Storage unavailable" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    /*
      Store lead under the "assessment/" folder in R2
    */
    const id = crypto.randomUUID();
    const datePrefix = lead.createdAt.split("T")[0];
    const fileName = `assessment/${datePrefix}_${id}.json`;

    await env.RD_DATA.put(fileName, JSON.stringify(lead, null, 2), {
      httpMetadata: { contentType: "application/json" },
      customMetadata: {
        score: String(score),
        company: lead.lead.company,
        email: lead.lead.email,
        priority: priority,
        pdpaConsent: String(lead.pdpaConsent),
      },
    });

    /*
      Generate internal email notification
    */
    const summary = generateLeadSummary(lead, priority);

    await sendLeadNotification({
      to: site.integrations.emailNotification.notificationEmail,
      subject: `NEW ASSESSMENT LEAD (${score}/100) | ${lead.lead.company} | ${priority}`,
      body: summary,
    });

    return new Response(
      JSON.stringify({
        success: true,
        id: fileName,
        score: score,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Assessment submission failed", error);

    return new Response(
      JSON.stringify({ error: "Unable to process submission" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
