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
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Fidelidade
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Seu progresso em cada barbearia da plataforma.
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
  return (
    <Card className="grid gap-4 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
          {shopLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shopLogoUrl} alt={shopName} className="size-full object-cover" />
          ) : (
            <StorefrontIcon size={24} weight="duotone" className="text-[var(--color-fg-secondary)]" />
          )}
        </div>
        <div className="grid flex-1 gap-0.5 min-w-0">
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
      </div>

      <div className="grid gap-1.5">
        <div className="h-2.5 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
          <div
            className="h-full rounded-full bg-[var(--color-blue-600)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-text-xs text-[var(--color-text-tertiary)]">
          <span>{pct}%</span>
          <span>
            Faltam {Math.max(0, required - current)} para a recompensa
          </span>
        </div>
      </div>
    </Card>
  );
}
