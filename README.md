# The Tech Alchemy Lab

The agency website for The Tech Alchemy Lab, rebuilt with the same modern stack used across its full-stack products.

## Current phase

Phase 6 is complete. The validated enquiry form persists submissions to PostgreSQL before sending a Resend notification, and the full flow has been verified with a real database record and delivered email.

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
