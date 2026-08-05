// src/lib/assessment/questions.ts

export interface Option {
  label: string;
  value: string;

  // Hidden scoring metadata
  score?: {
    automation?: number;
    productivity?: number;
    revenue?: number;
    maturity?: number;
    urgency?: number;
    complexity?: number;
    lead?: number;
  };
}

export interface Question {
  id: string;
  type: "select" | "multiselect" | "text";

  label: string;

  subtitle?: string;

  helperText?: string;

  placeholder?: string;

  required?: boolean;

  options?: Option[];
}

export interface Section {
  id: string;

  title: string;

  description: string;

  whyWeAreAsking: string;

  didYouKnow: string;

  questions: Question[];
}


export const assessmentSections: Section[] = [
{
    id: "business-profile",

    title: "Business Profile & Strategic Objectives",

    description:
      "Let's understand your organisation so we can estimate where AI can deliver the highest business value.",

    whyWeAreAsking:
      "Business size, industry and leadership priorities influence the type of AI initiatives that deliver the fastest return on investment.",

    didYouKnow:
      "Companies that align AI initiatives with measurable business goals are significantly more likely to realise value than organisations that deploy AI without a defined strategy.",

    questions: [

      {
        id: "companySize",

        required: true,

        type: "select",

        label: "How many employees does your organisation have?",

        helperText:
          "This helps estimate potential productivity improvements.",

        options: [

          {
            label: "1–10",
            value: "1-10",
            score:{productivity:10,lead:5}
          },

          {
            label:"11–50",
            value:"11-50",
            score:{productivity:20,lead:10}
          },

          {
            label:"51–200",
            value:"51-200",
            score:{productivity:35,lead:20}
          },

          {
            label:"201–500",
            value:"201-500",
            score:{productivity:50,lead:30}
          },

          {
            label:"500+",
            value:"500+",
            score:{productivity:70,lead:40}
          }

        ]
      },

      {
        id:"annualRevenue",

        required:true,

        type:"select",

        label:"What is your approximate annual revenue?",

        options:[

          {
            label:"Under SGD 1M",
            value:"<1M",
            score:{lead:5}
          },

          {
            label:"SGD 1M – 10M",
            value:"1-10M",
            score:{lead:15}
          },

          {
            label:"SGD 10M – 50M",
            value:"10-50M",
            score:{lead:30}
          },

          {
            label:"SGD 50M – 250M",
            value:"50-250M",
            score:{lead:45}
          },

          {
            label:"Above SGD 250M",
            value:"250M+",
            score:{lead:60}
          }

        ]
      },

      {
        id:"industry",

        required:true,

        type:"select",

        label:"Which industry best describes your organisation?",

        options:[

          {
            label:"Professional Services",
            value:"Professional Services"
          },

          {
            label:"Manufacturing",
            value:"Manufacturing"
          },

          {
            label:"Healthcare",
            value:"Healthcare"
          },

          {
            label:"Financial Services",
            value:"Financial Services"
          },

          {
            label:"Retail / E-Commerce",
            value:"Retail"
          },

          {
            label:"Technology / Software",
            value:"Technology"
          },

          {
            label:"Government / Public Sector",
            value:"Government"
          },

          {
            label:"Education",
            value:"Education"
          },

          {
            label:"Others",
            value:"Others"
          }

        ]
      },

      {
        id:"role",

        required:true,

        type:"select",

        label:"What best describes your role?",

        helperText:"This helps tailor executive recommendations.",

        options:[

          {
            label:"CEO / Managing Director",
            value:"CEO",
            score:{lead:30}
          },

          {
            label:"COO / Operations",
            value:"COO",
            score:{lead:25}
          },

          {
            label:"CIO / CTO / IT Director",
            value:"CIO",
            score:{lead:25}
          },

          {
            label:"Department Head",
            value:"Department Head",
            score:{lead:15}
          },

          {
            label:"Manager",
            value:"Manager",
            score:{lead:10}
          },

          {
            label:"Individual Contributor",
            value:"Employee",
            score:{lead:5}
          }

        ]
      },

      {
        id:"decisionMaker",

        required:true,

        type:"select",

        label:"Are you involved in AI or technology investment decisions?",

        options:[

          {
            label:"Yes, I am the decision maker",
            value:"Decision Maker",
            score:{lead:30}
          },

          {
            label:"I influence purchasing decisions",
            value:"Influencer",
            score:{lead:20}
          },

          {
            label:"I provide recommendations",
            value:"Recommender",
            score:{lead:10}
          },

          {
            label:"No",
            value:"No"
          }

        ]
      }

    ]
},
  {
    id:"operations",

    title:"Operational Efficiency Assessment",

    description:
      "Identify where your teams spend time on repetitive or manual work.",

    whyWeAreAsking:
      "The biggest opportunities for AI usually come from repetitive processes, fragmented knowledge and manual decision making.",

    didYouKnow:
      "Many organisations recover hundreds to thousands of productive hours annually by automating repetitive operational tasks.",

    questions:[

      {
        id:"businessChallenges",

        required:true,

        type:"multiselect",

        label:"Which business challenges consume the most time today?",

        subtitle:"Select all that apply.",

        options:[

          {
            label:"Searching for documents or knowledge",

            value:"Knowledge Search",

            score:{
              automation:20,
              productivity:20
            }
          },

          {
            label:"Manual reporting",

            value:"Reporting",

            score:{
              automation:20,
              productivity:15
            }
          },

          {
            label:"Customer enquiries",

            value:"Customer Service",

            score:{
              automation:15,
              revenue:15
            }
          },

          {
            label:"Sales follow-up",

            value:"Sales",

            score:{
              revenue:20
            }
          },

          {
            label:"Manual approvals",

            value:"Workflow",

            score:{
              automation:15
            }
          },

          {
            label:"Data entry",

            value:"Data Entry",

            score:{
              automation:20
            }
          },

          {
            label:"Employee onboarding",

            value:"HR",

            score:{
              productivity:10
            }
          }

        ]
      },
       {
        id: "affectedDepartments",

        required: true,

        type: "multiselect",

        label: "Which departments would benefit most from AI?",

        helperText:
          "This helps us recommend the highest-value transformation roadmap.",

        options: [

          {
            label: "Executive Management",
            value: "Executive",
            score: {
              maturity: 5,
              lead: 5
            }
          },

          {
            label: "Operations",
            value: "Operations",
            score: {
              automation: 15,
              productivity: 15
            }
          },

          {
            label: "Finance",
            value: "Finance",
            score: {
              automation: 10,
              productivity: 10
            }
          },

          {
            label: "Sales",
            value: "Sales",
            score: {
              revenue: 15
            }
          },

          {
            label: "Marketing",
            value: "Marketing",
            score: {
              revenue: 10
            }
          },

          {
            label: "Customer Service",
            value: "Customer Service",
            score: {
              automation: 10,
              revenue: 10
            }
          },

          {
            label: "Human Resources",
            value: "HR",
            score: {
              productivity: 10
            }
          },

          {
            label: "IT",
            value: "IT",
            score: {
              maturity: 10
            }
          }

        ]
      },

      {
        id: "timeSpent",

        required: true,

        type: "select",

        label: "Approximately how many hours each employee spends weekly on repetitive work?",

        options: [

          {
            label: "Less than 5 hours",
            value: "<5",
            score: {
              productivity: 5
            }
          },

          {
            label: "5–10 hours",
            value: "5-10",
            score: {
              productivity: 10
            }
          },

          {
            label: "10–20 hours",
            value: "10-20",
            score: {
              productivity: 20
            }
          },

          {
            label: "More than 20 hours",
            value: "20+",
            score: {
              productivity: 35,
              automation: 20
            }
          }

        ]
      }

    ]

},{
    id: "technology",

    title: "Technology & Data Foundation",

    description:
      "Understanding your current technology helps us recommend AI solutions that integrate with your existing environment instead of replacing it.",

    whyWeAreAsking:
      "Modern AI delivers the fastest ROI when it connects to the systems your teams already use every day.",

    didYouKnow:
      "Most successful AI projects enhance existing business platforms rather than requiring a complete technology replacement.",

    questions: [

      {

        id: "businessSystems",

        required: true,

        type: "multiselect",

        label: "Which business systems are currently used across your organisation?",

        subtitle: "Select all that apply.",

        options: [

          {
            label: "Microsoft 365",
            value: "Microsoft 365",
            score: {
              maturity: 20
            }
          },

          {
            label: "Google Workspace",
            value: "Google Workspace",
            score: {
              maturity: 15
            }
          },

          {
            label: "CRM",
            value: "CRM",
            score: {
              maturity: 10,
              revenue: 10
            }
          },

          {
            label: "ERP",
            value: "ERP",
            score: {
              automation: 10,
              maturity: 10
            }
          },

          {
            label: "Accounting Software",
            value: "Accounting",
            score: {
              automation: 8
            }
          },

          {
            label: "Power BI / Tableau",
            value: "Analytics",
            score: {
              maturity: 10
            }
          },

          {
            label: "SharePoint / Knowledge Base",
            value: "Knowledge Base",
            score: {
              automation: 10,
              productivity: 10
            }
          }

        ]

      },

      {

        id: "cloudPlatform",

        required: true,

        type: "select",

        label: "Where are most of your business applications hosted?",

        options: [

          {
            label: "Microsoft Azure",
            value: "Azure",
            score: {
              maturity: 20
            }
          },

          {
            label: "Amazon Web Services",
            value: "AWS",
            score: {
              maturity: 20
            }
          },

          {
            label: "Google Cloud",
            value: "GCP",
            score: {
              maturity: 20
            }
          },

          {
            label: "Private Data Centre",
            value: "On-Premise",
            score: {
              complexity: 20
            }
          },

          {
            label: "Not Sure",
            value: "Unknown"
          }

        ]

      },

      {

        id: "existingAI",

        required: true,

        type: "select",

        label: "How would you describe your current use of AI?",

        options: [

          {
            label: "No AI tools yet",
            value: "None"
          },

          {
            label: "Individuals use ChatGPT or Copilot",
            value: "Personal",
            score: {
              maturity: 10
            }
          },

          {
            label: "Several departments use AI",
            value: "Department",
            score: {
              maturity: 25
            }
          },

          {
            label: "AI is part of business workflows",
            value: "Enterprise",
            score: {
              maturity: 40
            }
          }

        ]

      }

    ]

},{
  id: "transformation-readiness",

  title: "AI Transformation Readiness",

  description:
    "Help us understand your organisation's readiness so we can recommend a practical transformation roadmap.",

  whyWeAreAsking:
    "Successful AI initiatives depend on leadership support, governance and organisational readiness—not just technology.",

  didYouKnow:
    "Organisations with executive sponsorship are significantly more likely to achieve measurable AI outcomes than those driven solely by technology teams.",

  questions: [

    {
      id: "primaryObjective",

      required: true,

      type: "select",

      label: "What is your primary objective for adopting AI?",

      options: [

        {
          label: "Reduce operating costs",
          value: "Cost Reduction",
          score: {
            automation: 20,
            productivity: 20
          }
        },

        {
          label: "Increase employee productivity",
          value: "Productivity",
          score: {
            productivity: 25
          }
        },

        {
          label: "Increase revenue",
          value: "Revenue",
          score: {
            revenue: 25
          }
        },

        {
          label: "Improve customer experience",
          value: "Customer Experience",
          score: {
            revenue: 15,
            automation: 10
          }
        },

        {
          label: "Improve compliance and governance",
          value: "Governance",
          score: {
            maturity: 15
          }
        }

      ]
    },

    {

      id: "adoptionBarrier",

      required: true,

      type: "multiselect",

      label: "What is currently preventing wider AI adoption?",

      subtitle: "Select all that apply.",

      options: [

        {
          label: "No clear AI strategy",
          value: "Strategy",
          score: {
            maturity: -10
          }
        },

        {
          label: "Budget constraints",
          value: "Budget"
        },

        {
          label: "Security concerns",
          value: "Security",
          score: {
            complexity: 15
          }
        },

        {
          label: "Lack of internal skills",
          value: "Skills",
          score: {
            complexity: 10
          }
        },

        {
          label: "Poor data quality",
          value: "Data",
          score: {
            complexity: 20
          }
        },

        {
          label: "Unsure where to begin",
          value: "Unsure",
          score: {
            maturity: -15
          }
        }

      ]

    }

  ]

},{
  id: "executive-priorities",

  title: "Executive Priorities",

  description:
    "These final questions help us personalise your executive report and recommend the most appropriate next step.",

  whyWeAreAsking:
    "Implementation timeline, budget readiness and executive sponsorship help determine the most suitable engagement approach.",

  didYouKnow:
    "Organisations that begin with a focused pilot typically realise value faster than those attempting enterprise-wide transformation from day one.",

  questions: [

    {

      id: "timeline",

      required: true,

      type: "select",

      label: "When would you like to begin your AI transformation?",

      options: [

        {
          label: "Immediately",
          value: "Immediate",
          score: {
            urgency: 30,
            lead: 30
          }
        },

        {
          label: "Within 3 months",
          value: "3 Months",
          score: {
            urgency: 20,
            lead: 20
          }
        },

        {
          label: "Within 6 months",
          value: "6 Months",
          score: {
            urgency: 10,
            lead: 10
          }
        },

        {
          label: "Just exploring",
          value: "Exploring"
        }

      ]

    },

    {

      id: "budget",

      required: true,

      type: "select",

      label: "Has budget been allocated for AI initiatives?",

      options: [

        {
          label: "Yes",
          value: "Approved",
          score: {
            lead: 30
          }
        },

        {
          label: "Budget planned",
          value: "Planned",
          score: {
            lead: 20
          }
        },

        {
          label: "Not yet",
          value: "None",
          score: {
            lead: 5
          }
        },

        {
          label: "Still researching",
          value: "Research"
        }

      ]

    },

    {

      id: "engagement",

      required: true,

      type: "select",

      label: "Which engagement would be most valuable after this assessment?",

      options: [

        {
          label: "Executive AI Strategy Workshop",
          value: "Workshop"
        },

        {
          label: "AI Opportunity Discovery Session",
          value: "Discovery"
        },

        {
          label: "Microsoft Copilot Assessment",
          value: "Copilot"
        },

        {
          label: "AI Implementation Roadmap",
          value: "Roadmap"
        },

        {
          label: "Just receive the report",
          value: "Report"
        }

      ]

    }

  ]

}


];