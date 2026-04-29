"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarBlankIcon,
  CashRegisterIcon,
  ChartLineUpIcon,
  DotsThreeOutlineIcon,
  ReceiptIcon,
  StorefrontIcon,
  UsersThreeIcon,
  XIcon,
  type Icon,
} from "@phosphor-icons/react";
import { SidebarNav, type NavSection } from "./sidebar-nav";
import { cn } from "@/lib/utils";

export type BottomNavItem = { href: string; label: string; Icon: Icon };

export const APP_PRIMARY: BottomNavItem[] = [
  { href: "/app/agenda", label: "Agenda", Icon: CalendarBlankIcon },
  { href: "/app/caixa", label: "Caixa", Icon: CashRegisterIcon },
  { href: "/app/clientes", label: "Clientes", Icon: UsersThreeIcon },
];

export const ADMIN_PRIMARY: BottomNavItem[] = [
  { href: "/admin", label: "Dashboard", Icon: ChartLineUpIcon },
  { href: "/admin/barbershops", label: "Barbearias", Icon: StorefrontIcon },
  { href: "/admin/billing", label: "Cobranças", Icon: ReceiptIcon },
];

export function BottomNav({
  sections,
  primary = APP_PRIMARY,
}: {
  sections: NavSection[];
  primary?: BottomNavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-background/95 backdrop-blur md:hidden"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "calc(64px + env(safe-area-inset-bottom))",
        }}
        aria-label="Navegação principal"
      >
        {primary.map(({ href, label, Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                active
                  ? "text-[var(--color-blue-600)]"
                  : "text-muted-foreground"
              )}
            >
              <Icon
                size={24}
                weight={active ? "fill" : "regular"}
                className="shrink-0"
              />
              <span>{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground"
          aria-label="Mais opções"
        >
          <DotsThreeOutlineIcon size={24} weight="regular" />
          <span>Mais</span>
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-background shadow-[0_-8px_24px_rgb(10_13_18_/_0.18)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background px-5 py-3">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
              >
                <XIcon size={18} weight="bold" />
              </button>
            </div>
            <div className="px-3 py-4" onClick={() => setOpen(false)}>
              <SidebarNav sections={sections} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
