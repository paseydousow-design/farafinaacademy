import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import match from "@/assets/match-action.jpg";
import team from "@/assets/team-group.jpg";
import drills from "@/assets/training-drills.jpg";
import { Calendar, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Actualités — Farafina Foot Academy" },
      { name: "description", content: "Articles, performances, tournois et annonces de l'académie." },
      { property: "og:title", content: "Actualités — Farafina Foot" },
      { property: "og:description", content: "Suivez l'actualité de Farafina Foot Academy." },
    ],
  }),
  component: NewsPage,
});

const featured = {
  img: match,
  date: "12 Avril 2026",
  cat: "Tournoi",
  t: "Nos U18 finalistes du tournoi régional de Dakar",
  e: "Une performance historique : nos U18 atteignent la finale face aux meilleures académies de la sous-région, confirmant la qualité de la formation Farafina.",
};

const articles = [
  { img: team, date: "28 Mars 2026", cat: "Annonce", t: "Ouverture des inscriptions saison 2026", e: "Les portes de l'académie sont ouvertes : rejoignez-nous pour vivre une saison inoubliable." },
  { img: drills, date: "05 Mars 2026", cat: "Performance", t: "Trois jeunes signent en Europe", e: "Trois pépites de Farafina viennent de signer leur premier contrat professionnel à l'étranger." },
  { img: match, date: "18 Février 2026", cat: "Stage", t: "Stage de vacances : 80 enfants accueillis", e: "Une semaine intense au Complexe de l'ENA, entre technique, jeu et valeurs." },
];

function NewsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Le journal de l'académie"
        title="Actualités"
        subtitle="Performances, annonces, tournois — suivez la vie de Farafina au plus près."
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            to="/news"
            className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-elegant transition hover:shadow-deep md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <img src={featured.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                <Trophy size={12} /> À la une
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded bg-pitch px-2 py-1 font-bold uppercase text-secondary-foreground">{featured.cat}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar size={12} /> {featured.date}</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">{featured.t}</h2>
              <p className="mt-4 text-muted-foreground">{featured.e}</p>
              <div className="mt-6 inline-flex items-center gap-2 font-bold text-primary">
                Lire l'article complet <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <div className="mt-16">
            <span className="text-xs font-bold uppercase tracking-widest text-pitch">Plus d'articles</span>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Toute l'actualité</h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article key={a.t} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-2 hover:border-primary hover:shadow-elegant">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={a.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded bg-primary px-2 py-1 font-bold uppercase text-primary-foreground">{a.cat}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Calendar size={12} /> {a.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-tight">{a.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.e}</p>
                  <button className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2">
                    Lire la suite <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-20 text-secondary-foreground">
        <div className="absolute inset-0 bg-ember-radial opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Restez informé</h2>
          <p className="mt-3 text-secondary-foreground/70">Recevez nos actualités, résultats et événements directement par email.</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <input type="email" placeholder="votre.email@exemple.com" className="flex-1 rounded-md border border-primary/30 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary" />
            <button className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-gold transition hover:scale-105">S'abonner</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
