<div align="center">

# ⚗️ The Tech Alchemy Lab

### Turning code into digital gold.

A neon, mobile-first agency website built to present client services, real case studies and full-stack engineering work through one distinctive digital identity.

[![Live Website](https://img.shields.io/badge/LIVE_WEBSITE-00F5FF?style=for-the-badge&logo=vercel&logoColor=000000)](https://the-tech-alchemy-lab.vercel.app/)
[![Next.js](https://img.shields.io/badge/NEXT.JS_16-000000?style=for-the-badge&logo=next.js&logoColor=ffffff)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/POSTGRESQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=ffffff)](https://www.postgresql.org/)

<br />

[![The Tech Alchemy Lab social preview](https://the-tech-alchemy-lab.vercel.app/opengraph-image)](https://the-tech-alchemy-lab.vercel.app/)

**[Explore the live website](https://the-tech-alchemy-lab.vercel.app/)**

</div>

---

## About the project

The Tech Alchemy Lab is a one-person digital agency founded by South African full-stack developer **Keketso Leu**.

This project replaces the agency's original static HTML, CSS and JavaScript website with a production-ready Next.js application. The rebuild closes an important credibility gap: a website advertising Next.js, TypeScript, Prisma and PostgreSQL should demonstrate those technologies in its own implementation.

The result is more than a visual redesign. It is a complete marketing platform with dynamic case studies, responsive pricing, legal pages, production SEO and a contact pipeline that stores every valid enquiry before attempting email delivery.

The established dark alchemy identity was deliberately preserved. Neon cyan, violet and gold accents, oversized typography and language such as *forge*, *transmute* and *alchemise* remain central to the experience.

---

## What the website includes

- Neon, responsive agency landing page
- Mobile-first layouts designed around 320–640px screens
- Services and transparent South African Rand pricing
- Filterable portfolio interface
- Dynamic case-study routes using `/portfolio/[slug]`
- Tech Alchemy CRM flagship showcase
- Tech Alchemy Auth System showcase
- Founder story, values and professional journey
- Clear disclosure that the NWU degree was not completed
- PostgreSQL-backed contact enquiries
- Resend email notifications
- Zod server-side validation
- Honeypot spam protection
- Privacy Notice and Website Terms
- Dynamic Open Graph and Twitter images
- Custom Tech Alchemy favicon
- Sitemap, robots file and web manifest
- Structured metadata for search engines
- Vercel production deployment

---

## Featured engineering work

### Tech Alchemy CRM

A full-stack business operations system connecting clients, projects, tasks, invoices, authentication, PDF generation and email workflows.

**Stack:** Next.js, TypeScript, Auth.js, Prisma, PostgreSQL, Resend and PDFKit.

- [Live CRM](https://tech-alchemy-crm.vercel.app/)
- [CRM source code](https://github.com/keketsoleu25/tech-alchemy-crm)

### Tech Alchemy Auth System

A focused authentication system with credentials and Google sign-in, email verification, password recovery, sessions and role-protected routes.

**Stack:** Next.js, Auth.js, Prisma, Neon PostgreSQL, Zod and bcryptjs.

- [Live Auth System](https://auth-system-cyan-one.vercel.app/)
- [Auth System source code](https://github.com/keketsoleu25/Auth-System)

---

## Technology stack

| Layer          | Technology                                        |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 16 App Router                             |
| Interface      | React 19                                          |
| Language       | TypeScript                                        |
| Styling        | Tailwind CSS 4 and custom CSS                     |
| Validation     | Zod                                               |
| ORM            | Prisma 7                                          |
| Database       | Neon PostgreSQL                                   |
| Email delivery | Resend                                            |
| Hosting        | Vercel                                            |
| SEO            | Next.js Metadata API, JSON-LD, sitemap and robots |
| Code quality   | ESLint and TypeScript                             |

---

## Contact enquiry architecture

The contact form is intentionally designed around data safety.

```mermaid
flowchart TD
    A["Visitor submits enquiry"] --> B["Zod validates input"]
    B --> C["Spam trap is checked"]
    C --> D["Enquiry saved in PostgreSQL"]
    D --> E["Resend notification attempted"]
    E --> F["Success response"]
    E --> G["Saved, but email failed response"]
```

The database write happens before the email request. This means an enquiry is not lost simply because the email provider is unavailable or misconfigured.

If email delivery fails after persistence, the user receives an honest message explaining that the enquiry was saved but the notification could not be sent. The server also logs the provider error for debugging.

That behaviour was not theoretical — it came directly from a real failure encountered during development.

---

# Real engineering problems solved

## 1. The form saved successfully, but no email arrived

The first end-to-end contact test successfully inserted the enquiry into Neon PostgreSQL, but the API returned a `502` response.

Resend reported:

```text
The domain is not verified.
```

The original sender address used a placeholder domain that had never been verified. The form looked correct and the database worked, but the notification layer failed.

### What changed

The development sender was changed to Resend's testing address:

```env
CONTACT_FROM_EMAIL="The Tech Alchemy Lab <onboarding@resend.dev>"
```

This exposed a second restriction: Resend testing mode only permits delivery to the email address associated with the Resend account.

The recipient was corrected, the development server was restarted so the environment variables could reload, and another real enquiry was submitted.

### Result

- The enquiry was stored in PostgreSQL.
- Resend accepted the request.
- The notification arrived in Gmail.
- The email contained the submitted name, service, budget, project description and stored enquiry ID.

The important lesson was that a successful database insert does not prove that an external email integration works. The entire workflow had to be tested end to end.

---

## 2. Email failure could have caused enquiry loss

A weaker implementation would attempt the email first and lose the lead when Resend fails.

The final pipeline does the opposite:

1. Validate the request.
2. Store the enquiry.
3. Attempt the notification.
4. Return an accurate status.

This creates a recoverable failure mode. Even when email delivery fails, the enquiry remains available in the database for manual follow-up.

---

## 3. React reported a hydration mismatch

During local testing, React reported that the server-rendered `<html>` element did not match the client version.

The error showed unexpected attributes:

```text
suppresshydrationwarning="true"
data-qb-installed="true"
```

The application was initially suspected because hydration problems can come from invalid HTML, random values, browser-only conditions or inconsistent server rendering.

However, the unexpected `data-qb-installed` attribute did not exist anywhere in the project.

### Diagnosis

The page was opened in an InPrivate browser window with extensions disabled. The warning disappeared.

### Result

The mismatch was caused by a browser extension modifying the HTML before React hydrated — not by the Next.js application.

This avoided adding unnecessary suppression flags that would have hidden a real problem instead of identifying its source.

---

## 4. Oversized typography broke mobile layouts

The visual identity depends on large, aggressive display typography. On narrow screens, headings such as:

- "Real work for real organisations"
- "Transparent pricing. Zero surprises."
- "Technology is the modern philosopher's stone."
- "Let's forge something worth remembering."

extended beyond the viewport.

Simply hiding horizontal overflow would have concealed the symptom while leaving important text unreadable.

### What changed

- Mobile typography uses controlled `clamp()` values.
- Section headings stay within the viewport.
- Mobile gutters were reduced safely.
- Portfolio filters collapse from multiple columns.
- Pricing cards use one readable column.
- Contact fields stack vertically.
- Form controls use a minimum 16px font size to prevent browser zoom.
- Buttons maintain touch-friendly heights.
- Long browser-style project URLs use ellipsis.
- Cards and descriptions receive smaller mobile padding.

The final responsive pass specifically prioritises screens between **320px and 640px**.

---

## 5. The final letter in "Alchemist" disappeared

After moving the desktop timeline closer to the journey heading, the final **"T."** in:

```text
From developer to Alchemist.
```

was clipped by the narrower grid column.

Moving the timeline back would have undone the layout improvement. Instead, the desktop heading received a more controlled responsive size:

```css
.journey-heading h2 {
  font-size: clamp(3rem, 4.75vw, 4.8rem);
}
```

The full heading now fits while keeping the timeline in its improved position.

---

## 6. Vercel said "Ready," but production returned 404

The final merge into `main` completed successfully and Vercel marked the production deployment as **Ready**.

However, the public domain still returned:

```text
404: NOT_FOUND
```

The GitHub commit was correct. The domain was attached. The Next.js application contained a valid root route. Local linting and production builds also passed.

### Diagnosis

The problem was deployment configuration rather than application routing. The Vercel project needed to recognise the repository root as a Next.js application and deploy the correct build output.

The important settings were verified:

- Framework Preset: Next.js
- Root Directory: repository root
- Build Command: Next.js default
- Output Directory: default
- Production Branch: `main`

The deployment was then rebuilt without relying on the incorrect previous output.

### Result

The production website became available at:

**https://the-tech-alchemy-lab.vercel.app/**

A green deployment badge alone was not treated as proof. The public domain was tested directly before the release was considered complete.

---

## 7. Git history had diverged during phased delivery

The rebuild was delivered incrementally through a dedicated feature branch:

```text
agent/nextjs-foundation
```

Earlier phases had already been merged into `main`, which meant the final feature branch appeared both ahead and behind the production branch.

Force-pushing would have risked replacing valid production history.

### Resolution

The histories were compared first. The commits found only on `main` were confirmed as earlier pull-request merge commits from the same rebuild.

A final pull request was opened and merged normally, preserving both histories:

- [Phase 10 production release — PR #3](https://github.com/keketsoleu25/The-Tech-Alchemy-Lab/pull/3)
- [Production merge commit](https://github.com/keketsoleu25/The-Tech-Alchemy-Lab/commit/e5a022b93c5873626ce99987e08c79a6337c6723)

No force update was used.

---

## 8. A premium pricing rebuild triggered the same hydration false alarm — and confirmed the diagnosis

During a later rebuild of the pricing section — a four-tier premium model with a paid discovery-sprint tier, an ongoing-retainer value statement, and a "clear scope, no surprise invoices" policy block — the browser console reported another hydration mismatch:

```text
suppresshydrationwarning="true"
data-qb-installed="true"
```

Neither attribute existed anywhere in `app/layout.tsx`. This was the same signature identified earlier in problem #3: a browser extension mutating the `<html>` element after the server response but before React hydrates.

### Verification

Rather than re-investigating from scratch, the same diagnostic method was reused: the page was reloaded in an Incognito window with extensions disabled. The warning disappeared, confirming the cause again.

### Why this is worth recording

The value wasn't in fixing anything — there was nothing in the application to fix. The value was in having a repeatable diagnostic step (test in a clean browser profile before touching application code) that turned a second, unrelated occurrence of the same warning into a thirty-second confirmation instead of a fresh debugging session.

---

## Mobile-first decisions

Mobile support was treated as a core requirement rather than a final patch.

The interface includes:

- Single-column pricing below 640px
- Stacked journey heading and timeline
- Stacked contact story and enquiry form
- Readable 16px form fields
- Touch-friendly controls
- Responsive neon typography
- Safe horizontal overflow handling
- Narrow-screen portfolio filters
- Reduced card padding
- Improved text wrapping
- Responsive header and mobile navigation

The design retains the neon personality on small screens without sacrificing access to the actual content.

---

## Portfolio architecture

Portfolio content is stored separately from the visual components and rendered through dynamic routes.

```text
/portfolio/bambanani-day-care
/portfolio/ith-academic-foundation
/portfolio/afromillionial
/portfolio/gtv-fms
```

Each case study includes available information about:

- Client overview
- Project challenge
- Solution
- Technology
- Design process
- Business impact
- Lessons learned
- Live project link

No client statistics, testimonials or business results were invented to make the projects appear stronger.

---

## SEO implementation

The project includes:

- Root metadata
- Page-specific metadata
- Canonical production URL
- Dynamic Open Graph image
- Twitter image
- JSON-LD structured data
- `sitemap.xml`
- `robots.txt`
- Web manifest
- Custom SVG favicon
- Search-friendly project routes
- Descriptive social sharing content

Available endpoints:

```text
/opengraph-image
/twitter-image
/sitemap.xml
/robots.txt
/manifest.webmanifest
/icon.svg
```

---

## Project structure

```text
The-Tech-Alchemy-Lab/
├── app/
│   ├── api/
│   │   └── contact/
│   ├── portfolio/
│   │   └── [slug]/
│   ├── privacy/
│   ├── terms/
│   ├── icon.svg
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── twitter-image.tsx
├── components/
├── data/
├── legacy/
├── lib/
├── prisma/
├── public/
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

The original static implementation is retained inside `legacy/` for reference.

---

## Local development

### Requirements

- Node.js 22 or newer
- npm
- PostgreSQL database
- Resend account

### 1. Clone the repository

```powershell
git clone https://github.com/keketsoleu25/The-Tech-Alchemy-Lab.git
cd "The-Tech-Alchemy-Lab"
```

### 2. Install dependencies

```powershell
npm install
```

### 3. Create the environment file

```powershell
Copy-Item ".env.example" ".env"
```

Configure the following values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
RESEND_API_KEY="re_your_api_key"
CONTACT_FROM_EMAIL="The Tech Alchemy Lab <onboarding@resend.dev>"
CONTACT_TO_EMAIL="your-resend-account-email@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Never commit `.env`.

For production email delivery to arbitrary recipients, use a domain verified through Resend and update `CONTACT_FROM_EMAIL` to an address on that domain.

### 4. Apply the database migrations

```powershell
npm run db:migrate
```

### 5. Start the development server

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Validation

Before production deployment, the project was checked with:

```powershell
npm run lint
npm run build
```

The production build verifies:

- TypeScript compilation
- Static page generation
- Dynamic portfolio routes
- Contact API route
- Metadata image routes
- Legal pages
- Sitemap and robots output

The contact form was also tested with a real PostgreSQL insert and a real delivered email.

---

## Environment variables

| Variable               | Purpose                                   |
| ----------------------- | ------------------------------------------ |
| `DATABASE_URL`         | Neon PostgreSQL connection string         |
| `RESEND_API_KEY`       | Authorises Resend email requests          |
| `CONTACT_FROM_EMAIL`   | Sender displayed on enquiry notifications |
| `CONTACT_TO_EMAIL`     | Address receiving enquiry notifications   |
| `NEXT_PUBLIC_SITE_URL` | Canonical website URL used by metadata    |

Environment variables must be configured separately for local development and Vercel production.

---

## Deployment

The production website is deployed through Vercel's Git integration.

```text
Feature branch → Pull request → main → Vercel production
```

Production URL:

**https://the-tech-alchemy-lab.vercel.app/**

---

## What this project demonstrates

This project demonstrates more than frontend styling.

It shows the ability to:

- Migrate a legacy website into a modern application architecture
- Build reusable React components
- Design dynamic Next.js routes
- Model and persist server-side data
- Integrate an external email provider
- Validate untrusted form input
- Design recoverable failure states
- Debug hydration issues methodically
- Diagnose deployment configuration separately from application code
- Preserve meaningful Git history
- Build responsive interfaces around real mobile constraints
- Ship and verify a production release

The strongest part of the rebuild is not that every step worked immediately. It is that failures were traced across the browser, React, API routes, PostgreSQL, Resend, GitHub and Vercel until the complete system worked end to end.

---

## Future improvements

- Verify a custom Tech Alchemy email domain in Resend
- Add automated API tests for the enquiry pipeline
- Add rate limiting to the contact endpoint
- Add consent-aware analytics
- Complete a formal accessibility audit
- Add production monitoring and error tracking
- Connect a custom business domain

---

## Author

**Keketso Leu**
Full-Stack Developer and founder of The Tech Alchemy Lab
Johannesburg, South Africa

- [GitHub](https://github.com/keketsoleu25)
- [The Tech Alchemy Lab](https://the-tech-alchemy-lab.vercel.app/)
- Email: [techalchemist407@gmail.com](mailto:techalchemist407@gmail.com)

---

## License

Copyright © 2026 Keketso Leu. All rights reserved.

This source code is available for portfolio review only. No permission is granted to copy, modify, distribute, sublicense or use it commercially without written permission.
