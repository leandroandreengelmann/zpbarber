import { z } from "zod";

export const REVIEW_SOURCES = ["public", "manual", "whatsapp"] as const;
export type ReviewSource = (typeof REVIEW_SOURCES)[number];

export const publicReviewSchema = z.object({
  slug: z.string().trim().min(1),
  appointment_id: z.string().uuid(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().default(""),
});

export const reviewRespondSchema = z.object({
  id: z.string().uuid(),
  response: z.string().trim().min(1, "resposta obrigatória").max(1000),
});

export const reviewToggleHiddenSchema = z.object({
  id: z.string().uuid(),
  hidden: z.coerce.boolean(),
});

export const reviewDeleteSchema = z.object({ id: z.string().uuid() });

export const manualReviewSchema = z.object({
  client_id: z.string().uuid().optional().or(z.literal("")),
  barber_id: z.string().uuid().optional().or(z.literal("")),
  appointment_id: z.string().uuid().optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().default(""),
});
