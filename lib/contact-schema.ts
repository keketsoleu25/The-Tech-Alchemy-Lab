import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.enum(["website", "ecommerce", "branding", "mobile", "strategy", "retainer", "other"]),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k-plus", "not-sure"]),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
