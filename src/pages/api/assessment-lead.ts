import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { site } from "../../config/site";

export const prerender = false;

interface AssessmentSubmission {
  name: string;
  company: string;
  email: string;
  phone?: string;
  answers: {
    bottleneck: string;
    dataReadiness: string;
    primaryGoal: string;
    timeline: string;
    budget: string;
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as AssessmentSubmission;
    const { name, company, email, phone, answers } = body;

    if (!name || !email || !answers) {
      return new Response(
        JSON.stringify({ success: false, message: "Name, email, and answers are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Calculate Lead Score for Sales
    let score = 0;
    if (answers.timeline === "A") score += 35;
    else if (answers.timeline === "B") score += 25;

    if (answers.budget === "C") score += 35;
    else if (answers.budget === "B") score += 25;
    else if (answers.budget === "D") score += 15;

    if (answers.dataReadiness === "C") score += 20;
    else if (answers.dataReadiness === "B") score += 15;
    else score += 10;

    const leadTier = score >= 70 ? "HOT" : score >= 45 ? "WARM" : "NURTURE";

    // 2. Map Solution Plan for User
    let recommendedSolution = "Custom AI Strategy & Automation";
    let estimatedTimeSaved = "10-15 hours/week per team member";

    if (answers.bottleneck === "B" || answers.primaryGoal === "B") {
      recommendedSolution = "Enterprise RAG & Knowledge Assistant";
      estimatedTimeSaved = "20+ hours/week across team";
    } else if (answers.bottleneck === "A" || answers.primaryGoal === "A") {
      recommendedSolution = "Autonomous Customer Care Agents";
      estimatedTimeSaved = "up to 60% reduction in support tickets";
    } else if (answers.bottleneck === "C" || answers.primaryGoal === "C") {
      recommendedSolution = "Agentic Workflow Automation Pipelines";
      estimatedTimeSaved = "75% faster data handling";
    }

    const results = {
      score,
      leadTier,
      recommendedSolution,
      estimatedTimeSaved,
      summary: `Based on your responses, ${company || 'your team'} is well-positioned for ${recommendedSolution}.`
    };

    // 3. Assemble Full Archive Object
    const leadRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      leadInfo: { name, company, email, phone },
      answers,
      leadScoring: { score, tier: leadTier },
      results
    };

    // 4. Store in Cloudflare R2 Bucket (Astro v6 compatible)
    // Access R2 binding directly from cloudflare:workers or locals fallback
    const bucket = (env as Record<string, any>)?.CONTACTS || (locals as Record<string, any>)?.runtime?.env?.CONTACTS;

    if (bucket) {
      const datePath = leadRecord.createdAt.substring(0, 10);
      const fileName = `assessment-leads/${datePath}/${leadTier}_${leadRecord.id}.json`;

      await bucket.put(
        fileName,
        JSON.stringify(leadRecord, null, 2),
        {
          httpMetadata: { contentType: "application/json" },
          customMetadata: {
            email: leadRecord.leadInfo.email,
            company: leadRecord.leadInfo.company || "",
            leadTier,
            score: String(score)
          }
        }
      );
    } else {
      console.warn("R2 bucket 'CONTACTS' binding not available in current environment");
    }

    // 5. Send Internal Sales Alert (Non-blocking)
    if (site?.integrations?.emailNotification) {
      sendSalesNotificationEmail(leadRecord).catch((err) =>
        console.error("Failed to send sales email:", err)
      );
    }

    // 6. Return response to front-end results page
    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing assessment:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Unable to complete assessment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

async function sendSalesNotificationEmail(leadRecord: any) {
  const { leadInfo, leadScoring, answers, results } = leadRecord;

  const payload = {
    personalizations: [{ to: [{ email: site.integrations.notificationEmail }] }],
    from: { email: site.integrations.emailFrom, name: site.company.name },
    subject: `[${leadScoring.tier} LEAD - ${leadScoring.score}/100] ${leadInfo.company || leadInfo.name}`,
    content: [
      {
        type: "text/html",
        value: `
<h2>New AI Assessment Submission</h2>
<p><b>Lead Quality:</b> <span style="color: ${leadScoring.tier === 'HOT' ? 'red' : 'orange'}; font-weight: bold;">${leadScoring.tier} (${leadScoring.score}/100)</span></p>
<p><b>Name:</b> ${leadInfo.name}</p>
<p><b>Company:</b> ${leadInfo.company}</p>
<p><b>Email:</b> ${leadInfo.email}</p>
<p><b>Phone:</b> ${leadInfo.phone || "N/A"}</p>

<h3>Solution Recommended</h3>
<p><b>Solution:</b> ${results.recommendedSolution}</p>
<p><b>Impact:</b> ${results.estimatedTimeSaved}</p>

<h3>Form Answers</h3>
<pre>${JSON.stringify(answers, null, 2)}</pre>
`
      }
    ]
  };

  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("MailChannels error response:", response.status, errText);
  }
}