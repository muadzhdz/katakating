-- Fix permissions and RLS for submissions from anonymous users
grant usage on schema public to anon, authenticated;
grant all on table public.submissions to anon, authenticated;

drop policy if exists "Allow anonymous insert to submissions" on public.submissions;

create policy "Allow anonymous insert to submissions"
  on public.submissions
  for insert
  to anon, authenticated
  with check (true);
