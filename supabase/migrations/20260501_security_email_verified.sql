-- H4 / Fase 9 — Marca quem teve email verificado de fato (futuro: gate em ações sensíveis).
-- Não quebra nada hoje. Só adiciona coluna e backfill defaultando a null.
-- Quem confirmou email pelo fluxo Supabase tem email_confirmed_at em auth.users — copiamos.

alter table public.profiles
  add column if not exists email_verified_at timestamptz;

-- Backfill inicial: quem já confirmou pelo Supabase, marca como verificado.
update public.profiles p
set email_verified_at = u.email_confirmed_at
from auth.users u
where p.id = u.id
  and u.email_confirmed_at is not null
  and p.email_verified_at is null;

-- Trigger: ao confirmar email no auth.users, propaga.
create or replace function public.fn_sync_email_verified()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if new.email_confirmed_at is not null and (old.email_confirmed_at is null or old.email_confirmed_at <> new.email_confirmed_at) then
    update public.profiles
       set email_verified_at = new.email_confirmed_at
     where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_email_verified on auth.users;
create trigger trg_sync_email_verified
after update on auth.users
for each row
execute function public.fn_sync_email_verified();
