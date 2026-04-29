import { z } from "zod";

export const ANNOUNCEMENT_SEVERITIES = ["info", "success", "warning", "critical"] as const;
export const ANNOUNCEMENT_AUDIENCES = ["all", "selected"] as const;
export const ANNOUNCEMENT_STATUSES = ["draft", "published", "archived"] as const;

export const announcementUpsertSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(1, "Título obrigatório").max(200),
    body: z.string().trim().min(1, "Mensagem obrigatória").max(4000),
    severity: z.enum(ANNOUNCEMENT_SEVERITIES).default("info"),
    audience: z.enum(ANNOUNCEMENT_AUDIENCES).default("all"),
    audience_shop_ids: z.array(z.string().uuid()).default([]),
    link_url: z
      .string()
      .trim()
      .url("URL inválida")
      .max(500)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    link_label: z
      .string()
      .trim()
      .max(80)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    expires_at: z
      .string()
      .trim()
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .superRefine((v, ctx) => {
    if (v.audience === "selected" && v.audience_shop_ids.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["audience_shop_ids"],
        message: "Selecione ao menos uma barbearia",
      });
    }
    if (v.link_url && !v.link_label) {
      ctx.addIssue({
        code: "custom",
        path: ["link_label"],
        message: "Defina um rótulo para o link",
      });
    }
  });

export type AnnouncementUpsertInput = z.infer<typeof announcementUpsertSchema>;
