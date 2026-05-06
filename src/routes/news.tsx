import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import match from "@/assets/match-action.jpg";
import team from "@/assets/team-group.jpg";
import drills from "@/assets/training-drills.jpg";
import { Calendar, ArrowRight } from "lucide-react";

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

const articles = [
  { img: match, date: "12 Avril 2026", cat: "Tournoi", t: "Nos U18 finalistes du tournoi régional", e: "Une performance remarquable de notre équipe U18 lors du tournoi de Bamako face aux meilleures académies de la sous-région." },
  { img: team, date: "28 Mars 2026", cat: "Annonce", t: "Ouverture des inscriptions saison 2026", e: "Les portes de l'académie sont ouvertes : rejoignez-nous pour vivre une saison inoubliable au cœur du football." },
  { img: drills, date: "05 Mars 2026", cat: "Performance", t: "Trois jeunes signent dans des clubs européens", e: "Le travail paie : trois pépites de Farafina viennent de signer leur premier contrat professionnel à l'étranger." },
];

function NewsPage() {
  return (
    <Layout>
      <PageHero title="Actualités" subtitle="Performances, annonces, tournois : suivez la vie de l'académie." />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.t} className="group overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="overflow-hidden">
                <img src={a.img} alt="" loading="lazy" className="h-56 w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded bg-primary px-2 py-1 font-bold uppercase text-primary-foreground">{a.cat}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar size={12} /> {a.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-tight">{a.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.e}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2">
                  Lire la suite <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
