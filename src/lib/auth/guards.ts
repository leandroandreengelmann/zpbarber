import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, getCurrentMemberships } from "./current-user";
import { getActiveBarbershopId } from "./current-tenant";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function requireClient() {
  const user = await getCurrentUser();
  if (!user) redirect("/cliente/login");
  if (!user.profile.is_client) redirect("/");
  return user;
}

export async function requireSuperAdmin() {
  const user = await requireUser();
  if (!user.profile.is_super_admin) redirect("/app");
  return user;
}

export async function requireBarbershop() {
  const user = await requireUser();
  const tenantId = await getActiveBarbershopId();
  if (!tenantId) {
    const memberships = await getCurrentMemberships();
    if (memberships.length === 0) {
      if (user.profile.is_super_admin) redirect("/admin");
      if (user.profile.is_client) redirect("/conta");
      redirect("/auth/login?error=no-membership");
    }
    redirect("/auth/select-tenant");
  }
  const memberships = await getCurrentMemberships();
  const active = memberships.find((m) => m.barbershop?.id === tenantId);
  if (active) return { user, membership: active };

  if (user.profile.is_super_admin) {
    const supabase = await createClient();
    const { data: shop } = await supabase
      .from("barbershops")
      .select("id, name, slug, status")
      .eq("id", tenantId)
      .maybeSingle();
    if (!shop) redirect("/admin/barbershops");
    return {
      user,
      membership: {
        role: "gestor" as const,
        is_active: true,
        barbershop: shop,
      },
    };
  }

  redirect("/auth/select-tenant");
}
