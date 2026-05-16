import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadToSiteMedia, pathFromPublicUrl } from "@/lib/upload";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";

export const Route = createFileRoute("/_admin/staff")({ component: StaffAdmin });

type Staff = { id: string; name: string; role: string; bio: string | null; photo_url: string | null; order_index: number; is_active: boolean };

function StaffAdmin() {
  const [list, setList] = useState<Staff[]>([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [file, setFile] = useState<File | null>(null);

  async function load() {
    const { data } = await supabase.from("staff").select("*").order("order_index").order("created_at");
    setList((data ?? []) as Staff[]);
  }
  useEffect(() => { load(); }, []);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      let photo_url: string | null = null;
      if (file) photo_url = await uploadToSiteMedia(file, "staff");
      const { error } = await supabase.from("staff").insert({ ...form, photo_url, order_index: list.length });
      if (error) throw error;
      setForm({ name: "", role: "", bio: "" }); setFile(null);
      await load();
    } catch (e) { alert((e as Error).message); } finally { setBusy(false); }
  }

  async function onDelete(s: Staff) {
    if (!confirm(`Supprimer ${s.name} ?`)) return;
    if (s.photo_url) {
      const p = pathFromPublicUrl(s.photo_url);
      if (p) await supabase.storage.from("site-media").remove([p]);
    }
    await supabase.from("staff").delete().eq("id", s.id);
    await load();
  }

  async function toggleActive(s: Staff) {
    await supabase.from("staff").update({ is_active: !s.is_active }).eq("id", s.id);
    await load();
  }

  async function replacePhoto(s: Staff, f: File) {
    const url = await uploadToSiteMedia(f, "staff");
    if (s.photo_url) { const p = pathFromPublicUrl(s.photo_url); if (p) await supabase.storage.from("site-media").remove([p]); }
    await supabase.from("staff").update({ photo_url: url }).eq("id", s.id);
    await load();
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Coachs & Staff</h1>
      <p className="mt-1 text-muted-foreground">Ajoutez, modifiez ou retirez les membres de l'équipe.</p>

      <form onSubmit={onAdd} className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
        <h2 className="md:col-span-2 font-display text-xl font-bold">Ajouter un membre</h2>
        <input required maxLength={100} placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <input required maxLength={100} placeholder="Rôle (ex: Coach U13)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <textarea maxLength={500} rows={2} placeholder="Bio (optionnel)" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="md:col-span-2 rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm">
          <Upload size={16} /> {file ? file.name : "Photo (optionnel)"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Ajouter
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[4/3] bg-muted">
              {s.photo_url ? <img src={s.photo_url} alt={s.name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-muted-foreground">Pas de photo</div>}
            </div>
            <div className="p-4">
              <div className="font-display text-lg font-bold">{s.name}</div>
              <div className="text-xs uppercase tracking-widest text-primary">{s.role}</div>
              {s.bio && <p className="mt-2 text-sm text-muted-foreground">{s.bio}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <label className="cursor-pointer rounded-lg border border-input px-3 py-1.5 text-xs">
                  Changer photo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) replacePhoto(s, f); }} />
                </label>
                <button onClick={() => toggleActive(s)} className="rounded-lg border border-input px-3 py-1.5 text-xs">
                  {s.is_active ? "Masquer" : "Activer"}
                </button>
                <button onClick={() => onDelete(s)} className="ml-auto inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                  <Trash2 size={12} /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucun coach ajouté.</div>}
      </div>
    </div>
  );
}
