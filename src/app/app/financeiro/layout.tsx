import type { ReactNode } from "react";
import { requireBarbershop } from "@/lib/auth/guards";
import { FinanceiroTabs } from "./_components/financeiro-tabs";

export default async function FinanceiroLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = membership.role === "gestor";
  return (
    <div className="grid gap-6">
      <FinanceiroTabs isGestor={isGestor} />
      {children}
    </div>
  );
}
