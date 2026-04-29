import { z } from "zod";

export const PLAN_BILLING_CYCLES = ["monthly", "quarterly", "yearly"] as const;

export const planUpsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2, "Slug obrigatório")
    .max(40)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e -"),
  name: z.string().trim().min(1, "Nome obrigatório").max(80),
  description: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  price_cents: z.coerce.number().int().min(0).max(10_000_000),
  billing_cycle: z.enum(PLAN_BILLING_CYCLES).default("monthly"),
  trial_days: z.coerce.number().int().min(0).max(365).default(0),
  max_barbers: z
    .union([
      z.coerce.number().int().min(1).max(1000),
      z.literal("").transform(() => undefined),
    ])
    .optional(),
  max_whatsapp_messages_per_month: z
    .union([
      z.coerce.number().int().min(0).max(1_000_000),
      z.literal("").transform(() => undefined),
    ])
    .optional(),
  features: z.array(z.string().trim().min(1).max(120)).default([]),
  is_active: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).max(9999).default(0),
});

export type PlanUpsertInput = z.infer<typeof planUpsertSchema>;
