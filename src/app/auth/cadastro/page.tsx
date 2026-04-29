import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getPlatformSettings } from "@/lib/platform-settings";
import { SignupForm } from "./signup-form";

export default async function CadastroPage() {
  const user = await getCurrentUser();
  if (user) {
    if (user.profile.is_super_admin) redirect("/admin");
    redirect("/app");
  }

  const settings = await getPlatformSettings();
  const trialDays = settings.default_trial_days ?? 14;

  return (
    <div className="relative grid min-h-screen grid-cols-1 bg-[var(--color-bg-primary)] lg:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-[440px]">
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
                Crie sua barbearia
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                {trialDays} dias grátis para testar tudo. Sem cartão de crédito.
              </p>
            </div>
          </div>

          <SignupForm trialDays={trialDays} />

          <p className="mt-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Já tem conta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[var(--color-text-brand-secondary)] hover:text-[var(--color-text-brand-secondary-hover)]"
            >
              Entrar
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
              Tudo que sua barbearia precisa, em minutos.
            </h2>
            <p className="max-w-md text-text-lg text-[var(--color-text-tertiary)]">
              Agenda, equipe, caixa, fidelidade e WhatsApp em uma só plataforma.
            </p>
            <ul className="grid gap-3">
              {[
                `${trialDays} dias de teste grátis, com tudo liberado`,
                "Sem cartão de crédito, sem fidelidade",
                "Página pública para o cliente agendar sozinho",
                "Suporte humano por WhatsApp",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-text-md text-[var(--color-text-secondary)]"
                >
                  <CheckCircleIcon
                    size={20}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-[var(--color-success-600)]"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-text-sm text-[var(--color-text-quaternary)]">
            © ZP Barber · v0.1
          </p>
        </div>
      </div>
    </div>
  );
}
