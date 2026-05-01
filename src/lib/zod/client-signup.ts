import { z } from "zod";
import { isValidBRPhone, normalizePhone } from "@/lib/phone";

export const clientSignupSchema = z.object({
  full_name: z.string().trim().min(2, "informe seu nome").max(120),
  email: z.string().trim().toLowerCase().email("e-mail inválido"),
  phone: z
    .string()
    .trim()
    .min(8, "informe um telefone válido")
    .refine(isValidBRPhone, "telefone inválido")
    .transform((v) => normalizePhone(v) ?? v),
  password: z.string().min(8, "senha precisa ter no mínimo 8 caracteres"),
});

export type ClientSignupInput = z.infer<typeof clientSignupSchema>;
