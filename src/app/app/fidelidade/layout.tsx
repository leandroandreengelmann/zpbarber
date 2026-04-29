import type { ReactNode } from "react";
import { requireBarbershop } from "@/lib/auth/guards";
import { FidelidadeTabs } from "./_components/fidelidade-tabs";

export default async function FidelidadeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = membership.role === "gestor";
  return (
    <div className="grid gap-6">
      <FidelidadeTabs isGestor={isGestor} />
      {children}
    </div>
  );
}
