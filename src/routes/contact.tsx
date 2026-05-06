import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";

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
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = { name: String(form.get("name")||""), email: String(form.get("email")||""), message: String(form.get("message")||"") };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[String(i.path[0])] = i.message; });
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
      <PageHero title="Contact" subtitle="Une question ? Une inscription ? Notre équipe vous répond." />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5">
          <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold">Écrivez-nous</h2>
            <div className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold">Nom complet</label>
                <input name="name" maxLength={100} className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input name="email" type="email" maxLength={255} className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea name="message" rows={5} maxLength={1000} className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground shadow-gold transition hover:scale-[1.02]">
                Envoyer <Send size={16} />
              </button>
              {status === "ok" && <p className="text-sm font-semibold text-primary">Merci ! Votre message a bien été envoyé.</p>}
            </div>
          </form>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3"><MapPin className="text-primary" /><div><div className="font-bold">Adresse</div><div className="text-sm text-muted-foreground">Stade Modibo Keïta, Bamako, Mali</div></div></div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3"><Phone className="text-primary" /><div><div className="font-bold">Téléphone</div><div className="text-sm text-muted-foreground">+223 70 00 00 00</div></div></div>
            </div>
            <a href="https://wa.me/22370000000" target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-border bg-card p-6 transition hover:border-primary">
              <div className="flex items-center gap-3"><MessageCircle className="text-primary" /><div><div className="font-bold">WhatsApp</div><div className="text-sm text-muted-foreground">Discutez avec nous</div></div></div>
            </a>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3"><Mail className="text-primary" /><div><div className="font-bold">Email</div><div className="text-sm text-muted-foreground">contact@farafinafoot.com</div></div></div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-4">
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="Localisation"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-8.05%2C12.60%2C-7.95%2C12.70&layer=mapnik"
              className="h-96 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
