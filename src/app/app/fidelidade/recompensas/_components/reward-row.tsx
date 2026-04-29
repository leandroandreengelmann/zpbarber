"use client";

import { useActionState, useEffect, useState } from "react";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { notify } from "@/components/ui/toast";
import {
  LOYALTY_REWARD_TYPE_LABEL,
  type LoyaltyRewardType,
} from "@/lib/zod/fidelidade";
import {
  deleteLoyaltyRewardAction,
  saveLoyaltyRewardAction,
} from "../../actions";
import { RewardForm } from "./reward-form";

type State = { error?: string; ok?: boolean };

type Reward = {
  id: string;
  name: string;
  description: string | null;
  cost_points: number;
  reward_type: LoyaltyRewardType;
  reward_value: number | null;
  service_id: string | null;
  product_id: string | null;
  is_active: boolean;
};

type Service = { id: string; name: string };
type Product = { id: string; name: string };

function formatRewardValue(r: Reward, services: Service[], products: Product[]) {
  switch (r.reward_type) {
    case "discount_amount":
      return `R$ ${r.reward_value ?? 0} off`;
    case "discount_percent":
      return `${r.reward_value ?? 0}% off`;
    case "free_service":
      return services.find((s) => s.id === r.service_id)?.name ?? "—";
    case "free_product":
      return products.find((p) => p.id === r.product_id)?.name ?? "—";
  }
}

function DeleteRewardButton({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    deleteLoyaltyRewardAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Recompensa excluída");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Excluir esta recompensa?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={pending}
        className="text-[var(--color-text-error-primary)]"
      >
        <TrashIcon size={20} weight="duotone" />
        Excluir
      </Button>
    </form>
  );
}

function RewardEditDialog({
  reward,
  services,
  products,
  triggerClassName,
  showLabel,
}: {
  reward: Reward;
  services: Service[];
  products: Product[];
  triggerClassName: string;
  showLabel: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={triggerClassName}>
        <PencilSimpleIcon size={20} weight="duotone" />
        {showLabel && "Editar"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar recompensa</DialogTitle>
        </DialogHeader>
        <RewardForm
          action={saveLoyaltyRewardAction}
          services={services}
          products={products}
          initial={reward}
          onSaved={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function RewardCard({
  reward,
  services,
  products,
}: {
  reward: Reward;
  services: Service[];
  products: Product[];
}) {
  return (
    <Card className={`p-4 ${!reward.is_active ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-0.5 min-w-0">
          <span className="text-text-md font-semibold text-[var(--color-text-primary)] truncate">
            {reward.name}
          </span>
          {reward.description && (
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {reward.description}
            </span>
          )}
        </div>
        <span className="shrink-0 text-text-xs text-[var(--color-text-tertiary)]">
          {reward.is_active ? "Ativa" : "Inativa"}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3">
        <div className="grid gap-0.5">
          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {LOYALTY_REWARD_TYPE_LABEL[reward.reward_type]}
          </span>
          <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
            {formatRewardValue(reward, services, products)}
          </span>
        </div>
        <div className="grid gap-0.5 text-right">
          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Custo
          </span>
          <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)]">
            {reward.cost_points} pts
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--color-border-secondary)] pt-3">
        <RewardEditDialog
          reward={reward}
          services={services}
          products={products}
          triggerClassName={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "h-10 justify-center",
          })}
          showLabel
        />
        <DeleteRewardButton id={reward.id} />
      </div>
    </Card>
  );
}

export function RewardRow({
  reward,
  services,
  products,
}: {
  reward: Reward;
  services: Service[];
  products: Product[];
}) {
  return (
    <tr className="border-b border-[var(--color-border-secondary)] last:border-b-0">
      <td className="px-6 py-3">
        <div className="grid gap-0.5">
          <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
            {reward.name}
          </span>
          {reward.description && (
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {reward.description}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
        {LOYALTY_REWARD_TYPE_LABEL[reward.reward_type]}
      </td>
      <td className="px-6 py-3 text-text-sm text-[var(--color-text-primary)]">
        {formatRewardValue(reward, services, products)}
      </td>
      <td className="px-6 py-3 text-right text-text-sm font-medium text-[var(--color-text-primary)] tabular-nums">
        {reward.cost_points} pts
      </td>
      <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
        {reward.is_active ? "Ativa" : "Inativa"}
      </td>
      <td className="px-6 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <RewardEditDialog
            reward={reward}
            services={services}
            products={products}
            triggerClassName={buttonVariants({ variant: "ghost", size: "sm" })}
            showLabel
          />
          <DeleteRewardButton id={reward.id} />
        </div>
      </td>
    </tr>
  );
}
