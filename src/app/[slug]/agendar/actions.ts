"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { dispatchAppointmentMessages } from "@/lib/whatsapp/dispatch";
import { sendPushToUsers } from "@/lib/push/send";
import { publicBookingSchema } from "@/lib/zod/public-booking";

export type BookingShop = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: unknown | null;
  primary_color: string | null;
  public_booking_enabled: boolean;
  is_open: boolean;
};

export type BookingService = {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
};

export type BookingBarber = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export type BookingBusinessHour = {
  weekday: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

export type BookingPageData = {
  shop: BookingShop;
  services: BookingService[];
  barbers: BookingBarber[];
  barber_services: { barber_id: string; service_id: string }[];
  business_hours: BookingBusinessHour[];
};

export async function loadBookingDataAction(
  slug: string
): Promise<BookingPageData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("fn_public_booking_data", {
    p_slug: slug,
  });
  if (error || !data) return null;
  return data as unknown as BookingPageData;
}

export async function loadAvailableSlotsAction(
  slug: string,
  serviceId: string,
  barberId: string | null,
  dateISO: string
): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("fn_public_available_slots", {
    p_slug: slug,
    p_service_id: serviceId,
    p_barber_id: barberId as unknown as string,
    p_date: dateISO,
  });
  if (error || !data) return [];
  return data as unknown as string[];
}

type CreateState = {
  ok?: boolean;
  error?: string;
  appointmentId?: string;
  scheduledAt?: string;
  serviceName?: string;
  barberName?: string;
  durationMinutes?: number;
  priceCents?: number;
};

export async function createPublicAppointmentAction(
  _prev: CreateState,
  fd: FormData
): Promise<CreateState> {
  const slug = String(fd.get("slug") ?? "").trim();
  if (!slug) return { error: "barbearia inválida" };

  const parsed = publicBookingSchema.safeParse({
    service_id: fd.get("service_id") ?? "",
    barber_id: fd.get("barber_id") ?? "",
    scheduled_at: fd.get("scheduled_at") ?? "",
    client_name: fd.get("client_name") ?? "",
    client_phone: fd.get("client_phone") ?? "",
    notes: fd.get("notes") ?? "",
    website: fd.get("website") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("fn_public_create_appointment", {
    p_slug: slug,
    p_service_id: v.service_id,
    p_barber_id: v.barber_id as unknown as string,
    p_scheduled_at: v.scheduled_at,
    p_client_name: v.client_name,
    p_client_phone: v.client_phone,
    p_notes: (v.notes || null) as unknown as string,
  });

  if (error) {
    return { error: translatePublicError(error.message) };
  }

  const result = data as { appointment_id: string; client_id: string; barber_id: string };

  // Buscar dados pra exibir tela de sucesso + disparar WhatsApp
  const [shopRes, serviceRes, barberRes] = await Promise.all([
    supabase.from("barbershops").select("id").eq("slug", slug).maybeSingle(),
    supabase
      .from("services")
      .select("name, duration_minutes, price_cents")
      .eq("id", v.service_id)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", result.barber_id)
      .maybeSingle(),
  ]);

  if (shopRes.data?.id && serviceRes.data) {
    await dispatchAppointmentMessages({
      shopId: shopRes.data.id,
      appointmentId: result.appointment_id,
      clientId: result.client_id,
      serviceId: v.service_id,
      barberId: result.barber_id,
      scheduledAt: new Date(v.scheduled_at),
      priceCents: serviceRes.data.price_cents,
    });

    // Push para gestor(es) e barbeiro responsável
    try {
      const admin = createAdminClient();
      const { data: members } = await admin
        .from("barbershop_members")
        .select("user_id, role")
        .eq("barbershop_id", shopRes.data.id)
        .eq("is_active", true)
        .or(`role.eq.gestor,user_id.eq.${result.barber_id}`);

      const userIds = (members ?? []).map((m) => m.user_id);
      if (userIds.length) {
        const when = new Date(v.scheduled_at).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        });
        await sendPushToUsers(userIds, {
          title: "Novo agendamento online",
          body: `${v.client_name} · ${serviceRes.data.name} · ${when}`,
          url: `/app/agenda?date=${v.scheduled_at.slice(0, 10)}`,
          tag: `appt-${result.appointment_id}`,
        });
      }
    } catch {
      // não bloqueia agendamento por falha de push
    }
  }

  return {
    ok: true,
    appointmentId: result.appointment_id,
    scheduledAt: v.scheduled_at,
    serviceName: serviceRes.data?.name ?? "Serviço",
    barberName: barberRes.data?.full_name ?? "—",
    durationMinutes: serviceRes.data?.duration_minutes ?? 0,
    priceCents: serviceRes.data?.price_cents ?? 0,
  };
}

function translatePublicError(msg: string): string {
  if (msg.includes("BARBER_OVERLAP"))
    return "Esse horário acabou de ser preenchido. Escolha outro.";
  if (msg.includes("CLIENT_OVERLAP"))
    return "Você já tem um agendamento neste horário.";
  if (msg.includes("BARBER_NO_SERVICE"))
    return "O profissional escolhido não realiza esse serviço.";
  if (msg.includes("BARBER_OFF_HOURS"))
    return "Horário fora do expediente.";
  if (msg.includes("BARBER_TIME_OFF"))
    return "Horário bloqueado para o profissional escolhido.";
  if (msg.includes("BARBER_REQUIRED"))
    return "Escolha um profissional para continuar.";
  if (msg.includes("BOOKING_DISABLED"))
    return "Agendamento online indisponível no momento.";
  if (msg.includes("SERVICE_NOT_FOUND"))
    return "Serviço não encontrado.";
  if (msg.includes("SHOP_NOT_FOUND"))
    return "Barbearia não encontrada.";
  if (msg.includes("PAST_SLOT"))
    return "Não é possível agendar no passado.";
  if (msg.includes("INVALID_PHONE"))
    return "Telefone inválido.";
  if (msg.includes("INVALID_NAME"))
    return "Informe seu nome completo.";
  if (msg.includes("TOO_MANY_OPEN"))
    return "Você já tem agendamentos em aberto. Fale com a barbearia.";
  return "Não foi possível concluir o agendamento. Tente novamente.";
}
