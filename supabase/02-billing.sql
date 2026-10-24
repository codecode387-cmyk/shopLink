-- Billing info lives in its own table so it is NOT publicly readable.
create table if not exists public.vendor_billing (
  vendor_id uuid primary key references public.vendors(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  trial_ends_at timestamptz not null default (now() + interval '30 days'),
  subscription_status text not null default 'trialing'
    check (subscription_status in ('trialing','active','past_due','expired')),
  paid_until timestamptz,
  paystack_subscription_code text,
  paystack_email_token text,
  created_at timestamptz default now()
);

alter table public.vendor_billing enable row level security;

drop policy if exists "Owners can view their billing" on public.vendor_billing;
create policy "Owners can view their billing"
  on public.vendor_billing for select using (auth.uid() = owner_id);
-- No insert/update policies: only the server (service role) can change billing.

create or replace function public.create_vendor_billing()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.vendor_billing (vendor_id, owner_id)
  values (new.id, new.owner_id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_vendor_created on public.vendors;
create trigger on_vendor_created
  after insert on public.vendors
  for each row execute function public.create_vendor_billing();

-- Backfill stores created before this step
insert into public.vendor_billing (vendor_id, owner_id)
select id, owner_id from public.vendors where owner_id is not null
on conflict do nothing;
