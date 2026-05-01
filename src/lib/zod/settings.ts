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

export const SUPPORTED_TIMEZONES = [
  { value: "America/Sao_Paulo", label: "Brasília (UTC−3)" },
  { value: "America/Cuiaba", label: "Cuiabá / Mato Grosso (UTC−4)" },
  { value: "America/Manaus", label: "Manaus / Amazonas (UTC−4)" },
  { value: "America/Porto_Velho", label: "Porto Velho / Rondônia (UTC−4)" },
  { value: "America/Boa_Vista", label: "Boa Vista / Roraima (UTC−4)" },
  { value: "America/Campo_Grande", label: "Campo Grande / Mato Grosso do Sul (UTC−4)" },
  { value: "America/Rio_Branco", label: "Rio Branco / Acre (UTC−5)" },
  { value: "America/Belem", label: "Belém / Pará (UTC−3)" },
  { value: "America/Fortaleza", label: "Fortaleza / Ceará (UTC−3)" },
  { value: "America/Recife", label: "Recife / Pernambuco (UTC−3)" },
  { value: "America/Bahia", label: "Salvador / Bahia (UTC−3)" },
  { value: "America/Maceio", label: "Maceió / Alagoas (UTC−3)" },
  { value: "America/Araguaina", label: "Araguaína / Tocantins (UTC−3)" },
  { value: "America/Noronha", label: "Fernando de Noronha (UTC−2)" },
] as const;

const timezoneValues = SUPPORTED_TIMEZONES.map((t) => t.value) as [
  string,
  ...string[],
];

export const shopLinkSchema = z.object({
  label: z.string().trim().min(1, "informe o título").max(60),
  url: z
    .string()
    .trim()
    .min(1, "informe a URL")
    .max(2048)
    .refine(
      (v) =>
        /^https?:\/\//i.test(v) ||
        v.startsWith("mailto:") ||
        v.startsWith("tel:"),
      "URL deve começar com http(s)://, mailto: ou tel:",
    ),
});
export type ShopLink = z.infer<typeof shopLinkSchema>;

export const shopPhotoSchema = z.object({
  url: z.string().trim().url("URL inválida").max(2048),
  caption: z.string().trim().max(120).optional().default(""),
});
export type ShopPhoto = z.infer<typeof shopPhotoSchema>;

export const shopSettingsSchema = z.object({
  name: z.string().trim().min(2, "informe o nome").max(120),
  timezone: z.enum(timezoneValues, { message: "fuso horário inválido" }),
  links: z.array(shopLinkSchema).max(12, "no máximo 12 links").default([]),
  gallery: z.array(shopPhotoSchema).max(24, "no máximo 24 fotos").default([]),
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
