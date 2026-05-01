"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isValidBRPhone, normalizePhone } from "@/lib/phone";

type State = { error?: string; ok?: boolean };

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
