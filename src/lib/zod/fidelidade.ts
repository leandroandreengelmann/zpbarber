import { z } from "zod";

export const LOYALTY_REWARD_TYPES = [
  "discount_amount",
  "discount_percent",
  "free_service",
  "free_product",
] as const;
export type LoyaltyRewardType = (typeof LOYALTY_REWARD_TYPES)[number];

export const LOYALTY_REWARD_TYPE_LABEL: Record<LoyaltyRewardType, string> = {
  discount_amount: "Desconto em valor (R$)",
  discount_percent: "Desconto em %",
  free_service: "Serviço grátis",
  free_product: "Produto grátis",
};

const optionalUuid = z
  .string()
  .trim()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().uuid().optional());

const optionalPositiveInt = z
  .union([z.string().trim(), z.number()])
  .transform((v) => (v === "" || v == null ? undefined : Number(v)))
  .pipe(z.number().int().positive().optional());

export const loyaltySettingsSchema = z.object({
  is_active: z.coerce.boolean().default(false),
  points_per_real: z.coerce.number().min(0, "valor inválido"),
  expire_after_days: optionalPositiveInt,
  min_redemption_points: z.coerce.number().int().min(0).default(0),
  welcome_bonus_points: z.coerce.number().int().min(0).default(0),
  birthday_bonus_points: z.coerce.number().int().min(0).default(0),
  punch_card_active: z.coerce.boolean().default(false),
  punch_card_required: z.coerce.number().int().positive().default(10),
  punch_card_reward_service_id: optionalUuid,
  punch_card_expire_days: optionalPositiveInt,
  punch_card_service_ids: z.array(z.string().uuid()).default([]),
});
export type LoyaltySettingsInput = z.infer<typeof loyaltySettingsSchema>;

export const loyaltyRewardSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(2, "nome obrigatório").max(80),
    description: z.string().trim().max(300).optional().default(""),
    cost_points: z.coerce.number().int().positive("custo inválido"),
    reward_type: z.enum(LOYALTY_REWARD_TYPES),
    reward_value: z.coerce.number().int().min(0).optional(),
    service_id: optionalUuid,
    product_id: optionalUuid,
    is_active: z.coerce.boolean().default(true),
  })
  .superRefine((d, ctx) => {
    if (d.reward_type === "discount_amount" && (!d.reward_value || d.reward_value <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "informe o valor do desconto",
        path: ["reward_value"],
      });
    }
    if (
      d.reward_type === "discount_percent" &&
      (!d.reward_value || d.reward_value <= 0 || d.reward_value > 100)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "informe o percentual (1-100)",
        path: ["reward_value"],
      });
    }
    if (d.reward_type === "free_service" && !d.service_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "selecione o serviço",
        path: ["service_id"],
      });
    }
    if (d.reward_type === "free_product" && !d.product_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "selecione o produto",
        path: ["product_id"],
      });
    }
  });

export const loyaltyRewardDeleteSchema = z.object({ id: z.string().uuid() });

export const redeemRewardSchema = z.object({
  client_id: z.string().uuid(),
  reward_id: z.string().uuid(),
});

export const cancelRedemptionSchema = z.object({ id: z.string().uuid() });

export const adjustPointsSchema = z.object({
  client_id: z.string().uuid(),
  points: z.coerce
    .number()
    .int()
    .refine((v) => v !== 0, "valor não pode ser zero"),
  description: z.string().trim().min(2, "descrição obrigatória").max(200),
});

export const expireOldPointsSchema = z.object({});
export const awardBirthdayBonusSchema = z.object({});
