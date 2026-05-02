import {
  CalendarPlusIcon,
  ClockIcon,
  InfoIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { SettingsForm, type ShopValues } from "./settings-form";
import { HoursForm } from "./hours-form";
import { PublicBookingToggle } from "./public-booking-toggle";
import {
  updateBusinessHoursAction,
  updateShopSettingsAction,
} from "./actions";

export default async function ConfiguracoesPage() {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [{ data: shop }, { data: hours }] = await Promise.all([
    supabase.from("barbershops").select("*").eq("id", shopId).maybeSingle(),
    supabase
      .from("business_hours")
      .select("weekday, is_closed, opens_at, closes_at, break_starts_at, break_ends_at")
      .eq("barbershop_id", shopId),
  ]);

  if (!shop) return null;

  const isManager = can(membership, "configuracoes.gerenciar");

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Configurações
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Atualize os dados da barbearia, endereço e horário de funcionamento.
        </p>
      </div>

      {!isManager && (
        <div className="flex items-start gap-2 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-4 py-3 text-text-sm text-[var(--color-text-tertiary)]">
          <InfoIcon
            size={28}
            weight="duotone"
            className="mt-0.5 shrink-0 text-[var(--color-fg-quaternary)]"
          />
          <span>Apenas gestores podem editar. Você está em modo somente leitura.</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <StorefrontIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Dados da barbearia</CardTitle>
              <CardDescription>Identidade visual, contato e endereço</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SettingsForm
            action={updateShopSettingsAction}
            initial={shop as unknown as ShopValues}
            disabled={!isManager}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <CalendarPlusIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Agendamento online</CardTitle>
              <CardDescription>
                Permita que clientes marquem horário pela página pública
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PublicBookingToggle
            initialEnabled={
              (shop as unknown as { public_booking_enabled?: boolean })
                .public_booking_enabled ?? true
            }
            disabled={!isManager}
            slug={(shop as unknown as { slug: string }).slug}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <ClockIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Horário de funcionamento</CardTitle>
              <CardDescription>Defina os horários por dia da semana</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <HoursForm
            action={updateBusinessHoursAction}
            initial={(hours ?? []).map((h) => ({
              weekday: h.weekday,
              is_closed: h.is_closed,
              opens_at: h.opens_at,
              closes_at: h.closes_at,
              break_starts_at: h.break_starts_at,
              break_ends_at: h.break_ends_at,
            }))}
            disabled={!isManager}
          />
        </CardContent>
      </Card>
    </div>
  );
}
