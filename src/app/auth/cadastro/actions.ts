"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_TENANT_COOKIE } from "@/lib/auth/current-tenant";
import { signupSchema } from "@/lib/zod/signup";
import { getPlatformSettings } from "@/lib/platform-settings";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

export async function signupBarbershopAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const parsed = signupSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    shop_name: formData.get("shop_name") ?? "",
    shop_slug: formData.get("shop_slug") ?? "",
    shop_phone: formData.get("shop_phone") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;

  const admin = createAdminClient();

  // 1. slug disponível?
  const { data: slugTaken } = await admin
    .from("barbershops")
    .select("id")
    .eq("slug", v.shop_slug)
    .maybeSingle();
  if (slugTaken) {
    return { error: "Esse endereço (slug) já está em uso. Escolha outro." };
  }

  // 2. cria usuário (handle_new_user trigger cria profile)
  const { data: userRes, error: userErr } = await admin.auth.admin.createUser({
    email: v.email,
    password: v.password,
    email_confirm: true,
    user_metadata: { full_name: v.full_name },
  });
  if (userErr || !userRes.user) {
    if (userErr?.message?.toLowerCase().includes("already") ||
        userErr?.message?.toLowerCase().includes("registered")) {
      return {
        error:
          "Esse e-mail já tem cadastro. Faça login ou recupere a senha.",
      };
    }
    return { error: userErr?.message ?? "Falha ao criar conta." };
  }
  const userId = userRes.user.id;

  // 3. cria barbearia em trial
  const settings = await getPlatformSettings();
  const trialDays = settings.default_trial_days ?? 14;
  const trialEnd = new Date();
  trialEnd.setUTCDate(trialEnd.getUTCDate() + trialDays);
  trialEnd.setUTCHours(23, 59, 59, 999);

  const { data: shop, error: shopErr } = await admin
    .from("barbershops")
    .insert({
      slug: v.shop_slug,
      name: v.shop_name,
      phone: v.shop_phone || null,
      email: v.email,
      status: "trial",
      trial_ends_at: trialEnd.toISOString(),
    })
    .select("id")
    .single();
  if (shopErr || !shop) {
    // rollback: remove user pra não ficar órfão
    try {
      await admin.auth.admin.deleteUser(userId);
    } catch {}
    return { error: shopErr?.message ?? "Falha ao criar barbearia." };
  }

  // 4. associa user como gestor
  const { error: memberErr } = await admin
    .from("barbershop_members")
    .insert({
      barbershop_id: shop.id,
      user_id: userId,
      role: "gestor",
      is_active: true,
    });
  if (memberErr) {
    // rollback total
    try {
      await admin.from("barbershops").delete().eq("id", shop.id);
      await admin.auth.admin.deleteUser(userId);
    } catch {}
    return { error: memberErr.message };
  }

  await logAudit({
    action: "barbershop.create",
    barbershopId: shop.id,
    resourceType: "barbershop",
    resourceId: shop.id,
    metadata: {
      slug: v.shop_slug,
      name: v.shop_name,
      via: "self_signup",
      trial_days: trialDays,
    },
  });

  // 5. sign in (sessão)
  const supabase = await createClient();
  await supabase.auth.signInWithPassword({
    email: v.email,
    password: v.password,
  });

  const c = await cookies();
  c.set(ACTIVE_TENANT_COOKIE, shop.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/app");
}
