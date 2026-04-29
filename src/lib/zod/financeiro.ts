import { z } from "zod";
import { PAYMENT_METHODS } from "./caixa";

export const CATEGORY_COLORS = [
  "gray",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "pink",
] as const;
export type CategoryColor = (typeof CATEGORY_COLORS)[number];

export const CATEGORY_COLOR_CLASS: Record<CategoryColor, string> = {
  gray: "bg-[var(--color-gray-100)] text-[var(--color-gray-700)] border-[var(--color-gray-200)]",
  blue: "bg-[var(--color-blue-50)] text-[var(--color-blue-700)] border-[var(--color-blue-200)]",
  green:
    "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
  yellow:
    "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
  orange:
    "bg-[var(--color-orange-50)] text-[var(--color-orange-700)] border-[var(--color-orange-200)]",
  red: "bg-[var(--color-error-50)] text-[var(--color-error-700)] border-[var(--color-error-200)]",
  purple:
    "bg-[var(--color-purple-50)] text-[var(--color-purple-700)] border-[var(--color-purple-200)]",
  pink: "bg-[var(--color-pink-50)] text-[var(--color-pink-700)] border-[var(--color-pink-200)]",
};

const optionalUuid = z
  .string()
  .trim()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().uuid().optional());

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "data inválida");

export const expenseCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "nome obrigatório").max(60),
  color: z.enum(CATEGORY_COLORS).default("gray"),
  is_active: z.coerce.boolean().default(true),
});

export const deleteExpenseCategorySchema = z.object({
  id: z.string().uuid(),
});

export const expenseCreateSchema = z.object({
  category_id: optionalUuid,
  description: z.string().trim().min(2, "descrição obrigatória").max(160),
  amount_cents: z.coerce.number().int().min(1, "valor obrigatório"),
  due_date: isoDateSchema,
  notes: z.string().trim().max(500).optional().default(""),
  pay_now: z.coerce.boolean().default(false),
  payment_method: z.enum(PAYMENT_METHODS).optional(),
  paid_at: isoDateSchema.optional(),
});

export const expenseUpdateSchema = expenseCreateSchema.extend({
  id: z.string().uuid(),
});

export const expensePaySchema = z.object({
  id: z.string().uuid(),
  payment_method: z.enum(PAYMENT_METHODS),
  paid_at: isoDateSchema,
});

export const expenseUnpaySchema = z.object({
  id: z.string().uuid(),
});

export const expenseDeleteSchema = z.object({
  id: z.string().uuid(),
});

export const receivableCreateSchema = z.object({
  client_id: optionalUuid,
  description: z.string().trim().min(2, "descrição obrigatória").max(160),
  amount_cents: z.coerce.number().int().min(1, "valor obrigatório"),
  due_date: isoDateSchema,
  notes: z.string().trim().max(500).optional().default(""),
  receive_now: z.coerce.boolean().default(false),
  payment_method: z.enum(PAYMENT_METHODS).optional(),
  received_at: isoDateSchema.optional(),
});

export const receivableUpdateSchema = receivableCreateSchema.extend({
  id: z.string().uuid(),
});

export const receivableReceiveSchema = z.object({
  id: z.string().uuid(),
  payment_method: z.enum(PAYMENT_METHODS),
  received_at: isoDateSchema,
});

export const receivableUnreceiveSchema = z.object({
  id: z.string().uuid(),
});

export const receivableDeleteSchema = z.object({
  id: z.string().uuid(),
});

export const cashMovementSchema = z.object({
  type: z.enum(["in", "out"]),
  amount_cents: z.coerce.number().int().min(1, "valor obrigatório"),
  description: z.string().trim().max(200).optional().default(""),
});

export const deleteCashMovementSchema = z.object({
  id: z.string().uuid(),
});

export type ExpenseCategoryInput = z.infer<typeof expenseCategorySchema>;
export type ExpenseCreateInput = z.infer<typeof expenseCreateSchema>;
export type ReceivableCreateInput = z.infer<typeof receivableCreateSchema>;
export type CashMovementInput = z.infer<typeof cashMovementSchema>;
