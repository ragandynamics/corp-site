export interface Service {

  id: string;

  title: string;

  icon: string;

  tagline: string;

  description: string;

  businessValue: string;

  features: string[];

  cta: string;

  featured?: boolean;

}

export const services: Service[] = [

{
id:"ai-strategy",
title:"AI Strategy & Readiness",
icon:"🧭",
tagline:"Start your AI journey with confidence.",
description:"Identify the highest-value AI opportunities aligned to your business goals.",
businessValue:"Reduce implementation risk and prioritise AI investments.",
cta:"Book Strategy Workshop",
featured:true,
features:[
"AI Readiness Assessment",
"AI Opportunity Discovery",
"AI Roadmap",
"AI Governance",
"AI Use Case Prioritisation",
"Executive AI Advisory"
]
},

{
id:"automation",
title:"Business Process Automation",
icon:"⚡",
tagline:"Reduce manual work and operating costs.",
description:"Automate repetitive business processes using AI and workflow automation.",
businessValue:"Increase productivity while lowering operational costs.",
cta:"Automate My Business",
featured:true,
features:[
"Invoice Processing",
"Purchase Orders",
"Expense Claims",
"HR Onboarding",
"Document Processing",
"Approval Workflows",
"Email Automation",
"Digital Forms"
]
},

{
id:"chatbots",
title:"AI Customer Service",
icon:"💬",
tagline:"Support customers 24/7.",
description:"Deploy intelligent assistants across your website and communication channels.",
businessValue:"Improve customer satisfaction without increasing headcount.",
cta:"Deploy AI Assistant",
features:[
"Website Chatbot",
"WhatsApp AI",
"Microsoft Teams Bot",
"FAQ Automation",
"Appointment Booking",
"Voice AI",
"Customer Support AI"
]
},

{
id:"sales",
title:"AI Sales & Marketing",
icon:"📈",
tagline:"Generate more qualified leads.",
description:"Increase revenue using AI-powered marketing and sales automation.",
businessValue:"Improve conversion rates and marketing efficiency.",
cta:"Grow My Sales",
features:[
"Lead Qualification",
"Email Campaigns",
"Proposal Generation",
"SEO Content",
"Social Media",
"Customer Segmentation",
"Marketing Automation"
]
},

{
id:"analytics",
title:"Business Intelligence",
icon:"📊",
tagline:"Make smarter business decisions.",
description:"Turn business data into real-time insights.",
businessValue:"Improve decision-making with AI-driven analytics.",
cta:"See My Data",
features:[
"Executive Dashboards",
"KPI Monitoring",
"Sales Forecasting",
"Financial Analytics",
"Inventory Forecasting",
"AI Reporting"
]
},

{
id:"copilot",
title:"Microsoft Copilot Solutions",
icon:"🚀",
tagline:"Unlock the power of Microsoft AI.",
description:"Implement Microsoft AI solutions across Microsoft 365 and Power Platform.",
businessValue:"Increase employee productivity using familiar Microsoft tools.",
cta:"Discover Copilot",
features:[
"Microsoft 365 Copilot",
"Copilot Studio",
"AI Agents",
"Power Platform",
"Power BI",
"Power Automate",
"SharePoint AI"
]
},

{
id:"cloud",
title:"Cloud & AI Modernisation",
icon:"☁️",
tagline:"Build scalable AI platforms.",
description:"Modern cloud architecture designed for secure AI adoption.",
businessValue:"Lower infrastructure costs while enabling AI innovation.",
cta:"Modernise Infrastructure",
features:[
"Azure AI",
"AWS AI",
"Google Cloud",
"Cloudflare",
"API Integration",
"Hybrid Cloud",
"AI Infrastructure"
]
},

{
id:"security",
title:"AI Security & Governance",
icon:"🔒",
tagline:"Secure AI from day one.",
description:"Protect your organisation with enterprise AI governance.",
businessValue:"Reduce security risks while maintaining compliance.",
cta:"Secure My AI",
features:[
"AI Governance",
"Identity Management",
"Risk Assessment",
"Compliance",
"Data Protection",
"Security Reviews"
]
},

{
id:"training",
title:"AI Training & Adoption",
icon:"🎓",
tagline:"Empower your workforce.",
description:"Practical AI training that accelerates user adoption.",
businessValue:"Increase productivity through confident AI usage.",
cta:"Train My Team",
features:[
"Executive Workshops",
"Prompt Engineering",
"Copilot Training",
"AI Awareness",
"AI Adoption",
"Change Management"
]
}

];