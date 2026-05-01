import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enqueueWhatsappMessage } from "@/lib/whatsapp/enqueue";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  return handle(req);
}
export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const supabase = createAdminClient();
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  // Pega TODOS os clientes com birth_date hoje, junta com settings + loyalty
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, full_name, phone, birth_date, barbershop_id")
    .not("birth_date", "is", null)
    .like("birth_date", `%-${mm}-${dd}`);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!clients || clients.length === 0) {
    return NextResponse.json({ enqueued: 0 });
  }

  // Agrupa por barbearia, busca shops + settings + loyalty bonus
  const shopIds = Array.from(
    new Set(clients.map((c: { barbershop_id: string }) => c.barbershop_id))
  );
  const [shopsRes, settingsRes, loyaltyRes] = await Promise.all([
    supabase.from("barbershops").select("id, name").in("id", shopIds),
    supabase
      .from("whatsapp_settings")
      .select("barbershop_id, trigger_birthday, trigger_birthday_hour, connection_status")
      .in("barbershop_id", shopIds),
    supabase
      .from("loyalty_settings")
      .select("barbershop_id, birthday_bonus_points, is_active")
      .in("barbershop_id", shopIds),
  ]);
  const shops = new Map((shopsRes.data ?? []).map((s) => [s.id, s.name]));
  const settings = new Map(
    (settingsRes.data ?? []).map((s) => [s.barbershop_id, s])
  );
  const loyalty = new Map(
    (loyaltyRes.data ?? []).map((l) => [l.barbershop_id, l])
  );

  let enqueued = 0;
  const bonusShops = new Set<string>();
  for (const c of clients) {
    const s = settings.get(c.barbershop_id);
    if (!s || s.connection_status !== "connected" || !s.trigger_birthday) continue;
    const shopName = shops.get(c.barbershop_id) ?? "Barbearia";
    const bonus = loyalty.get(c.barbershop_id)?.is_active
      ? loyalty.get(c.barbershop_id)?.birthday_bonus_points ?? 0
      : 0;

    const id = await enqueueWhatsappMessage({
      barbershopId: c.barbershop_id,
      clientId: c.id,
      trigger: "birthday",
      templateSlug: "birthday",
      vars: {
        cliente: c.full_name?.split(" ")[0] ?? "Cliente",
        pontos_bonus: bonus,
        barbearia: shopName,
      },
    });
    if (id) enqueued += 1;
    if (bonus > 0) bonusShops.add(c.barbershop_id);
  }

  for (const shopId of bonusShops) {
    try {
      await supabase.rpc("fn_award_birthday_bonus", { p_shop: shopId });
    } catch {}
  }

  return NextResponse.json({ enqueued });
}
