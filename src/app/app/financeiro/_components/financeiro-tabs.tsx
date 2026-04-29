"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/app/financeiro", label: "Visão geral", exact: true },
  { href: "/app/financeiro/a-pagar", label: "A pagar" },
  { href: "/app/financeiro/a-receber", label: "A receber" },
  { href: "/app/financeiro/categorias", label: "Categorias", gestorOnly: true },
];

export function FinanceiroTabs({ isGestor }: { isGestor: boolean }) {
  const pathname = usePathname();
  const items = TABS.filter((t) => isGestor || !t.gestorOnly);
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[var(--color-border-secondary)]">
      {items.map((t) => {
        const active = t.exact
          ? pathname === t.href
          : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`-mb-px border-b-2 px-3 py-2 text-text-sm font-medium transition-colors ${
              active
                ? "border-[var(--color-blue-500)] text-[var(--color-blue-700)]"
                : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
