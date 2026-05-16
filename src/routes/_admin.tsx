import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Loader2, Image, Users, Newspaper, Inbox, LogOut, Home } from "lucide-react";

export const Route = createFileRoute("/_admin")({
  head: () => ({ meta: [{ title: "Admin — Farafina Foot" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { loading, session, isAdmin, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !session) nav({ to: "/login" });
  }, [loading, session, nav]);

  if (loading || !session) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="animate-spin text-primary" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold">Accès refusé</h1>
          <p className="mt-3 text-muted-foreground">
            Votre compte n'a pas encore le rôle administrateur. Contactez le développeur pour l'activer.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Email connecté : {session.user.email}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/" className="rounded-lg border border-input px-4 py-2 text-sm">Retour au site</Link>
            <button onClick={() => signOut()} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Se déconnecter</button>
          </div>
        </div>
      </div>
    );
  }

  const items = [
    { to: "/admin", label: "Tableau de bord", icon: Home, exact: true },
    { to: "/admin/staff", label: "Coachs / Staff", icon: Users },
    { to: "/admin/gallery", label: "Galerie", icon: Image },
    { to: "/admin/news", label: "Actualités", icon: Newspaper },
    { to: "/admin/registrations", label: "Inscriptions", icon: Inbox },
  ] as const;

  return (
    <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-secondary text-secondary-foreground">
        <div className="border-b border-border/30 p-6">
          <Link to="/" className="font-display text-lg font-bold tracking-wide">
            FARAFINA <span className="text-primary">FOOT</span>
          </Link>
          <div className="mt-1 text-xs uppercase tracking-widest text-primary">Admin</div>
        </div>
        <nav className="space-y-1 p-3">
          {items.map((i) => (
            <Link key={i.to} to={i.to} activeOptions={{ exact: i.exact }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              activeProps={{ className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm bg-primary text-primary-foreground font-semibold" }}>
              <i.icon size={16} /> {i.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-[260px] border-t border-border/30 p-3 md:fixed">
          <button onClick={() => signOut()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary-foreground/80 hover:bg-destructive/10 hover:text-destructive">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="bg-muted/30">
        <Outlet />
      </main>
    </div>
  );
}
