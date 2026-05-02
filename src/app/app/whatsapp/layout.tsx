import type { ReactNode } from "react";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { WhatsappTabs } from "./_components/whatsapp-tabs";

export default async function WhatsappLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = await requireBarbershop();
  const isGestor = can(membership, "whatsapp.gerenciar");
  return (
    <div className="grid gap-6">
      <WhatsappTabs isGestor={isGestor} />
      {children}
    </div>
  );
}
