import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Image, Newspaper, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [counts, setCounts] = useState({ staff: 0, gallery: 0, news: 0, regs: 0, newRegs: 0 });

  useEffect(() => {
    (async () => {
      const [s, g, n, r, nr] = await Promise.all([
        supabase.from("staff").select("id", { count: "exact", head: true }),
        supabase.from("gallery_photos").select("id", { count: "exact", head: true }),
        supabase.from("news_posts").select("id", { count: "exact", head: true }),
        supabase.from("registrations").select("id", { count: "exact", head: true }),
        supabase.from("registrations").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setCounts({ staff: s.count ?? 0, gallery: g.count ?? 0, news: n.count ?? 0, regs: r.count ?? 0, newRegs: nr.count ?? 0 });
    })();
  }, []);

  const cards = [
    { to: "/admin/staff", label: "Coachs", value: counts.staff, icon: Users, color: "bg-pitch" },
    { to: "/admin/gallery", label: "Photos galerie", value: counts.gallery, icon: Image, color: "bg-primary" },
    { to: "/admin/news", label: "Articles", value: counts.news, icon: Newspaper, color: "bg-secondary" },
    { to: "/admin/registrations", label: `Inscriptions (${counts.newRegs} nouvelles)`, value: counts.regs, icon: Inbox, color: "bg-[var(--ember)]" },
  ] as const;

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Tableau de bord</h1>
      <p className="mt-1 text-muted-foreground">Gérez le contenu et les inscriptions de l'académie.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-elegant">
            <div className={`grid h-12 w-12 place-items-center rounded-xl ${c.color} text-primary-foreground`}>
              <c.icon size={20} />
            </div>
            <div className="mt-4 font-display text-4xl font-bold">{c.value}</div>
            <div className="mt-1 text-sm font-semibold text-muted-foreground group-hover:text-primary">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
