"use client";

import { useActionState, useEffect, useState } from "react";
import {
  ArrowCounterClockwiseIcon,
  CheckCircleIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { notify } from "@/components/ui/toast";
import { formatDateBR, formatMoney } from "@/lib/format";
import {
  CATEGORY_COLOR_CLASS,
  type CategoryColor,
} from "@/lib/zod/financeiro";
import { PAYMENT_LABEL, type PaymentMethod } from "@/lib/zod/caixa";
import {
  deleteExpenseAction,
  payExpenseAction,
  unpayExpenseAction,
  updateExpenseAction,
} from "../../actions";
import { ExpenseForm } from "./expense-form";
import { PayExpenseForm } from "./pay-form";

type State = { error?: string; ok?: boolean };

export type ExpenseRowData = {
  id: string;
  description: string;
  amount_cents: number;
  due_date: string;
  paid_at: string | null;
  payment_method: PaymentMethod | null;
  notes: string | null;
  category: { id: string; name: string; color: CategoryColor } | null;
};

export function ExpenseRow({
  expense,
  categories,
  todayISO,
  cashSessionOpen,
}: {
  expense: ExpenseRowData;
  categories: { id: string; name: string }[];
  todayISO: string;
  cashSessionOpen: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const isPaid = !!expense.paid_at;
  const isOverdue = !isPaid && expense.due_date < todayISO;
  const status = isPaid ? "paid" : isOverdue ? "overdue" : "open";

  const STATUS_BADGE: Record<typeof status, { label: string; cls: string }> = {
    paid: {
      label: "Paga",
      cls: "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    },
    open: {
      label: "Aberta",
      cls: "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    },
    overdue: {
      label: "Vencida",
      cls: "bg-[var(--color-error-50)] text-[var(--color-error-700)] border-[var(--color-error-200)]",
    },
  };

  return (
    <tr className="border-b border-[var(--color-border-secondary)] last:border-b-0 hover:bg-[var(--color-bg-secondary)]/30">
      <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-secondary)]">
        {formatDateBR(expense.due_date)}
      </td>
      <td className="px-6 py-4">
        {expense.category ? (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
              CATEGORY_COLOR_CLASS[expense.category.color]
            }`}
          >
            {expense.category.name}
          </span>
        ) : (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            —
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-text-sm font-medium text-[var(--color-text-primary)]">
        {expense.description}
        {expense.notes && (
          <p className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
            {expense.notes}
          </p>
        )}
      </td>
      <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
        {expense.payment_method ? PAYMENT_LABEL[expense.payment_method] : "—"}
      </td>
      <td className="px-6 py-4 text-right text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
        {formatMoney(expense.amount_cents)}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
            STATUS_BADGE[status].cls
          }`}
        >
          {STATUS_BADGE[status].label}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          {!isPaid && (
            <Dialog open={payOpen} onOpenChange={setPayOpen}>
              <DialogTrigger
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <CheckCircleIcon size={20} weight="duotone" />
                Pagar
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Marcar como paga</DialogTitle>
                  <DialogDescription>
                    {expense.description} — {formatMoney(expense.amount_cents)}
                  </DialogDescription>
                </DialogHeader>
                <PayExpenseForm
                  id={expense.id}
                  action={payExpenseAction}
                  defaultDate={todayISO}
                  cashSessionOpen={cashSessionOpen}
                  onDone={() => setPayOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
          {isPaid && <UnpayButton id={expense.id} />}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <PencilSimpleIcon size={20} weight="duotone" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar despesa</DialogTitle>
              </DialogHeader>
              <ExpenseForm
                action={updateExpenseAction}
                categories={categories}
                cashSessionOpen={cashSessionOpen}
                defaultDate={todayISO}
                initial={{
                  id: expense.id,
                  category_id: expense.category?.id ?? null,
                  description: expense.description,
                  amount_cents: expense.amount_cents,
                  due_date: expense.due_date,
                  notes: expense.notes,
                }}
                onSaved={() => setEditOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <DeleteButton id={expense.id} />
        </div>
      </td>
    </tr>
  );
}

export function ExpenseCard({
  expense,
  categories,
  todayISO,
  cashSessionOpen,
}: {
  expense: ExpenseRowData;
  categories: { id: string; name: string }[];
  todayISO: string;
  cashSessionOpen: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const isPaid = !!expense.paid_at;
  const isOverdue = !isPaid && expense.due_date < todayISO;
  const status = isPaid ? "paid" : isOverdue ? "overdue" : "open";

  const STATUS_BADGE: Record<typeof status, { label: string; cls: string }> = {
    paid: {
      label: "Paga",
      cls: "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    },
    open: {
      label: "Aberta",
      cls: "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    },
    overdue: {
      label: "Vencida",
      cls: "bg-[var(--color-error-50)] text-[var(--color-error-700)] border-[var(--color-error-200)]",
    },
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1 min-w-0">
          {expense.category && (
            <span
              className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
                CATEGORY_COLOR_CLASS[expense.category.color]
              }`}
            >
              {expense.category.name}
            </span>
          )}
          <span className="text-text-md font-semibold text-[var(--color-text-primary)] truncate">
            {expense.description}
          </span>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
            STATUS_BADGE[status].cls
          }`}
        >
          {STATUS_BADGE[status].label}
        </span>
      </div>

      {expense.notes && (
        <p className="mt-1 text-text-xs text-[var(--color-text-tertiary)]">
          {expense.notes}
        </p>
      )}

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3">
        <div className="grid gap-0.5">
          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Valor
          </span>
          <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)]">
            {formatMoney(expense.amount_cents)}
          </span>
        </div>
        <div className="grid gap-0.5 text-right text-text-xs text-[var(--color-text-tertiary)]">
          <span>Venc. {formatDateBR(expense.due_date)}</span>
          {expense.payment_method && (
            <span>{PAYMENT_LABEL[expense.payment_method]}</span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--color-border-secondary)] pt-3">
        {!isPaid && (
          <Dialog open={payOpen} onOpenChange={setPayOpen}>
            <DialogTrigger
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "col-span-2 h-10 justify-center",
              })}
            >
              <CheckCircleIcon size={20} weight="duotone" />
              Pagar
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Marcar como paga</DialogTitle>
                <DialogDescription>
                  {expense.description} — {formatMoney(expense.amount_cents)}
                </DialogDescription>
              </DialogHeader>
              <PayExpenseForm
                id={expense.id}
                action={payExpenseAction}
                defaultDate={todayISO}
                cashSessionOpen={cashSessionOpen}
                onDone={() => setPayOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
        {isPaid && <UnpayButton id={expense.id} variant="full" />}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "h-10 justify-center",
            })}
          >
            <PencilSimpleIcon size={20} weight="duotone" />
            Editar
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar despesa</DialogTitle>
            </DialogHeader>
            <ExpenseForm
              action={updateExpenseAction}
              categories={categories}
              cashSessionOpen={cashSessionOpen}
              defaultDate={todayISO}
              initial={{
                id: expense.id,
                category_id: expense.category?.id ?? null,
                description: expense.description,
                amount_cents: expense.amount_cents,
                due_date: expense.due_date,
                notes: expense.notes,
              }}
              onSaved={() => setEditOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <DeleteButton id={expense.id} variant="full" />
      </div>
    </Card>
  );
}

function UnpayButton({
  id,
  variant = "icon",
}: {
  id: string;
  variant?: "icon" | "full";
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    unpayExpenseAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Pagamento revertido");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Reverter este pagamento? Movimento de caixa será excluído."))
          e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant={variant === "full" ? "outline" : "ghost"}
        size="sm"
        disabled={pending}
        className={variant === "full" ? "col-span-2 h-10 w-full justify-center" : ""}
      >
        <ArrowCounterClockwiseIcon size={20} weight="duotone" />
        {variant === "full" && "Reverter"}
      </Button>
    </form>
  );
}

function DeleteButton({
  id,
  variant = "icon",
}: {
  id: string;
  variant?: "icon" | "full";
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    deleteExpenseAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Despesa excluída");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Excluir esta despesa?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant={variant === "full" ? "outline" : "ghost"}
        size="sm"
        disabled={pending}
        className={
          variant === "full"
            ? "h-10 w-full justify-center text-[var(--color-text-error-primary)]"
            : "text-[var(--color-text-error-primary)]"
        }
      >
        <TrashIcon size={20} weight="duotone" />
        {variant === "full" && "Excluir"}
      </Button>
    </form>
  );
}
