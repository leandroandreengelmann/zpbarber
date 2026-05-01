"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function signInClientAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  const nextParam = next ? `&next=${encodeURIComponent(next)}` : "";

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/cliente/login?error=invalid-credentials${nextParam}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/cliente/login?error=invalid-credentials${nextParam}`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_client, is_super_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.is_super_admin) redirect("/admin");

  if (!profile?.is_client) {
    const { data: memberships } = await supabase
      .from("barbershop_members")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(1);

    if (memberships && memberships.length > 0) {
      redirect("/app");
    }

    const admin = createAdminClient();
    await admin
      .from("profiles")
      .update({ is_client: true })
      .eq("id", user.id);
  }

  redirect(next || "/conta");
}

export async function signOutClientAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/cliente/login");
}
