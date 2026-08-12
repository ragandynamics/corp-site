import type { APIRoute } from "astro";

import { sendLeadNotification } from "../../lib/email/notification";
import { site } from "../../config/site";
import {
  generateLeadSummary,
  type BusinessVelocityLead,
} from "../../lib/assessment/businessVelocity";
import { calculateLeadPriority } from "../../lib/assessment/leadPriority";

interface AssessmentRequest {
  name?: string;
  designation?: string;
  company?: string;
  email?: string;
  phone?: string;

  industry?: string;
  companySize?: string;

  systems?: string[];
  challenges?: string[];
  priorities?: string[];
  interests?: string[];

  timeline?: string;
  score?: number; // Captured from frontend calculation

  [key: string]: any;
}

export const prerender = false;

interface RuntimeEnv {
  RD_DATA: R2Bucket;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as AssessmentRequest;
    const now = new Date().toISOString();

    const score = typeof body.score === "number" ? body.score : 0;

    // Build the stored record
    const lead: BusinessVelocityLead & { score: number } = {
      campaign: "business-velocity",

      lead: {
        name: body.name || "",
        designation: body.designation || "",
        company: body.company || "",
        email: body.email || "",
        phone: body.phone || "",
      },

      business: {
        industry: body.industry || "",
        companySize: body.companySize || "",
        systems: body.systems || [],
      },

      challenges: body.challenges || [],
      priorities: body.priorities || [],
      interests: body.interests || [],
      timeline: body.timeline || "",

      score: score, // Store computed operational efficiency score

      answers: body as Record<string, any>,

      createdAt: now,
      status: "NEW",

      source: {
        page: "/assessment",
        campaign: "business-velocity",
      },
    };

    const priority = calculateLeadPriority(lead as any);

    /*
      Cloudflare Pages runtime binding check
    */
    const env = (locals as any)?.runtime?.env as RuntimeEnv;

    if (!env?.RD_DATA) {
      console.error("R2 RD_DATA binding missing");

      return new Response(
        JSON.stringify({
          error: "Storage unavailable",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    /*
      Store lead & calculated score in Cloudflare R2 Bucket
    */
    const id = crypto.randomUUID();
    const fileName = `assessments/business-velocity/${now.split("T")[0]}_${id}.json`;

    await env.RD_DATA.put(fileName, JSON.stringify(lead, null, 2), {
      httpMetadata: {
        contentType: "application/json",
      },
      customMetadata: {
        score: String(score),
        company: lead.lead.company,
        email: lead.lead.email,
        priority: priority,
      },
    });

    /*
      Generate internal sales notification
    */
    const summary = generateLeadSummary(lead as any, priority);

    await sendLeadNotification({
      to: site.integrations.emailNotification.notificationEmail,
      subject: `NEW LEAD (${score}/100) | ${lead.lead.company} | ${priority}`,
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Assessment submission failed", error);

    return new Response(
      JSON.stringify({
        error: "Unable to process submission",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};