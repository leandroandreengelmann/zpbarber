import { z } from "zod";

const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;

export const barberServiceRowSchema = z.object({
  service_id: z.string().uuid(),
  enabled: z.boolean(),
  price_cents: z
    .union([z.literal(""), z.coerce.number().int().min(0)])
    .nullable()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
  duration_minutes: z
    .union([z.literal(""), z.coerce.number().int().min(5).max(600)])
    .nullable()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
  commission_percent: z
    .union([z.literal(""), z.coerce.number().min(0).max(100)])
    .nullable()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
});

export const barberServicesPayloadSchema = z.object({
  rows: z.array(barberServiceRowSchema),
});

export type BarberServiceRow = z.infer<typeof barberServiceRowSchema>;

export const barberProductRowSchema = z.object({
  product_id: z.string().uuid(),
  enabled: z.boolean(),
  commission_percent: z
    .union([z.literal(""), z.coerce.number().min(0).max(100)])
    .nullable()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
});

export const barberProductsPayloadSchema = z.object({
  rows: z.array(barberProductRowSchema),
});

export type BarberProductRow = z.infer<typeof barberProductRowSchema>;

export const barberCommissionSettingsSchema = z.object({
  is_commissioned: z.coerce.boolean(),
});

export const barberWorkingDaySchema = z
  .object({
    weekday: z.coerce.number().int().min(0).max(6),
    is_closed: z.coerce.boolean(),
    opens_at: z.string().trim().optional().default(""),
    closes_at: z.string().trim().optional().default(""),
    break_starts_at: z.string().trim().optional().default(""),
    break_ends_at: z.string().trim().optional().default(""),
  })
  .refine(
    (v) =>
      v.is_closed ||
      (timeRe.test(v.opens_at) &&
        timeRe.test(v.closes_at) &&
        v.opens_at < v.closes_at),
    { message: "informe horários válidos (HH:MM, abertura < fechamento)" }
  )
  .refine(
    (v) => {
      if (v.is_closed) return true;
      const hasStart = v.break_starts_at !== "";
      const hasEnd = v.break_ends_at !== "";
      if (!hasStart && !hasEnd) return true;
      if (!hasStart || !hasEnd) return false;
      return (
        timeRe.test(v.break_starts_at) &&
        timeRe.test(v.break_ends_at) &&
        v.break_starts_at < v.break_ends_at &&
        v.break_starts_at >= v.opens_at &&
        v.break_ends_at <= v.closes_at
      );
    },
    { message: "pausa precisa estar entre abertura e fechamento" }
  );

export const barberTimeOffSchema = z
  .object({
    starts_at: z.string().min(1, "informe o início"),
    ends_at: z.string().min(1, "informe o término"),
    reason: z
      .string()
      .trim()
      .max(200, "máximo 200 caracteres")
      .optional()
      .default(""),
  })
  .refine(
    (v) => {
      const s = new Date(v.starts_at).getTime();
      const e = new Date(v.ends_at).getTime();
      return Number.isFinite(s) && Number.isFinite(e) && e > s;
    },
    { message: "o término precisa ser depois do início" }
  );
