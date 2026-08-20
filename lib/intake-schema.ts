import { z } from "zod";

import { referenceLinksSchema, uploadSubmissionSchema } from "@/lib/upload-config";

const shortText = z.string().trim().max(160).optional().or(z.literal(""));
const longText = z.string().trim().max(4000).optional().or(z.literal(""));
const list = z.array(z.string().trim().min(1).max(120)).max(30).default([]);

export const intakeSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(2).max(160),
  email: z.email().max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role: shortText,
  industry: shortText,
  location: shortText,
  businessDescription: longText,
  idealCustomer: longText,
  currentWebsite: z.string().trim().max(300).optional().or(z.literal("")),
  projectType: z.string().trim().min(2).max(100),
  primaryGoal: z.string().trim().min(2).max(120),
  projectSummary: longText,
  successLooksLike: longText,
  competitors: longText,
  pages: list,
  contentStatus: shortText,
  assets: list,
  contentNotes: longText,
  style: list,
  colourNotes: longText,
  references: longText,
  avoid: longText,
  features: list,
  featureNotes: longText,
  budget: z.string().trim().min(2).max(80),
  timeline: z.string().trim().min(2).max(80),
  targetDate: z.string().trim().max(40).optional().or(z.literal("")),
  maintenance: shortText,
  referenceLinks: referenceLinksSchema,
  consent: z.literal(true),
  website: z.string().max(0).optional(),
}).and(uploadSubmissionSchema);

export type IntakeInput = z.infer<typeof intakeSchema>;
