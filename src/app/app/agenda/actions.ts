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
type ClientCreateState = {
  error?: string;
  ok?: boolean;
  client?: { id: string; full_name: string; phone: string | null };
};

async function ensureStaff() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    role: membership.role,
  };
}

export async function createClientAction(
  _prev: ClientCreateState,
  fd: FormData
): Promise<ClientCreateState> {
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
  const { data, error } = await supabase
    .from("clients")
    .insert({
      barbershop_id: ctx.shopId,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      notes: parsed.data.notes || null,
    })
    .select("id, full_name, phone")
    .single();
  if (error) return { error: error.message };
  revalidatePath("/app/agenda");
  return {
    ok: true,
    client: { id: data.id, full_name: data.full_name, phone: data.phone },
  };
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

export type SlotInfo = {
  date: string;
  weekday: number;
  closed: boolean;
  slots: { start: string; label: string }[];
};

export type AvailableDay = { date: string; weekday: number };


function hmToMin(s: string | null | undefined) {
  if (!s) return null;
  const [h, m] = s.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function minToHM(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function buildLocalDate(dateISO: string, minutes: number) {
  const [y, mo, d] = dateISO.split("-").map(Number);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return new Date(y, mo - 1, d, h, m, 0, 0);
}

export async function getAvailableSlotsAction(input: {
  barberId: string;
  serviceId: string;
  date: string;
  excludeAppointmentId?: string;
}): Promise<SlotInfo> {
  const ctx = await ensureStaff();
  const { barberId, serviceId, date, excludeAppointmentId } = input;
  const supabase = await createClient();

  const [y, mo, d] = date.split("-").map(Number);
  const localDate = new Date(y, mo - 1, d);
  const weekday = localDate.getDay();

  const { data: svc } = await supabase
    .from("services")
    .select("duration_minutes")
    .eq("id", serviceId)
    .eq("barbershop_id", ctx.shopId)
    .maybeSingle();
  let duration = svc?.duration_minutes ?? 30;

  if (barberId) {
    const { data: bs } = await supabase
      .from("barber_services")
      .select("duration_minutes")
      .eq("barber_id", barberId)
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .maybeSingle();
    if (bs?.duration_minutes) duration = bs.duration_minutes;
  }

  let opensMin: number | null = null;
  let closesMin: number | null = null;
  let breakStart: number | null = null;
  let breakEnd: number | null = null;
  let isClosed = false;

  if (barberId) {
    const { data: bwh } = await supabase
      .from("barber_working_hours")
      .select("is_closed, opens_at, closes_at, break_starts_at, break_ends_at")
      .eq("barber_id", barberId)
      .eq("weekday", weekday)
      .maybeSingle();
    if (bwh) {
      isClosed = bwh.is_closed;
      opensMin = hmToMin(bwh.opens_at);
      closesMin = hmToMin(bwh.closes_at);
      breakStart = hmToMin(bwh.break_starts_at);
      breakEnd = hmToMin(bwh.break_ends_at);
    }
  }

  if (opensMin == null || closesMin == null) {
    const { data: shop } = await supabase
      .from("business_hours")
      .select("is_closed, opens_at, closes_at, break_starts_at, break_ends_at")
      .eq("barbershop_id", ctx.shopId)
      .eq("weekday", weekday)
      .maybeSingle();
    if (shop) {
      isClosed = isClosed || shop.is_closed;
      opensMin = opensMin ?? hmToMin(shop.opens_at);
      closesMin = closesMin ?? hmToMin(shop.closes_at);
      breakStart = breakStart ?? hmToMin(shop.break_starts_at);
      breakEnd = breakEnd ?? hmToMin(shop.break_ends_at);
    }
  }

  if (isClosed || opensMin == null || closesMin == null) {
    return { date, weekday, closed: true, slots: [] };
  }

  const dayStart = buildLocalDate(date, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  let apptQuery = supabase
    .from("appointments")
    .select("id, scheduled_at, duration_minutes")
    .eq("barbershop_id", ctx.shopId)
    .in("status", ["scheduled", "confirmed"])
    .gte("scheduled_at", dayStart.toISOString())
    .lt("scheduled_at", dayEnd.toISOString());
  if (barberId) apptQuery = apptQuery.eq("barber_id", barberId);
  if (excludeAppointmentId) apptQuery = apptQuery.neq("id", excludeAppointmentId);

  const { data: appts } = await apptQuery;

  const busy: { start: number; end: number }[] = (appts ?? []).map((a) => {
    const start = new Date(a.scheduled_at);
    const startMin = start.getHours() * 60 + start.getMinutes();
    return { start: startMin, end: startMin + (a.duration_minutes ?? 0) };
  });

  if (breakStart != null && breakEnd != null && breakEnd > breakStart) {
    busy.push({ start: breakStart, end: breakEnd });
  }

  if (barberId) {
    const { data: timeOff } = await supabase
      .from("barber_time_off")
      .select("starts_at, ends_at")
      .eq("barber_id", barberId)
      .lt("starts_at", dayEnd.toISOString())
      .gt("ends_at", dayStart.toISOString());
    for (const t of timeOff ?? []) {
      const ts = new Date(t.starts_at);
      const te = new Date(t.ends_at);
      const startMin = Math.max(0, (ts.getTime() - dayStart.getTime()) / 60_000);
      const endMin = Math.min(24 * 60, (te.getTime() - dayStart.getTime()) / 60_000);
      if (endMin > startMin) busy.push({ start: startMin, end: endMin });
    }
  }

  const today = new Date();
  const isToday =
    today.getFullYear() === y &&
    today.getMonth() === mo - 1 &&
    today.getDate() === d;
  const nowMin = today.getHours() * 60 + today.getMinutes();

  const slots: { start: string; label: string }[] = [];
  const step = Math.max(5, duration);
  for (let m = opensMin; m + duration <= closesMin; m += step) {
    if (isToday && m < nowMin) continue;
    const slotEnd = m + duration;
    const conflict = busy.some(
      (b) => b.start < slotEnd && b.end > m
    );
    if (conflict) continue;
    slots.push({
      start: `${date}T${minToHM(m)}`,
      label: minToHM(m),
    });
  }

  return { date, weekday, closed: false, slots };
}

export async function getAvailableDaysAction(input: {
  barberId: string;
  serviceId: string;
  fromDate: string;
  days?: number;
}): Promise<AvailableDay[]> {
  const ctx = await ensureStaff();
  const { barberId, serviceId } = input;
  const days = input.days ?? 14;
  const supabase = await createClient();

  const [fy, fmo, fd] = input.fromDate.split("-").map(Number);
  const start = new Date(fy, fmo - 1, fd);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + days);

  const { data: svc } = await supabase
    .from("services")
    .select("duration_minutes")
    .eq("id", serviceId)
    .eq("barbershop_id", ctx.shopId)
    .maybeSingle();
  let duration = svc?.duration_minutes ?? 30;

  if (barberId) {
    const { data: bs } = await supabase
      .from("barber_services")
      .select("duration_minutes")
      .eq("barber_id", barberId)
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .maybeSingle();
    if (bs?.duration_minutes) duration = bs.duration_minutes;
  }

  const [bwhRes, bhRes, timeOffRes] = await Promise.all([
    barberId
      ? supabase
          .from("barber_working_hours")
          .select("weekday, is_closed, opens_at, closes_at")
          .eq("barber_id", barberId)
      : Promise.resolve({ data: [] as Array<{ weekday: number; is_closed: boolean; opens_at: string | null; closes_at: string | null }> }),
    supabase
      .from("business_hours")
      .select("weekday, is_closed, opens_at, closes_at")
      .eq("barbershop_id", ctx.shopId),
    barberId
      ? supabase
          .from("barber_time_off")
          .select("starts_at, ends_at")
          .eq("barber_id", barberId)
          .lt("starts_at", end.toISOString())
          .gt("ends_at", start.toISOString())
      : Promise.resolve({ data: [] as Array<{ starts_at: string; ends_at: string }> }),
  ]);

  const bwhByWeekday = new Map<number, { is_closed: boolean; opens: number | null; closes: number | null }>();
  for (const r of bwhRes.data ?? []) {
    bwhByWeekday.set(r.weekday, {
      is_closed: r.is_closed,
      opens: hmToMin(r.opens_at),
      closes: hmToMin(r.closes_at),
    });
  }
  const bhByWeekday = new Map<number, { is_closed: boolean; opens: number | null; closes: number | null }>();
  for (const r of bhRes.data ?? []) {
    bhByWeekday.set(r.weekday, {
      is_closed: r.is_closed,
      opens: hmToMin(r.opens_at),
      closes: hmToMin(r.closes_at),
    });
  }

  const timeOffs = (timeOffRes.data ?? []).map((t) => ({
    start: new Date(t.starts_at),
    end: new Date(t.ends_at),
  }));

  const now = new Date();

  const result: AvailableDay[] = [];
  for (let i = 0; i < days; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    const weekday = day.getDay();

    const bwh = bwhByWeekday.get(weekday);
    const bh = bhByWeekday.get(weekday);

    const isClosed =
      (bwh?.is_closed ?? false) || (bwh ? false : bh?.is_closed ?? false);
    const opens = bwh?.opens ?? bh?.opens ?? null;
    const closes = bwh?.closes ?? bh?.closes ?? null;

    if (isClosed || opens == null || closes == null) continue;
    if (closes - opens < duration) continue;

    const dayStart = new Date(day);
    const dayEnd = new Date(day);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const fullyOff = timeOffs.some(
      (t) => t.start <= dayStart && t.end >= dayEnd
    );
    if (fullyOff) continue;

    if (
      day.getFullYear() === now.getFullYear() &&
      day.getMonth() === now.getMonth() &&
      day.getDate() === now.getDate()
    ) {
      const nowMin = now.getHours() * 60 + now.getMinutes();
      if (nowMin + duration > closes) continue;
    }

    result.push({
      date: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`,
      weekday,
    });
  }

  return result;
}
