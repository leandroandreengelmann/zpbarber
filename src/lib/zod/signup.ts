import { z } from "zod";
import { slugSchema } from "./barbershop";
import { isValidCPF, isValidCNPJ, onlyDigits } from "@/lib/validators/tax-id";

const taxSchema = z.discriminatedUnion("tax_type", [
  z.object({
    tax_type: z.literal("cnpj"),
    tax_value: z
      .string()
      .trim()
      .transform(onlyDigits)
      .refine((v) => v.length === 14, "CNPJ deve ter 14 dígitos")
      .refine(isValidCNPJ, "CNPJ inválido"),
  }),
  z.object({
    tax_type: z.literal("cpf"),
    tax_value: z
      .string()
      .trim()
      .transform(onlyDigits)
      .refine((v) => v.length === 11, "CPF deve ter 11 dígitos")
      .refine(isValidCPF, "CPF inválido"),
  }),
]);

export const signupSchema = z
  .object({
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
  })
  .and(taxSchema);

export type SignupInput = z.infer<typeof signupSchema>;
