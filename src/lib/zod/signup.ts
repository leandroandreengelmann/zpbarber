import { z } from "zod";
import { slugSchema } from "./barbershop";

export const signupSchema = z.object({
  full_name: z.string().trim().min(2, "informe seu nome").max(120),
  email: z.string().trim().toLowerCase().email("e-mail inválido"),
  password: z.string().min(8, "senha precisa ter no mínimo 8 caracteres"),
  shop_name: z.string().trim().min(2, "informe o nome da barbearia").max(120),
  shop_slug: slugSchema,
  shop_phone: z
    .string()
    .trim()
    .max(40, "telefone muito longo")
    .optional()
    .or(z.literal("")),
});

export type SignupInput = z.infer<typeof signupSchema>;
