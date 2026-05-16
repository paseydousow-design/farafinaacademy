
-- Fix search_path on trigger functions
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql security definer set search_path = public
as $$
begin new.updated_at = now(); return new; end; $$;

-- Restrict EXECUTE on has_role to authenticated only (used by RLS via security definer, no need for anon)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
