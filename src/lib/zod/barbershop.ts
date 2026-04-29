import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "slug muito curto")
  .max(40, "slug muito longo")
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "use apenas letras, números e hífens");

export const tenantStatusSchema = z.enum([
  "trial",
  "active",
  "suspended",
  "cancelled",
]);

export const barbershopSchema = z.object({
  slug: slugSchema,
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
  status: tenantStatusSchema,
  primary_color: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine(
      (v) => v === "" || /^#[0-9a-fA-F]{6}$/.test(v),
      "use formato #RRGGBB"
    ),
  trial_ends_at: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine(
      (v) => v === "" || !Number.isNaN(Date.parse(v)),
      "data inválida"
    ),
});

export type BarbershopInput = z.infer<typeof barbershopSchema>;

export const assignMemberSchema = z.object({
  email: z.string().trim().toLowerCase().email("e-mail inválido"),
  role: z.enum(["gestor", "recepcionista", "barbeiro"]),
});
