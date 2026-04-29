import { z } from "zod";

export const WHATSAPP_TRIGGERS = [
  "manual",
  "appointment_confirmation",
  "appointment_reminder",
  "post_service",
  "birthday",
  "loyalty_redemption",
] as const;
export type WhatsappTrigger = (typeof WHATSAPP_TRIGGERS)[number];

export const WHATSAPP_TRIGGER_LABEL: Record<WhatsappTrigger, string> = {
  manual: "Manual",
  appointment_confirmation: "Confirmação de agendamento",
  appointment_reminder: "Lembrete 24h antes",
  post_service: "Pós-atendimento",
  birthday: "Aniversário",
  loyalty_redemption: "Resgate de fidelidade",
};

export const WHATSAPP_CONNECTION_STATUS = [
  "disconnected",
  "qr_pending",
  "connecting",
  "connected",
  "error",
] as const;
export type WhatsappConnectionStatus =
  (typeof WHATSAPP_CONNECTION_STATUS)[number];

export const whatsappSettingsSchema = z.object({
  trigger_confirmation: z.coerce.boolean().default(true),
  trigger_reminder: z.coerce.boolean().default(true),
  trigger_reminder_hours_before: z.coerce.number().int().min(1).max(72).default(24),
  trigger_post_service: z.coerce.boolean().default(true),
  trigger_post_service_delay_hours: z.coerce.number().int().min(0).max(48).default(2),
  trigger_birthday: z.coerce.boolean().default(true),
  trigger_birthday_hour: z.coerce.number().int().min(0).max(23).default(9),
  business_hours_start: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "horário inválido")
    .default("08:00"),
  business_hours_end: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "horário inválido")
    .default("20:00"),
  business_hours_only: z.coerce.boolean().default(true),
});
export type WhatsappSettingsInput = z.infer<typeof whatsappSettingsSchema>;

export const whatsappTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2, "slug obrigatório")
    .max(60)
    .regex(/^[a-z0-9_]+$/, "use apenas letras minúsculas, números e _"),
  trigger: z.enum(WHATSAPP_TRIGGERS),
  name: z.string().trim().min(2, "nome obrigatório").max(120),
  body: z.string().trim().min(2, "mensagem obrigatória").max(2000),
  is_active: z.coerce.boolean().default(true),
});
export type WhatsappTemplateInput = z.infer<typeof whatsappTemplateSchema>;

export const whatsappTemplateDeleteSchema = z.object({ id: z.string().uuid() });

export const sendManualMessageSchema = z.object({
  client_id: z.string().uuid().optional(),
  to_phone: z.string().trim().min(8).max(20).optional(),
  body: z.string().trim().min(1).max(2000),
}).refine((d) => !!(d.client_id || d.to_phone), {
  message: "informe o cliente ou um telefone",
  path: ["to_phone"],
});

export const TEMPLATE_VARIABLES: Record<WhatsappTrigger, string[]> = {
  manual: ["cliente", "barbearia"],
  appointment_confirmation: [
    "cliente",
    "data",
    "hora",
    "barbeiro",
    "servicos",
    "valor",
    "barbearia",
  ],
  appointment_reminder: [
    "cliente",
    "data",
    "hora",
    "barbeiro",
    "servicos",
    "barbearia",
  ],
  post_service: ["cliente", "barbeiro", "link_avaliacao", "barbearia"],
  birthday: ["cliente", "pontos_bonus", "barbearia"],
  loyalty_redemption: ["cliente", "recompensa", "codigo", "barbearia"],
};
