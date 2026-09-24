# AGENTS.md

## Ragan Dynamics Website — AI Coding Agent Instructions

### 1. Project Overview

Ragan Dynamics is a Singapore-based AI consultancy website focused on helping SMEs adopt AI, automation, and digital transformation solutions.

The website is primarily a marketing and lead-generation platform.

Primary business objective:

> Generate qualified business enquiries and convert website visitors into strategy-session conversations.

The website should communicate business outcomes rather than technical complexity.

---

## 2. Technology Stack

### Frontend

- Astro
- TypeScript
- HTML
- CSS
- Tailwind CSS where already used
- Responsive design
- Mobile-first principles

### Hosting / Infrastructure

- Cloudflare Pages / Cloudflare Workers
- Cloudflare R2 for persistent application data where configured

### Runtime

- Node.js
- npm

Do not introduce another frontend framework unless explicitly requested.

Do not migrate Astro to Next.js unless explicitly requested.

---

## 3. Architecture Principles

Maintain a simple, modular architecture.

Preferred structure:

```text
src/
├── components/
│   ├── assessment/
│   ├── common/
│   ├── layout/
│   └── ...
├── layouts/
├── lib/
│   ├── assessment/
│   └── ...
├── pages/
│   ├── api/
│   └── ...
└── styles/
```

### Rules

1. Keep business logic out of UI components where practical.
2. Reusable business logic belongs under `src/lib`.
3. API endpoints belong under `src/pages/api`.
4. Reusable UI belongs under `src/components`.
5. Page-specific orchestration belongs in `src/pages`.
6. Do not duplicate business logic across components.
7. Prefer small, composable components.
8. Preserve existing architecture before introducing new abstractions.

---

# 4. Current Product Direction

The website currently prioritizes:

1. Business Velocity Discovery
2. AI transformation consulting
3. AI automation
4. AI chatbot / conversational solutions
5. AI training
6. Qualified lead capture
7. Executive strategy-session conversion

The website should not become a generic technology showcase.

Every major page should support one or more of:

- Establishing credibility
- Explaining business value
- Identifying customer pain points
- Capturing leads
- Moving prospects toward a consultation

---

# 5. Business Velocity Assessment

The assessment is a major lead-generation component.

Current funnel:

```text
Landing Page
     ↓
Business Velocity Discovery
     ↓
8–10 Questions
     ↓
Contact Details
     ↓
Thank You
     ↓
Executive Strategy Session CTA
```

The assessment should take approximately 2–3 minutes.

Do not unnecessarily increase the number of questions.

The initial objective is lead qualification and understanding customer intent.

Do not introduce complex dynamic scoring unless explicitly requested.

---

# 6. Assessment Architecture

Assessment-related functionality belongs under:

```text
src/components/assessment/
src/lib/assessment/
src/pages/assessment.astro
```

Expected conceptual structure:

```text
src/components/assessment/
├── AssessmentHero.astro
├── AssessmentWizard.astro
├── AssessmentStep.astro
├── AssessmentQuestion.astro
└── ...

src/lib/assessment/
├── questions.ts
├── scoring.ts
└── ...
```

Keep question definitions separate from presentation components.

For example:

```text
questions.ts
      ↓
AssessmentWizard
      ↓
AssessmentStep
      ↓
AssessmentQuestion
```

Do not hard-code individual assessment questions inside UI components unless explicitly required.

---

# 7. Assessment State

Assessment state should remain isolated from unrelated application state.

The existing browser persistence mechanism uses:

```text
ragan_ai_assessment
```

When modifying assessment state:

- Preserve backward compatibility where possible.
- Do not silently change the storage key.
- Validate persisted data before using it.
- Handle missing or corrupted local storage gracefully.
- Avoid losing user-entered assessment responses during navigation.

---

# 8. Lead Capture

Lead capture is business-critical.

Current contact information includes:

- Name
- Email
- Company
- Country code
- Phone
- Service
- Message

Default country code:

```text
+65
```

Current service options include:

- AI Consulting
- AI Automation
- AI Chatbot
- AI Training

Do not remove existing lead fields without explicit approval.

---

# 9. Contact API / R2

Contact submissions may be persisted to Cloudflare R2.

Current R2 concept:

```text
Bucket: CONTACTS
Bucket name:
ragan-dynamics-data
```

Contact records use a generated identifier and are stored as JSON.

Example conceptual structure:

```text
contacts/
└── <uuid>.json
```

Do not replace R2 storage with another database without explicit approval.

Before changing the contact persistence implementation:

1. Understand the existing Cloudflare binding.
2. Verify the API route.
3. Verify the R2 object path.
4. Verify the JSON structure.
5. Verify error handling.
6. Verify CORS behavior.
7. Test the production build.

---

# 10. API Rules

API endpoints should:

- Validate input.
- Return appropriate HTTP status codes.
- Avoid exposing secrets.
- Avoid logging sensitive customer information unnecessarily.
- Handle malformed requests safely.
- Return predictable JSON responses.

Never place API keys, tokens, passwords, or secrets in:

- `.astro` files
- client-side JavaScript
- HTML
- public configuration
- Git commits

Use Cloudflare environment bindings or appropriate server-side environment variables.

---

# 11. Cloudflare Rules

The production deployment targets Cloudflare.

Before modifying:

```text
astro.config.mjs
wrangler configuration
Cloudflare bindings
R2 configuration
environment variables
```

check how the existing deployment works.

Do not blindly introduce Cloudflare-specific code into client-side components.

Distinguish clearly between:

```text
Browser/client runtime
Server/API runtime
Cloudflare runtime
Build-time configuration
```

---

# 12. UI / UX Principles

Use a professional B2B consulting design.

Preferred characteristics:

- Clean
- Modern
- Trustworthy
- Business-focused
- Responsive
- Fast
- Accessible

Existing visual direction favors a blue-based professional theme.

Do not introduce excessive animations.

Do not redesign unrelated pages while implementing a feature.

Maintain consistency across:

- Typography
- Buttons
- Forms
- Cards
- Spacing
- Navigation
- Footer
- Responsive behavior

---

# 13. Responsive Design

The website must work across:

- Desktop
- Laptop
- Tablet
- Mobile

Pay particular attention to layouts around:

```text
1024px
768px
480px
```

Do not solve mobile problems by hiding important business functionality.

Forms and assessment controls must remain usable on touch devices.

---

# 14. Accessibility

All new UI must consider:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Accessible form controls
- Sufficient contrast
- Screen-reader-friendly error messages

Do not rely solely on color to communicate state.

Radio buttons, checkboxes, buttons, and form fields must have clear interactive states.

---

# 15. Security

Never commit:

```text
.env
.env.*
API keys
tokens
passwords
private credentials
Cloudflare secrets
```

Do not expose server-side secrets to the browser.

Validate all externally supplied data.

Treat contact-form submissions as untrusted input.

Do not trust client-side validation alone.

---

# 16. Data Protection

The website collects customer/business information.

Avoid unnecessary collection of personal information.

Do not log complete:

- phone numbers
- email addresses
- assessment responses
- API credentials
- authentication tokens

unless explicitly required for debugging.

When debugging production issues, prefer identifiers or redacted values.

---

# 17. Coding Standards

Use TypeScript for application logic.

Prefer:

```text
const
```

over:

```text
let
```

when mutation is unnecessary.

Use explicit types for important business objects.

Avoid:

```text
any
```

unless there is a documented reason.

Prefer clear names over abbreviated names.

Example:

```ts
const assessmentResponses = ...
```

instead of:

```ts
const ar = ...
```

---

# 18. Component Rules

Components should have a single clear responsibility.

Bad:

```text
AssessmentWizard
    ├── question definitions
    ├── scoring engine
    ├── API implementation
    ├── R2 persistence
    └── complete UI
```

Preferred:

```text
AssessmentWizard
        ↓
assessment questions
        ↓
assessment logic
        ↓
API
        ↓
R2
```

Keep presentation and business logic separated where practical.

---

# 19. API / Business Logic Separation

Do not put database/R2 logic directly inside UI components.

For example:

```text
Component
   ↓
API
   ↓
Persistence
```

rather than:

```text
Component
   ↓
R2
```

---

# 20. Error Handling

Every new API or data operation must consider:

- Missing input
- Invalid input
- Network failure
- Cloudflare failure
- R2 failure
- Unexpected server errors

User-facing errors should be understandable.

Do not expose stack traces or internal infrastructure information to users.

---

# 21. Testing Requirements

Before declaring a feature complete:

### Development

Run:

```bash
npm install
npm run dev
```

when dependencies or runtime behavior need validation.

### Production build

Run:

```bash
npm run build
```

The build must complete successfully.

### Functional testing

For affected functionality verify:

- Desktop
- Mobile
- Form validation
- Navigation
- API calls
- Error states
- Persistence
- Responsive layout

Do not assume a successful TypeScript/build check means the feature is functionally correct.

---

# 22. Change Safety Gate

Before modifying existing functionality:

1. Identify affected files.
2. Identify dependencies.
3. Identify API contracts.
4. Identify data structures.
5. Identify Cloudflare bindings.
6. Identify potential backward-compatibility issues.
7. Make the smallest safe change.
8. Build the project.
9. Test affected functionality.

For database, R2, API, or data-model changes, explicitly assess:

```text
Could existing data be lost?
Could existing records become unreadable?
Could an API contract break?
Could existing users lose submitted data?
Could deployment configuration break?
```

If the answer is potentially yes, stop and document the risk before proceeding.

---

# 23. Do Not Make Unrequested Changes

An agent must not:

- Rewrite the entire application
- Change frameworks
- Replace Astro
- Replace Cloudflare
- Replace R2
- Change branding
- Remove existing features
- Modify unrelated components
- Introduce unnecessary dependencies
- Change public API contracts without approval

Prefer incremental changes.

---

# 24. Dependency Rules

Before adding a dependency, determine whether the functionality can reasonably be implemented using:

1. Existing project dependencies
2. Native browser APIs
3. Existing Astro functionality
4. Existing TypeScript utilities

Only add a new dependency when there is a clear benefit.

After adding a dependency:

- Update `package.json`
- Update the lock file
- Verify the production build
- Check for dependency conflicts

---

# 25. Environment Variables

Never hard-code secrets.

Use appropriate environment configuration for:

```text
API keys
R2 credentials/bindings
LLM credentials
third-party integrations
```

Client-side variables must only contain values that are safe to expose publicly.

---

# 26. Git Rules

Before committing:

```bash
git status
```

Review:

```bash
git diff
```

Do not commit:

```text
.env
credentials
temporary files
debug output
generated secrets
local configuration
```

Keep commits focused on the requested change.

---

# 27. Documentation

When architecture or behavior changes materially, update:

```text
project_state.md
```

If a new architectural decision is introduced, document:

- What changed
- Why it changed
- Impact
- Dependencies
- Migration considerations

Do not allow `project_state.md` to become stale.

---

# 28. Agent Workflow

For every task:

### Step 1 — Understand

Inspect:

```text
project_state.md
AGENTS.md
package.json
relevant source files
```

### Step 2 — Plan

Identify:

```text
files to change
dependencies
risks
testing requirements
```

### Step 3 — Implement

Make the smallest change that satisfies the requirement.

### Step 4 — Validate

Run:

```bash
npm run build
```

and appropriate functional tests.

### Step 5 — Review

Check:

```text
security
responsiveness
accessibility
architecture
backward compatibility
unintended changes
```

### Step 6 — Document

Update `project_state.md` if the project state has materially changed.

---

# 29. Priority Order

When requirements conflict, use this priority:

1. Security
2. Data integrity
3. Existing production functionality
4. Explicit user requirements
5. Architecture consistency
6. Accessibility
7. Performance
8. Maintainability
9. Visual improvements

Never sacrifice data integrity or security for convenience.

---

# 30. Definition of Done

A task is complete only when:

- Requested functionality is implemented.
- Existing functionality still works.
- Architecture remains consistent.
- No secrets are exposed.
- Input is validated.
- Error handling exists.
- Responsive behavior is verified.
- `npm run build` succeeds.
- Relevant documentation is updated.
- No unrelated files are unnecessarily changed.

---

## Final Agent Instruction

Before changing code, understand the existing implementation.

Do not guess.

Do not rewrite working systems unnecessarily.

Preserve existing behavior unless the requirement explicitly changes it.

When uncertain about a potentially destructive or architectural change, stop and explain the risk before proceeding.