import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Farafina Foot Academy" },
      { name: "description", content: "Contactez l'académie : formulaire, WhatsApp, localisation et réseaux sociaux." },
      { property: "og:title", content: "Contact — Farafina Foot" },
      { property: "og:description", content: "Inscription et renseignements." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <Layout>
      <PageHero
        eyebrow="Parlons de votre enfant"
        title="Contact"
        subtitle="Une question ? Une inscription ? Notre équipe vous répond sous 24h, en français ou en wolof."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5">
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-8 shadow-elegant lg:col-span-3 md:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Send size={20} />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold uppercase">Écrivez-nous</h2>
                <p className="text-sm text-muted-foreground">Nous répondons sous 24h en moyenne.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-bold">Nom complet *</label>
                  <input name="name" maxLength={100} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-bold">Téléphone</label>
                  <input name="phone" maxLength={30} placeholder="+221 …" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold">Email *</label>
                <input name="email" type="email" maxLength={255} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-bold">Votre message *</label>
                <textarea name="message" rows={5} maxLength={1000} placeholder="Parlez-nous de votre enfant, son âge, sa catégorie souhaitée…" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground shadow-gold transition hover:scale-[1.02]">
                Envoyer ma demande <Send size={16} />
              </button>
              {status === "ok" && (
                <div className="flex items-center gap-2 rounded-lg bg-pitch/10 p-4 text-sm font-semibold text-pitch">
                  <CheckCircle2 size={18} /> Merci ! Votre message a bien été envoyé. Nous vous répondons rapidement.
                </div>
              )}
            </div>
          </form>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pitch text-secondary-foreground"><MapPin size={20} /></div>
                <div>
                  <div className="font-display font-bold uppercase">Adresse</div>
                  <div className="text-sm text-muted-foreground">Complexe sportif de l'ENA</div>
                  <div className="text-sm text-muted-foreground">Dakar, Sénégal</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Phone size={20} /></div>
                <div>
                  <div className="font-display font-bold uppercase">Téléphone</div>
                  <a href="tel:+221338159917" className="text-sm text-muted-foreground hover:text-primary">+221 33 815 99 17</a>
                </div>
              </div>
            </div>
            <a href="https://wa.me/221768317120" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pitch text-secondary-foreground"><MessageCircle size={20} /></div>
                <div>
                  <div className="font-display font-bold uppercase">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Chattez avec un coach maintenant</div>
                </div>
              </div>
            </a>
            <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ember text-secondary-foreground" style={{ backgroundColor: "var(--ember)" }}><Mail size={20} /></div>
                <div>
                  <div className="font-display font-bold uppercase">Email</div>
                  <a href="mailto:contact@farafinafoot.com" className="text-sm text-muted-foreground hover:text-primary">contact@farafinafoot.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground">
              <div className="flex items-start gap-4">
                <Clock size={20} className="mt-1 text-primary" />
                <div>
                  <div className="font-display font-bold uppercase text-primary">Horaires</div>
                  <div className="mt-1 text-sm text-secondary-foreground/80">Lundi — Samedi · 9h — 19h</div>
                  <div className="text-sm text-secondary-foreground/80">Dimanche · sur rendez-vous</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl px-4">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-pitch">Nous trouver</span>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Au cœur du Complexe de l'ENA</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
            <iframe
              title="Localisation Farafina Foot Academy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-17.48%2C14.71%2C-17.42%2C14.75&layer=mapnik"
              className="h-[28rem] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
