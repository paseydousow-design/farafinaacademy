import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { Check, Trophy, Calendar, ArrowRight, Sparkles } from "lucide-react";

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
  { age: "U10", title: "Éveil & Initiation", price: "15 000", featured: false, points: ["Motricité globale", "Découverte du jeu", "Fair-play & plaisir"] },
  { age: "U13", title: "Apprentissage technique", price: "20 000", featured: false, points: ["Technique individuelle", "Conduite de balle", "Tactique de base"] },
  { age: "U15", title: "Perfectionnement", price: "25 000", featured: true, points: ["Préparation physique", "Tactique collective", "Vidéo-analyse"] },
  { age: "U18", title: "Pré-formation pro", price: "30 000", featured: false, points: ["Compétitions nationales", "Préparation mentale", "Suivi scolaire renforcé"] },
  { age: "U20", title: "Élite & projection", price: "Sur dossier", featured: false, points: ["Détections clubs pro", "Tournois internationaux", "Coaching individuel"] },
];

const planning = [
  { d: "Lundi", c: "Technique + tactique", h: "16h–18h" },
  { d: "Mardi", c: "Préparation physique", h: "16h–18h" },
  { d: "Mercredi", c: "Match d'application", h: "15h–17h" },
  { d: "Jeudi", c: "Repos actif", h: "—" },
  { d: "Vendredi", c: "Spécifique poste", h: "16h–18h" },
  { d: "Samedi", c: "Match officiel", h: "10h–12h" },
  { d: "Dimanche", c: "Récupération", h: "—" },
];

const included = [
  "2 tenues d'entraînement officielles",
  "Suivi médical et nutritionnel",
  "Accompagnement scolaire",
  "Bilan technique trimestriel vidéo",
  "Stages vacances offerts",
  "Assurance sportive incluse",
];

function ProgramsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Formation U10 — U20"
        title="Programmes"
        subtitle="Une formation complète, structurée et adaptée à chaque âge — pensée pour révéler le meilleur de chaque enfant."
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div
                key={c.age}
                className={`group relative overflow-hidden rounded-2xl border p-7 transition hover:-translate-y-2 ${
                  c.featured
                    ? "border-primary bg-secondary text-secondary-foreground shadow-gold-lg"
                    : "border-border bg-card hover:border-primary hover:shadow-elegant"
                }`}
              >
                {c.featured && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    <Sparkles size={12} /> Populaire
                  </div>
                )}
                <div className={`grid h-20 w-20 place-items-center rounded-2xl font-display text-3xl font-bold ${c.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {c.age}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase">{c.title}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className={`font-display text-3xl font-bold ${c.featured ? "text-primary" : "text-pitch"}`}>{c.price}</span>
                  {c.price !== "Sur dossier" && <span className="text-xs font-semibold opacity-70">FCFA / mois</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={`mt-0.5 shrink-0 ${c.featured ? "text-primary" : "text-pitch"}`} /> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold transition ${
                    c.featured
                      ? "bg-primary text-primary-foreground hover:scale-[1.02]"
                      : "border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  Candidater <ArrowRight size={14} />
                </Link>
              </div>
            ))}

            <div className="relative overflow-hidden rounded-2xl bg-pitch p-7 text-secondary-foreground">
              <div className="absolute inset-0 bg-ember-radial opacity-70" />
              <div className="relative">
                <Trophy className="text-primary" size={32} />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Inclus dans chaque pack</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {included.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground">
        <div className="absolute inset-0 bg-pitch-radial opacity-60" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Calendar size={14} /> Planning hebdomadaire
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Une semaine type</h2>
            <p className="mx-auto mt-3 max-w-xl text-secondary-foreground/70">Un rythme équilibré, pensé pour la progression et la récupération.</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl border border-primary/20 bg-card/5 backdrop-blur">
            {planning.map((p, i) => (
              <div
                key={p.d}
                className={`grid grid-cols-3 items-center gap-4 px-6 py-5 transition hover:bg-primary/5 ${
                  i % 2 === 0 ? "bg-white/5" : ""
                }`}
              >
                <div className="font-display text-lg font-bold uppercase tracking-wider text-primary">{p.d}</div>
                <div className="text-sm font-medium">{p.c}</div>
                <div className="text-right text-sm font-semibold text-secondary-foreground/70">{p.h}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-bold text-primary-foreground shadow-gold-lg transition hover:scale-105"
            >
              Inscrire mon enfant <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-xs text-secondary-foreground/60">Places limitées — sélection sur dossier et test sportif.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
