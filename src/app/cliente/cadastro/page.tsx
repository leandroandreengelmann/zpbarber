import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarCheckIcon,
  HeartIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/lib/auth/current-user";
import { ClientSignupForm } from "./signup-form";

type SearchParams = Promise<{ next?: string }>;

export default async function ClientCadastroPage({
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
                Criar sua conta
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                Uma conta para agendar em qualquer barbearia da plataforma. Grátis e sem cartão.
              </p>
            </div>
          </div>

          <ClientSignupForm next={sp.next ?? ""} />

          <p className="mt-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Já tem conta?{" "}
            <Link
              href={`/cliente/login${sp.next ? `?next=${encodeURIComponent(sp.next)}` : ""}`}
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
              Tudo num só lugar.
            </h2>
            <p className="max-w-md text-text-lg text-[var(--color-text-tertiary)]">
              Agendamentos, fidelidade e histórico de qualquer barbearia da plataforma.
            </p>
            <ul className="grid gap-4">
              {[
                {
                  icon: StorefrontIcon,
                  text: "Agende em várias barbearias com a mesma conta",
                },
                {
                  icon: CalendarCheckIcon,
                  text: "Acompanhe e cancele seus horários pelo painel",
                },
                {
                  icon: HeartIcon,
                  text: "Veja seu progresso de fidelidade em cada barbearia",
                },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-text-md text-[var(--color-text-secondary)]"
                >
                  <Icon
                    size={28}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-[var(--color-blue-600)]"
                  />
                  <span>{text}</span>
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
