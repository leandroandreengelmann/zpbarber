import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  PaperPlaneTiltIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { formatDateTimeBR } from "@/lib/format";
import { AnnouncementForm } from "../announcement-form";
import {
  archiveAnnouncementAction,
  deleteAnnouncementAction,
  publishAnnouncementAction,
  updateAnnouncementAction,
} from "../actions";

const STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  draft: "secondary",
  published: "default",
  archived: "outline",
};

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [annRes, shopsRes, dismissalsRes] = await Promise.all([
    supabase.from("announcements").select("*").eq("id", id).maybeSingle(),
    supabase.from("barbershops").select("id, name, slug").order("name"),
    supabase
      .from("announcement_dismissals")
      .select("user_id", { count: "exact", head: true })
      .eq("announcement_id", id),
  ]);

  if (!annRes.data) notFound();
  const a = annRes.data;
  const dismissCount = dismissalsRes.count ?? 0;

  const updateBound = updateAnnouncementAction.bind(null, id);
  const publishBound = publishAnnouncementAction.bind(null, id);
  const archiveBound = archiveAnnouncementAction.bind(null, id);
  const deleteBound = deleteAnnouncementAction.bind(null, id);

  return (
    <div className="grid gap-4 sm:gap-6">
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
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="grid gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
                {a.title}
              </h1>
              <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                {STATUS_LABEL[a.status] ?? a.status}
              </Badge>
            </div>
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              {a.published_at
                ? `Publicado em ${formatDateTimeBR(a.published_at)}`
                : "Ainda não publicado"}
              {" · "}Dispensas: {dismissCount}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {a.status === "draft" && (
              <form action={publishBound} className="contents">
                <button
                  type="submit"
                  className={`${buttonVariants()} h-11 w-full sm:w-auto`}
                >
                  <PaperPlaneTiltIcon size={20} weight="duotone" />
                  Publicar
                </button>
              </form>
            )}
            {a.status === "published" && (
              <form action={archiveBound} className="contents">
                <button
                  type="submit"
                  className={`${buttonVariants({ variant: "outline" })} h-11 w-full sm:w-auto`}
                >
                  <ArchiveIcon size={20} weight="duotone" />
                  Arquivar
                </button>
              </form>
            )}
            <form action={deleteBound} className="contents">
              <button
                type="submit"
                className={`${buttonVariants({ variant: "destructive" })} h-11 w-full sm:w-auto`}
              >
                <TrashIcon size={20} weight="duotone" />
                Excluir
              </button>
            </form>
          </div>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <AnnouncementForm
          action={updateBound}
          shops={shopsRes.data ?? []}
          initial={{
            title: a.title,
            body: a.body,
            severity: a.severity,
            audience: a.audience,
            audience_shop_ids: a.audience_shop_ids,
            link_url: a.link_url,
            link_label: a.link_label,
            expires_at: a.expires_at,
          }}
          submitLabel="Salvar alterações"
        />
      </Card>
    </div>
  );
}
