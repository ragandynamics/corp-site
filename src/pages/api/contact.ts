import type { APIRoute } from "astro";

export const prerender = true;

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
  "General Enquiry": "Admin"
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as ContactForm;

    const enquiryTypes = body.enquiryTypes ?? ["General Enquiry"];

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
      if (body.organizationSize && body.organizationSize !== "1 - 10 employees") leadScore += 15;
      if (body.role?.includes("C-Suite") || body.role?.includes("VP")) leadScore += 25;

      if (body.budget && !body.budget.includes("Under") && body.budget !== "Not Yet Determined") leadScore += 25;
      if (body.timeline && !body.timeline.includes("Exploring")) leadScore += 15;

      if (body.email && !body.email.match(/@(gmail|yahoo|hotmail|outlook)\.com$/i)) {
        leadScore += 10;
      }

      leadScore = Math.min(leadScore, 100);
    }

    const submission = {
      id: crypto.randomUUID(),
      name: body.name ?? "",
      email: body.email ?? "",
      company: body.company ?? "",
      countryCode: body.countryCode ?? "+65",
      phone: body.phone ?? "",
      enquiryTypes,
      assignedTeams,
      qualification: {
        leadScore,
        tier: leadScore >= 60 ? "High Value (Tier 1)" : leadScore >= 35 ? "Medium Value (Tier 2)" : "Standard (Tier 3)",
        organizationSize: body.organizationSize ?? "",
        budget: body.budget ?? "",
        timeline: body.timeline ?? "",
        role: body.role ?? "",
        leadSource: body.leadSource ?? ""
      },
      message: body.message ?? "",
      createdAt: new Date().toISOString()
    };

    const runtime = (locals as Record<string, any>)?.runtime;
    const bucket = runtime?.env?.CONTACTS;

    if (bucket) {
      const objectKey = `contacts/${submission.id}.json`;

      await bucket.put(
        objectKey,
        JSON.stringify(submission, null, 2),
        {
          httpMetadata: {
            contentType: "application/json"
          }
        }
      );

      console.log("CONTACT SAVED:", objectKey, `[Score: ${leadScore} | Teams: ${assignedTeams.join(", ")}]`);
    } else {
      console.warn("R2 bucket 'CONTACTS' is not bound. Contact record processed without persistent storage.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact received and processed successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to process contact request"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};