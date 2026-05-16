import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — Farafina Foot Academy" },
      { name: "description", content: "Inscrivez votre enfant à Farafina Foot Academy à Dakar. Formulaire en ligne, réponse sous 24h." },
    ],
  }),
  component: InscriptionPage,
});

const schema = z.object({
  child_name: z.string().trim().min(2).max(100),
  child_birthdate: z.string().optional(),
  category: z.string().trim().max(50).optional(),
  parent_name: z.string().trim().min(2).max(100),
  parent_phone: z.string().trim().min(6).max(30),
  parent_email: z.string().trim().email().max(255),
  message: z.string().trim().max(1000).optional(),
});

function InscriptionPage() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const payload = {
      child_name: String(f.get("child_name") || ""),
      child_birthdate: String(f.get("child_birthdate") || "") || undefined,
      category: String(f.get("category") || "") || undefined,
      parent_name: String(f.get("parent_name") || ""),
      parent_phone: String(f.get("parent_phone") || ""),
      parent_email: String(f.get("parent_email") || ""),
      message: String(f.get("message") || "") || undefined,
    };
    const r = schema.safeParse(payload);
    if (!r.success) { setError("Merci de remplir correctement tous les champs requis."); setBusy(false); return; }
    const { error: err } = await supabase.from("registrations").insert({
      ...r.data,
      child_birthdate: r.data.child_birthdate || null,
      category: r.data.category || null,
      message: r.data.message || null,
    });
    setBusy(false);
    if (err) setError(err.message); else setDone(true);
  }

  if (done) {
    return (
      <Layout>
        <section className="grid min-h-[70vh] place-items-center bg-hero py-20">
          <div className="mx-4 max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-deep">
            <CheckCircle2 className="mx-auto text-pitch" size={56} />
            <h1 className="mt-4 font-display text-3xl font-bold">Demande reçue !</h1>
            <p className="mt-3 text-muted-foreground">Merci. Un membre de l'académie vous rappelle sous 24h pour finaliser l'inscription.</p>
            <Link to="/" className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground">Retour à l'accueil</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero eyebrow="Rejoindre l'académie" title="Inscription" subtitle="Remplissez ce formulaire — un coach vous rappelle pour finaliser." />
      <section className="py-20">
        <form onSubmit={onSubmit} className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <h2 className="font-display text-2xl font-bold">L'enfant</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-bold">Nom de l'enfant *</label>
              <input name="child_name" required maxLength={100} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-bold">Date de naissance</label>
              <input name="child_birthdate" type="date" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-bold">Catégorie souhaitée</label>
              <select name="category" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm">
                <option value="">— Choisir —</option>
                <option>U10</option><option>U13</option><option>U15</option><option>U17</option><option>U20</option>
                <option>Féminine</option>
              </select>
            </div>
          </div>

          <h2 className="mt-8 font-display text-2xl font-bold">Le parent / tuteur</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-bold">Nom complet *</label>
              <input name="parent_name" required maxLength={100} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-bold">Téléphone *</label>
              <input name="parent_phone" required maxLength={30} placeholder="+221 …" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-bold">Email *</label>
              <input name="parent_email" type="email" required maxLength={255} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-bold">Message (optionnel)</label>
              <textarea name="message" rows={4} maxLength={1000} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" />
            </div>
          </div>

          {error && <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground shadow-gold hover:scale-[1.01] disabled:opacity-60">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Envoyer ma demande
          </button>
        </form>
      </section>
    </Layout>
  );
}
