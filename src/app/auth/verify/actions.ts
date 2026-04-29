"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type State = { error?: string };

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export async function verifyOtpAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const token = String(formData.get("token") ?? "").trim().replace(/\s+/g, "");

  if (!email || !isEmail(email)) {
    return { error: "E-mail inválido. Volte e tente novamente." };
  }
  if (!/^\d{6,8}$/.test(token)) {
    return { error: "O código deve ter entre 6 e 8 dígitos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "recovery",
  });
  if (error) {
    return { error: "Código inválido ou expirado. Solicite um novo." };
  }

  redirect("/auth/reset");
}

export async function resendOtpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !isEmail(email)) {
    redirect("/auth/forgot?error=invalid-email");
  }
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email);
  redirect(`/auth/verify?email=${encodeURIComponent(email)}&resent=1`);
}
