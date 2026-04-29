import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string().trim().optional().default(""),
  street: z.string().trim().optional().default(""),
  number: z.string().trim().optional().default(""),
  complement: z.string().trim().optional().default(""),
  neighborhood: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
  state: z.string().trim().toUpperCase().optional().default(""),
});

export const shopSettingsSchema = z.object({
  name: z.string().trim().min(2, "informe o nome").max(120),
  cnpj: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v.replace(/\D/g, "") : ""))
    .refine((v) => v === "" || v.length === 14, "CNPJ deve ter 14 dígitos"),
  phone: z.string().trim().optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine(
      (v) => v === "" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
      "e-mail inválido"
    ),
  primary_color: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine(
      (v) => v === "" || /^#[0-9a-fA-F]{6}$/.test(v),
      "use formato #RRGGBB"
    ),
  logo_url: z.string().trim().url("URL inválida").or(z.literal("")).optional(),
  address: addressSchema,
});

const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;

export const businessHoursSchema = z
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
      (timeRe.test(v.opens_at) && timeRe.test(v.closes_at) && v.opens_at < v.closes_at),
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
