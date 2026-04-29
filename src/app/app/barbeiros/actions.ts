"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { newStaffSchema } from "@/lib/zod/team";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

async function ensureManager() {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar equipe" } as const;
  }
  return { shopId: membership.barbershop!.id } as const;
}

export async function createStaffAction(_prev: State, formData: FormData): Promise<State> {
  const ctx = await ensureManager();
  if ("error" in ctx) return ctx;

  const parsed = newStaffSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    role: formData.get("role") ?? "barbeiro",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("create_staff_user", {
    _barbershop: ctx.shopId,
    _email: parsed.data.email,
    _password: parsed.data.password,
    _full_name: parsed.data.full_name,
    _role: parsed.data.role,
  });
  if (error) {
    if (error.message.includes("password_too_short")) {
      return { error: "senha precisa ter no mínimo 8 caracteres" };
    }
    return { error: error.message };
  }

  await logAudit({
    action: "team.member_create",
    barbershopId: ctx.shopId,
    resourceType: "barbershop_member",
    metadata: {
      email: parsed.data.email,
      role: parsed.data.role,
      full_name: parsed.data.full_name,
    },
  });

  revalidatePath("/app/barbeiros");
  return { ok: true };
}

export async function setMemberActiveAction(userId: string, isActive: boolean) {
  const ctx = await ensureManager();
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();
  const { error } = await supabase
    .from("barbershop_members")
    .update({ is_active: isActive })
    .eq("barbershop_id", ctx.shopId)
    .eq("user_id", userId);
  if (error) throw error;
  revalidatePath("/app/barbeiros");
}
