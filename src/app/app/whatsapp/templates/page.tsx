import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { TemplatesList } from "../_components/templates-list";
import type { WhatsappTrigger } from "@/lib/zod/whatsapp";

export default async function WhatsappTemplatesPage() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "whatsapp.gerenciar")) redirect("/app/whatsapp");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const { data } = await supabase
    .from("whatsapp_templates")
    .select("id, slug, trigger, name, body, is_active")
    .eq("barbershop_id", shopId)
    .order("name");

  const templates = (data ?? []).map((t) => ({
    id: t.id as string,
    slug: t.slug as string,
    trigger: t.trigger as WhatsappTrigger,
    name: t.name as string,
    body: t.body as string,
    is_active: t.is_active as boolean,
  }));

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Templates de mensagem
        </h1>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Edite os textos que o sistema envia automaticamente. Use{" "}
          <code className="rounded bg-[var(--color-bg-secondary)] px-1">
            {"{variavel}"}
          </code>{" "}
          para inserir dados do cliente/agendamento.
        </p>
      </div>
      <TemplatesList templates={templates} />
    </div>
  );
}
