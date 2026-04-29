import Link from "next/link";
import {
  ChatTextIcon,
  StarIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateBR } from "@/lib/format";
import { Stars } from "./_components/stars";
import { ReviewFilters } from "./_components/filters";
import { RespondButton } from "./_components/respond-button";
import { ToggleHidden } from "./_components/toggle-hidden";

type SearchParams = {
  barber?: string;
  rating?: string;
  period?: string;
};

function periodToFromDate(period?: string): string | null {
  if (!period || period === "all") return null;
  const days = Number(period);
  if (!Number.isFinite(days) || days <= 0) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function KpiCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="grid gap-2 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
            {icon}
          </div>
          <span className="text-text-sm text-[var(--color-text-tertiary)]">{label}</span>
        </div>
        <div className="text-display-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
          {value}
        </div>
        {hint && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">{hint}</span>
        )}
      </CardContent>
    </Card>
  );
}

export default async function AvaliacoesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = membership.role === "gestor";
  const shopId = membership.barbershop!.id;
  const sp = await searchParams;
  const fromIso = periodToFromDate(sp.period);
  const ratingFilter = sp.rating && sp.rating !== "all" ? Number(sp.rating) : null;
  const barberFilter = sp.barber && sp.barber !== "all" ? sp.barber : null;

  const supabase = await createClient();

  const { data: barberRows } = await supabase
    .from("barbershop_members")
    .select("user_id, profiles(full_name)")
    .eq("barbershop_id", shopId)
    .eq("role", "barbeiro")
    .eq("is_active", true);
  const barbers = (barberRows ?? [])
    .map((r) => ({
      id: r.user_id as string,
      name: (r.profiles as { full_name?: string } | null)?.full_name ?? "Barbeiro",
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const { data: summary } = await supabase.rpc("fn_review_summary", {
    p_barbershop: shopId,
    ...(barberFilter ? { p_barber: barberFilter } : {}),
    ...(fromIso ? { p_from: fromIso } : {}),
  });
  const sum =
    summary?.[0] ?? {
      total_count: 0,
      avg_rating: 0,
      star_5: 0,
      star_4: 0,
      star_3: 0,
      star_2: 0,
      star_1: 0,
    };
  const total = Number(sum.total_count) || 0;
  const avg = Number(sum.avg_rating) || 0;
  const dist: { stars: number; count: number }[] = [
    { stars: 5, count: Number(sum.star_5) || 0 },
    { stars: 4, count: Number(sum.star_4) || 0 },
    { stars: 3, count: Number(sum.star_3) || 0 },
    { stars: 2, count: Number(sum.star_2) || 0 },
    { stars: 1, count: Number(sum.star_1) || 0 },
  ];

  let q = supabase
    .from("reviews")
    .select(
      "id, rating, comment, source, is_hidden, manager_response, responded_at, created_at, client_id, barber_id, appointment_id, clients(full_name), profiles!reviews_barber_id_fkey(full_name)"
    )
    .eq("barbershop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(100);
  if (barberFilter) q = q.eq("barber_id", barberFilter);
  if (ratingFilter) q = q.eq("rating", ratingFilter);
  if (fromIso) q = q.gte("created_at", fromIso);
  const { data: reviews } = await q;

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Avaliações
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Veja a opinião dos clientes sobre o atendimento.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<StarIcon size={24} weight="fill" />}
          label="Nota média"
          value={total > 0 ? avg.toFixed(2).replace(".", ",") : "—"}
          hint={total > 0 ? `Em ${total} avaliação${total > 1 ? "ões" : ""}` : "Sem avaliações"}
        />
        <KpiCard
          icon={<ChatTextIcon size={24} weight="duotone" />}
          label="Total de avaliações"
          value={total.toString()}
        />
        <KpiCard
          icon={<StarIcon size={24} weight="duotone" />}
          label="5 estrelas"
          value={dist[0].count.toString()}
          hint={total > 0 ? `${Math.round((dist[0].count / total) * 100)}% do total` : undefined}
        />
        <KpiCard
          icon={<StarIcon size={24} weight="duotone" />}
          label="≤ 3 estrelas"
          value={(dist[2].count + dist[3].count + dist[4].count).toString()}
          hint="Atenção: feedback negativo"
        />
      </div>

      <Card>
        <CardContent className="grid gap-3 py-5">
          <span className="text-text-sm font-medium text-[var(--color-text-secondary)]">
            Distribuição de notas
          </span>
          <div className="grid gap-1.5">
            {dist.map((d) => {
              const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
              return (
                <div key={d.stars} className="flex items-center gap-3">
                  <span className="inline-flex w-12 items-center gap-1 text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                    {d.stars}
                    <StarIcon size={14} weight="fill" className="text-[#F5A524]" />
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#F5A524]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                    {d.count}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ReviewFilters barbers={barbers} />

      {(reviews ?? []).length === 0 ? (
        <Card>
          <CardContent className="grid gap-2 py-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-fg-quaternary)]">
              <StarIcon size={28} weight="duotone" />
            </div>
            <p className="text-text-md font-medium text-[var(--color-text-primary)]">
              Nenhuma avaliação encontrada
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Compartilhe o link público com clientes após o atendimento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {(reviews ?? []).map((r) => {
            const client = (r.clients as { full_name?: string } | null)?.full_name;
            const barber = (r.profiles as { full_name?: string } | null)?.full_name;
            return (
              <Card key={r.id} className={r.is_hidden ? "opacity-60" : undefined}>
                <CardContent className="grid gap-3 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="grid gap-1">
                      <Stars rating={r.rating} />
                      <div className="flex flex-wrap items-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
                        {client && (
                          <span className="inline-flex items-center gap-1">
                            <UserCircleIcon size={16} weight="duotone" />
                            {r.client_id ? (
                              <Link
                                href={`/app/clientes/${r.client_id}`}
                                className="hover:underline"
                              >
                                {client}
                              </Link>
                            ) : (
                              client
                            )}
                          </span>
                        )}
                        {barber && (
                          <span className="inline-flex items-center gap-1">
                            · com{" "}
                            {r.barber_id ? (
                              <Link
                                href={`/app/barbeiros/${r.barber_id}`}
                                className="hover:underline"
                              >
                                {barber}
                              </Link>
                            ) : (
                              barber
                            )}
                          </span>
                        )}
                        <span>· {formatDateBR(r.created_at)}</span>
                        <Badge variant="outline" className="ml-1">
                          {r.source === "public"
                            ? "Pública"
                            : r.source === "whatsapp"
                              ? "WhatsApp"
                              : "Manual"}
                        </Badge>
                        {r.is_hidden && (
                          <Badge variant="secondary">Oculta</Badge>
                        )}
                      </div>
                    </div>
                    {isGestor && (
                      <div className="flex items-center gap-2">
                        <RespondButton reviewId={r.id} current={r.manager_response} />
                        <ToggleHidden reviewId={r.id} hidden={r.is_hidden} />
                      </div>
                    )}
                  </div>
                  {r.comment && (
                    <p className="text-text-md text-[var(--color-text-secondary)]">
                      “{r.comment}”
                    </p>
                  )}
                  {r.manager_response && (
                    <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
                      <p className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Resposta da barbearia
                        {r.responded_at && ` · ${formatDateBR(r.responded_at)}`}
                      </p>
                      <p className="mt-1 text-text-sm text-[var(--color-text-secondary)]">
                        {r.manager_response}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
