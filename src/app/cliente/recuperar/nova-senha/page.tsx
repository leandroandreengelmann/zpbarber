import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientResetForm } from "./reset-form";

export default async function ClientResetPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/cliente/recuperar?error=invalid-email");

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
                Definir nova senha
              </h1>
              <p className="text-text-md text-[var(--color-text-tertiary)]">
                Escolha uma senha forte com pelo menos 8 caracteres.
              </p>
            </div>
          </div>

          <ClientResetForm />

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
              Defina uma senha que só você conhece. Depois você poderá entrar normalmente.
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
