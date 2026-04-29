import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .max(500)
  .optional()
  .or(z.literal("").transform(() => undefined));

export const platformSettingsSchema = z.object({
  app_url: z
    .string()
    .trim()
    .url("URL inválida (use https://...)")
    .max(500)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  brand_name: z.string().trim().min(1, "Nome obrigatório").max(80),
  support_email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(200)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  support_whatsapp: optionalString,
  default_trial_days: z.coerce.number().int().min(0).max(365),
  default_primary_color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Cor hex no formato #RRGGBB")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  maintenance_mode: z.coerce.boolean().default(false),
  maintenance_message: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  dunning_days_to_suspend: z.coerce.number().int().min(0).max(120),
});

export type PlatformSettingsInput = z.infer<typeof platformSettingsSchema>;
