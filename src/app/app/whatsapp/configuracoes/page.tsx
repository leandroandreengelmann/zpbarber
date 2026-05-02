import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { ConnectCard } from "../_components/connect-card";
import { SettingsForm } from "../_components/settings-form";

export default async function WhatsappConfiguracoesPage() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "whatsapp.gerenciar")) redirect("/app/whatsapp");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const { data: s } = await supabase
    .from("whatsapp_settings")
    .select("*")
    .eq("barbershop_id", shopId)
    .maybeSingle();

  const settings = s ?? {
    trigger_confirmation: true,
    trigger_reminder: true,
    trigger_reminder_hours_before: 24,
    trigger_post_service: true,
    trigger_post_service_delay_hours: 2,
    trigger_birthday: true,
    trigger_birthday_hour: 9,
    business_hours_start: "08:00",
    business_hours_end: "20:00",
    business_hours_only: true,
    connection_status: "disconnected" as const,
    phone_number: null,
    last_qr: null,
    last_connected_at: null,
    notify_phone: null,
    notify_enabled: false,
    notify_new_appointment: true,
    notify_new_payment: true,
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Configurações do WhatsApp
        </h1>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Conecte o número da barbearia e ajuste os disparos automáticos.
        </p>
      </div>

      <Card>
        <CardContent className="p-5">
          <ConnectCard
            status={settings.connection_status ?? "disconnected"}
            phone={settings.phone_number ?? null}
            lastQr={settings.last_qr ?? null}
            lastConnectedAt={settings.last_connected_at ?? null}
          />
        </CardContent>
      </Card>

      <SettingsForm
        initial={{
          trigger_confirmation: settings.trigger_confirmation,
          trigger_reminder: settings.trigger_reminder,
          trigger_reminder_hours_before: settings.trigger_reminder_hours_before,
          trigger_post_service: settings.trigger_post_service,
          trigger_post_service_delay_hours: settings.trigger_post_service_delay_hours,
          trigger_birthday: settings.trigger_birthday,
          trigger_birthday_hour: settings.trigger_birthday_hour,
          business_hours_start: settings.business_hours_start,
          business_hours_end: settings.business_hours_end,
          business_hours_only: settings.business_hours_only,
          notify_phone: settings.notify_phone ?? "",
          notify_enabled: settings.notify_enabled ?? false,
          notify_new_appointment: settings.notify_new_appointment ?? true,
          notify_new_payment: settings.notify_new_payment ?? true,
        }}
      />
    </div>
  );
}
