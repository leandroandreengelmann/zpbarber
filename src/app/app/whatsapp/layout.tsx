import type { ReactNode } from "react";
import { requireBarbershop } from "@/lib/auth/guards";
import { WhatsappTabs } from "./_components/whatsapp-tabs";

export default async function WhatsappLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = membership.role === "gestor";
  return (
    <div className="grid gap-6">
      <WhatsappTabs isGestor={isGestor} />
      {children}
    </div>
  );
}
