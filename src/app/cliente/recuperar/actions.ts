"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export async function requestClientPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !isEmail(email)) {
    redirect("/cliente/recuperar?error=invalid-email");
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email);
  redirect(`/cliente/recuperar/verificar?email=${encodeURIComponent(email)}`);
}
