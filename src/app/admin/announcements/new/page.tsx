import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { AnnouncementForm } from "../announcement-form";
import { createAnnouncementAction } from "../actions";

export default async function NewAnnouncementPage() {
  const supabase = await createClient();
  const { data: shops } = await supabase
    .from("barbershops")
    .select("id, name, slug")
    .order("name", { ascending: true });

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Link
          href="/admin/announcements"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "w-fit",
          })}
        >
          <ArrowLeftIcon size={20} weight="duotone" />
          Voltar
        </Link>
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Novo comunicado
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Será criado como rascunho. Publique depois para os gestores verem.
          </p>
        </div>
      </div>
      <Card className="p-6">
        <AnnouncementForm
          action={createAnnouncementAction}
          shops={shops ?? []}
          submitLabel="Criar rascunho"
        />
      </Card>
    </div>
  );
}
