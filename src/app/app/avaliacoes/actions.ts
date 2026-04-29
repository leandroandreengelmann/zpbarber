"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  manualReviewSchema,
  reviewDeleteSchema,
  reviewRespondSchema,
  reviewToggleHiddenSchema,
} from "@/lib/zod/reviews";

type State = { error?: string; ok?: boolean };

async function ensureGestor() {
  const { user, membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    throw new Error("apenas gestores");
  }
  return { userId: user.id, shopId: membership.barbershop!.id };
}

async function ensureStaff() {
  const { user, membership } = await requireBarbershop();
  return { userId: user.id, shopId: membership.barbershop!.id, role: membership.role };
}

export async function respondReviewAction(_prev: State, fd: FormData): Promise<State> {
  const ctx = await ensureGestor();
  const parsed = reviewRespondSchema.safeParse({
    id: fd.get("id") ?? "",
    response: fd.get("response") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("reviews")
    .update({
      manager_response: parsed.data.response,
      responded_at: new Date().toISOString(),
      responded_by: ctx.userId,
    })
    .eq("id", parsed.data.id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/avaliacoes");
  return { ok: true };
}

export async function toggleReviewHiddenAction(_prev: State, fd: FormData): Promise<State> {
  const ctx = await ensureGestor();
  const parsed = reviewToggleHiddenSchema.safeParse({
    id: fd.get("id") ?? "",
    hidden: fd.get("hidden") === "true",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("reviews")
    .update({ is_hidden: parsed.data.hidden })
    .eq("id", parsed.data.id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/avaliacoes");
  return { ok: true };
}

export async function deleteReviewAction(id: string) {
  const ctx = await ensureGestor();
  const parsed = reviewDeleteSchema.safeParse({ id });
  if (!parsed.success) throw new Error("id inválido");
  const supabase = await createClient();
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", ctx.shopId);
  if (error) throw new Error(error.message);
  revalidatePath("/app/avaliacoes");
}

export async function createManualReviewAction(_prev: State, fd: FormData): Promise<State> {
  const ctx = await ensureStaff();
  const parsed = manualReviewSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    barber_id: fd.get("barber_id") ?? "",
    appointment_id: fd.get("appointment_id") ?? "",
    rating: fd.get("rating") ?? "",
    comment: fd.get("comment") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert({
    barbershop_id: ctx.shopId,
    client_id: parsed.data.client_id || null,
    barber_id: parsed.data.barber_id || null,
    appointment_id: parsed.data.appointment_id || null,
    rating: parsed.data.rating,
    comment: parsed.data.comment || null,
    source: "manual",
  });
  if (error) return { error: error.message };
  revalidatePath("/app/avaliacoes");
  return { ok: true };
}
