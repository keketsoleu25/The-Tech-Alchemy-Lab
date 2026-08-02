# The Tech Alchemy Lab

The agency website for The Tech Alchemy Lab, rebuilt with the same modern stack used across its full-stack products.

## Current phase

The pre-deployment responsive quality pass prioritises 320–640px screens: long display headings now wrap inside the viewport, the timeline moves closer on desktop and stacks beneath its heading on mobile, pricing cards use a single readable column, and the contact story and form flow vertically with touch-friendly 16px inputs.

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
