import { notFound } from "next/navigation";
import {
  CalendarBlankIcon,
  ScissorsIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import { PublicReviewForm } from "./review-form";

function formatScheduledAt(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PublicReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string }>;
}) {
  const { slug } = await params;
  const { a: appointmentId } = await searchParams;

  const supabase = createAdminClient();
  const { data: shop } = await supabase
    .from("barbershops")
    .select("id, name")
    .eq("slug", slug)
    .maybeSingle();
  if (!shop) notFound();

  if (!appointmentId) {
    return (
      <div className="grid gap-4">
        <h1 className="text-display-md font-semibold tracking-tight text-[var(--color-text-primary)]">
          Avaliar atendimento
        </h1>
        <Card>
          <CardContent className="grid gap-2 py-8 text-center">
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              Link inválido. Use o link enviado pela {shop.name} após o atendimento.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: appointment } = await supabase
    .from("appointments")
    .select(
      "id, barbershop_id, scheduled_at, status, services(name), profiles!appointments_barber_id_fkey(full_name), clients(full_name)"
    )
    .eq("id", appointmentId)
    .maybeSingle();

  if (!appointment || appointment.barbershop_id !== shop.id) {
    return (
      <div className="grid gap-4">
        <h1 className="text-display-md font-semibold tracking-tight text-[var(--color-text-primary)]">
          Avaliar atendimento
        </h1>
        <Card>
          <CardContent className="grid gap-2 py-8 text-center">
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              Atendimento não encontrado para esta barbearia.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: existing } = await supabase
    .from("reviews")
    .select("id, rating, comment")
    .eq("appointment_id", appointmentId)
    .maybeSingle();

  const service = (appointment.services as { name?: string } | null)?.name;
  const barber = (appointment.profiles as { full_name?: string } | null)?.full_name;
  const client = (appointment.clients as { full_name?: string } | null)?.full_name;
  const when = formatScheduledAt(appointment.scheduled_at);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2">
        <h1 className="text-display-md font-semibold tracking-tight text-[var(--color-text-primary)]">
          Como foi a sua experiência?
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Sua avaliação ajuda a {shop.name} e o profissional a melhorar continuamente.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do atendimento</CardTitle>
          <CardDescription>Confirme antes de avaliar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 text-text-md text-[var(--color-text-secondary)]">
          {client && (
            <div className="flex items-center gap-2.5">
              <UserCircleIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-quaternary)]"
              />
              <span>{client}</span>
            </div>
          )}
          {service && (
            <div className="flex items-center gap-2.5">
              <ScissorsIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-quaternary)]"
              />
              <span>{service}</span>
            </div>
          )}
          {barber && (
            <div className="flex items-center gap-2.5">
              <UserCircleIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-quaternary)]"
              />
              <span>com {barber}</span>
            </div>
          )}
          {when && (
            <div className="flex items-center gap-2.5">
              <CalendarBlankIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-quaternary)]"
              />
              <span>{when}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {existing ? (
            <div className="grid gap-2 text-center">
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Você já avaliou este atendimento.
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Pode enviar novamente abaixo se quiser atualizar a sua avaliação.
              </p>
              <div className="mt-4">
                <PublicReviewForm slug={slug} appointmentId={appointmentId} />
              </div>
            </div>
          ) : (
            <PublicReviewForm slug={slug} appointmentId={appointmentId} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
