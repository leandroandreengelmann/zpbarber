import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ClockClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/shell/app-shell";
import { requireBarbershop } from "@/lib/auth/guards";
import { getCurrentMemberships } from "@/lib/auth/current-user";
import { getBarbershopBillingState } from "@/lib/billing/access";
import type { NavItem, NavSection } from "@/components/shell/sidebar-nav";
import { ImpersonationBanner } from "./_components/impersonation-banner";

type RoleNavItem = NavItem & { gestorOnly?: boolean };
type RoleNavSection = { title?: string; items: RoleNavItem[] };

const SECTIONS: RoleNavSection[] = [
  {
    items: [{ href: "/app", label: "Dashboard", icon: "chartLineUp" }],
  },
  {
    title: "Operação",
    items: [
      { href: "/app/agenda", label: "Agenda", icon: "calendar" },
      {
        href: "/app/caixa",
        label: "Caixa",
        icon: "cashRegister",
        children: [
          { href: "/app/caixa", label: "Caixa atual", exact: true },
          { href: "/app/caixa/relatorios", label: "Relatório de caixas" },
        ],
      },
      { href: "/app/clientes", label: "Clientes", icon: "usersThree" },
    ],
  },
  {
    title: "Cadastros",
    items: [
      { href: "/app/barbeiros", label: "Equipe", icon: "userSwitch" },
      { href: "/app/servicos", label: "Serviços", icon: "scissors" },
      { href: "/app/produtos", label: "Produtos", icon: "package" },
    ],
  },
  {
    title: "Crescimento",
    items: [
      { href: "/app/fidelidade", label: "Fidelidade", icon: "gift" },
      { href: "/app/whatsapp", label: "WhatsApp", icon: "whatsapp" },
      { href: "/app/avaliacoes", label: "Avaliações", icon: "star" },
    ],
  },
  {
    title: "Gestão",
    items: [
      { href: "/app/financeiro", label: "Financeiro", icon: "currencyDollar" },
      { href: "/app/comissoes", label: "Comissões", icon: "chartBar", gestorOnly: true },
      { href: "/app/logs", label: "Logs", icon: "shieldCheck", gestorOnly: true },
      { href: "/app/configuracoes", label: "Configurações", icon: "gear" },
    ],
  },
];

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

function daysBetween(iso: string): number {
  return Math.ceil(
    (new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
}

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { user, membership } = await requireBarbershop();
  const shop = membership.barbershop!;
  const isGestor = membership.role === "gestor";

  const memberships = await getCurrentMemberships();
  const isImpersonating =
    user.profile.is_super_admin &&
    !memberships.some((m) => m.barbershop?.id === shop.id);

  const billing = await getBarbershopBillingState(shop.id);
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "";
  const onRegularizar = pathname.startsWith("/app/regularizar");
  const onAssinar = pathname.startsWith("/app/assinar");
  const onPerfil = pathname.startsWith("/app/perfil");

  if (billing.kind === "blocked" && !onRegularizar && !onAssinar && !onPerfil) {
    redirect("/app/regularizar");
  }

  const sections: NavSection[] = SECTIONS.map((s) => ({
    title: s.title,
    items: s.items
      .filter((it) => isGestor || !it.gestorOnly)
      .map(
        (it): NavItem => ({
          href: it.href,
          label: it.label,
          icon: it.icon,
          exact: it.exact,
          children: it.children,
        })
      ),
  })).filter((s) => s.items.length > 0);

  const showWarn =
    billing.kind === "warn" && isGestor && !onRegularizar;

  const trialDaysLeft =
    billing.kind === "trial" && billing.trialEndsAt
      ? daysBetween(billing.trialEndsAt)
      : null;
  const showTrialEnding =
    isGestor && trialDaysLeft !== null && trialDaysLeft <= 7 && trialDaysLeft >= 0;

  return (
    <AppShell
      brandSubtitle={shop.name}
      sections={sections}
      topbarTitle={shop.name}
      topbarSubtitle={ROLE_LABEL[membership.role] ?? membership.role}
      email={user.email}
    >
      {isImpersonating && <ImpersonationBanner shopName={shop.name} />}
      {showTrialEnding && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-4 py-3">
          <div className="flex items-start gap-3">
            <ClockClockwiseIcon
              size={28}
              weight="duotone"
              className="mt-0.5 shrink-0 text-[var(--color-fg-secondary)]"
            />
            <div className="grid gap-0.5">
              <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                {trialDaysLeft === 0
                  ? "Seu período de avaliação termina hoje"
                  : trialDaysLeft === 1
                    ? "Seu período de avaliação termina amanhã"
                    : `Seu período de avaliação termina em ${trialDaysLeft} dias`}
              </p>
              <p className="text-text-xs text-[var(--color-text-tertiary)]">
                Escolha um plano agora para evitar interrupção do acesso.
              </p>
            </div>
          </div>
          <Link
            href="/app/assinar"
            className="inline-flex h-9 items-center rounded-md bg-[var(--color-blue-600)] px-4 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)]"
          >
            Escolher plano
          </Link>
        </div>
      )}
      {showWarn && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--color-border-warning-subtle)] bg-[var(--color-warning-25)] px-4 py-3">
          <div className="flex items-start gap-3">
            <WarningCircleIcon
              size={28}
              weight="duotone"
              className="mt-0.5 shrink-0 text-[var(--color-text-warning-primary)]"
            />
            <div className="grid gap-0.5">
              <p className="text-text-sm font-semibold text-[var(--color-text-warning-primary)]">
                Sua fatura está em atraso
              </p>
              <p className="text-text-xs text-[var(--color-text-tertiary)]">
                Quite agora para evitar bloqueio do acesso.
              </p>
            </div>
          </div>
          <Link
            href="/app/regularizar"
            className="inline-flex h-9 items-center rounded-md bg-[var(--color-warning-500)] px-4 text-text-sm font-semibold text-white hover:bg-[var(--color-warning-600)]"
          >
            Regularizar
          </Link>
        </div>
      )}
      {children}
    </AppShell>
  );
}
