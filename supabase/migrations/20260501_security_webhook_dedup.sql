-- M6 — Replay protection para webhook Asaas.
-- Tabela de dedup por event id. App grava antes de processar; se já existe, ignora.

create table if not exists public.webhook_events_seen (
  provider text not null,
  event_id text not null,
  received_at timestamptz not null default now(),
  primary key (provider, event_id)
);

create index if not exists webhook_events_seen_received_at_idx
  on public.webhook_events_seen (received_at);

alter table public.webhook_events_seen enable row level security;
drop policy if exists webhook_events_seen_no_access on public.webhook_events_seen;
create policy webhook_events_seen_no_access on public.webhook_events_seen
  for all to authenticated using (false) with check (false);

-- GC: limpa eventos com mais de 30 dias.
create or replace function public.fn_webhook_events_gc()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.webhook_events_seen
  where received_at < now() - interval '30 days';
$$;
