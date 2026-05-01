import { Card } from "@/components/ui/card";
import { requireClient } from "@/lib/auth/guards";
import { formatPhoneBR } from "@/lib/phone";
import { ProfileForm } from "./profile-form";

export default async function ContaPerfilPage() {
  const user = await requireClient();
  const phoneFmt = user.profile.phone ? formatPhoneBR(user.profile.phone) : "";

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Meu perfil
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Atualize seus dados pessoais. Seu e-mail é{" "}
          <span className="font-medium text-[var(--color-text-primary)]">
            {user.email}
          </span>
          .
        </p>
      </div>

      <Card className="p-6">
        <ProfileForm
          initialName={user.profile.full_name ?? ""}
          initialPhone={phoneFmt}
        />
      </Card>
    </div>
  );
}
