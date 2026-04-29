import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  CreditCardIcon,
  SignInIcon,
  StorefrontIcon,
  UserPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarbershopForm } from "../barbershop-form";
import {
  assignMemberAction,
  enterBarbershopAction,
  updateBarbershopAction,
} from "../actions";
import { ClientAssignForm } from "./client-assign-form";
import { formatDateBR, formatDateTimeBR } from "@/lib/format";
import { getAsaasConfigStatus } from "@/lib/asaas/config";
import { SubscribeDialog } from "./_components/subscribe-dialog";
import { CancelSubscriptionForm } from "./_components/cancel-subscription-form";

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

const ROLE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  gestor: "default",
  recepcionista: "secondary",
  barbeiro: "outline",
};

const STATUS_LABEL: Record<string, string> = {
  trial: "Trial",
  active: "Ativa",
  suspended: "Suspensa",
  cancelled: "Cancelada",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  trial: "secondary",
  active: "default",
  suspended: "outline",
  cancelled: "destructive",
};

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export default async function BarbershopEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: shop } = await supabase
    .from("barbershops")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!shop) notFound();

  const [membersRes, currentSubRes, plansRes, gatewayStatus] = await Promise.all([
    supabase
      .from("barbershop_members")
      .select("role, is_active, created_at, user:profiles(id, full_name)")
      .eq("barbershop_id", id)
      .order("created_at"),
    supabase
      .from("subscriptions")
      .select(
        "id, status, current_period_start, current_period_end, trial_ends_at, asaas_subscription_id, plan:plans(id, name, price_cents, billing_cycle)"
      )
      .eq("barbershop_id", id)
      .in("status", ["trialing", "active", "past_due"])
      .order("created_at", { ascending: false })
      .maybeSingle(),
    supabase
      .from("plans")
      .select("id, name, price_cents, billing_cycle, trial_days")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("price_cents", { ascending: true }),
    getAsaasConfigStatus(),
  ]);

  const members = membersRes.data;
  const currentSub = currentSubRes.data;
  const plans = (plansRes.data ?? []) as Array<{
    id: string;
    name: string;
    price_cents: number;
    billing_cycle: "monthly" | "quarterly" | "yearly";
    trial_days: number;
  }>;

  const updateAction = updateBarbershopAction.bind(null, id);
  const assignAction = assignMemberAction.bind(null, id);
  const enterAction = enterBarbershopAction.bind(null, id);
  const items = members ?? [];

  const SUB_STATUS_LABEL: Record<string, string> = {
    trialing: "Em trial",
    active: "Ativa",
    past_due: "Atrasada",
    suspended: "Suspensa",
    cancelled: "Cancelada",
  };
  const SUB_STATUS_VARIANT: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    trialing: "secondary",
    active: "default",
    past_due: "destructive",
    suspended: "outline",
    cancelled: "outline",
  };
  const CYCLE_LABEL: Record<string, string> = {
    monthly: "/mês",
    quarterly: "/trimestre",
    yearly: "/ano",
  };
  const formatBRL = (cents: number) =>
    (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <Link
            href="/admin/barbershops"
            className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon size={28} weight="duotone" />
            Barbearias
          </Link>
          <h1 className="text-display-xs font-semibold tracking-tight">{shop.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">/{shop.slug}</span>
            <Badge variant={STATUS_VARIANT[shop.status] ?? "outline"}>
              {STATUS_LABEL[shop.status] ?? shop.status}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <Link
            href={`/${shop.slug}`}
            target="_blank"
            className={`${buttonVariants({ variant: "outline" })} h-11 w-full sm:w-auto`}
          >
            <ArrowSquareOutIcon size={28} weight="duotone" />
            Página pública
          </Link>
          <form action={enterAction} className="contents">
            <button type="submit" className={`${buttonVariants()} h-11 w-full sm:w-auto`}>
              <SignInIcon size={28} weight="duotone" />
              Acessar painel
            </button>
          </form>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <StorefrontIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Dados da barbearia</CardTitle>
              <CardDescription>Informações cadastrais e plano</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BarbershopForm
            action={updateAction}
            initial={shop}
            submitLabel="Salvar alterações"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCardIcon size={28} weight="duotone" />
              </div>
              <div>
                <CardTitle>Assinatura</CardTitle>
                <CardDescription>
                  Plano atual e cobrança recorrente via Asaas
                </CardDescription>
              </div>
            </div>
            {!currentSub && (
              <SubscribeDialog
                barbershopId={id}
                plans={plans}
                gatewayConfigured={gatewayStatus.configured}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentSub ? (
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-0.5">
                  <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Plano
                  </span>
                  <span className="text-text-md font-medium text-[var(--color-text-primary)]">
                    {currentSub.plan?.name ?? "—"}
                  </span>
                  {currentSub.plan && (
                    <span className="text-text-sm text-[var(--color-text-tertiary)]">
                      {formatBRL(currentSub.plan.price_cents)}
                      {CYCLE_LABEL[currentSub.plan.billing_cycle]}
                    </span>
                  )}
                </div>
                <div className="grid gap-0.5">
                  <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Status
                  </span>
                  <Badge
                    variant={SUB_STATUS_VARIANT[currentSub.status] ?? "outline"}
                    className="w-fit"
                  >
                    {SUB_STATUS_LABEL[currentSub.status] ?? currentSub.status}
                  </Badge>
                  {currentSub.trial_ends_at && currentSub.status === "trialing" && (
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      Trial até {formatDateTimeBR(currentSub.trial_ends_at)}
                    </span>
                  )}
                  {currentSub.current_period_end && currentSub.status !== "trialing" && (
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      Próxima renovação{" "}
                      {formatDateBR(currentSub.current_period_end)}
                    </span>
                  )}
                </div>
              </div>
              {currentSub.asaas_subscription_id && (
                <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                  Asaas: {currentSub.asaas_subscription_id}
                </span>
              )}
              <div className="flex justify-end">
                <CancelSubscriptionForm
                  barbershopId={id}
                  subscriptionId={currentSub.id}
                />
              </div>
            </div>
          ) : (
            <div className="text-text-sm text-[var(--color-text-tertiary)]">
              {gatewayStatus.configured
                ? "Sem assinatura ativa. Use o botão acima para assinar a um plano."
                : "Configure o gateway de pagamento em /admin/settings/payment antes de assinar."}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UsersThreeIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Equipe</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? "membro" : "membros"} vinculados
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {items.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Nenhum membro vinculado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6">Nome</TableHead>
                    <TableHead className="px-4">Papel</TableHead>
                    <TableHead className="px-4">Status</TableHead>
                    <TableHead className="px-4 pr-6">Desde</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((m, i) => (
                    <TableRow key={m.user?.id ?? i}>
                      <TableCell className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs">
                              {initials(m.user?.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{m.user?.full_name ?? "—"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant={ROLE_VARIANT[m.role] ?? "outline"}>
                          {ROLE_LABEL[m.role] ?? m.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant={m.is_active ? "default" : "outline"}>
                          {m.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 pr-6 text-muted-foreground">
                        {formatDateBR(m.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserPlusIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Atribuir membro existente</CardTitle>
              <CardDescription>
                O usuário precisa já ter conta na plataforma.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ClientAssignForm action={assignAction} />
        </CardContent>
      </Card>
    </div>
  );
}
