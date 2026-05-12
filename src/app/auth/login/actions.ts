"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_TENANT_COOKIE } from "@/lib/auth/current-tenant";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const c = await cookies();
  c.delete(ACTIVE_TENANT_COOKIE);
  redirect("/auth/login");
}
