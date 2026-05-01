import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/database.types";

export type CurrentUser = {
  id: string;
  email: string | null;
  profile: Tables<"profiles">;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) return null;

  return { id: user.id, email: user.email ?? null, profile };
});

export const getCurrentMemberships = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("barbershop_members")
    .select("role, is_active, barbershop:barbershops(id, slug, name, primary_color, status)")
    .eq("is_active", true)
    .eq("user_id", user.id);
  if (error) throw error;
  return data ?? [];
});
