import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadToSiteMedia, pathFromPublicUrl } from "@/lib/upload";
import { Plus, Trash2, Loader2, Upload, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_admin/news")({ component: NewsAdmin });

type Post = { id: string; title: string; excerpt: string | null; content: string | null; image_url: string | null; published: boolean; published_at: string | null };

function NewsAdmin() {
  const [list, setList] = useState<Post[]>([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "" });
  const [file, setFile] = useState<File | null>(null);

  async function load() {
    const { data } = await supabase.from("news_posts").select("*").order("created_at", { ascending: false });
    setList((data ?? []) as Post[]);
  }
  useEffect(() => { load(); }, []);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      let image_url: string | null = null;
      if (file) image_url = await uploadToSiteMedia(file, "news");
      const { error } = await supabase.from("news_posts").insert({ ...form, image_url, published: true, published_at: new Date().toISOString() });
      if (error) throw error;
      setForm({ title: "", excerpt: "", content: "" }); setFile(null);
      await load();
    } catch (e) { alert((e as Error).message); } finally { setBusy(false); }
  }

  async function togglePublish(p: Post) {
    await supabase.from("news_posts").update({ published: !p.published, published_at: !p.published ? new Date().toISOString() : p.published_at }).eq("id", p.id);
    await load();
  }

  async function onDelete(p: Post) {
    if (!confirm(`Supprimer "${p.title}" ?`)) return;
    if (p.image_url) { const path = pathFromPublicUrl(p.image_url); if (path) await supabase.storage.from("site-media").remove([path]); }
    await supabase.from("news_posts").delete().eq("id", p.id);
    await load();
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Actualités</h1>
      <p className="mt-1 text-muted-foreground">Publiez les nouvelles de l'académie.</p>

      <form onSubmit={onAdd} className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-bold">Nouvel article</h2>
        <input required maxLength={200} placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <textarea maxLength={300} rows={2} placeholder="Extrait court" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <textarea required rows={6} placeholder="Contenu complet" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm">
            <Upload size={16} /> {file ? file.name : "Image de couverture"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <button disabled={busy} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-60">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Publier
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex-row">
            {p.image_url && <img src={p.image_url} alt="" className="h-32 w-full rounded-lg object-cover md:w-48" />}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${p.published ? "bg-pitch/10 text-pitch" : "bg-muted text-muted-foreground"}`}>
                  {p.published ? "Publié" : "Brouillon"}
                </span>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
              </div>
              {p.excerpt && <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>}
              <div className="mt-3 flex gap-2">
                <button onClick={() => togglePublish(p)} className="inline-flex items-center gap-1 rounded-lg border border-input px-3 py-1.5 text-xs">
                  {p.published ? <EyeOff size={12} /> : <Eye size={12} />} {p.published ? "Dépublier" : "Publier"}
                </button>
                <button onClick={() => onDelete(p)} className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                  <Trash2 size={12} /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucun article.</div>}
      </div>
    </div>
  );
}
