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
import { PAYMENT_LABEL, type PaymentMethod } from "@/lib/zod/caixa";
import {
  deleteReceivableAction,
  receiveReceivableAction,
  unreceiveReceivableAction,
  updateReceivableAction,
} from "../../actions";
import { ReceivableForm } from "./receivable-form";
import { ReceiveForm } from "./receive-form";

type State = { error?: string; ok?: boolean };

export type ReceivableRowData = {
  id: string;
  description: string;
  amount_cents: number;
  due_date: string;
  received_at: string | null;
  payment_method: PaymentMethod | null;
  notes: string | null;
  client: { id: string; full_name: string } | null;
};

export function ReceivableRow({
  receivable,
  clients,
  todayISO,
  cashSessionOpen,
}: {
  receivable: ReceivableRowData;
  clients: { id: string; full_name: string }[];
  todayISO: string;
  cashSessionOpen: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [recOpen, setRecOpen] = useState(false);

  const isReceived = !!receivable.received_at;
  const isOverdue = !isReceived && receivable.due_date < todayISO;
  const status = isReceived ? "received" : isOverdue ? "overdue" : "open";

  const STATUS_BADGE: Record<typeof status, { label: string; cls: string }> = {
    received: {
      label: "Recebido",
      cls: "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    },
    open: {
      label: "Aberto",
      cls: "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    },
    overdue: {
      label: "Vencido",
      cls: "bg-[var(--color-error-50)] text-[var(--color-error-700)] border-[var(--color-error-200)]",
    },
  };

  return (
    <tr className="border-b border-[var(--color-border-secondary)] last:border-b-0 hover:bg-[var(--color-bg-secondary)]/30">
      <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-secondary)]">
        {formatDateBR(receivable.due_date)}
      </td>
      <td className="px-6 py-4 text-text-sm text-[var(--color-text-secondary)]">
        {receivable.client?.full_name ?? (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">—</span>
        )}
      </td>
      <td className="px-6 py-4 text-text-sm font-medium text-[var(--color-text-primary)]">
        {receivable.description}
        {receivable.notes && (
          <p className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
            {receivable.notes}
          </p>
        )}
      </td>
      <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
        {receivable.payment_method
          ? PAYMENT_LABEL[receivable.payment_method]
          : "—"}
      </td>
      <td className="px-6 py-4 text-right text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
        {formatMoney(receivable.amount_cents)}
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
          {!isReceived && (
            <Dialog open={recOpen} onOpenChange={setRecOpen}>
              <DialogTrigger
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <CheckCircleIcon size={20} weight="duotone" />
                Receber
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Marcar como recebido</DialogTitle>
                  <DialogDescription>
                    {receivable.description} —{" "}
                    {formatMoney(receivable.amount_cents)}
                  </DialogDescription>
                </DialogHeader>
                <ReceiveForm
                  id={receivable.id}
                  action={receiveReceivableAction}
                  defaultDate={todayISO}
                  cashSessionOpen={cashSessionOpen}
                  onDone={() => setRecOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
          {isReceived && <UnreceiveButton id={receivable.id} />}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <PencilSimpleIcon size={20} weight="duotone" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar recebível</DialogTitle>
              </DialogHeader>
              <ReceivableForm
                action={updateReceivableAction}
                clients={clients}
                cashSessionOpen={cashSessionOpen}
                defaultDate={todayISO}
                initial={{
                  id: receivable.id,
                  client_id: receivable.client?.id ?? null,
                  description: receivable.description,
                  amount_cents: receivable.amount_cents,
                  due_date: receivable.due_date,
                  notes: receivable.notes,
                }}
                onSaved={() => setEditOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <DeleteButton id={receivable.id} />
        </div>
      </td>
    </tr>
  );
}

export function ReceivableCard({
  receivable,
  clients,
  todayISO,
  cashSessionOpen,
}: {
  receivable: ReceivableRowData;
  clients: { id: string; full_name: string }[];
  todayISO: string;
  cashSessionOpen: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [recOpen, setRecOpen] = useState(false);

  const isReceived = !!receivable.received_at;
  const isOverdue = !isReceived && receivable.due_date < todayISO;
  const status = isReceived ? "received" : isOverdue ? "overdue" : "open";

  const STATUS_BADGE: Record<typeof status, { label: string; cls: string }> = {
    received: {
      label: "Recebido",
      cls: "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    },
    open: {
      label: "Aberto",
      cls: "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    },
    overdue: {
      label: "Vencido",
      cls: "bg-[var(--color-error-50)] text-[var(--color-error-700)] border-[var(--color-error-200)]",
    },
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-0.5 min-w-0">
          <span className="text-text-md font-semibold text-[var(--color-text-primary)] truncate">
            {receivable.description}
          </span>
          {receivable.client?.full_name && (
            <span className="text-text-xs text-[var(--color-text-tertiary)] truncate">
              {receivable.client.full_name}
            </span>
          )}
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
            STATUS_BADGE[status].cls
          }`}
        >
          {STATUS_BADGE[status].label}
        </span>
      </div>

      {receivable.notes && (
        <p className="mt-1 text-text-xs text-[var(--color-text-tertiary)]">
          {receivable.notes}
        </p>
      )}

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3">
        <div className="grid gap-0.5">
          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Valor
          </span>
          <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)]">
            {formatMoney(receivable.amount_cents)}
          </span>
        </div>
        <div className="grid gap-0.5 text-right text-text-xs text-[var(--color-text-tertiary)]">
          <span>Venc. {formatDateBR(receivable.due_date)}</span>
          {receivable.payment_method && (
            <span>{PAYMENT_LABEL[receivable.payment_method]}</span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--color-border-secondary)] pt-3 sm:grid-cols-4">
        {!isReceived && (
          <Dialog open={recOpen} onOpenChange={setRecOpen}>
            <DialogTrigger
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "col-span-2 h-10 justify-center sm:col-span-2",
              })}
            >
              <CheckCircleIcon size={20} weight="duotone" />
              Receber
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Marcar como recebido</DialogTitle>
                <DialogDescription>
                  {receivable.description} —{" "}
                  {formatMoney(receivable.amount_cents)}
                </DialogDescription>
              </DialogHeader>
              <ReceiveForm
                id={receivable.id}
                action={receiveReceivableAction}
                defaultDate={todayISO}
                cashSessionOpen={cashSessionOpen}
                onDone={() => setRecOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
        {isReceived && (
          <UnreceiveButton id={receivable.id} variant="full" />
        )}
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
              <DialogTitle>Editar recebível</DialogTitle>
            </DialogHeader>
            <ReceivableForm
              action={updateReceivableAction}
              clients={clients}
              cashSessionOpen={cashSessionOpen}
              defaultDate={todayISO}
              initial={{
                id: receivable.id,
                client_id: receivable.client?.id ?? null,
                description: receivable.description,
                amount_cents: receivable.amount_cents,
                due_date: receivable.due_date,
                notes: receivable.notes,
              }}
              onSaved={() => setEditOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <DeleteButton id={receivable.id} variant="full" />
      </div>
    </Card>
  );
}

function UnreceiveButton({
  id,
  variant = "icon",
}: {
  id: string;
  variant?: "icon" | "full";
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    unreceiveReceivableAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Recebimento revertido");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (
          !confirm(
            "Reverter este recebimento? Movimento de caixa será excluído."
          )
        )
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
    deleteReceivableAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Recebível excluído");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Excluir este recebível?")) e.preventDefault();
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
