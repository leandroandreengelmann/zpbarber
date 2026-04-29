"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { announcementUpsertSchema } from "@/lib/zod/announcements";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

function parseForm(formData: FormData) {
  const audience = (formData.get("audience") ?? "all") as string;
  const shopIdsRaw = formData.getAll("audience_shop_ids").map(String);
  return announcementUpsertSchema.safeParse({
    id: (formData.get("id") as string) || undefined,
    title: formData.get("title") ?? "",
    body: formData.get("body") ?? "",
    severity: formData.get("severity") ?? "info",
    audience,
    audience_shop_ids: shopIdsRaw.filter(Boolean),
    link_url: formData.get("link_url") ?? "",
    link_label: formData.get("link_label") ?? "",
    expires_at: formData.get("expires_at") ?? "",
  });
}

export async function createAnnouncementAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const user = await requireSuperAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title: v.title,
      body: v.body,
      severity: v.severity,
      audience: v.audience,
      audience_shop_ids: v.audience === "all" ? [] : v.audience_shop_ids,
      link_url: v.link_url ?? null,
      link_label: v.link_label ?? null,
      expires_at: v.expires_at || null,
      created_by: user.id,
    })
    .select("id")
    .single();
  if (error) return { error: error.message };

  await logAudit({
    action: "announcement.create",
    resourceType: "announcement",
    resourceId: data.id,
    metadata: { title: v.title, audience: v.audience, severity: v.severity },
  });

  revalidatePath("/admin/announcements");
  redirect(`/admin/announcements/${data.id}`);
}

export async function updateAnnouncementAction(
  id: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireSuperAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("announcements")
    .update({
      title: v.title,
      body: v.body,
      severity: v.severity,
      audience: v.audience,
      audience_shop_ids: v.audience === "all" ? [] : v.audience_shop_ids,
      link_url: v.link_url ?? null,
      link_label: v.link_label ?? null,
      expires_at: v.expires_at || null,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  await logAudit({
    action: "announcement.update",
    resourceType: "announcement",
    resourceId: id,
    metadata: { title: v.title },
  });

  revalidatePath("/admin/announcements");
  revalidatePath(`/admin/announcements/${id}`);
  return { ok: true };
}

export async function publishAnnouncementAction(id: string) {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("announcements")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;

  await logAudit({
    action: "announcement.publish",
    resourceType: "announcement",
    resourceId: id,
  });

  revalidatePath("/admin/announcements");
  revalidatePath(`/admin/announcements/${id}`);
}

export async function archiveAnnouncementAction(id: string) {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("announcements")
    .update({ status: "archived" })
    .eq("id", id);
  if (error) throw error;

  await logAudit({
    action: "announcement.archive",
    resourceType: "announcement",
    resourceId: id,
  });

  revalidatePath("/admin/announcements");
  revalidatePath(`/admin/announcements/${id}`);
}

export async function deleteAnnouncementAction(id: string) {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;

  await logAudit({
    action: "announcement.delete",
    resourceType: "announcement",
    resourceId: id,
  });

  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}

export async function dismissAnnouncementAction(id: string) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;
  const { error } = await supabase
    .from("announcement_dismissals")
    .upsert(
      { announcement_id: id, user_id: auth.user.id },
      { onConflict: "announcement_id,user_id" }
    );
  if (error) throw error;
  revalidatePath("/app");
}
