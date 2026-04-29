"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { publicReviewSchema } from "@/lib/zod/reviews";

export type PublicReviewState = { ok?: boolean; error?: string };

export async function submitPublicReviewAction(
  _prev: PublicReviewState,
  fd: FormData
): Promise<PublicReviewState> {
  const parsed = publicReviewSchema.safeParse({
    slug: fd.get("slug") ?? "",
    appointment_id: fd.get("appointment_id") ?? "",
    rating: fd.get("rating") ?? "",
    comment: fd.get("comment") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = createAdminClient();
  const { error } = await supabase.rpc("fn_create_public_review", {
    p_slug: parsed.data.slug,
    p_appointment_id: parsed.data.appointment_id,
    p_rating: parsed.data.rating,
    p_comment: parsed.data.comment ?? "",
  });
  if (error) {
    const map: Record<string, string> = {
      shop_not_found: "Barbearia não encontrada.",
      appointment_not_found: "Agendamento não encontrado.",
      appointment_shop_mismatch: "Agendamento não pertence a esta barbearia.",
      rating_invalid: "Selecione de 1 a 5 estrelas.",
    };
    return { error: map[error.message] ?? error.message };
  }
  return { ok: true };
}
