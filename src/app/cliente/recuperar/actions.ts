"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export async function requestClientPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !isEmail(email)) {
    redirect("/cliente/recuperar?error=invalid-email");
  }

  const ip = await getClientIp();
  const rlEmail = await checkRateLimit(`pwreset_email:${email}`, 5, 3600);
  const rlIp = await checkRateLimit(`pwreset_ip:${ip}`, 20, 3600);
  if (!rlEmail.ok || !rlIp.ok) {
    redirect("/cliente/recuperar?error=rate-limited");
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email);
  redirect(`/cliente/recuperar/verificar?email=${encodeURIComponent(email)}`);
}
