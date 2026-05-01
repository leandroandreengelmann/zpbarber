"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isValidBRPhone, normalizePhone } from "@/lib/phone";

type State = { error?: string; ok?: boolean; message?: string };

export async function updateClientProfileAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();

  if (fullName.length < 2 || fullName.length > 120) {
    return { error: "Informe seu nome (entre 2 e 120 caracteres)." };
  }
  if (phoneRaw && !isValidBRPhone(phoneRaw)) {
    return { error: "Telefone inválido." };
  }

  const phone = phoneRaw ? normalizePhone(phoneRaw) : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone })
    .eq("id", user.id);
  if (error) return { error: error.message };

  if (phone) {
    await supabase.rpc("fn_client_link_phone", { p_phone: phone });
  }

  revalidatePath("/conta/perfil");
  revalidatePath("/conta");
  return { ok: true };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateClientEmailAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const newEmail = String(formData.get("new_email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(newEmail)) {
    return { error: "E-mail inválido." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada." };

  if ((user.email ?? "").toLowerCase() === newEmail) {
    return { error: "Esse já é o seu e-mail atual." };
  }

  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/conta/perfil");
  return {
    ok: true,
    message: `Enviamos um link de confirmação para ${newEmail}. Clique nele para finalizar a alteração.`,
  };
}

export async function updateClientPasswordAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const currentPwd = String(formData.get("current_password") ?? "");
  const newPwd = String(formData.get("new_password") ?? "");
  const confirmPwd = String(formData.get("confirm_password") ?? "");

  if (!currentPwd) return { error: "Informe sua senha atual." };
  if (newPwd.length < 8) {
    return { error: "A nova senha precisa ter no mínimo 8 caracteres." };
  }
  if (newPwd !== confirmPwd) {
    return { error: "A confirmação não confere com a nova senha." };
  }
  if (newPwd === currentPwd) {
    return { error: "A nova senha precisa ser diferente da atual." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return { error: "Sessão expirada." };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPwd,
  });
  if (signInError) {
    return { error: "Senha atual incorreta." };
  }

  const { error } = await supabase.auth.updateUser({ password: newPwd });
  if (error) return { error: error.message };

  revalidatePath("/conta/perfil");
  return { ok: true, message: "Senha alterada com sucesso." };
}
