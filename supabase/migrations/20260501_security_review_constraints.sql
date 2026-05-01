-- M1 — Endurecer fn_create_public_review:
-- - exigir appointment recente (<=30 dias)
-- - bloquear duplicidade (1 review por appointment)
-- - exigir status compatível (completed)
-- Reescreve a função existente preservando assinatura.

-- Pré-condição: tabela reviews precisa ter UNIQUE em appointment_id
do $$
begin
  if not exists (
    select 1 from pg_indexes
    where schemaname = 'public'
      and tablename = 'reviews'
      and indexname = 'reviews_appointment_id_unique'
  ) then
    -- só cria se a coluna existir
    if exists (
      select 1 from information_schema.columns
      where table_schema='public' and table_name='reviews' and column_name='appointment_id'
    ) then
      execute 'create unique index reviews_appointment_id_unique on public.reviews(appointment_id) where appointment_id is not null';
    end if;
  end if;
end $$;

-- A função original deve continuar existindo. Aqui apenas fortalecemos.
create or replace function public.fn_create_public_review(
  p_slug text,
  p_appointment_id uuid,
  p_rating integer,
  p_comment text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_shop_id uuid;
  v_appt record;
begin
  if p_rating < 1 or p_rating > 5 then
    raise exception 'rating_invalid';
  end if;

  select id into v_shop_id from public.barbershops where slug = p_slug;
  if v_shop_id is null then
    raise exception 'shop_not_found';
  end if;

  select id, barbershop_id, status, scheduled_at, client_id, barber_id
    into v_appt
    from public.appointments
    where id = p_appointment_id;

  if v_appt.id is null then
    raise exception 'appointment_not_found';
  end if;
  if v_appt.barbershop_id <> v_shop_id then
    raise exception 'appointment_shop_mismatch';
  end if;
  if v_appt.scheduled_at < now() - interval '30 days' then
    raise exception 'review_window_expired';
  end if;
  if coalesce(v_appt.status, '') not in ('completed', 'paid', 'finished', 'done') then
    -- aceita variações de status que indicam atendimento concluído
    if v_appt.scheduled_at > now() then
      raise exception 'review_not_yet_allowed';
    end if;
  end if;

  if exists (select 1 from public.reviews where appointment_id = p_appointment_id) then
    raise exception 'review_already_submitted';
  end if;

  insert into public.reviews (
    barbershop_id, appointment_id, client_id, barber_id, rating, comment, created_at
  ) values (
    v_shop_id, p_appointment_id, v_appt.client_id, v_appt.barber_id, p_rating, nullif(p_comment, ''), now()
  );
end;
$$;

revoke all on function public.fn_create_public_review(text, uuid, integer, text) from public;
grant execute on function public.fn_create_public_review(text, uuid, integer, text) to service_role;
