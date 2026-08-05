import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";
import { site } from "../../config/site";

export const prerender = false;

interface ContactForm {
  name?: string;
  email?: string;
  company?: string;
  countryCode?: string;
  phone?: string;
  enquiryTypes?: string[];
  organizationSize?: string;
  budget?: string;
  timeline?: string;
  role?: string;
  leadSource?: string;
  message?: string;
  leadScore?: number;
}

const TEAM_ROUTING: Record<string, string> = {
  "Sales Enquiry": "Sales",
  "AI Consulting": "AI Consulting",
  "Business Process Automation": "Delivery",
  "Microsoft Copilot Practice": "Microsoft Practice",
  "AI Training & Corporate Workshops": "Training",
  "Technical Support": "Support",
  "Customer Service": "Customer Success",
  "Billing & Accounts": "Finance",
  "Partnership Opportunities": "Business Development",
  "General Enquiry": "Admin",
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as ContactForm;

    // 1. Basic Payload Validation
    if (!body.email?.trim() || !body.name?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name and email are required fields.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const enquiryTypes = body.enquiryTypes?.length
      ? body.enquiryTypes
      : ["General Enquiry"];

    // Multi-team routing tag aggregation
    const assignedTeams = Array.from(
      new Set(enquiryTypes.map((type) => TEAM_ROUTING[type] ?? "Admin"))
    );

    // Calculate Lead Score (0 - 100)
    let leadScore = 0;

    if (typeof body.leadScore === "number" && body.leadScore >= 0) {
      leadScore = body.leadScore;
    } else {
      if (body.company) leadScore += 10;
      if (body.organizationSize && body.organizationSize !== "1 - 10 employees") {
        leadScore += 15;
      }
      if (body.role?.includes("C-Suite") || body.role?.includes("VP")) {
        leadScore += 25;
      }

      if (
        body.budget &&
        !body.budget.includes("Under") &&
        body.budget !== "Not Yet Determined"
      ) {
        leadScore += 25;
      }
      if (body.timeline && !body.timeline.includes("Exploring")) {
        leadScore += 15;
      }

      if (
        body.email &&
        !body.email.match(/@(gmail|yahoo|hotmail|outlook)\.com$/i)
      ) {
        leadScore += 10;
      }

      leadScore = Math.min(leadScore, 100);
    }

    const submission = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company ?? "",
      countryCode: body.countryCode ?? "+65",
      phone: body.phone ?? "",
      enquiryTypes,
      assignedTeams,
      qualification: {
        leadScore,
        tier:
          leadScore >= 60
            ? "High Value (Tier 1)"
            : leadScore >= 35
            ? "Medium Value (Tier 2)"
            : "Standard (Tier 3)",
        organizationSize: body.organizationSize ?? "",
        budget: body.budget ?? "",
        timeline: body.timeline ?? "",
        role: body.role ?? "",
        leadSource: body.leadSource ?? "",
      },
      message: body.message ?? "",
      createdAt: new Date().toISOString(),
    };

    // 2. Extract Cloudflare Bindings & Environment Variables
    const runtime = (locals as Record<string, any>)?.runtime;
    const bucket = runtime?.env?.CONTACTS as R2Bucket | undefined;
    const resendApiKey = runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    // 3. Store in R2 Bucket
    if (bucket) {
      const objectKey = `contacts/${submission.id}.json`;

      await bucket.put(objectKey, JSON.stringify(submission, null, 2), {
        httpMetadata: {
          contentType: "application/json",
        },
      });

      console.log(
        "CONTACT SAVED:",
        objectKey,
        `[Score: ${leadScore} | Teams: ${assignedTeams.join(", ")}]`
      );
    } else {
      console.warn(
        "R2 bucket 'CONTACTS' is not bound. Contact record processed without persistent storage."
      );
    }

    // 4. Send Email Notification via Resend (Toggled via site config)
    const emailConfig = site?.integrations?.emailNotification;

    if (emailConfig?.enabled) {
      if (!resendApiKey) {
        console.warn(
          "Email notifications are enabled in site config, but 'RESEND_API_KEY' is missing in environment variables."
        );
      } else {
        // Non-blocking background call
        sendResendContactNotification(submission, resendApiKey).catch((err) =>
          console.error("Failed to dispatch contact email notification:", err)
        );
      }
    } else {
      console.log("Email notifications are disabled in site config — skipping dispatch.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact received and processed successfully",
        id: submission.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to process contact request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

async function sendResendContactNotification(submission: any, apiKey: string) {
  const config = site.integrations.emailNotification;

  const payload = {
    from: `${site.company.name} <${config.emailFrom}>`,
    to: [config.notificationEmail],
    subject: `[CONTACT - ${submission.qualification.tier}] ${submission.company || submission.name}`,
    html: `
<h2>New Contact Form Submission</h2>
<p><b>Lead Quality:</b> <span style="font-weight: bold;">${submission.qualification.tier} (${submission.qualification.leadScore}/100)</span></p>
<p><b>Name:</b> ${submission.name}</p>
<p><b>Email:</b> ${submission.email}</p>
<p><b>Company:</b> ${submission.company || "N/A"}</p>
<p><b>Phone:</b> ${submission.countryCode} ${submission.phone || "N/A"}</p>
<p><b>Assigned Teams:</b> ${submission.assignedTeams.join(", ")}</p>
<p><b>Enquiry Types:</b> ${submission.enquiryTypes.join(", ")}</p>

<h3>Qualification Details</h3>
<ul>
  <li><b>Role:</b> ${submission.qualification.role || "N/A"}</li>
  <li><b>Organization Size:</b> ${submission.qualification.organizationSize || "N/A"}</li>
  <li><b>Budget:</b> ${submission.qualification.budget || "N/A"}</li>
  <li><b>Timeline:</b> ${submission.qualification.timeline || "N/A"}</li>
  <li><b>Lead Source:</b> ${submission.qualification.leadSource || "N/A"}</li>
</ul>

<h3>Message</h3>
<p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-radius: 4px;">${submission.message || "No message provided"}</p>
`,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Resend API error response:", response.status, errText);
  } else {
    console.log("Resend contact notification dispatched successfully.");
  }
}