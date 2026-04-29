import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const ACTIVE_TENANT_COOKIE = "bb_tenant";

export const getActiveBarbershopId = cache(async (): Promise<string | null> => {
  const c = await cookies();
  return c.get(ACTIVE_TENANT_COOKIE)?.value ?? null;
});

export const getActiveBarbershop = cache(async () => {
  const id = await getActiveBarbershopId();
  if (!id) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("barbershops")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ?? null;
});
