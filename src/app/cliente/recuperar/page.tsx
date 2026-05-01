import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeSimpleIcon,
  KeyIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestClientPasswordResetAction } from "./actions";

type SearchParams = Promise<{ error?: string }>;

export default async function ClientForgotPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

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
                Recuperar senha
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                Informe o e-mail da sua conta. Enviaremos um código de 6 dígitos.
              </p>
            </div>
          </div>

          {sp.error === "invalid-email" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
              <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
              <span>Informe um e-mail válido.</span>
            </div>
          )}

          <form action={requestClientPasswordResetAction} className="grid gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
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

            <Button type="submit" size="lg" className="mt-1 h-11 w-full font-semibold">
              <KeyIcon size={28} weight="duotone" />
              Enviar código
            </Button>
          </form>

          <p className="mt-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            <Link
              href="/cliente/login"
              className="font-medium text-[var(--color-text-brand-secondary)] hover:text-[var(--color-text-brand-secondary-hover)]"
            >
              ← Voltar para o login
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
              Esqueceu sua senha? Sem estresse.
            </h2>
            <p className="max-w-md text-text-lg text-[var(--color-text-tertiary)]">
              Mandamos um código no seu e-mail. Você confirma e cria uma nova senha em segundos.
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
