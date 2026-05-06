import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programmes — Farafina Foot Academy" },
      { name: "description", content: "Programmes de formation par catégorie d'âge U10, U13, U15, U18, U20. Planning et tarifs." },
      { property: "og:title", content: "Programmes de formation — Farafina Foot" },
      { property: "og:description", content: "Catégories U10 à U20, entraînements, planning, tarifs." },
    ],
  }),
  component: ProgramsPage,
});

const categories = [
  { age: "U10", title: "Éveil & Initiation", price: "15 000 FCFA / mois", points: ["Motricité globale", "Découverte du jeu", "Fair-play"] },
  { age: "U13", title: "Apprentissage technique", price: "20 000 FCFA / mois", points: ["Technique individuelle", "Conduite de balle", "Tactique de base"] },
  { age: "U15", title: "Perfectionnement", price: "25 000 FCFA / mois", points: ["Préparation physique", "Tactique collective", "Vidéo-analyse"] },
  { age: "U18", title: "Pré-formation pro", price: "30 000 FCFA / mois", points: ["Compétitions nationales", "Préparation mentale", "Suivi scolaire"] },
  { age: "U20", title: "Élite & projection", price: "Sur dossier", points: ["Détections clubs pro", "Tournois internationaux", "Coaching individuel"] },
];

const planning = [
  { d: "Lundi", c: "Technique + tactique" },
  { d: "Mardi", c: "Préparation physique" },
  { d: "Mercredi", c: "Match d'application" },
  { d: "Jeudi", c: "Repos actif" },
  { d: "Vendredi", c: "Spécifique poste" },
  { d: "Samedi", c: "Match officiel" },
  { d: "Dimanche", c: "Récupération" },
];

function ProgramsPage() {
  return (
    <Layout>
      <PageHero title="Programmes" subtitle="Une formation complète, adaptée à chaque catégorie d'âge." />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.age} className="group relative overflow-hidden rounded-lg border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary hover:shadow-elegant">
                <div className="absolute -right-6 -top-6 grid h-24 w-24 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
                  {c.age}
                </div>
                <h3 className="mt-12 font-display text-2xl font-bold">{c.title}</h3>
                <div className="mt-2 text-sm font-semibold text-primary">{c.price}</div>
                <ul className="mt-5 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Planning hebdomadaire</span>
            <h2 className="mt-3 font-display text-4xl font-bold">Une semaine type</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-primary/20">
            {planning.map((p, i) => (
              <div key={p.d} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "bg-card/5" : ""}`}>
                <div className="font-display font-bold uppercase tracking-wider text-primary">{p.d}</div>
                <div className="text-sm text-secondary-foreground/80">{p.c}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/contact" className="inline-flex rounded-md bg-primary px-7 py-4 font-bold text-primary-foreground shadow-gold transition hover:scale-105">
              Inscrire mon enfant
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
