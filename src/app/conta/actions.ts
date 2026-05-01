"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type State = { error?: string; ok?: boolean };

export async function cancelMyAppointmentAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const id = String(formData.get("appointment_id") ?? "");
  if (!id) return { error: "Agendamento não encontrado." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_client_cancel_appointment", {
    p_appointment_id: id,
  });
  if (error) return { error: error.message };

  revalidatePath("/conta");
  return { ok: true };
}
