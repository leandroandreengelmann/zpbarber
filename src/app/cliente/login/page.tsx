import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/auth/current-user";
import { signInClientAction } from "./actions";
import { ClientPasswordInput } from "./password-input";
import { ClientLoginSubmitButton } from "./submit-button";

type SearchParams = Promise<{ next?: string; error?: string; reset?: string }>;

export default async function ClientLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const user = await getCurrentUser();
  if (user) {
    if (user.profile.is_super_admin) redirect("/admin");
    if (user.profile.is_client) redirect(sp.next || "/conta");
    redirect("/app");
  }

  return (
    <div className="relative grid min-h-screen grid-cols-1 bg-[var(--color-bg-primary)] lg:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex flex-col gap-6">
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
                Entrar na sua conta
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                Acesse seus agendamentos e fidelidade em qualquer barbearia da plataforma.
              </p>
            </div>
          </div>

          {sp.reset === "1" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-success-primary)]">
              <CheckCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
              <span>Senha atualizada com sucesso. Entre com a nova senha.</span>
            </div>
          )}

          {sp.error && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
              <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
              <span>{describeError(sp.error)}</span>
            </div>
          )}

          <form action={signInClientAction} className="grid gap-5">
            <input type="hidden" name="next" value={sp.next ?? ""} />

            <div className="grid gap-1.5">
              <Label
                htmlFor="email"
                className="text-text-sm font-medium text-[var(--color-text-secondary)]"
              >
                E-mail
              </Label>
              <div className="relative">
                <EnvelopeSimpleIcon
                  size={28}
                  weight="duotone"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11 pl-9 text-text-md"
                  placeholder="voce@email.com"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Senha
                </Label>
                <Link
                  href="/cliente/recuperar"
                  className="text-text-sm font-medium text-[var(--color-text-brand-secondary)] hover:text-[var(--color-text-brand-secondary-hover)]"
                >
                  Esqueceu?
                </Link>
              </div>
              <ClientPasswordInput />
            </div>

            <ClientLoginSubmitButton />
          </form>

          <p className="mt-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Ainda não tem conta?{" "}
            <Link
              href={`/cliente/cadastro${sp.next ? `?next=${encodeURIComponent(sp.next)}` : ""}`}
              className="font-medium text-[var(--color-text-brand-secondary)] hover:text-[var(--color-text-brand-secondary-hover)]"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-[var(--color-bg-secondary)] lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="grid gap-6">
            <h2 className="text-display-md font-semibold tracking-tight text-[var(--color-text-primary)]">
              Uma conta. Todas as barbearias.
            </h2>
            <p className="max-w-md text-text-lg text-[var(--color-text-tertiary)]">
              Agende em qualquer barbearia da plataforma com a mesma conta.
              Veja seus horários e seu progresso de fidelidade em um só lugar.
            </p>
          </div>

          <p className="text-text-sm text-[var(--color-text-quaternary)]">
            © ZP Barber · v0.1
          </p>
        </div>
      </div>
    </div>
  );
}

function describeError(code: string) {
  switch (code) {
    case "invalid-credentials":
      return "E-mail ou senha incorretos.";
    default:
      return "Não foi possível entrar. Tente novamente.";
  }
}
