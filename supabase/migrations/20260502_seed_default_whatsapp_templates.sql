-- Seed default WhatsApp templates for every barbershop, auto-seed for new ones.

CREATE OR REPLACE FUNCTION public.fn_seed_default_whatsapp_templates(p_shop uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO whatsapp_templates (barbershop_id, slug, trigger, name, body, is_active)
  VALUES
    (p_shop, 'confirmacao_padrao', 'appointment_confirmation', 'Confirmação de agendamento',
     E'Olá {cliente}! 👋 Seu horário na {barbearia} está confirmado:\n📅 {data} às {hora}\n✂️ {servicos} com {barbeiro}\n💰 Total: {valor}\nSe precisar remarcar, é só responder esta mensagem.',
     true),
    (p_shop, 'lembrete_padrao', 'appointment_reminder', 'Lembrete 24h antes',
     E'Oi {cliente}, passando para lembrar do seu horário amanhã na {barbearia}:\n📅 {data} às {hora} com {barbeiro}\n✂️ {servicos}\nConfirma pra gente? Responde *SIM* que tá confirmado. 🙌',
     true),
    (p_shop, 'pos_atendimento_padrao', 'post_service', 'Pós-atendimento',
     E'{cliente}, valeu por escolher a {barbearia}! 💈\nComo foi o atendimento com o {barbeiro}? Sua opinião ajuda muito a gente:\n👉 {link_avaliacao}',
     true),
    (p_shop, 'aniversario_padrao', 'birthday', 'Aniversário do cliente',
     E'🎉 Feliz aniversário, {cliente}! Que seu ano seja só vitória.\nLiberamos *{pontos_bonus} pontos* extras na sua fidelidade da {barbearia} como presente. Aparece pra gente comemorar com um corte! 💈',
     true),
    (p_shop, 'resgate_fidelidade_padrao', 'loyalty_redemption', 'Resgate de fidelidade',
     E'Boa, {cliente}! Seu resgate na {barbearia} foi confirmado:\n🎁 Recompensa: {recompensa}\n🔐 Código: *{codigo}*\nApresenta esse código no balcão. Aproveita! 💈',
     true)
  ON CONFLICT (barbershop_id, slug) DO NOTHING;
$$;

-- Backfill existing shops
SELECT public.fn_seed_default_whatsapp_templates(b.id) FROM barbershops b;

-- Auto-seed on new barbershop
CREATE OR REPLACE FUNCTION public.tg_seed_whatsapp_templates_on_shop_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.fn_seed_default_whatsapp_templates(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_seed_whatsapp_templates ON barbershops;
CREATE TRIGGER trg_seed_whatsapp_templates
AFTER INSERT ON barbershops
FOR EACH ROW
EXECUTE FUNCTION public.tg_seed_whatsapp_templates_on_shop_insert();
