"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { profileSchema } from "@/lib/zod/team";

type State = { error?: string; ok?: boolean };

export async function updateMyProfileAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const { user } = await requireBarbershop();

  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    phone: formData.get("phone") ?? "",
    avatar_url: formData.get("avatar_url") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_update_member_profile", {
    _user_id: user.id,
    _full_name: parsed.data.full_name,
    _phone: parsed.data.phone ?? "",
    _avatar_url: parsed.data.avatar_url ?? "",
  });
  if (error) {
    if (error.message.includes("forbidden"))
      return { error: "sem permissão para editar este perfil" };
    return { error: error.message };
  }

  revalidatePath("/app/perfil");
  revalidatePath("/app/barbeiros");
  return { ok: true };
}
