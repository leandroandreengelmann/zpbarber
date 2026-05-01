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

export default async function ContaLayout({ children }: { children: ReactNode }) {
  const user = await requireClient();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/70">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/conta" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ZP Barber"
              width={120}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-text-sm text-[var(--color-text-tertiary)] sm:inline">
              {user.profile.full_name ?? user.email}
            </span>
            <ThemeToggle />
            <form action={signOutClientAction}>
              <button
                type="submit"
                title="Sair"
                aria-label="Sair"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)]"
              >
                <SignOutIcon size={20} weight="duotone" />
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-2 sm:px-4">
          <ContaTab href="/conta" icon={<CalendarCheckIcon size={20} weight="duotone" />} label="Agendamentos" />
          <ContaTab href="/conta/fidelidade" icon={<HeartIcon size={20} weight="duotone" />} label="Fidelidade" />
          <ContaTab href="/conta/perfil" icon={<UserCircleIcon size={20} weight="duotone" />} label="Perfil" />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}

function ContaTab({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
    >
      {icon}
      {label}
    </Link>
  );
}
