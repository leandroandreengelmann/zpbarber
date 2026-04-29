import { z } from "zod";

export const newStaffSchema = z.object({
  full_name: z.string().trim().min(2, "informe o nome").max(120),
  email: z.string().trim().toLowerCase().email("e-mail inválido"),
  password: z.string().min(8, "senha precisa ter no mínimo 8 caracteres"),
  role: z.enum(["gestor", "recepcionista", "barbeiro"]),
});

export const profileSchema = z.object({
  full_name: z.string().trim().min(2, "informe o nome").max(120),
  phone: z
    .string()
    .trim()
    .max(40, "telefone muito longo")
    .optional()
    .or(z.literal("")),
  avatar_url: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;
