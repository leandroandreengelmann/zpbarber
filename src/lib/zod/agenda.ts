import { z } from "zod";

export const clientSchema = z.object({
  full_name: z.string().trim().min(2, "informe o nome").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "informe o telefone")
    .max(40, "telefone muito longo"),
  email: z.string().trim().email("e-mail inválido").max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().default(""),
  accepts_whatsapp: z.coerce.boolean().optional().default(true),
});

export type ClientInput = z.infer<typeof clientSchema>;

export const APPOINTMENT_STATUS = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];

export const appointmentSchema = z.object({
  client_id: z.string().uuid("cliente inválido"),
  service_id: z.string().uuid("serviço inválido"),
  barber_id: z.string().uuid().optional().or(z.literal("")),
  scheduled_at: z
    .string()
    .min(1, "informe a data e hora")
    .refine((v) => !Number.isNaN(Date.parse(v)), "data inválida"),
  duration_minutes: z.coerce.number().int().min(5, "min 5").max(600, "max 600"),
  price_cents: z.coerce.number().int().min(0, "preço inválido"),
  notes: z.string().trim().max(500).optional().default(""),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const updateStatusSchema = z.object({
  status: z.enum(APPOINTMENT_STATUS),
});
