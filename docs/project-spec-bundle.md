# Ragan Dynamics Website — Project Specification Bundle

# project_spec.md

# Ragan Dynamics Website — Project Specification

## 1. Purpose
Build a fast, conversion-focused Ragan Dynamics website that generates qualified business leads for consulting, automation, cloud, AI, and digital transformation services.

Primary funnel:
Landing → Business Velocity Assessment → Lead Capture → Results/Next Step → Consultation.

## 2. Product Objectives
1. Explain Ragan Dynamics services clearly.
2. Capture business intent.
3. Qualify prospects before sales engagement.
4. Store structured assessment and contact data.
5. Provide actionable assessment results.
6. Support future CRM and automation integration.
7. Maintain a low-cost Cloudflare-native architecture.

## 3. Technology
- Astro 5.x
- TypeScript
- Tailwind CSS
- @astrojs/cloudflare
- Cloudflare Workers
- Cloudflare R2
- Git/GitHub
- Browser localStorage for assessment progress
- API routes under `src/pages/api/`

Astro supports full-stack deployment to Cloudflare Workers, including APIs and on-demand rendering. Cloudflare recommends Workers for new Astro deployments. citeturn0search4turn0search5

## 4. Website Routes
- `/`
- `/services/`
- `/solutions/`
- `/assessment/`
- `/about/`
- `/careers/`
- `/contact/`
- `/privacy/`
- `/terms/`

## 5. Core Modules

### Foundation
- Global layout
- Navigation
- Footer
- SEO
- Responsive design
- Accessibility
- Error handling
- Analytics

### Marketing
- Home
- Services
- Solutions
- About
- Careers
- Contact

### Assessment
- Progress
- Questions
- Answer persistence
- Validation
- Results
- Lead capture

### Lead Management
- Assessment lead API
- Contact API
- Intent classification
- Qualification data
- R2 persistence

## 6. Assessment Flow
Seven logical stages:

1. Business Profile
2. Business Challenges
3. Technology
4. AI Adoption
5. Business Goals
6. Lead Capture
7. Results

### Canonical answer IDs
- `industry`
- `employee_count`
- `biggest_challenges`
- `priority_improvement_area`
- `current_tools`
- `data_location`
- `ai_adoption`
- `ai_desired_outcomes`
- `exploration_timeline`

The answer IDs are the canonical contract between question components, browser state, results logic and API payloads.

## 7. Assessment UX Requirements
- One clear question group at a time.
- Mobile responsive.
- Selected answers must have visible state.
- Continue/Back controls must work consistently.
- Multiple-choice questions support multiple selections.
- Single-choice questions support one selection.
- Assessment state is persisted locally.
- Results are unavailable until lead capture succeeds.
- Reset must clear assessment state.

## 8. Lead Capture
Required:
- Name
- Company
- Business email
- Country code
- Phone/WhatsApp
- Consent

Recommended qualification:
- Transformation/digital budget band
- Priority for the next 3 months
- Preferred engagement/consultation intent

Business email validation should combine syntax validation with a configurable personal/free-email-domain policy. Do not unnecessarily reject legitimate sole-proprietor businesses.

## 9. Contact Enquiry Types
Support:
- Sales
- Technical Support
- Billing
- Service / Customer Support
- Consultation
- Partnerships
- Careers
- General Enquiry

## 10. R2 Storage
Current bucket:
`ragan-dynamics-data`

Binding:
`CONTACTS`

Recommended logical prefixes:
- `contacts/`
- `assessments/`
- `leads/`
- `reports/`
- `audit/`

R2 is accessed from Workers through bindings and supports read/write/list/delete operations. citeturn0search0turn0search2

## 11. Contact Data Contract
```ts
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  countryCode: string;
  phone: string;
  enquiryType: string;
  service?: string;
  message?: string;
  createdAt: string;
}
```

## 12. Assessment Lead Contract
```ts
interface AssessmentLead {
  id: string;
  name: string;
  company: string;
  email: string;
  countryCode: string;
  phone: string;
  consent: boolean;
  answers: Record<string, string | string[]>;
  qualification?: {
    budgetBand?: string;
    nextThreeMonthsPriority?: string;
    timeline?: string;
  };
  leadScore?: number;
  createdAt: string;
}
```

## 13. API Requirements
### POST `/api/assessment-lead`
- Validate JSON.
- Validate required fields.
- Validate email.
- Validate consent.
- Normalize phone.
- Persist assessment/lead data.
- Return JSON.
- Never expose internal errors.

### POST `/api/contact`
- Validate request.
- Validate required contact fields.
- Persist submission to R2.
- Return a safe success/error response.

## 14. Security
- Server-side validation is mandatory.
- Never trust client-side validation.
- Rate-limit public POST endpoints.
- Apply bot protection where appropriate.
- Avoid logging personal data unnecessarily.
- Never expose R2 credentials.
- Use Worker bindings instead of client-side storage credentials.
- Keep secrets in Cloudflare secrets/environment configuration.

Cloudflare bindings provide the Worker with scoped capabilities without exposing underlying credentials to application code. citeturn0search3

## 15. Architecture
```text
Browser
   |
   v
Astro + Tailwind
   |
   +--> Marketing pages
   |
   +--> Assessment UI
   |
   +--> Contact UI
   |
   v
Cloudflare Worker
   |
   +--> Validation
   +--> Business logic
   +--> Lead routing
   |
   v
Cloudflare R2
   |
   +--> contacts
   +--> assessments
   +--> leads
   +--> reports
   +--> audit
```

## 16. Future Architecture
Keep the website modular so that future services can be added without rewriting the foundation:
- CRM integration
- Email notifications
- Lead scoring
- Automated assessment reports
- Appointment booking
- GoalFlowAI/GoalFlowWA integration
- Customer portal
- Service-specific APIs

Cloudflare Service Bindings can later separate backend services without requiring publicly accessible URLs. citeturn0search7

## 17. Non-Functional Requirements
- Responsive from mobile to desktop.
- Fast initial page load.
- Accessible controls.
- SEO metadata on public pages.
- Structured error handling.
- TypeScript strictness where practical.
- No unnecessary client-side JavaScript.
- Cloudflare-compatible runtime APIs.
- Idempotent backend operations where applicable.

## 18. Definition of Done
A feature is complete when:
1. UI works on mobile and desktop.
2. Validation works client and server side.
3. Data contracts are documented.
4. API errors are handled.
5. R2 persistence is verified where required.
6. No console errors remain.
7. Build succeeds.
8. Existing assessment/contact functionality is not regressed.
9. Security implications are reviewed.
10. Relevant documentation is updated.


---

# functional_spec.md

# Ragan Dynamics Website — Functional Specification

## 1. Home
The home page must communicate:
- What Ragan Dynamics does.
- Primary business outcomes.
- Key services.
- Assessment CTA.
- Consultation CTA.

## 2. Services
Services should be grouped into understandable business capabilities rather than only technical terminology.

Initial service categories:
- AI Strategy & Readiness
- Business Process Automation
- Customer Service
- Sales & Marketing
- Business Intelligence
- Microsoft Copilot Solutions
- Cloud & AI Modernisation
- Security & Governance
- Training & Adoption

## 3. Assessment

### Business Profile
Questions:
- Industry
- Employee count

### Business Challenges
Questions:
- Biggest challenges
- Priority improvement area

### Technology
Questions:
- Current business tools
- Data location

### AI Adoption
The component must provide a meaningful question set and persist answers using the canonical `ai_adoption` key.

### Goals
Questions:
- Desired outcomes
- Exploration timeline

### Lead Capture
Collect contact and qualification information.

### Results
Results must consume the same answer model used by the wizard and must not depend on obsolete keys such as `companySize`, `challenges`, `technology`, `goals` or `aiAdoption`.

## 4. Answer Selection
Single selection:
- Save one string.

Multiple selection:
- Save an array of strings.
- Toggle selection on/off.
- Enforce configured maximum where required.

## 5. Navigation
Buttons must use:
- `data-action="next"`
- `data-action="back"`

Wizard sections must use:
- `.wizard-step`
- `data-step="1"` through `data-step="7"`

## 6. Results
Results should provide:
- Business profile summary.
- Main challenge areas.
- Priority improvement area.
- Current technology maturity.
- Adoption readiness.
- Desired outcomes.
- Recommended focus areas.
- Suggested next step.

Results should be useful to the prospect but should not expose internal scoring formulas.

## 7. Contact
Contact form should support:
- enquiry type
- service interest
- contact details
- message
- consent

Qualification fields may be displayed conditionally for sales/consultation enquiries.

## 8. Careers
Provide:
- Careers overview.
- Current opportunities.
- General application route.
- Contact/application CTA.

## 9. Error States
All forms require:
- field-level validation
- submission state
- success state
- failure state
- retry path

## 10. Accessibility
- Keyboard navigable.
- Visible focus states.
- Buttons must have clear labels.
- Form fields must have labels.
- Do not rely on color alone to show selected state.


---

# technical_spec.md

# Ragan Dynamics Website — Technical Specification

## 1. Runtime
Astro application deployed to Cloudflare Workers using the Cloudflare adapter.

Astro's current Cloudflare deployment guidance supports full-stack Astro applications, API routes and on-demand rendering on Workers. citeturn0search4

## 2. Suggested Source Structure
```text
src/
├── components/
│   ├── assessment/
│   ├── contact/
│   ├── layout/
│   └── ui/
├── layouts/
├── lib/
│   ├── assessment/
│   ├── api/
│   ├── validation/
│   ├── leads/
│   └── storage/
├── pages/
│   ├── api/
│   ├── assessment.astro
│   ├── contact.astro
│   └── ...
└── styles/
```

## 3. Component Contracts

### AssessmentQuestion
Required:
- `id`
- `title`
- `options`

Optional:
- `subtitle`
- `multiple`

DOM contract:
```html
<section class="assessment-question" data-question-id="...">
<button class="answer-option" data-answer="...">
```

### Wizard
DOM contract:
```html
<section class="wizard-step" data-step="1">
```

Navigation:
```html
<button data-action="next">
<button data-action="back">
```

## 4. Browser State
Assessment key:
`ragan_ai_assessment`

Example:
```json
{
  "industry": "Retail",
  "employee_count": "11 - 50 employees",
  "biggest_challenges": [
    "Too much manual work",
    "Business processes are slow"
  ],
  "priority_improvement_area": "Customer Service"
}
```

## 5. API Response Pattern
Success:
```json
{
  "success": true,
  "message": "..."
}
```

Failure:
```json
{
  "success": false,
  "error": "..."
}
```

Internal exception details must not be returned.

## 6. Cloudflare Bindings
Example:
```jsonc
{
  "r2_buckets": [
    {
      "binding": "CONTACTS",
      "bucket_name": "ragan-dynamics-data"
    }
  ]
}
```

Cloudflare Workers expose R2 through the configured binding. citeturn0search0

## 7. Storage Keys
```text
contacts/{uuid}.json
assessments/{uuid}.json
leads/{uuid}.json
reports/{uuid}.json
audit/{yyyy}/{mm}/{dd}/{uuid}.json
```

## 8. Validation
Implement shared validators:
- `validateEmail`
- `validateBusinessEmail`
- `validatePhone`
- `validateRequired`
- `validateConsent`
- `validateAssessmentAnswers`

Do not duplicate validation rules across pages.

## 9. Error Handling
Use:
- structured server logs
- safe client messages
- unique request/submission IDs
- no secrets in logs
- no full contact payload logging in production

## 10. Deployment
Recommended:
```bash
npm run build
npx wrangler deploy
```

For CI/CD, build and deploy can be configured through Cloudflare Workers Builds. citeturn0search4

## 11. Testing
Minimum:
- TypeScript/build test
- Assessment navigation test
- Single-answer selection test
- Multi-answer selection test
- localStorage persistence test
- lead API validation test
- contact API validation test
- R2 persistence test
- mobile UI smoke test


---

# data_spec.md

# Ragan Dynamics Website — Data Specification

## 1. Principles
- Structured JSON for MVP.
- Stable IDs.
- ISO 8601 timestamps.
- Explicit schema versions for evolving payloads.
- Separate assessment, lead, contact and report records.
- Avoid storing unnecessary personal information.

## 2. Assessment Record
```ts
interface AssessmentRecord {
  id: string;
  schemaVersion: string;
  answers: Record<string, string | string[]>;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}
```

## 3. Lead Record
```ts
interface LeadRecord {
  id: string;
  schemaVersion: string;
  source: "assessment" | "contact";
  name: string;
  company: string;
  email: string;
  countryCode: string;
  phone: string;
  enquiryType?: string;
  service?: string;
  answers?: Record<string, string | string[]>;
  budgetBand?: string;
  nextThreeMonthsPriority?: string;
  timeline?: string;
  leadScore?: number;
  consent: boolean;
  createdAt: string;
}
```

## 4. Report Record
```ts
interface AssessmentReport {
  id: string;
  leadId: string;
  schemaVersion: string;
  summary: string;
  priorities: string[];
  recommendations: string[];
  nextStep: string;
  createdAt: string;
}
```

## 5. Data Relationships
```text
Assessment
    |
    v
Lead
    |
    +--> Report
    |
    +--> Audit events
```

## 6. Data Retention
Retention periods must be defined before production launch according to business, privacy and regulatory requirements.

## 7. Schema Evolution
Any breaking change must:
1. Increment `schemaVersion`.
2. Update project documentation.
3. Update API validation.
4. Update results logic.
5. Add migration/backward compatibility where required.


---

# api_spec.md

# Ragan Dynamics Website — API Specification

## POST /api/assessment-lead

### Purpose
Persist a completed assessment and qualified lead.

### Request
```json
{
  "name": "string",
  "company": "string",
  "email": "business@example.com",
  "countryCode": "+65",
  "phone": "string",
  "consent": true,
  "answers": {}
}
```

### Validation
- Name required.
- Company required.
- Business email required.
- Phone required.
- Consent must be true.
- Answers must be a valid object.
- Known answer IDs should be validated.

### Response
HTTP 200/201:
```json
{
  "success": true,
  "message": "Assessment submitted successfully"
}
```

## POST /api/contact

### Request
```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "countryCode": "+65",
  "phone": "string",
  "enquiryType": "Consultation",
  "service": "Business Process Automation",
  "message": "string"
}
```

### Response
```json
{
  "success": true,
  "message": "Contact received"
}
```

## Security
- POST only.
- Content-Type validation.
- Payload size limit.
- Server-side schema validation.
- Rate limiting.
- Bot/spam controls.
- Safe errors.
- Audit important state changes.

## Future APIs
Potential:
- `GET /api/assessment/report/:id`
- `POST /api/appointments`
- `POST /api/notifications`
- `POST /api/crm/leads`
- `GET /api/admin/leads`

Admin APIs require authentication and authorization and must never be exposed as public anonymous endpoints.


---

# acceptance_criteria.md

# Ragan Dynamics Website — Acceptance Criteria

## Assessment
- [ ] User can start assessment.
- [ ] Progress indicator updates correctly.
- [ ] Single-choice options can be selected.
- [ ] Multiple-choice options can be toggled.
- [ ] Selected state is visually clear.
- [ ] Answers persist across navigation.
- [ ] Answers persist on page refresh where intended.
- [ ] Continue works.
- [ ] Back works.
- [ ] Reset works.
- [ ] Lead capture appears after assessment questions.
- [ ] Results appear only after successful lead capture.

## Lead Capture
- [ ] Required fields are validated.
- [ ] Business email validation works.
- [ ] Phone country code is captured.
- [ ] Consent is mandatory.
- [ ] Submission state is displayed.
- [ ] Successful submission is persisted.
- [ ] API failure is recoverable.

## Contact
- [ ] Enquiry type can be selected.
- [ ] Contact details validate.
- [ ] Submission persists to R2.
- [ ] Success message is shown.
- [ ] Error message is shown without internal details.

## Security
- [ ] Public APIs have abuse protection.
- [ ] No credentials are exposed in browser code.
- [ ] R2 is accessed through Worker bindings.
- [ ] Sensitive payloads are not unnecessarily logged.

## Deployment
- [ ] `npm run build` succeeds.
- [ ] Wrangler deployment succeeds.
- [ ] Production R2 binding is available.
- [ ] Production APIs return expected responses.
- [ ] No critical browser console errors.


---

# development_plan.md

# Ragan Dynamics Website — Development Plan

## Phase 1 — Foundation
1. Confirm Astro/Cloudflare configuration.
2. Standardize layout and navigation.
3. Standardize shared UI components.
4. Establish validation utilities.
5. Establish storage utilities.
6. Establish API response utilities.

## Phase 2 — Assessment Stabilisation
1. Fix all canonical answer IDs.
2. Implement `AIAdoptionStep`.
3. Standardize `data-action`.
4. Standardize multiple-selection behaviour.
5. Refactor results to canonical answer IDs.
6. Add validation before Continue.
7. Verify localStorage persistence.
8. Verify lead capture event flow.

## Phase 3 — Qualification
1. Add budget bands.
2. Add next-three-month priority.
3. Add timeline/urgency.
4. Implement lead scoring.
5. Store qualification data.
6. Generate assessment recommendations.

## Phase 4 — Contact
1. Standardize enquiry types.
2. Add complete country-code dataset.
3. Validate business email.
4. Add routing metadata.
5. Persist to R2.
6. Add notification integration.

## Phase 5 — Production Hardening
1. Rate limiting.
2. Bot protection.
3. Security review.
4. Privacy/retention review.
5. Observability.
6. Backup/export strategy.
7. CI/CD.
8. Production smoke tests.

## Phase 6 — Growth
1. CRM integration.
2. Appointment booking.
3. Automated reports.
4. Lead nurturing.
5. Customer portal.
6. GoalFlow/GoalFlowWA integration.

## Priority
P0 = blocking
P1 = MVP
P2 = post-MVP
P3 = future

Current P0:
- Assessment navigation contract
- Canonical answer model
- Lead capture API
- R2 persistence

Current P1:
- Qualification
- Results
- Contact routing
- Security hardening


---

# codex_instructions.md

# Ragan Dynamics Website — Codex Instructions

## Objective
Implement the website according to the project specification without breaking existing functionality.

## Rules
1. Read `project_spec.md` before making architectural changes.
2. Read `functional_spec.md` before modifying UI behaviour.
3. Read `technical_spec.md` before modifying APIs, storage or Cloudflare configuration.
4. Treat canonical answer IDs as stable contracts.
5. Do not rename assessment IDs without updating all consumers.
6. Do not introduce a second answer-storage model.
7. Do not bypass server-side validation.
8. Do not expose secrets or R2 credentials.
9. Do not remove existing working functionality without documenting the reason.
10. Prefer small, testable changes.
11. Run build/tests after meaningful changes.
12. Update documentation when architecture or contracts change.

## Change Safety Gate
Before modifying data schemas, APIs or storage:
- Identify affected files.
- Identify affected data fields.
- Determine whether existing stored data becomes unreadable.
- Determine whether old clients continue to work.
- Determine whether rollback is possible.
- Update schema version if necessary.

## Assessment Contract
Required:
```text
.wizard-step
data-step
.assessment-question
data-question-id
.answer-option
data-answer
data-action
```

## Storage Contract
Use the configured R2 binding:
`CONTACTS`

Bucket:
`ragan-dynamics-data`

Do not create a new bucket or binding unless explicitly required.

## Definition of Done
A change is complete only when:
- Code compiles.
- Build passes.
- Existing flows still work.
- API contracts remain consistent.
- Security implications are reviewed.
- Documentation is updated where required.
