"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { clientSignupSchema } from "@/lib/zod/client-signup";
import { safeNext } from "@/lib/auth/safe-redirect";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

type State = { error?: string; ok?: boolean };

export async function signupClientAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const ip = await getClientIp();
  const rl = await checkRateLimit(`signup_client:${ip}`, 5, 3600);
  if (!rl.ok) {
    return { error: "Muitas tentativas. Tente novamente em alguns minutos." };
  }
  const parsed = clientSignupSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    password: formData.get("password") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const nextRaw = String(formData.get("next") ?? "");

  const admin = createAdminClient();

  const { data: userRes, error: userErr } = await admin.auth.admin.createUser({
    email: v.email,
    password: v.password,
    email_confirm: true,
    user_metadata: {
      full_name: v.full_name,
      phone: v.phone,
      role: "client",
    },
  });
  if (userErr || !userRes.user) {
    if (
      userErr?.message?.toLowerCase().includes("already") ||
      userErr?.message?.toLowerCase().includes("registered")
    ) {
      return {
        error: "Esse e-mail já tem cadastro. Faça login ou recupere a senha.",
      };
    }
    return { error: userErr?.message ?? "Falha ao criar conta." };
  }

  const supabase = await createClient();
  await supabase.auth.signInWithPassword({
    email: v.email,
    password: v.password,
  });

  await supabase.rpc("fn_client_link_phone", { p_phone: v.phone });

  redirect(safeNext(nextRaw, "/conta"));
}
