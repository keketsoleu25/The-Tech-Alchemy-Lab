# The Tech Alchemy Lab

The agency website for The Tech Alchemy Lab, rebuilt with the same modern stack used across its full-stack products.

## Current phase

Phase 8 replaces dead destinations with verified navigation and contact links, adds real Privacy and Website Terms routes, and connects the new featured-systems anchor across desktop, mobile and footer navigation. Unknown social profiles remain removed rather than being represented by placeholders.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7 with Neon PostgreSQL
- Zod
- Resend
- Vercel

## Local development

```powershell
npm install
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env` and configure the required values before running the migration. Never commit `.env`.

## License

Copyright © 2026 Keketso Leu. All rights reserved. This source code is available for portfolio review only. No permission is granted to copy, modify, distribute, sublicense, or use it commercially without written permission.
