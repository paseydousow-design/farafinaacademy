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
      <PageHero
        eyebrow="Notre maison, notre famille"
        title="À propos"
        subtitle="Une académie née de la passion. Une mission : former l'élite du football africain, dans le respect et l'excellence."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img src={coachImg} alt="" width={1280} height={896} loading="lazy" className="rounded-2xl shadow-deep" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-gold-lg md:block">
              <div className="font-display text-4xl font-bold leading-none">12</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-widest">Années d'expertise</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pitch">Notre histoire</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">12 ans à révéler des talents</h2>
            <p className="mt-5 text-muted-foreground">
              Créée en 2013 par d'anciens joueurs et éducateurs passionnés, Farafina Foot Academy est née d'une conviction :
              l'Afrique regorge de talents qui méritent un cadre professionnel pour s'épanouir. Basée à Dakar, l'académie
              s'entraîne au <strong className="text-foreground">Complexe sportif de l'ENA</strong>, un environnement
              moderne propice à l'excellence.
            </p>
            <p className="mt-4 text-muted-foreground">
              Aujourd'hui, plus de 500 jeunes Sénégalais et de la sous-région ont été formés chez nous, dont une trentaine
              évoluent désormais à un niveau professionnel en Afrique et en Europe.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "500+", l: "Formés" },
                { v: "30+", l: "Pros" },
                { v: "15", l: "Coachs" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className="font-display text-2xl font-bold text-pitch">{s.v}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl bg-card p-10 shadow-elegant transition hover:-translate-y-1">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
              <div className="font-display text-xs font-bold uppercase tracking-widest text-primary">01 — Mission</div>
              <h3 className="mt-3 font-display text-3xl font-bold">Notre mission</h3>
              <p className="mt-4 text-muted-foreground">
                Offrir aux jeunes africains une formation footballistique d'excellence, alliant performance sportive,
                réussite scolaire et développement personnel. Faire grandir des hommes et des femmes, pas seulement des joueurs.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-secondary p-10 text-secondary-foreground shadow-elegant transition hover:-translate-y-1">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
              <div className="absolute inset-0 bg-pitch-radial opacity-50" />
              <div className="relative">
                <div className="font-display text-xs font-bold uppercase tracking-widest text-primary">02 — Vision</div>
                <h3 className="mt-3 font-display text-3xl font-bold">Notre vision</h3>
                <p className="mt-4 text-secondary-foreground/80">
                  Devenir la référence continentale en matière de formation, et faire rayonner les talents africains
                  sur la scène internationale — du Sénégal vers le monde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-pitch">Nos valeurs</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Le socle de notre identité</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, t: "Discipline", d: "Rigueur, ponctualité, respect des règles : la base de tout grand joueur." },
              { icon: Star, t: "Excellence", d: "Toujours viser plus haut, repousser ses limites, soigner les détails." },
              { icon: Heart, t: "Respect", d: "Envers soi-même, ses coéquipiers, ses adversaires et le jeu." },
            ].map((v, i) => (
              <div key={v.t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition hover:-translate-y-2 hover:border-primary hover:shadow-elegant">
                <div className="absolute right-4 top-4 font-display text-5xl font-bold text-muted opacity-40">0{i + 1}</div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[var(--ember)] text-primary-foreground shadow-gold">
                  <v.icon size={28} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground">
        <div className="absolute inset-0 bg-ember-radial opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">L'équipe</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Nos coachs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-secondary-foreground/70">
              Des éducateurs diplômés, expérimentés, et profondément engagés pour la réussite de chaque enfant.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { n: "Cheikh Ndiaye", r: "Directeur technique", b: "Ex-international sénégalais, 20 ans d'expérience. Diplômé CAF A.", img: coach1 },
              { n: "Aïssatou Diop", r: "Coach U10–U13", b: "Spécialiste du développement de l'enfant et de l'éveil moteur.", img: coach2 },
              { n: "Babacar Faye", r: "Coach U15–U20", b: "Diplômé UEFA A, ancien joueur professionnel en Ligue 1 sénégalaise.", img: coach3 },
            ].map((c) => (
              <div key={c.n} className="group overflow-hidden rounded-2xl bg-card text-card-foreground shadow-elegant transition hover:-translate-y-2 hover:shadow-deep">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={c.img} alt={`Portrait de ${c.n}`} width={768} height={960} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent p-6 text-secondary-foreground">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{c.r}</div>
                    <h3 className="mt-1 font-display text-2xl font-bold">{c.n}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground">{c.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-pitch">Nos équipes</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Les visages de l'académie</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Filles et garçons, de l'éveil à l'élite : nos équipes s'entraînent chaque semaine au Complexe sportif de l'ENA à Dakar.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              { img: teamBoys, t: "Équipe masculine U13", d: "Une génération talentueuse en pleine progression, encadrée par notre staff technique." },
              { img: teamGirls, t: "Équipe féminine", d: "Fierté de l'académie, nos joueuses portent haut les couleurs du football féminin sénégalais." },
            ].map((t) => (
              <div key={t.t} className="group relative overflow-hidden rounded-2xl shadow-elegant transition hover:shadow-deep">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={t.img} alt={t.t} width={1280} height={960} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent p-8 text-secondary-foreground">
                  <h3 className="font-display text-2xl font-bold uppercase">{t.t}</h3>
                  <p className="mt-2 text-sm text-secondary-foreground/80">{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
