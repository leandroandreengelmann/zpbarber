"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import {
  PackageIcon,
  PercentIcon,
  PlusIcon,
  ReceiptIcon,
  ScissorsIcon,
  TrashIcon,
  UserCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMoney, parseMoneyToCents } from "@/lib/format";
import {
  PAYMENT_LABEL,
  PAYMENT_METHODS,
  type PaymentMethod,
} from "@/lib/zod/caixa";

export type SaleClient = { id: string; full_name: string; phone: string | null };
export type SaleService = { id: string; name: string; price_cents: number };
export type SaleProduct = {
  id: string;
  name: string;
  price_cents: number;
  stock_qty: number;
};

export type SalePrefill = {
  appointment_id: string;
  client_id: string;
  barber_id: string;
  items: {
    service_id: string;
    description: string;
    quantity: number;
    unit_cents: number;
  }[];
};

type State = { error?: string; ok?: boolean; saleId?: string };

type Item = {
  uid: string;
  service_id: string;
  product_id: string;
  description: string;
  quantity: number;
  unit_cents: number;
};

type Payment = {
  uid: string;
  method: PaymentMethod;
  amount_cents: number;
  paid_by_name: string;
};

let _uid = 0;
const nextId = () => `tmp-${++_uid}`;

const NONE = "__none__";

export function NewSaleForm({
  action,
  clients,
  services,
  products = [],
  prefill,
  onSuccess,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  clients: SaleClient[];
  services: SaleService[];
  products?: SaleProduct[];
  prefill?: SalePrefill;
  onSuccess?: () => void;
}) {
  const locked = !!prefill;
  const [clientId, setClientId] = useState(prefill?.client_id ?? "");
  const [items, setItems] = useState<Item[]>(
    prefill
      ? prefill.items.map((it) => ({
          uid: nextId(),
          product_id: "",
          ...it,
        }))
      : [],
  );
  const [payments, setPayments] = useState<Payment[]>([]);
  const [discountCents, setDiscountCents] = useState(0);
  const [notes, setNotes] = useState("");
  const [redemptionCode, setRedemptionCode] = useState("");
  const [serviceSelectKey, setServiceSelectKey] = useState(0);
  const [productSelectKey, setProductSelectKey] = useState(0);
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.quantity * it.unit_cents, 0),
    [items],
  );
  const total = Math.max(0, subtotal - discountCents);
  const paid = useMemo(
    () => payments.reduce((s, p) => s + p.amount_cents, 0),
    [payments],
  );
  const remaining = total - paid;

  useEffect(() => {
    if (state.ok) {
      notify.success("Venda registrada", { description: "Comprovante salvo no caixa." });
      onSuccess?.();
    }
    if (state.error) notify.error("Não foi possível registrar", { description: state.error });
  }, [state, onSuccess]);

  function addService(serviceId: string) {
    const svc = services.find((s) => s.id === serviceId);
    if (!svc) return;
    setItems((prev) => [
      ...prev,
      {
        uid: nextId(),
        service_id: svc.id,
        product_id: "",
        description: svc.name,
        quantity: 1,
        unit_cents: svc.price_cents,
      },
    ]);
    setServiceSelectKey((k) => k + 1);
  }

  function addProduct(productId: string) {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setItems((prev) => [
      ...prev,
      {
        uid: nextId(),
        service_id: "",
        product_id: prod.id,
        description: prod.name,
        quantity: 1,
        unit_cents: prod.price_cents,
      },
    ]);
    setProductSelectKey((k) => k + 1);
  }

  function addCustomItem() {
    setItems((prev) => [
      ...prev,
      {
        uid: nextId(),
        service_id: "",
        product_id: "",
        description: "",
        quantity: 1,
        unit_cents: 0,
      },
    ]);
  }

  function updateItem(uid: string, patch: Partial<Item>) {
    setItems((prev) => prev.map((it) => (it.uid === uid ? { ...it, ...patch } : it)));
  }

  function removeItem(uid: string) {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  }

  function addPayment(method: PaymentMethod) {
    setPayments((prev) => {
      const existing = prev.reduce((s, p) => s + p.amount_cents, 0);
      const suggested = Math.max(0, total - existing);
      return [
        ...prev,
        { uid: nextId(), method, amount_cents: suggested, paid_by_name: "" },
      ];
    });
  }

  function updatePayment(uid: string, patch: Partial<Payment>) {
    setPayments((prev) => prev.map((p) => (p.uid === uid ? { ...p, ...patch } : p)));
  }

  function removePayment(uid: string) {
    setPayments((prev) => prev.filter((p) => p.uid !== uid));
  }

  const itemsValid =
    items.length > 0 &&
    items.every(
      (it) => it.description.trim() !== "" && it.quantity > 0 && it.unit_cents >= 0,
    );
  const canSubmit = itemsValid && payments.length > 0 && paid === total && total > 0;

  function handleSubmit(fd: FormData) {
    const payload = {
      appointment_id: prefill?.appointment_id ?? "",
      client_id: clientId || "",
      barber_id: prefill?.barber_id ?? "",
      discount_cents: discountCents,
      notes,
      items: items.map((it) => ({
        service_id: it.service_id || "",
        product_id: it.product_id || "",
        description: it.description.trim(),
        quantity: it.quantity,
        unit_cents: it.unit_cents,
      })),
      payments: payments.map((p) => ({
        method: p.method,
        amount_cents: p.amount_cents,
        paid_by_name: p.paid_by_name.trim() || "",
      })),
      redemption_code: redemptionCode.trim().toUpperCase(),
    };
    fd.set("payload", JSON.stringify(payload));
    formAction(fd);
  }

  return (
    <form action={handleSubmit} className="grid gap-5">
      <div className="grid gap-5">
        <div className="grid gap-1.5">
          <Label>Cliente</Label>
          {locked ? (
            <div className="flex h-11 items-center gap-2.5 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3.5">
              <UserCircleIcon
                size={22}
                weight="duotone"
                className="shrink-0 text-[var(--color-blue-600)]"
              />
              <span className="truncate text-text-sm font-medium text-[var(--color-text-primary)]">
                {clients.find((c) => c.id === clientId)?.full_name ?? "Cliente"}
              </span>
            </div>
          ) : (
            <Select
              value={clientId || NONE}
              onValueChange={(v) => {
                const s = (v as string | null) ?? "";
                setClientId(s === NONE ? "" : s);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente">
                  {(value: string) => {
                    if (!value || value === NONE) return "Avulso";
                    const c = clients.find((c) => c.id === value);
                    return c?.full_name ?? "Avulso";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>Avulso</SelectItem>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label className="inline-flex items-center gap-1.5">
              <ScissorsIcon size={16} weight="duotone" />
              Adicionar serviço
            </Label>
            <Select
              key={serviceSelectKey}
              onValueChange={(v) => {
                const s = (v as string | null) ?? "";
                if (s) addService(s);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha um serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.length === 0 ? (
                  <div className="px-3 py-2 text-text-sm text-[var(--color-text-tertiary)]">
                    Nenhum serviço ativo
                  </div>
                ) : (
                  services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} · {formatMoney(s.price_cents)}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label className="inline-flex items-center gap-1.5">
              <PackageIcon size={16} weight="duotone" />
              Adicionar produto
            </Label>
            <Select
              key={productSelectKey}
              onValueChange={(v) => {
                const s = (v as string | null) ?? "";
                if (s) addProduct(s);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bebida, creme, pomada..." />
              </SelectTrigger>
              <SelectContent>
                {products.length === 0 ? (
                  <div className="px-3 py-2 text-text-sm text-[var(--color-text-tertiary)]">
                    Nenhum produto cadastrado
                  </div>
                ) : (
                  products.map((p) => {
                    const out = p.stock_qty <= 0;
                    return (
                      <SelectItem key={p.id} value={p.id} disabled={out}>
                        <span className="flex items-center justify-between gap-3 w-full">
                          <span>
                            {p.name} · {formatMoney(p.price_cents)}
                          </span>
                          <span
                            className={`inline-flex items-center gap-0.5 text-text-xs tabular-nums ${
                              out
                                ? "text-[var(--color-error-700)]"
                                : p.stock_qty <= 3
                                  ? "text-[var(--color-warning-700)]"
                                  : "text-[var(--color-text-tertiary)]"
                            }`}
                          >
                            {out && <WarningIcon size={12} weight="duotone" />}
                            {out ? "Sem estoque" : `${p.stock_qty} em estoque`}
                          </span>
                        </span>
                      </SelectItem>
                    );
                  })
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label>Itens da venda</Label>
          <button
            type="button"
            onClick={addCustomItem}
            className="inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-blue-600)] hover:text-[var(--color-blue-700)]"
          >
            <PlusIcon size={20} weight="duotone" /> Item livre
          </button>
        </div>
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border-secondary)] p-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Selecione um serviço acima ou adicione um item livre.
          </div>
        ) : (
          <div className="grid gap-2">
            {items.map((it) => (
              <div
                key={it.uid}
                className="grid gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3 sm:grid-cols-[1fr_72px_120px_auto]"
              >
                <Input
                  placeholder="Descrição"
                  value={it.description}
                  onChange={(e) => updateItem(it.uid, { description: e.target.value })}
                />
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={99}
                  value={it.quantity}
                  onChange={(e) =>
                    updateItem(it.uid, {
                      quantity: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                  className="tabular-nums"
                />
                <Input
                  inputMode="numeric"
                  value={formatMoney(it.unit_cents)}
                  onChange={(e) =>
                    updateItem(it.uid, {
                      unit_cents: parseMoneyToCents(e.target.value),
                    })
                  }
                  className="tabular-nums"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(it.uid)}
                  className="self-center"
                >
                  <TrashIcon size={20} weight="duotone" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="redemption_code" className="inline-flex items-center gap-1.5">
          <ReceiptIcon size={16} weight="duotone" />
          Código de resgate (opcional)
        </Label>
        <Input
          id="redemption_code"
          value={redemptionCode}
          onChange={(e) => setRedemptionCode(e.target.value)}
          placeholder="Ex.: AB12CD34"
          maxLength={16}
          className="font-mono uppercase tracking-wider"
        />
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Aplica desconto da recompensa do cliente automaticamente.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="discount">Desconto</Label>
          <div className="relative">
            <PercentIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="discount"
              inputMode="numeric"
              value={formatMoney(discountCents)}
              onChange={(e) => setDiscountCents(parseMoneyToCents(e.target.value))}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="sale_notes">Observações</Label>
          <Input
            id="sale_notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            placeholder="opcional"
          />
        </div>
      </div>

      <div className="grid gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-4 text-text-sm">
        <Row label="Subtotal" value={formatMoney(subtotal)} />
        {discountCents > 0 && (
          <Row label="Desconto" value={`- ${formatMoney(discountCents)}`} />
        )}
        <Row label="Total" value={formatMoney(total)} bold />
        <Row label="Pago" value={formatMoney(paid)} />
        <Row
          label="Restante"
          value={formatMoney(Math.max(0, remaining))}
          tone={remaining === 0 ? "ok" : "warn"}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Pagamentos</Label>
          <div className="flex flex-wrap gap-1">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => addPayment(m)}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2.5 py-1 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
              >
                <PlusIcon size={14} weight="bold" /> {PAYMENT_LABEL[m]}
              </button>
            ))}
          </div>
        </div>
        {payments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border-secondary)] p-4 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Adicione ao menos uma forma de pagamento.
          </div>
        ) : (
          <div className="grid gap-2">
            {payments.map((p) => (
              <div
                key={p.uid}
                className="grid gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3 sm:grid-cols-[140px_1fr_140px_auto]"
              >
                <Select
                  value={p.method}
                  onValueChange={(v) =>
                    updatePayment(p.uid, { method: v as PaymentMethod })
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {(value: string) =>
                        PAYMENT_LABEL[value as PaymentMethod] ?? value
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {PAYMENT_LABEL[m]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Pago por (opcional)"
                  value={p.paid_by_name}
                  onChange={(e) => updatePayment(p.uid, { paid_by_name: e.target.value })}
                />
                <Input
                  inputMode="numeric"
                  value={formatMoney(p.amount_cents)}
                  onChange={(e) =>
                    updatePayment(p.uid, {
                      amount_cents: parseMoneyToCents(e.target.value),
                    })
                  }
                  className="tabular-nums"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePayment(p.uid)}
                  className="self-center"
                >
                  <TrashIcon size={20} weight="duotone" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-[-1rem] -mx-4 -mb-1 flex justify-end gap-2 border-t border-[var(--color-border-secondary)] bg-popover px-4 pb-2 pt-3 sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button type="submit" disabled={pending || !canSubmit} className="h-11 w-full sm:w-auto">
          <ReceiptIcon size={28} weight="duotone" />
          {pending ? "Registrando..." : "Registrar venda"}
        </Button>
      </div>
    </form>
  );
}

function Row({
  label,
  value,
  bold,
  tone,
}: {
  label: string;
  value: string;
  bold?: boolean;
  tone?: "ok" | "warn";
}) {
  const valueColor =
    tone === "ok"
      ? "text-[var(--color-success-700)]"
      : tone === "warn"
        ? "text-[var(--color-warning-700)]"
        : "text-[var(--color-text-primary)]";
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-text-tertiary)]">{label}</span>
      <span
        className={`tabular-nums ${valueColor} ${bold ? "text-text-md font-semibold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
