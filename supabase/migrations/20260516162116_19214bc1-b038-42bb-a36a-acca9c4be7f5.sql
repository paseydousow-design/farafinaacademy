
-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create policy "Admins can manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles viewable by everyone" on public.profiles
  for select using (true);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Staff
create table public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  order_index int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.staff enable row level security;
create trigger staff_updated before update on public.staff for each row execute function public.set_updated_at();

create policy "Staff viewable by everyone" on public.staff for select using (is_active = true);
create policy "Admins view all staff" on public.staff for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins manage staff" on public.staff for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Gallery photos
create table public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  photo_url text not null,
  caption text,
  category text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.gallery_photos enable row level security;
create policy "Gallery viewable by everyone" on public.gallery_photos for select using (true);
create policy "Admins manage gallery" on public.gallery_photos for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- News
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text,
  content text,
  image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.news_posts enable row level security;
create trigger news_updated before update on public.news_posts for each row execute function public.set_updated_at();

create policy "Published news viewable by everyone" on public.news_posts for select using (published = true);
create policy "Admins view all news" on public.news_posts for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins manage news" on public.news_posts for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Registrations
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  child_name text not null,
  child_birthdate date,
  category text,
  parent_name text not null,
  parent_phone text not null,
  parent_email text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.registrations enable row level security;
create policy "Anyone can submit registration" on public.registrations for insert with check (true);
create policy "Admins view registrations" on public.registrations for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins update registrations" on public.registrations for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins delete registrations" on public.registrations for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- Storage bucket for site media
insert into storage.buckets (id, name, public) values ('site-media','site-media', true);

create policy "Public read site-media" on storage.objects for select using (bucket_id = 'site-media');
create policy "Admins upload site-media" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
create policy "Admins update site-media" on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
create policy "Admins delete site-media" on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
