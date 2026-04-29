import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(2, "informe o nome").max(120),
  duration_minutes: z.coerce.number().int().min(5, "min 5").max(600, "max 600"),
  price_cents: z.coerce.number().int().min(0, "preço inválido"),
  commission_percent: z.coerce.number().min(0).max(100),
  is_active: z.coerce.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const productSchema = z.object({
  name: z.string().trim().min(2, "informe o nome").max(120),
  sku: z.string().trim().max(60).optional().default(""),
  price_cents: z.coerce.number().int().min(0, "preço inválido"),
  cost_cents: z.coerce.number().int().min(0, "custo inválido"),
  stock_qty: z.coerce.number().int(),
  stock_min: z.coerce.number().int().min(0, "mínimo inválido"),
  commission_percent: z.coerce.number().min(0).max(100),
  is_active: z.coerce.boolean(),
});

export type ProductInput = z.infer<typeof productSchema>;
