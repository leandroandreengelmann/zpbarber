-- Notificações pro celular do dono
ALTER TABLE public.whatsapp_settings
  ADD COLUMN IF NOT EXISTS notify_phone text,
  ADD COLUMN IF NOT EXISTS notify_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS notify_new_appointment boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_new_payment boolean NOT NULL DEFAULT true;

CREATE OR REPLACE FUNCTION public.fn_wa_enqueue(
  _barbershop_id uuid,
  _client_id uuid,
  _appointment_id uuid,
  _trigger whatsapp_trigger,
  _template_slug text,
  _vars jsonb,
  _scheduled_for timestamp with time zone DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  s public.whatsapp_settings;
  tpl public.whatsapp_templates;
  c public.clients;
  phone text;
  body_rendered text;
  msg_id uuid;
begin
  select * into s from public.whatsapp_settings where barbershop_id = _barbershop_id;
  if s is null or s.connection_status <> 'connected' then
    return null;
  end if;

  if _trigger = 'appointment_confirmation' and not s.trigger_confirmation then return null; end if;
  if _trigger = 'appointment_reminder' and not s.trigger_reminder then return null; end if;
  if _trigger = 'post_service' and not s.trigger_post_service then return null; end if;
  if _trigger = 'birthday' and not s.trigger_birthday then return null; end if;

  if _trigger = 'owner_new_appointment' then
    if not s.notify_enabled or not s.notify_new_appointment then return null; end if;
    if s.notify_phone is null or btrim(s.notify_phone) = '' then return null; end if;
  end if;
  if _trigger = 'owner_new_payment' then
    if not s.notify_enabled or not s.notify_new_payment then return null; end if;
    if s.notify_phone is null or btrim(s.notify_phone) = '' then return null; end if;
  end if;

  if _template_slug is not null then
    select * into tpl from public.whatsapp_templates
      where barbershop_id = _barbershop_id and slug = _template_slug;
    if tpl is null or not tpl.is_active then return null; end if;
    body_rendered := public.fn_wa_render(tpl.body, _vars);
  else
    body_rendered := coalesce((_vars->>'body'), '');
  end if;

  if body_rendered = '' then return null; end if;

  if _trigger in ('owner_new_appointment','owner_new_payment') then
    phone := nullif(btrim(coalesce(s.notify_phone, '')), '');
  else
    if _client_id is not null then
      select * into c from public.clients where id = _client_id;
      phone := nullif(btrim(coalesce(c.phone, '')), '');
    end if;
    if phone is null and (_vars->>'to_phone') is not null then
      phone := _vars->>'to_phone';
    end if;
  end if;
  if phone is null then return null; end if;

  insert into public.whatsapp_messages (
    barbershop_id, client_id, appointment_id, trigger, template_slug,
    to_phone, body, scheduled_for
  ) values (
    _barbershop_id, _client_id, _appointment_id, _trigger, _template_slug,
    phone, body_rendered, _scheduled_for
  ) returning id into msg_id;

  return msg_id;
end $$;

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
     true),
    (p_shop, 'dono_novo_agendamento', 'owner_new_appointment', 'Aviso ao dono — novo agendamento',
     E'🆕 *Novo agendamento* — {barbearia}\n👤 {cliente}\n📅 {data} às {hora}\n✂️ {servicos} com {barbeiro}\n💰 {valor} ({origem})',
     true),
    (p_shop, 'dono_novo_recebimento', 'owner_new_payment', 'Aviso ao dono — novo recebimento',
     E'💵 *Novo recebimento* — {barbearia}\n👤 {cliente} pagou {valor}\n✂️ {servico} com {barbeiro}\n💳 {forma_pagamento}',
     true)
  ON CONFLICT (barbershop_id, slug) DO NOTHING;
$$;

SELECT public.fn_seed_default_whatsapp_templates(b.id) FROM barbershops b;
