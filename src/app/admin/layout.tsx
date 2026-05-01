import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { ADMIN_PRIMARY } from "@/components/shell/bottom-nav";
import { requireSuperAdmin } from "@/lib/auth/guards";
import type { NavSection } from "@/components/shell/sidebar-nav";

const SECTIONS: NavSection[] = [
  {
    items: [{ href: "/admin", label: "Dashboard", icon: "chartLineUp" }],
  },
  {
    title: "Plataforma",
    items: [
      { href: "/admin/barbershops", label: "Barbearias", icon: "storefront" },
      { href: "/admin/clientes", label: "Clientes", icon: "usersThree" },
      { href: "/admin/plans", label: "Planos", icon: "creditCard" },
      { href: "/admin/billing", label: "Cobranças", icon: "receipt" },
      { href: "/admin/financials", label: "Financeiro", icon: "currencyDollar" },
    ],
  },
  {
    title: "Operação",
    items: [
      { href: "/admin/announcements", label: "Comunicados", icon: "megaphone" },
      { href: "/admin/support", label: "Suporte", icon: "headset" },
      { href: "/admin/health", label: "Saúde do sistema", icon: "pulse" },
      { href: "/admin/audit", label: "Logs de auditoria", icon: "shieldCheck" },
    ],
  },
  {
    title: "Configurações",
    items: [
      { href: "/admin/settings", label: "Configurações", icon: "gear" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireSuperAdmin();
  return (
    <AppShell
      brandSubtitle="Super admin"
      sections={SECTIONS}
      topbarTitle="Painel Super Admin"
      topbarSubtitle="Plataforma"
      email={user.email}
      bottomNavPrimary={ADMIN_PRIMARY}
    >
      {children}
    </AppShell>
  );
}
