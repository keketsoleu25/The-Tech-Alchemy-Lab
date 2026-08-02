# The Tech Alchemy Lab

The agency website for The Tech Alchemy Lab, rebuilt with the same modern stack used across its full-stack products.

## Current phase

Phase 7 adds one consolidated featured-systems showcase: Tech Alchemy CRM is presented as the flagship full-stack product, with the Tech Alchemy Auth System retained as focused proof of authentication and authorization engineering. Phase 6 remains verified end to end with a real PostgreSQL record and delivered Resend email.

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
