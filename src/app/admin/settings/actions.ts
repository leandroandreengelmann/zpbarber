"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { platformSettingsSchema } from "@/lib/zod/platform-settings";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

export async function updatePlatformSettingsAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const user = await requireSuperAdmin();
  const parsed = platformSettingsSchema.safeParse({
    app_url: formData.get("app_url") ?? "",
    brand_name: formData.get("brand_name") ?? "",
    support_email: formData.get("support_email") ?? "",
    support_whatsapp: formData.get("support_whatsapp") ?? "",
    default_trial_days: formData.get("default_trial_days") ?? 14,
    default_primary_color: formData.get("default_primary_color") ?? "",
    maintenance_mode: formData.get("maintenance_mode") === "on",
    maintenance_message: formData.get("maintenance_message") ?? "",
    dunning_days_to_suspend: formData.get("dunning_days_to_suspend") ?? 7,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("platform_settings")
    .update({
      app_url: v.app_url ?? null,
      brand_name: v.brand_name,
      support_email: v.support_email ?? null,
      support_whatsapp: v.support_whatsapp ?? null,
      default_trial_days: v.default_trial_days,
      default_primary_color: v.default_primary_color ?? null,
      maintenance_mode: v.maintenance_mode,
      maintenance_message: v.maintenance_message ?? null,
      dunning_days_to_suspend: v.dunning_days_to_suspend,
      updated_by: user.id,
    })
    .eq("id", 1);
  if (error) return { error: error.message };

  await logAudit({
    action: "platform_settings.update",
    resourceType: "platform_settings",
    resourceId: "1",
    metadata: {
      brand_name: v.brand_name,
      maintenance_mode: v.maintenance_mode,
      default_trial_days: v.default_trial_days,
      app_url_set: !!v.app_url,
    },
  });

  revalidatePath("/admin/settings");
  return { ok: true };
}
