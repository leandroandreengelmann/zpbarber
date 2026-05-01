"use server";

import { redirect } from "next/navigation";
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

  if (!profile?.is_client) {
    if (profile?.is_super_admin) redirect("/admin");
    redirect("/app");
  }

  redirect(next || "/conta");
}

export async function signOutClientAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/cliente/login");
}
