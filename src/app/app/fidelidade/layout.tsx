import type { ReactNode } from "react";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { FidelidadeTabs } from "./_components/fidelidade-tabs";

export default async function FidelidadeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = can(membership, "fidelidade.gerenciar");
  return (
    <div className="grid gap-6">
      <FidelidadeTabs isGestor={isGestor} />
      {children}
    </div>
  );
}
