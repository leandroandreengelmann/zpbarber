import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { WhatsappTrigger } from "@/lib/zod/whatsapp";

export type EnqueueParams = {
  barbershopId: string;
  clientId?: string | null;
  appointmentId?: string | null;
  trigger: WhatsappTrigger;
  templateSlug: string;
  vars: Record<string, string | number | null | undefined>;
  scheduledFor?: Date | null;
};

export async function enqueueWhatsappMessage(params: EnqueueParams): Promise<string | null> {
  try {
    const supabase = createAdminClient();

    // Opt-in: só envia se o cliente aceita WhatsApp.
    if (params.clientId) {
      const { data: client } = await supabase
        .from("clients")
        .select("accepts_whatsapp")
        .eq("id", params.clientId)
        .maybeSingle();
      if (client && client.accepts_whatsapp === false) {
        return null;
      }
    }

    const cleanVars: Record<string, string> = {};
    for (const [k, v] of Object.entries(params.vars)) {
      cleanVars[k] = v == null ? "" : String(v);
    }
    const { data, error } = await supabase.rpc("fn_wa_enqueue", {
      _barbershop_id: params.barbershopId,
      _client_id: (params.clientId ?? null) as unknown as string,
      _appointment_id: (params.appointmentId ?? null) as unknown as string,
      _trigger: params.trigger,
      _template_slug: params.templateSlug,
      _vars: cleanVars,
      _scheduled_for: (params.scheduledFor ?? new Date()).toISOString(),
    });
    if (error) {
      console.error("[whatsapp.enqueue] error:", error.message);
      return null;
    }
    return (data as string | null) ?? null;
  } catch (err) {
    console.error("[whatsapp.enqueue] exception:", err);
    return null;
  }
}
