import { z } from "zod";

export const PAYMENT_METHODS = [
  "cash",
  "pix",
  "debit",
  "credit",
  "voucher",
  "other",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  pix: "PIX",
  debit: "Débito",
  credit: "Crédito",
  voucher: "Voucher",
  other: "Outro",
};

export const SALE_STATUS = ["open", "paid", "cancelled"] as const;
export type SaleStatus = (typeof SALE_STATUS)[number];

export const CASH_SESSION_STATUS = ["open", "closed"] as const;

export const openSessionSchema = z.object({
  opening_amount_cents: z.coerce.number().int().min(0).default(0),
});

export const closeSessionSchema = z.object({
  session_id: z.string().uuid(),
  closing_amount_cents: z.coerce.number().int().min(0),
  notes: z.string().trim().max(500).optional().default(""),
});

export const saleItemSchema = z.object({
  service_id: z.string().uuid().optional().or(z.literal("")),
  product_id: z.string().uuid().optional().or(z.literal("")),
  description: z.string().trim().min(1, "descrição obrigatória").max(160),
  quantity: z.coerce.number().int().min(1).max(99),
  unit_cents: z.coerce.number().int().min(0),
});

export const salePaymentSchema = z.object({
  method: z.enum(PAYMENT_METHODS),
  amount_cents: z.coerce.number().int().min(1, "valor inválido"),
  paid_by_name: z.string().trim().max(120).optional().default(""),
});

export const createSaleSchema = z.object({
  appointment_id: z.string().uuid().optional().or(z.literal("")),
  client_id: z.string().uuid().optional().or(z.literal("")),
  barber_id: z.string().uuid().optional().or(z.literal("")),
  discount_cents: z.coerce.number().int().min(0).default(0),
  notes: z.string().trim().max(500).optional().default(""),
  items: z.array(saleItemSchema).min(1, "adicione ao menos um item"),
  payments: z.array(salePaymentSchema).min(1, "adicione ao menos um pagamento"),
  redemption_code: z
    .string()
    .trim()
    .toUpperCase()
    .max(16)
    .optional()
    .or(z.literal("")),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
