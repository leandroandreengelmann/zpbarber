import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTimeBR } from "@/lib/format";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

export type AuditLogRow = {
  id: number;
  created_at: string;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: unknown;
  barbershop_id: string | null;
  user_id: string | null;
};

export type AuditShopInfo = { name: string; slug: string };

export const ACTION_LABEL: Record<string, string> = {
  "cash_session.open": "Abrir caixa",
  "cash_session.close": "Fechar caixa",
  "sale.create": "Criar venda",
  "sale.cancel": "Cancelar venda",
  "barbershop.create": "Criar barbearia",
  "barbershop.status_change": "Alterar status",
  "membership.role_change": "Alterar acesso",
  "membership.remove": "Remover acesso",
  "announcement.create": "Criar comunicado",
  "announcement.update": "Editar comunicado",
  "announcement.publish": "Publicar comunicado",
  "announcement.archive": "Arquivar comunicado",
  "announcement.delete": "Excluir comunicado",
  "platform_settings.update": "Atualizar config",
  "plan.create": "Criar plano",
  "plan.update": "Editar plano",
  "plan.archive": "Arquivar plano",
  "subscription.create": "Assinar plano",
  "subscription.cancel": "Cancelar assinatura",
};

export const ACTION_TONE: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  "cash_session.open": "secondary",
  "cash_session.close": "secondary",
  "sale.create": "default",
  "sale.cancel": "destructive",
  "barbershop.create": "default",
  "barbershop.status_change": "secondary",
  "membership.role_change": "secondary",
  "membership.remove": "destructive",
  "announcement.create": "secondary",
  "announcement.update": "secondary",
  "announcement.publish": "default",
  "announcement.archive": "outline",
  "announcement.delete": "destructive",
  "platform_settings.update": "secondary",
  "plan.create": "default",
  "plan.update": "secondary",
  "plan.archive": "outline",
  "subscription.create": "default",
  "subscription.cancel": "destructive",
};

export function AuditEmptyState({ message }: { message?: string }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
        <ShieldCheckIcon size={28} weight="duotone" />
      </div>
      <div className="grid gap-1">
        <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Nenhum evento registrado
        </p>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          {message ??
            "Ações sensíveis (caixa, vendas, barbearias, equipe) aparecem aqui."}
        </p>
      </div>
    </Card>
  );
}

export function AuditList({
  logs,
  showShop,
  shopMap,
  profileMap,
}: {
  logs: AuditLogRow[];
  showShop: boolean;
  shopMap: Map<string, AuditShopInfo>;
  profileMap: Map<string, string>;
}) {
  return (
    <Card className="overflow-hidden p-0 lg:block">
      <ul className="divide-y divide-[var(--color-border-secondary)] lg:hidden">
        {logs.map((l) => {
          const shop =
            showShop && l.barbershop_id ? shopMap.get(l.barbershop_id) : null;
          const author = l.user_id ? profileMap.get(l.user_id) : null;
          return (
            <li key={l.id} className="grid gap-2 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant={ACTION_TONE[l.action] ?? "outline"}>
                  {ACTION_LABEL[l.action] ?? l.action}
                </Badge>
                <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
                  {formatDateTimeBR(l.created_at)}
                </span>
              </div>
              <div className="grid gap-1 text-text-sm">
                {showShop && (
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </span>
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {shop?.name ?? "—"}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Autor
                  </span>
                  <span className="text-[var(--color-text-primary)]">
                    {author ?? "—"}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Data
              </TableHead>
              <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Autor
              </TableHead>
              {showShop && (
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Barbearia
                </TableHead>
              )}
              <TableHead className="px-6 pr-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((l) => {
              const shop =
                showShop && l.barbershop_id
                  ? shopMap.get(l.barbershop_id)
                  : null;
              const author = l.user_id ? profileMap.get(l.user_id) : null;
              return (
                <TableRow key={l.id}>
                  <TableCell className="px-6 py-4 align-middle text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                    {formatDateTimeBR(l.created_at)}
                  </TableCell>
                  <TableCell className="px-4 py-4 align-middle text-text-sm text-[var(--color-text-primary)]">
                    {author ?? (
                      <span className="text-[var(--color-text-tertiary)]">
                        —
                      </span>
                    )}
                  </TableCell>
                  {showShop && (
                    <TableCell className="px-4 py-4 align-middle text-text-sm text-[var(--color-text-primary)]">
                      {shop?.name ?? (
                        <span className="text-[var(--color-text-tertiary)]">
                          —
                        </span>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="px-6 py-4 pr-6 align-middle">
                    <Badge variant={ACTION_TONE[l.action] ?? "outline"}>
                      {ACTION_LABEL[l.action] ?? l.action}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
