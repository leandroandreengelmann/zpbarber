import {
  ArrowLeftIcon,
  ClockCounterClockwiseIcon,
  ClockIcon,
  PercentIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  StarIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Stars } from "@/app/app/avaliacoes/_components/stars";
import { formatDateBR } from "@/lib/format";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can, type Capability } from "@/lib/auth/capabilities";
import {
  clearBarberWorkingHoursAction,
  createBarberTimeOffAction,
  deleteBarberTimeOffAction,
  saveBarberProductsAction,
  saveBarberServicesAction,
  saveBarberWorkingHoursAction,
  setBarberCommissionedAction,
  updateBarberProfileAction,
  updateMemberPermissionsAction,
} from "./actions";
import { PermissionsForm } from "./permissions-form";
import { BarberProfileForm } from "./barber-profile-form";
import {
  BarberServicesForm,
  type BarberOverride,
  type ShopService,
} from "./barber-services-form";
import {
  BarberProductsForm,
  type BarberProductOverride,
  type ShopProduct,
} from "./barber-products-form";
import { BarberCommissionForm } from "./barber-commission-form";
import { BarberHoursForm, type DayHours } from "./barber-hours-form";
import { BarberTimeOffForm, type TimeOffRow } from "./barber-time-off-form";

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export default async function BarberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const isManager = can(membership, "equipe.gerenciar");
  const isSelf = user.id === id;
  const canEdit = isManager || isSelf;

  const supabase = await createClient();
  const [
    { data: member },
    { data: services },
    { data: overrides },
    { data: products },
    { data: productOverrides },
    { data: shopHours },
    { data: barberHours },
    { data: timeOff },
    { data: reviewsList },
    { data: reviewSummary },
  ] = await Promise.all([
    supabase
      .from("barbershop_members")
      .select("role, is_active, is_commissioned, capabilities, user:profiles(id, full_name, phone, avatar_url)")
      .eq("barbershop_id", shopId)
      .eq("user_id", id)
      .maybeSingle(),
    supabase
      .from("services")
      .select("id, name, duration_minutes, price_cents, commission_percent")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("barber_services")
      .select("service_id, is_active, price_cents, duration_minutes, commission_percent")
      .eq("barber_id", id),
    supabase
      .from("products")
      .select("id, name, price_cents, commission_percent")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("barber_products")
      .select("product_id, is_active, commission_percent")
      .eq("barber_id", id),
    supabase
      .from("business_hours")
      .select("weekday, is_closed, opens_at, closes_at, break_starts_at, break_ends_at")
      .eq("barbershop_id", shopId),
    supabase
      .from("barber_working_hours")
      .select("weekday, is_closed, opens_at, closes_at, break_starts_at, break_ends_at")
      .eq("barber_id", id),
    supabase
      .from("barber_time_off")
      .select("id, starts_at, ends_at, reason")
      .eq("barber_id", id)
      .gte("ends_at", new Date().toISOString())
      .order("starts_at"),
    supabase
      .from("reviews")
      .select("id, rating, comment, created_at, clients(full_name)")
      .eq("barbershop_id", shopId)
      .eq("barber_id", id)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase.rpc("fn_review_summary", {
      p_barbershop: shopId,
      p_barber: id,
    }),
  ]);

  if (!member || !member.user) notFound();

  const saveServicesAction = saveBarberServicesAction.bind(null, id);
  const saveProductsAction = saveBarberProductsAction.bind(null, id);
  const setCommissionedAction = setBarberCommissionedAction.bind(null, id);
  const saveHoursAction = saveBarberWorkingHoursAction.bind(null, id);
  const clearHoursAction = clearBarberWorkingHoursAction.bind(null, id);
  const createTimeOffAction = createBarberTimeOffAction.bind(null, id);
  const deleteTimeOffAction = deleteBarberTimeOffAction.bind(null, id);
  const updateProfileAction = updateBarberProfileAction.bind(null, id);
  const updatePermissionsAction = updateMemberPermissionsAction.bind(null, id);

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 sm:gap-6">
      <div>
        <Link
          href="/app/barbeiros"
          className={`${buttonVariants({ variant: "ghost", size: "sm" })} min-h-11 sm:min-h-0`}
        >
          <ArrowLeftIcon size={24} weight="duotone" />
          Voltar à equipe
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Avatar className="size-12 sm:size-14">
          {member.user.avatar_url ? (
            <AvatarImage
              src={member.user.avatar_url}
              alt={member.user.full_name ?? ""}
            />
          ) : null}
          <AvatarFallback className="text-text-md font-semibold">
            {initials(member.user.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 flex-1 gap-1">
          <h1 className="text-text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-xs break-words">
            {member.user.full_name ?? "Sem nome"}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={member.role === "gestor" ? "default" : "outline"}>
              {ROLE_LABEL[member.role] ?? member.role}
            </Badge>
            <Badge variant={member.is_active ? "default" : "outline"}>
              {member.is_active ? "Ativo" : "Inativo"}
            </Badge>
            {member.user.phone && (
              <span className="text-text-sm text-[var(--color-text-tertiary)]">
                {member.user.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {!canEdit && (
        <Alert variant="info" title="Modo somente leitura">
          Apenas gestores ou o próprio barbeiro podem editar este perfil.
        </Alert>
      )}

      <Tabs defaultValue="services">
        <TabsList className={`grid !h-auto w-full bg-transparent p-0 ${isManager ? "grid-cols-4" : "grid-cols-3"} gap-2 sm:!flex sm:!h-8 sm:w-max sm:gap-0 sm:bg-muted sm:p-[3px]`}>
          <TabsTrigger
            value="services"
            aria-label="Serviços"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <ScissorsIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Serviços</span>
          </TabsTrigger>
          <TabsTrigger
            value="commission"
            aria-label="Comissão"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <PercentIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Comissão</span>
          </TabsTrigger>
          <TabsTrigger
            value="hours"
            aria-label="Horários"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <ClockIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Horários</span>
          </TabsTrigger>
          <TabsTrigger
            value="time-off"
            aria-label="Folgas"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <ClockCounterClockwiseIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Folgas</span>
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            aria-label="Avaliações"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <StarIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Avaliações</span>
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            aria-label="Perfil"
            className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
          >
            <UserCircleIcon weight="duotone" className="size-6 sm:size-[22px]" />
            <span>Perfil</span>
          </TabsTrigger>
          {isManager && (
            <TabsTrigger
              value="permissions"
              aria-label="Permissões"
              className="h-auto min-h-[64px] flex-col gap-1.5 whitespace-normal rounded-lg border border-border bg-muted/40 px-2 py-2 text-[13px] font-medium leading-tight data-active:border-primary/50 data-active:shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--primary)_50%,transparent)] sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-md sm:border-transparent sm:bg-transparent sm:px-1.5 sm:py-0.5 sm:text-sm"
            >
              <ShieldCheckIcon weight="duotone" className="size-6 sm:size-[22px]" />
              <span>Permissões</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Serviços que esse barbeiro faz</CardTitle>
              <CardDescription>
                Marque os serviços e, se quiser, defina preço, duração ou comissão diferentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarberServicesForm
                action={saveServicesAction}
                services={(services ?? []) as ShopService[]}
                overrides={(overrides ?? []) as BarberOverride[]}
                disabled={!canEdit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recebe comissão?</CardTitle>
                <CardDescription>
                  Master switch deste barbeiro. Quando desligado, nenhuma venda
                  do barbeiro gera comissão a pagar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarberCommissionForm
                  action={setCommissionedAction}
                  isCommissioned={member.is_commissioned}
                  disabled={!isManager}
                />
              </CardContent>
            </Card>

            {member.is_commissioned && (
              <Card>
                <CardHeader>
                  <CardTitle>Comissão por produto</CardTitle>
                  <CardDescription>
                    Marque os produtos vendidos por esse barbeiro. Sem
                    percentual, herda a comissão padrão do produto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BarberProductsForm
                    action={saveProductsAction}
                    products={(products ?? []) as ShopProduct[]}
                    overrides={(productOverrides ?? []) as BarberProductOverride[]}
                    disabled={!isManager}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Horários do barbeiro</CardTitle>
              <CardDescription>
                Sem horários próprios, segue o expediente da barbearia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarberHoursForm
                action={saveHoursAction}
                onClear={clearHoursAction}
                shopHours={(shopHours ?? []) as DayHours[]}
                barberHours={(barberHours ?? []) as DayHours[]}
                disabled={!canEdit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-off">
          <Card>
            <CardHeader>
              <CardTitle>Folgas e bloqueios</CardTitle>
              <CardDescription>
                Bloqueie horários (almoço, médico, férias). A agenda recusa
                novos agendamentos nesses períodos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarberTimeOffForm
                createAction={createTimeOffAction}
                deleteAction={deleteTimeOffAction}
                upcoming={(timeOff ?? []) as TimeOffRow[]}
                disabled={!canEdit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          {(() => {
            const sum = reviewSummary?.[0];
            const total = Number(sum?.total_count ?? 0);
            const avg = Number(sum?.avg_rating ?? 0);
            return (
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações deste barbeiro</CardTitle>
                  <CardDescription>
                    Feedback dos clientes nos atendimentos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 sm:gap-6 sm:p-4">
                    <div className="grid gap-0.5">
                      <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Nota média
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-text-2xl font-semibold tabular-nums text-[var(--color-text-primary)] sm:text-display-xs">
                          {total > 0 ? avg.toFixed(2).replace(".", ",") : "—"}
                        </span>
                        {total > 0 && <Stars rating={Math.round(avg)} size={20} />}
                      </div>
                    </div>
                    <div className="grid gap-0.5">
                      <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Total
                      </span>
                      <span className="text-text-2xl font-semibold tabular-nums text-[var(--color-text-primary)] sm:text-display-xs">
                        {total}
                      </span>
                    </div>
                  </div>

                  {(reviewsList ?? []).length === 0 ? (
                    <p className="py-4 text-center text-text-sm text-[var(--color-text-tertiary)]">
                      Nenhuma avaliação ainda.
                    </p>
                  ) : (
                    <ul className="grid gap-3">
                      {(reviewsList ?? []).map((r) => {
                        const client = (r.clients as { full_name?: string } | null)?.full_name;
                        return (
                          <li
                            key={r.id}
                            className="rounded-xl border border-[var(--color-border-secondary)] p-3.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <Stars rating={r.rating} size={16} />
                              <span className="text-text-xs text-[var(--color-text-tertiary)]">
                                {client ? `${client} · ` : ""}
                                {formatDateBR(r.created_at)}
                              </span>
                            </div>
                            {r.comment && (
                              <p className="mt-1.5 text-text-sm text-[var(--color-text-secondary)]">
                                “{r.comment}”
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>
            );
          })()}
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Atualize nome, telefone e foto. Apenas o gestor ou o próprio
                barbeiro pode editar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarberProfileForm
                action={updateProfileAction}
                barberId={id}
                disabled={!canEdit}
                initial={{
                  full_name: member.user.full_name ?? "",
                  phone: member.user.phone ?? "",
                  avatar_url: member.user.avatar_url ?? "",
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {isManager && (
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Função e permissões</CardTitle>
                <CardDescription>
                  Defina o que essa pessoa pode acessar no sistema. Comece por
                  uma função padrão e personalize se precisar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {member.role === "super_admin" ? (
                  <Alert variant="info" title="Super admin">
                    O super admin tem todas as permissões e não pode ser
                    alterado por aqui.
                  </Alert>
                ) : (
                  <PermissionsForm
                    action={updatePermissionsAction}
                    initialRole={member.role as "gestor" | "recepcionista" | "barbeiro"}
                    initialCapabilities={
                      (member.capabilities as Capability[] | null) ?? null
                    }
                    selfBlocked={user.id === id}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
