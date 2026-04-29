"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export async function requestPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !isEmail(email)) {
    redirect("/auth/forgot?error=invalid-email");
  }

  const supabase = await createClient();
  // Não passamos redirectTo: o template precisa usar {{ .Token }} (OTP de 6 dígitos),
  // não {{ .ConfirmationURL }} (magic link).
  await supabase.auth.resetPasswordForEmail(email);

  // Sempre vai para tela de verificação, mesmo se o e-mail não existir
  // (evita enumeração de contas).
  redirect(`/auth/verify?email=${encodeURIComponent(email)}`);
}
