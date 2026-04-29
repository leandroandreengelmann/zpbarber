import { z } from "zod";
import { isValidBRPhone, normalizePhone } from "@/lib/phone";

export const publicBookingSchema = z.object({
  service_id: z.string().uuid("serviço inválido"),
  barber_id: z.string().uuid("escolha um profissional"),
  scheduled_at: z
    .string()
    .min(1, "horário obrigatório")
    .refine((v) => !Number.isNaN(new Date(v).getTime()), "horário inválido"),
  client_name: z.string().trim().min(2, "informe seu nome").max(120),
  client_phone: z
    .string()
    .trim()
    .min(8, "telefone inválido")
    .refine(isValidBRPhone, "telefone inválido")
    .transform((v) => normalizePhone(v) ?? v),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot — bots tendem a preencher campos invisíveis. Humano deixa vazio.
  website: z.string().max(0, "spam").optional().or(z.literal("")),
});

export type PublicBookingInput = z.infer<typeof publicBookingSchema>;
