import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheckIcon,
  HeartIcon,
  SignOutIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "@/components/theme-toggle";
import { requireClient } from "@/lib/auth/guards";
import { signOutClientAction } from "../cliente/login/actions";
import { ContaTab, ContaBottomTab } from "./_components/conta-nav";

export default async function ContaLayout({ children }: { children: ReactNode }) {
  const user = await requireClient();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/70">
        <div className="mx-auto flex h-24 max-w-5xl items-center justify-between gap-3 px-4 sm:h-28 sm:px-6">
          <Link href="/conta" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ZP Barber"
              width={480}
              height={144}
              priority
              className="h-20 w-auto object-contain sm:h-24 md:h-28"
            />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-text-sm text-[var(--color-text-tertiary)] md:inline">
              {user.profile.full_name ?? user.email}
            </span>
            <ThemeToggle />
            <form action={signOutClientAction}>
              <button
                type="submit"
                title="Sair"
                aria-label="Sair"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-5 text-text-sm font-medium text-[var(--color-text-secondary)] shadow-sm transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] sm:px-6"
              >
                <SignOutIcon size={18} weight="duotone" />
                <span>Sair</span>
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-5xl items-center gap-1 overflow-x-auto px-2 sm:flex sm:px-4">
          <ContaTab href="/conta" exact icon={<CalendarCheckIcon size={20} weight="duotone" />} label="Agendamentos" />
          <ContaTab href="/conta/fidelidade" icon={<HeartIcon size={20} weight="duotone" />} label="Fidelidade" />
          <ContaTab href="/conta/perfil" icon={<UserCircleIcon size={20} weight="duotone" />} label="Perfil" />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-10 sm:pb-10">
        {children}
      </main>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
        aria-label="Navegação principal"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-3">
          <ContaBottomTab
            href="/conta"
            exact
            icon={<CalendarCheckIcon size={22} weight="duotone" />}
            label="Agenda"
          />
          <ContaBottomTab
            href="/conta/fidelidade"
            icon={<HeartIcon size={22} weight="duotone" />}
            label="Fidelidade"
          />
          <ContaBottomTab
            href="/conta/perfil"
            icon={<UserCircleIcon size={22} weight="duotone" />}
            label="Perfil"
          />
        </div>
      </nav>
    </div>
  );
}
