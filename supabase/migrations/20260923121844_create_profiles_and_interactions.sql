-- ====================================================================
-- [>] README — Profiles, Likes, Bookmarks, and Auto-provisioning Trigger
-- ====================================================================

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  github_username text,
  nim text,
  prodi text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Guide Likes Table (1 user can like a guide only once)
create table if not exists public.guide_likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  guide_id text references public.guides(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique (user_id, guide_id)
);

-- 3. Bookmarks Table (Saved guides)
create table if not exists public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  guide_id text references public.guides(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique (user_id, guide_id)
);

-- 4. Enable RLS
alter table public.profiles enable row level security;
alter table public.guide_likes enable row level security;
alter table public.bookmarks enable row level security;

-- Policies for Profiles
create policy "Allow public read access to profiles"
  on public.profiles for select
  using (true);

create policy "Allow users to update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Policies for Guide Likes
create policy "Allow public read access to likes"
  on public.guide_likes for select
  using (true);

create policy "Allow authenticated users to insert likes"
  on public.guide_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Allow users to delete own likes"
  on public.guide_likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Policies for Bookmarks
create policy "Allow users to view own bookmarks"
  on public.bookmarks for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Allow users to insert own bookmarks"
  on public.bookmarks for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Allow users to delete own bookmarks"
  on public.bookmarks for delete
  to authenticated
  using (auth.uid() = user_id);

-- 5. Trigger to automatically provision profile on user sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, github_username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'user_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    coalesce(new.raw_user_meta_data->>'user_name', '')
  )
  on conflict (id) do update set
    avatar_url = excluded.avatar_url,
    github_username = case when excluded.github_username <> '' then excluded.github_username else profiles.github_username end,
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Also trigger when identity is linked or metadata is updated
create or replace function public.handle_user_update()
returns trigger as $$
begin
  update public.profiles
  set
    avatar_url = coalesce(new.raw_user_meta_data->>'avatar_url', profiles.avatar_url),
    github_username = case
      when coalesce(new.raw_user_meta_data->>'user_name', '') <> '' then new.raw_user_meta_data->>'user_name'
      else profiles.github_username
    end,
    updated_at = now()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_user_update();

-- Grant schema permissions
grant usage on schema public to anon, authenticated;
grant all on table public.profiles to anon, authenticated;
grant all on table public.guide_likes to anon, authenticated;
grant all on table public.bookmarks to anon, authenticated;
