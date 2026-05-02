import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatMoney, formatTimeBR } from "@/lib/format";
import { enqueueWhatsappMessage } from "@/lib/whatsapp/enqueue";

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  cash: "Dinheiro",
  pix: "PIX",
  debit: "Débito",
  credit: "Crédito",
  voucher: "Voucher",
  other: "Outro",
};

export type DispatchAppointmentInput = {
  shopId: string;
  appointmentId: string;
  clientId: string;
  serviceId: string;
  barberId: string | null;
  scheduledAt: Date;
  priceCents: number;
  origem?: "online" | "manual";
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

    // Aviso pro celular do dono (se estiver ligado nas configurações)
    await enqueueWhatsappMessage({
      barbershopId: p.shopId,
      clientId: null,
      appointmentId: p.appointmentId,
      trigger: "owner_new_appointment",
      templateSlug: "dono_novo_agendamento",
      vars: {
        ...vars,
        cliente: clientRes.data?.full_name ?? "Cliente",
        origem: p.origem === "manual" ? "manual" : "online",
      },
    });
  } catch (err) {
    console.error("[whatsapp] dispatchAppointmentMessages:", err);
  }
}

export async function dispatchOwnerPaymentMessage(p: {
  shopId: string;
  saleId: string;
}) {
  try {
    const supabase = await createClient();
    const { data: sale } = await supabase
      .from("sales")
      .select(
        "total_cents, client:clients(full_name), barber:profiles!sales_barber_id_fkey(full_name), items:sale_items(description, service:services(name)), payments:sale_payments(method)"
      )
      .eq("id", p.saleId)
      .maybeSingle();
    if (!sale) return;

    const { data: shop } = await supabase
      .from("barbershops")
      .select("name")
      .eq("id", p.shopId)
      .maybeSingle();

    type Row = {
      total_cents: number;
      client: { full_name: string | null } | null;
      barber: { full_name: string | null } | null;
      items: Array<{
        description: string | null;
        service: { name: string | null } | null;
      }> | null;
      payments: Array<{ method: string }> | null;
    };
    const s = sale as unknown as Row;

    const firstService = (s.items ?? []).find((it) => it.service?.name)?.service
      ?.name;
    const firstDesc = (s.items ?? [])[0]?.description;
    const servico =
      firstService ??
      firstDesc ??
      ((s.items?.length ?? 0) > 1 ? "Vários itens" : "Item avulso");

    const methods = Array.from(
      new Set((s.payments ?? []).map((pp) => PAYMENT_METHOD_LABEL[pp.method] ?? pp.method))
    ).join(" + ");

    await enqueueWhatsappMessage({
      barbershopId: p.shopId,
      clientId: null,
      appointmentId: null,
      trigger: "owner_new_payment",
      templateSlug: "dono_novo_recebimento",
      vars: {
        cliente: s.client?.full_name ?? "Avulso",
        valor: formatMoney(s.total_cents),
        servico,
        barbeiro: s.barber?.full_name ?? "—",
        forma_pagamento: methods || "—",
        barbearia: shop?.name ?? "Barbearia",
      },
    });
  } catch (err) {
    console.error("[whatsapp] dispatchOwnerPaymentMessage:", err);
  }
}
