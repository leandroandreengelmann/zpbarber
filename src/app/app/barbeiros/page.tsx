import {
  ArrowRightIcon,
  UserPlusIcon,
  UserSwitchIcon,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { formatDateBR } from "@/lib/format";
import { createStaffAction, setMemberActiveAction } from "./actions";
import { NewStaffForm } from "./new-staff-form";
import { ToggleActiveForm } from "./toggle-active-form";

const ROLE_LABEL: Record<string, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

const ROLE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  gestor: "default",
  recepcionista: "secondary",
  barbeiro: "outline",
};

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export default async function TeamPage() {
  const { membership } = await requireBarbershop();
  const isManager = can(membership, "equipe.gerenciar");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("barbershop_members")
    .select("role, is_active, atende_clientes, created_at, user:profiles(id, full_name)")
    .eq("barbershop_id", shopId)
    .order("created_at");

  const items = members ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Equipe
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Gerencie barbeiros, recepcionistas e gestores da sua barbearia.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <UserSwitchIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Membros</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? "membro vinculado" : "membros vinculados"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Nenhum membro vinculado.
              </p>
            </div>
          ) : (
            <>
              <ul className="grid gap-3 px-4 pb-4 sm:hidden">
                {items.map((m, i) => (
                  <li
                    key={m.user?.id ?? i}
                    className={`rounded-lg border border-[var(--color-border-secondary)] p-4 ${
                      !m.is_active ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10 shrink-0">
                        <AvatarFallback className="text-text-xs font-medium">
                          {initials(m.user?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 gap-1.5 min-w-0">
                        <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                          {m.user?.full_name ?? "—"}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge variant={ROLE_VARIANT[m.role] ?? "outline"}>
                            {ROLE_LABEL[m.role] ?? m.role}
                          </Badge>
                          <Badge variant={m.is_active ? "default" : "outline"}>
                            {m.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <span className="text-text-xs text-[var(--color-text-tertiary)]">
                          Desde {formatDateBR(m.created_at)}
                        </span>
                      </div>
                    </div>
                    {((m.user?.id && m.atende_clientes) ||
                      (isManager && m.user?.id)) && (
                      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--color-border-secondary)] pt-3">
                        {m.user?.id && m.atende_clientes && (
                          <Link
                            href={`/app/barbeiros/${m.user.id}`}
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                              className: "h-10 justify-center",
                            })}
                          >
                            Detalhes
                            <ArrowRightIcon size={20} weight="duotone" />
                          </Link>
                        )}
                        {isManager && m.user?.id && (
                          <ToggleActiveForm
                            userId={m.user.id}
                            isActive={m.is_active}
                            onToggle={setMemberActiveAction}
                          />
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Nome
                  </TableHead>
                  <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Papel
                  </TableHead>
                  <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Status
                  </TableHead>
                  <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Desde
                  </TableHead>
                  <TableHead className="px-4 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((m, i) => (
                  <TableRow key={m.user?.id ?? i}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="text-text-xs font-medium">
                            {initials(m.user?.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                          {m.user?.full_name ?? "—"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant={ROLE_VARIANT[m.role] ?? "outline"}>
                        {ROLE_LABEL[m.role] ?? m.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant={m.is_active ? "default" : "outline"}>
                        {m.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)] tabular-nums">
                      {formatDateBR(m.created_at)}
                    </TableCell>
                    <TableCell className="px-4 py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {m.user?.id && m.atende_clientes && (
                          <Link
                            href={`/app/barbeiros/${m.user.id}`}
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            Detalhes
                            <ArrowRightIcon size={20} weight="duotone" />
                          </Link>
                        )}
                        {isManager && m.user?.id && (
                          <ToggleActiveForm
                            userId={m.user.id}
                            isActive={m.is_active}
                            onToggle={setMemberActiveAction}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {isManager && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
                <UserPlusIcon size={28} weight="duotone" />
              </div>
              <div>
                <CardTitle>Adicionar membro</CardTitle>
                <CardDescription>
                  Crie a conta e vincule diretamente à barbearia.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <NewStaffForm action={createStaffAction} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
