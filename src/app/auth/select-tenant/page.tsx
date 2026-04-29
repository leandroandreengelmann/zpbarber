import Image from "next/image";
import { redirect } from "next/navigation";
import {
  CaretRightIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getCurrentMemberships, getCurrentUser } from "@/lib/auth/current-user";
import { setActiveTenantAction } from "./actions";

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

export default async function SelectTenantPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const memberships = await getCurrentMemberships();
  if (memberships.length === 0) redirect("/auth/login?error=no-membership");
  if (memberships.length === 1) {
    const id = memberships[0].barbershop?.id;
    if (id) await setActiveTenantAction(id);
    redirect("/app");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] px-6 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <Image
            src="/logo.png"
            alt="ZP Barber"
            width={160}
            height={160}
            priority
            className="h-auto w-40 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
              Escolha a barbearia
            </h1>
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              Você tem acesso a mais de uma barbearia. Selecione qual quer acessar agora.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          {memberships.map((m) => {
            const bs = m.barbershop;
            if (!bs) return null;
            return (
              <form key={bs.id} action={setActiveTenantAction.bind(null, bs.id)}>
                <button
                  type="submit"
                  className="group flex w-full items-center gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 text-left transition-all hover:border-[var(--color-border-brand)] hover:shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
                    <StorefrontIcon size={28} weight="duotone" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-text-sm font-semibold text-[var(--color-text-primary)] truncate">
                      {bs.name}
                    </div>
                    <div className="text-text-xs text-[var(--color-text-tertiary)]">
                      {ROLE_LABEL[m.role] ?? m.role}
                    </div>
                  </div>
                  <CaretRightIcon
                    size={28}
                    weight="duotone"
                    className="shrink-0 text-[var(--color-fg-quaternary)] transition-colors group-hover:text-[var(--color-fg-secondary)]"
                  />
                </button>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
}
