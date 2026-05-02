import type { Database } from "@/lib/database.types";

type Role = Database["public"]["Enums"]["app_role"];

export const CAPABILITIES = [
  "agenda.ver",
  "agenda.gerenciar",
  "caixa.ver",
  "caixa.abrir",
  "caixa.cancelar_venda",
  "financeiro.ver",
  "financeiro.lancar",
  "financeiro.gerenciar",
  "clientes.ver",
  "clientes.gerenciar",
  "servicos.gerenciar",
  "produtos.gerenciar",
  "comissoes.ver",
  "comissoes.gerenciar",
  "relatorios.ver",
  "equipe.gerenciar",
  "configuracoes.gerenciar",
  "whatsapp.gerenciar",
  "fidelidade.gerenciar",
  "avaliacoes.gerenciar",
] as const;

export type Capability = (typeof CAPABILITIES)[number];

export const CAPABILITY_LABELS: Record<Capability, string> = {
  "agenda.ver": "Ver agenda",
  "agenda.gerenciar": "Criar/editar agendamentos",
  "caixa.ver": "Ver caixa",
  "caixa.abrir": "Abrir e fechar caixa",
  "caixa.cancelar_venda": "Cancelar vendas",
  "financeiro.ver": "Ver financeiro",
  "financeiro.lancar": "Lançar despesas e recebíveis",
  "financeiro.gerenciar": "Estornar e excluir lançamentos",
  "clientes.ver": "Ver clientes",
  "clientes.gerenciar": "Cadastrar/editar clientes",
  "servicos.gerenciar": "Gerenciar serviços",
  "produtos.gerenciar": "Gerenciar produtos",
  "comissoes.ver": "Ver comissões",
  "comissoes.gerenciar": "Gerenciar comissões",
  "relatorios.ver": "Ver relatórios",
  "equipe.gerenciar": "Gerenciar equipe e permissões",
  "configuracoes.gerenciar": "Editar configurações da barbearia",
  "whatsapp.gerenciar": "Configurar WhatsApp",
  "fidelidade.gerenciar": "Gerenciar fidelidade",
  "avaliacoes.gerenciar": "Gerenciar avaliações",
};

export const CAPABILITY_GROUPS: { label: string; items: Capability[] }[] = [
  {
    label: "Agenda e clientes",
    items: ["agenda.ver", "agenda.gerenciar", "clientes.ver", "clientes.gerenciar"],
  },
  {
    label: "Caixa",
    items: ["caixa.ver", "caixa.abrir", "caixa.cancelar_venda"],
  },
  {
    label: "Financeiro e relatórios",
    items: ["financeiro.ver", "financeiro.lancar", "financeiro.gerenciar", "relatorios.ver"],
  },
  {
    label: "Comissões",
    items: ["comissoes.ver", "comissoes.gerenciar"],
  },
  {
    label: "Catálogo",
    items: ["servicos.gerenciar", "produtos.gerenciar"],
  },
  {
    label: "Marketing e fidelidade",
    items: ["whatsapp.gerenciar", "fidelidade.gerenciar", "avaliacoes.gerenciar"],
  },
  {
    label: "Administração",
    items: ["equipe.gerenciar", "configuracoes.gerenciar"],
  },
];

const ALL: Capability[] = [...CAPABILITIES];

export const ROLE_PRESETS: Record<Role, Capability[]> = {
  super_admin: ALL,
  gestor: ALL,
  recepcionista: [
    "agenda.ver",
    "agenda.gerenciar",
    "caixa.ver",
    "caixa.abrir",
    "clientes.ver",
    "clientes.gerenciar",
    "financeiro.ver",
    "financeiro.lancar",
    "comissoes.ver",
    "fidelidade.gerenciar",
  ],
  barbeiro: [
    "agenda.ver",
    "clientes.ver",
    "comissoes.ver",
  ],
};

type MembershipLike = {
  role: Role;
  capabilities?: string[] | null;
};

export function getEffectiveCapabilities(member: MembershipLike): Capability[] {
  if (member.capabilities && Array.isArray(member.capabilities)) {
    return member.capabilities.filter((c): c is Capability =>
      (CAPABILITIES as readonly string[]).includes(c)
    );
  }
  return ROLE_PRESETS[member.role] ?? [];
}

export function can(
  member: MembershipLike | null | undefined,
  capability: Capability
): boolean {
  if (!member) return false;
  if (member.role === "super_admin") return true;
  return getEffectiveCapabilities(member).includes(capability);
}

export function canAny(
  member: MembershipLike | null | undefined,
  capabilities: Capability[]
): boolean {
  return capabilities.some((c) => can(member, c));
}
