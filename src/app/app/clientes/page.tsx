import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateBR } from "@/lib/format";
import { createClientAction } from "./actions";
import { ClientForm } from "./client-form";

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

type SearchParams = Promise<{ q?: string }>;

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  let query = supabase
    .from("clients")
    .select("id, full_name, phone, email, created_at, notes")
    .eq("barbershop_id", shopId)
    .order("full_name");
  if (q) {
    const escaped = q.replace(/[%_]/g, "\\$&");
    query = query.or(
      `full_name.ilike.%${escaped}%,phone.ilike.%${escaped}%,email.ilike.%${escaped}%`
    );
  }
  const { data: clients } = await query;
  const items = clients ?? [];

  const ids = items.map((c) => c.id);
  let lastByClient = new Map<string, string>();
  if (ids.length > 0) {
    const { data: lastAppts } = await supabase
      .from("appointments")
      .select("client_id, scheduled_at")
      .eq("barbershop_id", shopId)
      .in("client_id", ids)
      .in("status", ["completed", "confirmed", "scheduled"])
      .order("scheduled_at", { ascending: false });
    for (const row of lastAppts ?? []) {
      if (!lastByClient.has(row.client_id)) {
        lastByClient.set(row.client_id, row.scheduled_at);
      }
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Clientes
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Histórico, contatos e observações dos clientes da barbearia.
          </p>
        </div>
        <Dialog>
          <DialogTrigger className={buttonVariants({ size: "lg", className: "h-11" })}>
            <UserPlusIcon size={28} weight="duotone" />
            Novo cliente
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo cliente</DialogTitle>
              <DialogDescription>
                Cadastro completo com observações.
              </DialogDescription>
            </DialogHeader>
            <ClientForm
              action={createClientAction}
              submitLabel="Cadastrar cliente"
              successMessage="Cliente cadastrado."
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-secondary)] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <UsersThreeIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle className="text-text-md">
                {items.length} {items.length === 1 ? "cliente" : "clientes"}
              </CardTitle>
              <CardDescription className="text-text-xs">
                {q ? `Busca: "${q}"` : "Todos os clientes da barbearia."}
              </CardDescription>
            </div>
          </div>
          <form action="/app/clientes" className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <MagnifyingGlassIcon
                size={20}
                weight="duotone"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
              />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Buscar nome, telefone ou e-mail..."
                className="h-10 w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] pl-10 pr-3 text-text-sm sm:h-9 sm:w-72"
              />
            </div>
            <button
              type="submit"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Buscar
            </button>
          </form>
        </div>

        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <UsersThreeIcon size={28} weight="duotone" />
              </div>
              <div className="grid gap-1">
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  {q ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado."}
                </p>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  {q
                    ? "Tente outro termo ou cadastre um novo cliente."
                    : "Use o botão Novo cliente pra começar."}
                </p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-border-secondary)]">
              {items.map((c) => {
                const last = lastByClient.get(c.id);
                return (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-center gap-4 px-6 py-4"
                  >
                    <Avatar className="size-10">
                      <AvatarFallback className="text-text-xs font-medium">
                        {initials(c.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 gap-0.5">
                      <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                        {c.full_name}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-text-xs text-[var(--color-text-tertiary)]">
                        {c.phone && (
                          <span className="inline-flex items-center gap-1">
                            <PhoneIcon size={14} weight="duotone" />
                            {c.phone}
                          </span>
                        )}
                        {c.email && (
                          <span className="inline-flex items-center gap-1">
                            <EnvelopeSimpleIcon size={14} weight="duotone" />
                            {c.email}
                          </span>
                        )}
                        {!c.phone && !c.email && (
                          <span className="italic text-[var(--color-text-tertiary)]">
                            Sem contato cadastrado
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="hidden text-right text-text-xs text-[var(--color-text-tertiary)] sm:grid">
                      {last ? (
                        <>
                          <span className="font-medium uppercase tracking-wide">
                            Última visita
                          </span>
                          <span className="tabular-nums text-[var(--color-text-secondary)]">
                            {formatDateBR(last)}
                          </span>
                        </>
                      ) : (
                        <span className="italic">Sem visitas</span>
                      )}
                    </div>
                    <Link
                      href={`/app/clientes/${c.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      Detalhes
                      <ArrowRightIcon size={20} weight="duotone" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
