"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  appointmentSchema,
  clientSchema,
  updateStatusSchema,
} from "@/lib/zod/agenda";
import { parseMoneyToCents } from "@/lib/format";
import { dispatchAppointmentMessages } from "@/lib/whatsapp/dispatch";

type State = { error?: string; ok?: boolean };

async function ensureStaff() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    role: membership.role,
  };
}

export async function createClientAction(_prev: State, fd: FormData): Promise<State> {
  const ctx = await ensureStaff();
  const parsed = clientSchema.safeParse({
    full_name: fd.get("full_name") ?? "",
    phone: fd.get("phone") ?? "",
    email: fd.get("email") ?? "",
    notes: fd.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("clients").insert({
    barbershop_id: ctx.shopId,
    full_name: parsed.data.full_name,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    notes: parsed.data.notes || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/app/agenda");
  return { ok: true };
}

export async function createAppointmentAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const ctx = await ensureStaff();
  const priceRaw = (fd.get("price") as string) ?? "0";
  const parsed = appointmentSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    service_id: fd.get("service_id") ?? "",
    barber_id: fd.get("barber_id") ?? "",
    scheduled_at: fd.get("scheduled_at") ?? "",
    duration_minutes: fd.get("duration_minutes") ?? 0,
    price_cents: parseMoneyToCents(priceRaw),
    notes: fd.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const d = parsed.data;
  if (ctx.role === "barbeiro" && d.barber_id !== ctx.userId) {
    return { error: "Barbeiros só podem criar agendamentos para si mesmos." };
  }
  if (new Date(d.scheduled_at).getTime() < Date.now() - 60_000) {
    return { error: "Não é possível agendar no passado." };
  }
  const supabase = await createClient();

  const startIso = new Date(d.scheduled_at).toISOString();
  const endIso = new Date(
    new Date(d.scheduled_at).getTime() + d.duration_minutes * 60_000
  ).toISOString();

  const { data: conflicts } = await supabase
    .from("appointments")
    .select("id, barber_id, client_id, scheduled_at, duration_minutes")
    .eq("barbershop_id", ctx.shopId)
    .in("status", ["scheduled", "confirmed"])
    .lt("scheduled_at", endIso)
    .or(`client_id.eq.${d.client_id}${d.barber_id ? `,barber_id.eq.${d.barber_id}` : ""}`);

  const overlap = (conflicts ?? []).find((a) => {
    const aEnd = new Date(
      new Date(a.scheduled_at).getTime() + (a.duration_minutes ?? 0) * 60_000
    ).toISOString();
    return aEnd > startIso;
  });
  if (overlap) {
    if (d.barber_id && overlap.barber_id === d.barber_id) {
      return { error: "Já existe agendamento para este barbeiro no horário selecionado." };
    }
    if (overlap.client_id === d.client_id) {
      return { error: "Este cliente já tem outro agendamento neste horário." };
    }
  }

  const { data: created, error } = await supabase
    .from("appointments")
    .insert({
      barbershop_id: ctx.shopId,
      client_id: d.client_id,
      service_id: d.service_id,
      barber_id: d.barber_id || null,
      scheduled_at: startIso,
      duration_minutes: d.duration_minutes,
      price_cents: d.price_cents,
      notes: d.notes || null,
      created_by: ctx.userId,
    })
    .select("id")
    .single();
  if (error) return { error: translateAppointmentError(error.message) };

  // WhatsApp: confirmação + lembrete agendado
  await dispatchAppointmentMessages({
    shopId: ctx.shopId,
    appointmentId: created.id as string,
    clientId: d.client_id,
    serviceId: d.service_id,
    barberId: d.barber_id || null,
    scheduledAt: new Date(startIso),
    priceCents: d.price_cents,
  });

  revalidatePath("/app/agenda");
  return { ok: true };
}

function translateAppointmentError(msg: string): string {
  if (msg.includes("BARBER_OVERLAP")) {
    return "Já existe agendamento para este barbeiro no horário selecionado.";
  }
  if (msg.includes("CLIENT_OVERLAP")) {
    return "Este cliente já tem outro agendamento neste horário.";
  }
  if (msg.includes("BARBER_NO_SERVICE")) {
    return "Este barbeiro não realiza o serviço selecionado.";
  }
  if (msg.includes("BARBER_OFF_HOURS")) {
    return "Horário fora do expediente do barbeiro.";
  }
  if (msg.includes("BARBER_TIME_OFF")) {
    return "Barbeiro está bloqueado neste horário (folga/almoço).";
  }
  return msg;
}

export async function updateAppointmentAction(
  id: string,
  _prev: State,
  fd: FormData
): Promise<State> {
  const ctx = await ensureStaff();
  const priceRaw = (fd.get("price") as string) ?? "0";
  const parsed = appointmentSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    service_id: fd.get("service_id") ?? "",
    barber_id: fd.get("barber_id") ?? "",
    scheduled_at: fd.get("scheduled_at") ?? "",
    duration_minutes: fd.get("duration_minutes") ?? 0,
    price_cents: parseMoneyToCents(priceRaw),
    notes: fd.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const d = parsed.data;
  if (ctx.role === "barbeiro" && d.barber_id !== ctx.userId) {
    return { error: "Barbeiros só podem editar agendamentos próprios." };
  }
  const supabase = await createClient();
  const startIso = new Date(d.scheduled_at).toISOString();

  const { error } = await supabase
    .from("appointments")
    .update({
      client_id: d.client_id,
      service_id: d.service_id,
      barber_id: d.barber_id || null,
      scheduled_at: startIso,
      duration_minutes: d.duration_minutes,
      price_cents: d.price_cents,
      notes: d.notes || null,
    })
    .eq("id", id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: translateAppointmentError(error.message) };
  revalidatePath("/app/agenda");
  return { ok: true };
}

export async function setAppointmentStatusAction(id: string, status: string) {
  await ensureStaff();
  const parsed = updateStatusSchema.safeParse({ status });
  if (!parsed.success) throw new Error("status inválido");
  const supabase = await createClient();
  const { error } = await supabase
    .from("appointments")
    .update({ status: parsed.data.status })
    .eq("id", id);
  if (error) throw new Error(translateAppointmentError(error.message));
  revalidatePath("/app/agenda");
}

export async function deleteAppointmentAction(id: string) {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") throw new Error("apenas gestores");
  const supabase = await createClient();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/app/agenda");
}
