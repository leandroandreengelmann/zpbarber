import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { resendClientOtpAction } from "./actions";
import { ClientVerifyForm } from "./verify-form";

type SearchParams = Promise<{ email?: string; resent?: string }>;

export default async function ClientVerifyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const email = (sp.email ?? "").trim().toLowerCase();
  if (!email) redirect("/cliente/recuperar");

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
                Verificar código
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                Enviamos um código para{" "}
                <span className="font-medium text-[var(--color-text-primary)]">
                  {email}
                </span>
                . Confira sua caixa de entrada (e o spam).
              </p>
            </div>
          </div>

          {sp.resent === "1" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-success-primary)]">
              <CheckCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
              <span>Novo código enviado.</span>
            </div>
          )}

          <ClientVerifyForm email={email} />

          <div className="mt-6 grid gap-3 text-center">
            <form action={resendClientOtpAction}>
              <input type="hidden" name="email" value={email} />
              <button
                type="submit"
                className="text-text-sm font-medium text-[var(--color-text-brand-secondary)] hover:text-[var(--color-text-brand-secondary-hover)]"
              >
                Reenviar código
              </button>
            </form>
            <Link
              href="/cliente/recuperar"
              className="text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
            >
              Usar outro e-mail
            </Link>
          </div>

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
              Quase lá.
            </h2>
            <p className="max-w-md text-text-lg text-[var(--color-text-tertiary)]">
              Digite o código de 6 dígitos do e-mail e crie a senha nova.
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
