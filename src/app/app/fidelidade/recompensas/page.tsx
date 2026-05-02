import { redirect } from "next/navigation";
import { GiftIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import type { LoyaltyRewardType } from "@/lib/zod/fidelidade";
import { saveLoyaltyRewardAction } from "../actions";
import { RewardForm } from "./_components/reward-form";
import { RewardCard, RewardRow } from "./_components/reward-row";

export default async function FidelidadeRecompensasPage() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "fidelidade.gerenciar")) redirect("/app/fidelidade");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [rewardsRes, servicesRes, productsRes] = await Promise.all([
    supabase
      .from("loyalty_rewards")
      .select(
        "id, name, description, cost_points, reward_type, reward_value, service_id, product_id, is_active"
      )
      .eq("barbershop_id", shopId)
      .order("created_at", { ascending: false }),
    supabase
      .from("services")
      .select("id, name")
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("products")
      .select("id, name")
      .eq("is_active", true)
      .order("name"),
  ]);

  const rewards = (rewardsRes.data ?? []).map((r) => ({
    ...r,
    reward_type: r.reward_type as LoyaltyRewardType,
  }));
  const services = (servicesRes.data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
  }));
  const products = (productsRes.data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
  }));

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Recompensas
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Cadastre o que o cliente pode trocar pelos pontos.
          </p>
        </div>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
          >
            <PlusIcon size={28} weight="duotone" />
            Nova recompensa
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova recompensa</DialogTitle>
              <DialogDescription>
                Defina o custo em pontos e o que o cliente recebe.
              </DialogDescription>
            </DialogHeader>
            <RewardForm
              action={saveLoyaltyRewardAction}
              services={services}
              products={products}
            />
          </DialogContent>
        </Dialog>
      </div>

      {rewards.length === 0 ? (
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <GiftIcon size={28} weight="duotone" />
              </div>
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nenhuma recompensa cadastrada
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Crie a primeira para o cliente poder resgatar pontos.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {rewards.map((r) => (
              <li key={r.id}>
                <RewardCard
                  reward={r}
                  services={services}
                  products={products}
                />
              </li>
            ))}
          </ul>
          <Card className="hidden p-0 sm:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Detalhe
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Custo
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewards.map((r) => (
                      <RewardRow
                        key={r.id}
                        reward={r}
                        services={services}
                        products={products}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
