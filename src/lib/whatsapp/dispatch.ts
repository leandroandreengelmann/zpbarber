import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatMoney, formatTimeBR } from "@/lib/format";
import { enqueueWhatsappMessage } from "@/lib/whatsapp/enqueue";

export type DispatchAppointmentInput = {
  shopId: string;
  appointmentId: string;
  clientId: string;
  serviceId: string;
  barberId: string | null;
  scheduledAt: Date;
  priceCents: number;
};

export async function dispatchAppointmentMessages(p: DispatchAppointmentInput) {
  try {
    const supabase = await createClient();
    const [shopRes, clientRes, serviceRes, barberRes, settingsRes] =
      await Promise.all([
        supabase
          .from("barbershops")
          .select("name")
          .eq("id", p.shopId)
          .maybeSingle(),
        supabase
          .from("clients")
          .select("full_name")
          .eq("id", p.clientId)
          .maybeSingle(),
        supabase
          .from("services")
          .select("name")
          .eq("id", p.serviceId)
          .maybeSingle(),
        p.barberId
          ? supabase
              .from("profiles")
              .select("full_name")
              .eq("id", p.barberId)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        supabase
          .from("whatsapp_settings")
          .select("trigger_reminder_hours_before")
          .eq("barbershop_id", p.shopId)
          .maybeSingle(),
      ]);

    const vars = {
      cliente: clientRes.data?.full_name?.split(" ")[0] ?? "Cliente",
      data: formatDateBR(p.scheduledAt),
      hora: formatTimeBR(p.scheduledAt),
      barbeiro: barberRes.data?.full_name ?? "—",
      servicos: serviceRes.data?.name ?? "Serviço",
      valor: formatMoney(p.priceCents),
      barbearia: shopRes.data?.name ?? "Barbearia",
    };

    await enqueueWhatsappMessage({
      barbershopId: p.shopId,
      clientId: p.clientId,
      appointmentId: p.appointmentId,
      trigger: "appointment_confirmation",
      templateSlug: "appointment_confirmation",
      vars,
    });

    const hoursBefore = settingsRes.data?.trigger_reminder_hours_before ?? 24;
    const reminderAt = new Date(
      p.scheduledAt.getTime() - hoursBefore * 3600_000
    );
    if (reminderAt.getTime() > Date.now()) {
      await enqueueWhatsappMessage({
        barbershopId: p.shopId,
        clientId: p.clientId,
        appointmentId: p.appointmentId,
        trigger: "appointment_reminder",
        templateSlug: "appointment_reminder",
        vars,
        scheduledFor: reminderAt,
      });
    }
  } catch (err) {
    console.error("[whatsapp] dispatchAppointmentMessages:", err);
  }
}
