import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Trash2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/registrations")({ component: RegsAdmin });

type Reg = {
  id: string; child_name: string; child_birthdate: string | null; category: string | null;
  parent_name: string; parent_phone: string; parent_email: string; message: string | null;
  status: string; created_at: string;
};

function RegsAdmin() {
  const [list, setList] = useState<Reg[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "archived">("all");

  async function load() {
    const { data } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
    setList((data ?? []) as Reg[]);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(r: Reg, s: string) { await supabase.from("registrations").update({ status: s }).eq("id", r.id); await load(); }
  async function onDelete(r: Reg) { if (!confirm(`Supprimer la demande de ${r.child_name} ?`)) return; await supabase.from("registrations").delete().eq("id", r.id); await load(); }

  const filtered = filter === "all" ? list : list.filter((r) => r.status === filter);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Inscriptions reçues</h1>
      <p className="mt-1 text-muted-foreground">{list.length} demande(s) au total.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "new", "contacted", "archived"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition ${filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-primary"}`}>
            {f === "all" ? "Toutes" : f === "new" ? "Nouvelles" : f === "contacted" ? "Contactées" : "Archivées"}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.status === "new" ? "bg-[var(--ember)]/15 text-[var(--ember)]" : r.status === "contacted" ? "bg-pitch/10 text-pitch" : "bg-muted text-muted-foreground"}`}>
                    {r.status}
                  </span>
                  <h3 className="font-display text-lg font-bold">{r.child_name}</h3>
                  {r.category && <span className="text-xs text-muted-foreground">· {r.category}</span>}
                  {r.child_birthdate && <span className="text-xs text-muted-foreground">· né(e) le {new Date(r.child_birthdate).toLocaleDateString("fr-FR")}</span>}
                </div>
                <div className="mt-2 text-sm">
                  <strong>Parent :</strong> {r.parent_name}
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <a href={`tel:${r.parent_phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone size={12} /> {r.parent_phone}</a>
                  <a href={`mailto:${r.parent_email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail size={12} /> {r.parent_email}</a>
                </div>
                {r.message && <p className="mt-3 rounded-lg bg-muted p-3 text-sm">{r.message}</p>}
                <div className="mt-2 text-xs text-muted-foreground">Reçue le {new Date(r.created_at).toLocaleString("fr-FR")}</div>
              </div>
              <div className="flex flex-col gap-2">
                {r.status !== "contacted" && <button onClick={() => setStatus(r, "contacted")} className="inline-flex items-center gap-1 rounded-lg bg-pitch px-3 py-1.5 text-xs font-bold text-secondary-foreground"><CheckCircle2 size={12} /> Contactée</button>}
                {r.status !== "archived" && <button onClick={() => setStatus(r, "archived")} className="rounded-lg border border-input px-3 py-1.5 text-xs">Archiver</button>}
                <button onClick={() => onDelete(r)} className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive"><Trash2 size={12} /> Supprimer</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucune demande.</div>}
      </div>
    </div>
  );
}
