-- Rate limiting infrastructure (Fase 7)
-- Sliding window counter per (key, window_start) using a single bucket per window.
-- Returns { allowed, remaining, reset_at } so the app can show useful errors.

create table if not exists public.rate_limits (
  key text not null,
  window_start timestamptz not null,
  count integer not null default 0,
  primary key (key, window_start)
);

-- Cleanup: delete buckets older than 24h. Cron pode chamar isso semanalmente.
create or replace function public.fn_rate_limit_gc()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.rate_limits
  where window_start < now() - interval '24 hours';
$$;

-- Check + increment atomicamente. Retorna se a chamada foi permitida.
create or replace function public.fn_rate_limit_check(
  p_key text,
  p_max integer,
  p_window_sec integer
)
returns table(allowed boolean, remaining integer, reset_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_start timestamptz;
  v_count integer;
begin
  if p_max <= 0 or p_window_sec <= 0 then
    return query select true, p_max, now();
    return;
  end if;

  v_window_start := date_trunc('second', now()) - (extract(epoch from now())::bigint % p_window_sec) * interval '1 second';

  insert into public.rate_limits (key, window_start, count)
  values (p_key, v_window_start, 1)
  on conflict (key, window_start)
  do update set count = public.rate_limits.count + 1
  returning count into v_count;

  return query select
    (v_count <= p_max) as allowed,
    greatest(0, p_max - v_count) as remaining,
    (v_window_start + (p_window_sec || ' seconds')::interval) as reset_at;
end;
$$;

revoke all on function public.fn_rate_limit_check(text, integer, integer) from public;
grant execute on function public.fn_rate_limit_check(text, integer, integer) to service_role;

-- RLS: service_role only
alter table public.rate_limits enable row level security;
drop policy if exists rate_limits_no_access on public.rate_limits;
create policy rate_limits_no_access on public.rate_limits for all to authenticated using (false) with check (false);
