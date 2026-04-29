import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { buildClosingSummary } from "../../actions";
import { ClosingReportView } from "../_components/closing-report-view";

export default async function CaixaReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { membership } = await requireBarbershop();
  if (membership.role === "barbeiro") {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              Apenas gestor e recepcionista podem visualizar relatórios de caixa.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { id } = await params;
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("cash_sessions")
    .select("id, status, barbershop_id")
    .eq("id", id)
    .maybeSingle();
  if (!row) notFound();
  if (row.barbershop_id !== shopId) notFound();
  if (row.status === "open") redirect("/app/caixa");

  const summary = await buildClosingSummary(id);
  if (!summary) notFound();

  return (
    <div className="mx-auto w-full grid max-w-5xl gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Relatório de caixa
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Sessão fechada — imprima ou baixe em PDF.
          </p>
        </div>
        <Link
          href="/app/caixa/relatorios"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "h-11 w-full sm:w-auto",
          })}
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Voltar
        </Link>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <ClosingReportView summary={summary} backHref="/app/caixa/relatorios" />
        </CardContent>
      </Card>
    </div>
  );
}
