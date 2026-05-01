import { Card } from "@/components/ui/card";
import { requireClient } from "@/lib/auth/guards";
import { formatPhoneBR } from "@/lib/phone";
import { ProfileForm } from "./profile-form";
import { EmailForm } from "./email-form";
import { PasswordForm } from "./password-form";

export default async function ContaPerfilPage() {
  const user = await requireClient();
  const phoneFmt = user.profile.phone ? formatPhoneBR(user.profile.phone) : "";

  return (
    <div className="grid gap-5 sm:gap-8">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-sm">
          Meu perfil
        </h1>
        <p className="text-text-sm text-[var(--color-text-tertiary)] sm:text-text-md">
          Atualize seus dados, e-mail ou senha.
        </p>
      </div>

      <section className="grid gap-3">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
          Dados pessoais
        </h2>
        <Card className="p-4 sm:p-6">
          <ProfileForm
            initialName={user.profile.full_name ?? ""}
            initialPhone={phoneFmt}
          />
        </Card>
      </section>

      <section className="grid gap-3">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
          E-mail
        </h2>
        <Card className="p-4 sm:p-6">
          <EmailForm currentEmail={user.email ?? ""} />
        </Card>
      </section>

      <section className="grid gap-3">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
          Senha
        </h2>
        <Card className="p-4 sm:p-6">
          <PasswordForm />
        </Card>
      </section>
    </div>
  );
}
