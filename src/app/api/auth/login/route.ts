import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_TENANT_COOKIE } from "@/lib/auth/current-tenant";
import { safeNext } from "@/lib/auth/safe-redirect";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "");

  const origin = request.nextUrl.origin;
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, origin), { status: 303 });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return redirectTo("/auth/login?error=invalid-credentials");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirectTo("/auth/login?error=invalid-credentials");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_super_admin, is_client")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.is_super_admin) return redirectTo(safeNext(nextRaw, "/admin"));

  const { data: memberships } = await supabase
    .from("barbershop_members")
    .select("barbershop_id")
    .eq("user_id", user.id)
    .eq("is_active", true);

  if (!memberships || memberships.length === 0) {
    if (!profile?.is_client) {
      const admin = createAdminClient();
      await admin.from("profiles").update({ is_client: true }).eq("id", user.id);
    }
    return redirectTo("/conta");
  }

  if (memberships.length === 1) {
    const c = await cookies();
    c.set(ACTIVE_TENANT_COOKIE, memberships[0].barbershop_id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return redirectTo(safeNext(nextRaw, "/app"));
  }

  return redirectTo("/auth/select-tenant");
}
