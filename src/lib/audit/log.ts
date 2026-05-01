import { createClient } from "@/lib/supabase/server";

export type AuditAction =
  | "cash_session.open"
  | "cash_session.close"
  | "sale.create"
  | "sale.cancel"
  | "barbershop.status_change"
  | "barbershop.create"
  | "barbershop.impersonate_enter"
  | "barbershop.impersonate_exit"
  | "membership.role_change"
  | "membership.remove"
  | "announcement.create"
  | "announcement.update"
  | "announcement.publish"
  | "announcement.archive"
  | "announcement.delete"
  | "platform_settings.update"
  | "plan.create"
  | "plan.update"
  | "plan.archive"
  | "subscription.create"
  | "subscription.cancel"
  | "subscription.suspend"
  | "whatsapp.connect"
  | "whatsapp.disconnect"
  | "whatsapp.settings_update"
  | "whatsapp.template_create"
  | "whatsapp.template_update"
  | "whatsapp.template_delete"
  | "whatsapp.message_send_manual"
  | "team.member_create"
  | "loyalty.settings_update"
  | "loyalty.reward_create"
  | "loyalty.reward_update"
  | "loyalty.reward_delete"
  | "loyalty.points_adjust";

type LogAuditInput = {
  action: AuditAction | string;
  barbershopId?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function logAudit(input: LogAuditInput): Promise<void> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("fn_log_audit", {
      p_action: input.action,
      p_barbershop: input.barbershopId ?? undefined,
      p_resource_type: input.resourceType ?? undefined,
      p_resource_id: input.resourceId ?? undefined,
      p_metadata: (input.metadata ?? undefined) as never,
    });
    if (error) console.error("[audit] fn_log_audit:", error.message);
  } catch (err) {
    console.error("[audit] logAudit:", err);
  }
}
