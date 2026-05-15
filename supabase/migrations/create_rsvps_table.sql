-- Charlotte Ysabella RSVP database setup
-- Run this file in the Supabase SQL Editor before connecting the frontend.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text not null,
  guest_count int8,
  attendance text not null
);

alter table public.rsvps enable row level security;

drop policy if exists "Allow public RSVP inserts" on public.rsvps;
drop policy if exists "Allow temporary public RSVP reads" on public.rsvps;
drop policy if exists "Allow temporary public RSVP deletes" on public.rsvps;

-- Guests are anonymous public users, so this temporary policy allows anyone
-- to submit a new RSVP from the public invitation page.
create policy "Allow public RSVP inserts"
on public.rsvps
for insert
to anon
with check (true);

-- Temporary admin dashboard read policy. This allows the dashboard to read all
-- RSVP rows before login/auth is added. Replace this once authentication exists.
create policy "Allow temporary public RSVP reads"
on public.rsvps
for select
to anon
using (true);

-- Temporary admin dashboard delete policy. This allows the manual /admin route
-- to delete RSVP rows before login/auth is added. Replace this with admin-only
-- access before using the dashboard for real guest data.
create policy "Allow temporary public RSVP deletes"
on public.rsvps
for delete
to anon
using (true);
