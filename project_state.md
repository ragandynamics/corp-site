# Ragan Dynamics Website — Project State

## 1. Project Overview

**Project:** Ragan Dynamics Website  
**Primary purpose:** Marketing website and qualified-lead generation platform for Ragan Dynamics' cloud, AI, automation, consulting, and related business solutions.

The website is designed as a marketing and conversion platform rather than only a static corporate website.

A key conversion application is the **Business Velocity / AI Transformation Assessment**, which captures business information, identifies transformation opportunities, and converts qualified visitors into consultation leads.

---

## 2. Current Strategic Direction

The website funnel is structured around:

```text
Traffic
  ↓
Landing / Marketing Pages
  ↓
Business Problems & Business Value
  ↓
Assessment / Conversion CTA
  ↓
Business Assessment
  ↓
Lead Capture
  ↓
Personalised Results
  ↓
Discovery / Consultation
  ↓
Sales Conversation
```

The assessment should be treated as a small application embedded within the marketing website.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Astro |
| Astro version | 5.18.2 |
| Styling | Tailwind CSS |
| Runtime / Hosting direction | Cloudflare Workers |
| API | Astro API routes |
| Object storage | Cloudflare R2 |
| Session storage | Cloudflare KV where required |
| DNS / Edge / WAF | Cloudflare |
| Language | TypeScript |
| Source control | GitHub |
| Deployment | Wrangler / CI/CD |

The current project has Cloudflare integration enabled.

---

## 4. High-Level Architecture

```text
                         RAGAN DYNAMICS
                              WEBSITE
                                |
          +---------------------+---------------------+
          |                     |                     |
          v                     v                     v
      MARKETING             ASSESSMENT            CONTACT
       WEBSITE                  APP                SYSTEM
          |                     |                     |
          |                     v                     |
          |              Assessment Engine            |
          |                     |                     |
          |                     v                     |
          |                Lead Capture                |
          |                     |                     |
          +---------------------+---------------------+
                                |
                                v
                           API LAYER
                                |
               +----------------+----------------+
               |                |                |
               v                v                v
              R2              Email             CRM
               |
        +------+-------+
        |      |       |
        v      v       v
    Contacts Assessments Leads

                                |
                                v
                            ANALYTICS
                                |
                                v
                          SALES FUNNEL
                                |
                                v
                       DISCOVERY SESSION
                                |
                                v
                            CUSTOMER
```

---

## 5. Website Structure

Expected major routes include:

```text
/
├── services/
├── solutions/
├── assessment/
├── about/
├── careers/
├── contact/
├── privacy/
└── terms/
```

The exact set of currently implemented routes should be verified against the repository before making structural changes.

---

## 6. Source Structure

Recommended structure:

```text
src/
├── components/
│   └── assessment/
│       ├── AssessmentWizard.astro
│       ├── AssessmentQuestion.astro
│       ├── AssessmentProgress.astro
│       ├── BusinessProfileStep.astro
│       ├── BusinessChallengesStep.astro
│       ├── TechnologyStep.astro
│       ├── AIAdoptionStep.astro
│       ├── GoalsStep.astro
│       ├── LeadCaptureForm.astro
│       └── AssessmentResults.astro
│
├── lib/
│   └── assessment/
│       ├── questions.ts
│       ├── scoring.ts
│       ├── recommendations.ts
│       └── types.ts
│
├── pages/
│   ├── api/
│   │   ├── contact.ts
│   │   ├── assessment/
│   │   ├── leads/
│   │   └── health.ts
│   └── ...
│
├── layouts/
└── styles/
```

The repository should be checked before creating directories that do not yet exist.

---

## 7. Assessment Application

The assessment currently consists of seven logical stages:

```text
1. Business Profile
2. Business Challenges
3. Technology
4. AI Adoption
5. Goals
6. Lead Capture
7. Results
```

The wizard should provide:

- Previous / Next navigation
- Single-select questions
- Multi-select questions
- Progress indication
- Local answer persistence
- Validation before progressing
- Lead capture
- Results generation
- Recommended initiatives
- Recommended services
- Consultation CTA
- Assessment reset

---

## 8. Assessment State

The current browser persistence key is:

```text
ragan_ai_assessment
```

Assessment answers should be stored consistently using one agreed data model.

Current question IDs visible in the assessment implementation include:

```text
industry
employee_count
biggest_challenges
priority_improvement_area
current_tools
data_location
ai_desired_outcomes
exploration_timeline
```

Do not introduce alternative names such as:

```text
companySize
challenges
technology
goals
```

unless the complete assessment data model is deliberately migrated.

The wizard, questions, scoring engine, recommendations engine, lead capture, and results page must all use the same schema.

---

## 9. Assessment Component Contract

All assessment option components should consistently use:

```html
.answer-option
```

Each option should provide:

```html
data-answer="..."
```

Each question should provide:

```html
.assessment-question
data-question-id="..."
```

Navigation should use:

```html
data-action="next"
data-action="back"
```

The wizard should listen for these attributes rather than relying on button text such as `Continue` or `Back`.

This avoids navigation breaking when button labels are changed.

---

## 10. Assessment Wizard Contract

The current wizard uses:

```html
.wizard-step
```

and:

```html
data-step="1"
data-step="2"
...
data-step="7"
```

The wizard should consistently use `.wizard-step`.

Do not mix:

```text
.assessment-step
```

with:

```text
.wizard-step
```

The current wizard navigation model is:

```text
currentStep
    ↓
showStep()
    ↓
hide all .wizard-step
    ↓
show matching [data-step]
    ↓
render progress
```

---

## 11. Assessment Progress

The progress component accepts:

```text
step
total
```

Current total:

```text
7
```

The progress UI should display:

```text
Step X of 7
X%
```

and a visual progress bar.

---

## 12. Assessment Scoring

The results page currently contains a client-side readiness scoring concept.

The scoring engine should eventually be moved out of the UI component into:

```text
src/lib/assessment/scoring.ts
```

The scoring engine should accept a typed assessment answer object and return a structured result.

Recommended result model:

```text
AssessmentResult
├── readinessScore
├── maturityLevel
├── topPriority
├── suggestedTimeline
├── recommendations[]
└── recommendedServices[]
```

Scoring rules should not be duplicated inside Astro components.

---

## 13. Assessment Recommendations

Recommendations should be generated from assessment responses.

Examples of business opportunities currently represented include:

```text
Workflow Automation
Customer Assistant
Sales Assistant
Employee Copilot
Business Process Optimisation
Transformation Roadmap
```

Recommendations should be business-outcome oriented and should not be hard-coded in multiple components.

---

## 14. Lead Capture

The assessment lead capture collects:

```text
Name
Company Name
Business Email
WhatsApp / Contact Number
Consent
```

The assessment answers are submitted together with the lead.

Current API endpoint:

```text
POST /api/assessment-lead
```

The API should validate the request before storing it.

Lead data should be treated as a business record, separate from temporary browser state.

---

## 15. Contact System

The general contact form should support multiple enquiry intents rather than treating every submission as a generic enquiry.

Recommended enquiry types:

```text
Sales enquiry
AI / Automation consultation
Technical support
Existing customer service
Billing enquiry
Partnership
Careers
General enquiry
```

The contact API can use the enquiry type for routing.

Conceptually:

```text
Contact Form
    ↓
Validate
    ↓
Determine enquiry type
    ↓
Route
    ├── Sales
    ├── Support
    ├── Billing
    ├── Careers
    └── General
```

---

## 16. Business Email Validation

Business email validation should be implemented as a layered process.

Minimum client-side validation:

```text
type="email"
required
```

Server-side validation should be authoritative.

If business-only contact is required, the application may reject or flag common consumer domains.

However, domain blocking should be configurable rather than hard-coded permanently.

Examples of consumer domains include:

```text
gmail.com
yahoo.com
hotmail.com
outlook.com
icloud.com
```

The system should not assume every non-consumer domain is a legitimate business.

For higher-quality lead qualification, consider:

```text
Syntax validation
    ↓
Domain validation
    ↓
MX / mail capability check
    ↓
Disposable-email detection
    ↓
Optional enrichment
```

---

## 17. Phone / Country Code

The contact and assessment forms require international phone support.

The country selector should:

- contain all supported international country calling codes
- display country name
- display calling code
- display flag
- be searchable
- place Singapore first
- then Malaysia, India, China
- then other Southeast Asian countries
- then the rest of the world

The country code list should be maintained in one reusable data source rather than duplicated across forms.

---

## 18. R2 Storage

The current project uses Cloudflare R2.

Known R2 bucket:

```text
CONTACTS
```

Configured bucket name:

```text
ragan-dynamics-data
```

Contact records have been designed to use a UUID-based JSON object path such as:

```text
contacts/<uuid>.json
```

Recommended future logical structure:

```text
ragan-dynamics-data/
│
├── contacts/
│   └── <uuid>.json
│
├── assessments/
│   └── <uuid>.json
│
├── leads/
│   └── <uuid>.json
│
└── reports/
    └── <uuid>.json
```

Do not create additional storage systems without a clear requirement.

---

## 19. Lead Data Model

The lead should eventually become the central business object.

Conceptually:

```text
Lead
├── identity
├── company
├── contact details
├── source
├── enquiry type
├── assessment
├── qualification
├── intent
├── readiness score
├── recommended services
├── next action
├── createdAt
└── audit information
```

This allows the marketing website to evolve into a proper lead-generation platform.

---

## 20. API Architecture

Recommended API organization:

```text
/api/
├── contact
├── assessment/
│   ├── submit
│   └── results
├── leads/
│   └── create
└── health
```

All public APIs should include:

```text
Request validation
Input sanitisation
Rate limiting
Bot protection where appropriate
Error handling
Structured logging
```

---

## 21. Security

Public forms should be protected against:

- automated submissions
- excessive requests
- malformed input
- oversized payloads
- injection attempts
- duplicate submissions
- abusive traffic

Recommended flow:

```text
Browser
   ↓
Cloudflare Edge
   ↓
WAF / Rate Limiting
   ↓
API
   ↓
Validation
   ↓
Business Logic
   ↓
R2 / Email / CRM
```

---

## 22. Cloudflare Direction

The project currently uses the Astro Cloudflare integration.

Development command:

```bash
npm run dev
```

Current development environment has shown:

```text
astro v5.18.2
http://localhost:4321/
```

Long-term deployment direction should be Cloudflare Workers.

---

## 23. Current Known Assessment Issue

The assessment implementation has previously contained inconsistent versions of:

```text
AssessmentWizard
AssessmentQuestion
AssessmentResults
LeadCaptureForm
```

Some versions used:

```text
.assessment-step
```

while the current wizard uses:

```text
.wizard-step
```

Some versions used button text:

```text
Continue
Back
```

while the current wizard expects:

```text
data-action="next"
data-action="back"
```

This caused navigation failures.

There were also mismatches between answer property names used by the results engine and the actual question IDs.

### Required rule

Before further assessment changes, establish one canonical assessment contract and update all assessment components against it.

---

## 24. Current Debugging Facts

The browser console confirmed:

```js
document.querySelectorAll('.answer-option')
```

returns the expected option buttons.

The first option contains visible text such as:

```text
Manufacturing
```

and its computed text color is a normal dark text color.

Therefore, the option rendering itself is not fundamentally missing.

The browser also showed:

```text
document.querySelectorAll(".assessment-step").length
0
```

because the current wizard uses:

```text
.wizard-step
```

not:

```text
.assessment-step
```

A current step element was observed as:

```text
class="wizard-step hidden"
```

This confirms the naming mismatch as a source of previous navigation/hiding problems.

---

## 25. Development Principles

### Keep concerns separated

```text
UI
 ↓
Assessment State
 ↓
Assessment Engine
 ↓
API
 ↓
Storage / Integrations
```

Do not put scoring, recommendation rules, storage, and UI navigation into one component.

### Reuse components

Country codes, forms, questions, validation, and API response helpers should have reusable modules.

### Avoid duplicated business logic

A rule should have one authoritative implementation.

### Prefer typed data

Use TypeScript interfaces/types for:

```text
AssessmentAnswers
AssessmentResult
Lead
ContactSubmission
Recommendation
ServiceRecommendation
```

### Preserve backward compatibility

Before renaming storage keys, API endpoints, or R2 object paths, check whether existing production data depends on them.

---

## 26. Immediate Development Priority

The immediate priority is to stabilise the assessment application.

Recommended sequence:

```text
1. Define canonical AssessmentAnswers type
2. Define canonical question IDs
3. Fix AssessmentQuestion
4. Fix single/multiple selection
5. Fix wizard navigation
6. Add validation before Continue
7. Fix localStorage persistence
8. Fix LeadCaptureForm
9. Fix assessment-lead API
10. Fix Results engine
11. Test complete assessment flow
12. Add automated tests
```

Only after the assessment is stable should additional assessment features be added.

---

## 27. Future Evolution

The website can evolve into a broader Ragan Dynamics digital platform:

```text
Marketing Website
       ↓
Assessment
       ↓
Lead Platform
       ↓
Consultation
       ↓
Customer Onboarding
       ↓
GoalFlow / GoalFlowWA
```

The marketing website should remain independently deployable from the future SaaS platform.

Shared concepts may eventually include:

```text
Customer
Company
Lead
Channel
Conversation
Service
Subscription
Assessment
```

but these should not be prematurely coupled to the website.

---

## 28. Change Management Rule

Before making significant changes:

1. Inspect the existing repository.
2. Identify affected files.
3. Check imports and component contracts.
4. Check API consumers.
5. Check storage keys and data structures.
6. Make changes in small batches.
7. Run the build/type checks.
8. Test the affected user journey.
9. Update this `project_state.md`.

Do not assume previously generated code is still the current code.

---

## 29. Current Project Principle

**Ragan Dynamics website = marketing + conversion + lead-generation platform.**

The architecture should remain:

```text
Fast marketing website
        +
Interactive assessment
        +
Structured lead capture
        +
Business-intent routing
        +
Cloudflare-native backend
        +
Reusable foundation for future products
```

## 30. Assessment Submission Boundary

The active Business Velocity form submits to `POST /api/assessment` and stores records under:

```text
assessment/<date>_<uuid>.json
```

The canonical submission options, validation, sanitisation, and operational-efficiency scoring now live in `src/lib/assessment/businessVelocitySubmission.ts`.

Both the browser and API use the shared scoring function, while the API remains authoritative and ignores client-supplied scores. The endpoint validates required lead fields, allowed option values, required assessment sections, and PDPA consent before R2 persistence. Existing endpoint, storage path, and stored lead field names remain unchanged.

Cloudflare request bindings are typed through `App.Locals` in `src/env.d.ts`; runtime code accesses the existing `RD_DATA` binding through `locals.runtime.env`.

## 31. Product Catalogue

The canonical product catalogue is `src/data/products.ts`. Both the homepage product section and `/products` render this shared data through `ProductCard.astro`.

dLogicFlow is included as the omnichannel product for unifying conversations and workflow automation across WhatsApp, Telegram, web chat, and extensible future channels. Product cards expose stable anchors based on their product IDs, including `#dlogicflow`.

The dLogicFlow catalogue CTA links to its external product website at `https://dlogicflow.com`. External product links open in a new tab with `noopener noreferrer`; products without a dedicated website continue to use the internal contact route.

---

The website should be optimized first for:

**traffic → engagement → qualified lead → consultation → customer**
