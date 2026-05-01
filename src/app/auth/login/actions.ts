"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_TENANT_COOKIE } from "@/lib/auth/current-tenant";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/auth/login?error=invalid-credentials`);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?error=invalid-credentials");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_super_admin, is_client")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.is_super_admin) redirect(next || "/admin");

  const { data: memberships } = await supabase
    .from("barbershop_members")
    .select("barbershop_id")
    .eq("is_active", true);

  if (!memberships || memberships.length === 0) {
    if (profile?.is_client) redirect("/conta");
    await supabase.auth.signOut();
    redirect("/auth/login?error=no-membership");
  }

  const c = await cookies();
  if (memberships.length === 1) {
    c.set(ACTIVE_TENANT_COOKIE, memberships[0].barbershop_id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect(next || "/app");
  }

  redirect("/auth/select-tenant");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const c = await cookies();
  c.delete(ACTIVE_TENANT_COOKIE);
  redirect("/auth/login");
}
