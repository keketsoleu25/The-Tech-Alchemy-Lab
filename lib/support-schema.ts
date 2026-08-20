import { z } from "zod";

import { optionalWebUrlSchema, referenceLinksSchema, uploadSubmissionSchema } from "@/lib/upload-config";

export const supportSchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(2).max(160),
  email: z.email().max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectName: z.string().trim().max(160).optional().or(z.literal("")),
  requestType: z.enum(["website", "content", "email", "domain", "billing", "access", "other"]),
  priority: z.enum(["normal", "high", "urgent"]),
  subject: z.string().trim().min(4).max(180),
  description: z.string().trim().min(20).max(5000),
  affectedUrl: optionalWebUrlSchema,
  referenceLinks: referenceLinksSchema,
  consent: z.literal(true),
  website: z.string().max(0).optional(),
}).and(uploadSubmissionSchema);

export type SupportInput = z.infer<typeof supportSchema>;
