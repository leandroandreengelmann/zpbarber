import Link from "next/link";
import { HeartIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card";
import { requireClient } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";

export default async function ContaFidelidadePage() {
  await requireClient();
  const supabase = await createClient();

  const { data } = await supabase.rpc("fn_client_my_loyalty");
  const cards = data ?? [];

  return (
    <div className="grid gap-5 sm:gap-8">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-sm">
          Fidelidade
        </h1>
        <p className="text-text-sm text-[var(--color-text-tertiary)] sm:text-text-md">
          Seu progresso em cada barbearia.
        </p>
      </div>

      {cards.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
            <HeartIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhuma cartela ativa
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              A cada atendimento, sua cartela enche. Quando completa, vira recompensa.
            </p>
          </div>
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.card_id}>
              <LoyaltyCard
                shopName={c.shop_name}
                shopSlug={c.shop_slug}
                shopLogoUrl={c.shop_logo_url}
                current={c.current_count}
                required={c.required}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LoyaltyCard({
  shopName,
  shopSlug,
  shopLogoUrl,
  current,
  required,
}: {
  shopName: string;
  shopSlug: string;
  shopLogoUrl: string | null;
  current: number;
  required: number;
}) {
  const pct = required > 0 ? Math.min(100, Math.round((current / required) * 100)) : 0;
  const remaining = Math.max(0, required - current);
  return (
    <Card className="grid gap-4 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
          {shopLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shopLogoUrl} alt={shopName} className="size-full object-cover" />
          ) : (
            <StorefrontIcon size={26} weight="duotone" className="text-[var(--color-fg-secondary)]" />
          )}
        </div>
        <div className="grid min-w-0 flex-1 gap-0.5">
          <Link
            href={`/${shopSlug}`}
            className="truncate text-text-md font-semibold text-[var(--color-text-primary)] hover:underline"
          >
            {shopName}
          </Link>
          <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
            {current} de {required} atendimentos
          </span>
        </div>
        <span className="shrink-0 rounded-md bg-[var(--color-blue-50)] px-2 py-1 text-text-xs font-bold tabular-nums text-[var(--color-blue-700)]">
          {pct}%
        </span>
      </div>

      <div className="grid gap-2">
        <div className="h-3 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
          <div
            className="h-full rounded-full bg-[var(--color-blue-600)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-text-xs text-[var(--color-text-tertiary)] sm:text-text-sm">
          {remaining === 0
            ? "Recompensa disponível!"
            : `Faltam ${remaining} ${remaining === 1 ? "atendimento" : "atendimentos"} para a recompensa.`}
        </p>
      </div>
    </Card>
  );
}
