import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { BarberProfileForm } from "@/app/app/barbeiros/[id]/barber-profile-form";
import { updateMyProfileAction } from "./actions";
import { NotificationsToggle } from "@/components/pwa/notifications-toggle";

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

export default async function PerfilPage() {
  const { user, membership } = await requireBarbershop();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const initial = {
    full_name: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    avatar_url: profile?.avatar_url ?? "",
  };

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
          <UserCircleIcon size={28} weight="duotone" />
        </div>
        <div>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Meu perfil
          </h1>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            {ROLE_LABEL[membership.role] ?? membership.role}
            {user.email ? ` · ${user.email}` : ""}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados pessoais</CardTitle>
          <CardDescription>
            Atualize seu nome, telefone e foto. Essas informações aparecem para
            sua equipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarberProfileForm
            action={updateMyProfileAction}
            barberId={user.id}
            initial={initial}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Avisos no celular ou navegador, mesmo com o app fechado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationsToggle
            vapidPublicKey={process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
