import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadToSiteMedia, pathFromPublicUrl } from "@/lib/upload";
import { Upload, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({ component: GalleryAdmin });

type Photo = { id: string; photo_url: string; caption: string | null; category: string | null; order_index: number };

function GalleryAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");

  async function load() {
    const { data } = await supabase.from("gallery_photos").select("*").order("order_index").order("created_at", { ascending: false });
    setPhotos((data ?? []) as Photo[]);
  }
  useEffect(() => { load(); }, []);

  async function onFiles(files: FileList | null) {
    if (!files) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadToSiteMedia(file, "gallery");
        await supabase.from("gallery_photos").insert({ photo_url: url, caption: caption || null, category: category || null, order_index: photos.length });
      }
      setCaption(""); setCategory("");
      await load();
    } catch (e) { alert((e as Error).message); } finally { setBusy(false); }
  }

  async function onDelete(p: Photo) {
    if (!confirm("Supprimer cette photo ?")) return;
    const path = pathFromPublicUrl(p.photo_url);
    if (path) await supabase.storage.from("site-media").remove([path]);
    await supabase.from("gallery_photos").delete().eq("id", p.id);
    await load();
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Galerie photos</h1>
      <p className="mt-1 text-muted-foreground">Ajoutez plusieurs photos d'un coup. Visibles immédiatement sur la page Galerie.</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <input maxLength={200} placeholder="Légende (optionnel)" value={caption} onChange={(e) => setCaption(e.target.value)} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
          <input maxLength={50} placeholder="Catégorie (Match, Entraînement…)" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
        </div>
        <label className="mt-3 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-input bg-background px-6 py-10 text-sm font-semibold transition hover:border-primary hover:bg-primary/5">
          {busy ? <Loader2 className="animate-spin" /> : <Upload />} Uploader des photos
          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => onFiles(e.target.files)} />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
            <img src={p.photo_url} alt={p.caption ?? ""} className="aspect-square w-full object-cover" />
            <button onClick={() => onDelete(p)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition group-hover:opacity-100">
              <Trash2 size={14} />
            </button>
            {p.caption && <div className="p-2 text-xs">{p.caption}</div>}
          </div>
        ))}
        {photos.length === 0 && <div className="col-span-2 md:col-span-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucune photo.</div>}
      </div>
    </div>
  );
}
