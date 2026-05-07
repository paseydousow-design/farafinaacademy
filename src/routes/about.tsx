import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import coachImg from "@/assets/coach-training.jpg";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";
import teamBoys from "@/assets/team-boys.jpg";
import teamGirls from "@/assets/team-girls.jpg";
import { Shield, Heart, Star } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Farafina Foot Academy" },
      { name: "description", content: "Notre histoire, mission, vision et valeurs. Découvrez l'équipe qui forme les talents de demain." },
      { property: "og:title", content: "À propos — Farafina Foot Academy" },
      { property: "og:description", content: "Histoire, mission et coachs de Farafina Foot Academy." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <PageHero title="À propos" subtitle="Une académie née de la passion. Une mission : former l'élite du football africain." />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <img src={coachImg} alt="" width={1280} height={896} loading="lazy" className="rounded-lg shadow-elegant" />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Notre histoire</span>
            <h2 className="mt-3 font-display text-4xl font-bold">12 ans à révéler des talents</h2>
            <p className="mt-5 text-muted-foreground">
              Créée en 2013 par d'anciens joueurs et éducateurs passionnés, Farafina Foot Academy est née d'une conviction :
              l'Afrique regorge de talents qui méritent un cadre professionnel pour s'épanouir. Basée à Dakar, l'académie
              s'entraîne au <strong className="text-foreground">Complexe sportif de l'ENA</strong>, un environnement
              moderne propice à l'excellence.
            </p>
            <p className="mt-4 text-muted-foreground">
              Aujourd'hui, plus de 500 jeunes Sénégalais et de la sous-région ont été formés chez nous, dont une trentaine évoluent désormais à un niveau professionnel
              en Afrique et en Europe.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-primary bg-card p-8">
              <h3 className="font-display text-2xl font-bold">Notre mission</h3>
              <p className="mt-3 text-muted-foreground">
                Offrir aux jeunes africains une formation footballistique d'excellence, alliant performance sportive,
                réussite scolaire et développement personnel.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-primary bg-card p-8">
              <h3 className="font-display text-2xl font-bold">Notre vision</h3>
              <p className="mt-3 text-muted-foreground">
                Devenir la référence continentale en matière de formation, et faire rayonner les talents africains
                sur la scène internationale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Nos valeurs</span>
            <h2 className="mt-3 font-display text-4xl font-bold">Le socle de notre identité</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, t: "Discipline", d: "Rigueur, ponctualité, respect des règles : la base de tout grand joueur." },
              { icon: Star, t: "Excellence", d: "Toujours viser plus haut, repousser ses limites, soigner les détails." },
              { icon: Heart, t: "Respect", d: "Envers soi-même, ses coéquipiers, ses adversaires et le jeu." },
            ].map((v) => (
              <div key={v.t} className="rounded-lg border border-border bg-card p-8 text-center transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <v.icon size={26} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">L'équipe</span>
            <h2 className="mt-3 font-display text-4xl font-bold">Nos coachs</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Sékou Diarra", r: "Directeur technique", b: "Ex-international, 20 ans d'expérience" },
              { n: "Fatou Cissé", r: "Coach U10–U13", b: "Spécialiste développement enfant" },
              { n: "Mamadou Konaté", r: "Coach U15–U20", b: "Diplômé UEFA A" },
            ].map((c) => (
              <div key={c.n} className="rounded-lg bg-card p-6 text-card-foreground">
                <div className="aspect-square rounded-md bg-gold" />
                <h3 className="mt-5 font-display text-xl font-bold">{c.n}</h3>
                <div className="text-sm font-semibold text-primary">{c.r}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
