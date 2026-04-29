import { createClient } from "@/lib/supabase/server";

export type PlatformSettings = {
  app_url: string | null;
  brand_name: string;
  support_email: string | null;
  support_whatsapp: string | null;
  default_trial_days: number;
  default_primary_color: string | null;
  maintenance_mode: boolean;
  maintenance_message: string | null;
  dunning_days_to_suspend: number;
};

const FALLBACK: PlatformSettings = {
  app_url: null,
  brand_name: "ZP Barber",
  support_email: null,
  support_whatsapp: null,
  default_trial_days: 14,
  default_primary_color: null,
  maintenance_mode: false,
  maintenance_message: null,
  dunning_days_to_suspend: 7,
};

export async function getPlatformSettings(): Promise<PlatformSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("platform_settings")
    .select(
      "app_url, brand_name, support_email, support_whatsapp, default_trial_days, default_primary_color, maintenance_mode, maintenance_message, dunning_days_to_suspend"
    )
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return FALLBACK;
  return data;
}

export async function getAppBaseUrl(): Promise<string> {
  const settings = await getPlatformSettings();
  const url =
    settings.app_url ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";
  return url.replace(/\/+$/, "");
}
