-- Add fakultas and angkatan columns to profiles table
alter table public.profiles
  add column if not exists fakultas text,
  add column if not exists angkatan integer;
