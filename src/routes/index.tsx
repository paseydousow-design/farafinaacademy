import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-football.jpg";
import coachImg from "@/assets/coach-training.jpg";
import teamImg from "@/assets/team-group.jpg";
import { Trophy, Users, Target, ArrowRight, Quote, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farafina Foot Academy — Former les talents de demain" },
      { name: "description", content: "Académie de football africaine d'excellence. Formation des jeunes talents de U10 à U20 avec des coachs professionnels." },
      { property: "og:title", content: "Farafina Foot Academy" },
      { property: "og:description", content: "Former les talents de demain. Rejoignez notre académie de football." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-secondary text-secondary-foreground">
        <img src={heroImg} alt="Jeunes joueurs de football à l'entraînement" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Académie de football
            </span>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] md:text-8xl">
              Former les <span className="text-primary">talents</span> de demain
            </h1>
            <p className="mt-6 max-w-xl text-lg text-secondary-foreground/80">
              Farafina Foot Academy révèle l'excellence du football africain. Discipline, technique, mental — nous formons les champions de demain.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-bold text-primary-foreground shadow-gold transition hover:scale-105">
                S'inscrire maintenant <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-7 py-4 font-bold text-secondary-foreground transition hover:bg-primary/10">
                Voir les programmes
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hidden border-t border-primary/20 bg-secondary/90 backdrop-blur md:block">
          <div className="mx-auto grid max-w-7xl grid-cols-4 divide-x divide-primary/20">
            {[
              { v: "500+", l: "Joueurs formés" },
              { v: "15", l: "Coachs experts" },
              { v: "12", l: "Années d'expérience" },
              { v: "30+", l: "Talents pros" },
            ].map((s) => (
              <div key={s.l} className="px-6 py-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-secondary-foreground/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img src={coachImg} alt="Coach et joueurs" width={1280} height={896} loading="lazy" className="rounded-lg object-cover shadow-elegant" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-primary p-6 text-primary-foreground shadow-gold md:block">
              <div className="font-display text-4xl font-bold">12+</div>
              <div className="text-xs font-semibold uppercase">ans d'excellence</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">L'académie</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">L'excellence au service du football africain</h2>
            <p className="mt-5 text-muted-foreground">
              Fondée avec la passion de révéler les talents du continent, Farafina Foot Academy combine techniques modernes,
              valeurs traditionnelles et accompagnement individuel pour faire éclore les champions de demain.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Trophy, t: "Excellence sportive", d: "Programme calqué sur les meilleurs centres européens." },
                { icon: Users, t: "Accompagnement humain", d: "Suivi scolaire, mental et nutritionnel." },
                { icon: Target, t: "Vision long terme", d: "Préparer chaque joueur à une carrière durable." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <f.icon size={22} />
                  </div>
                  <div>
                    <div className="font-bold">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground">
        <img src={teamImg} alt="" width={1280} height={896} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Rejoignez l'académie</span>
          <h2 className="mt-4 font-display text-5xl font-bold md:text-6xl">
            Et si <span className="text-primary">demain</span><br />commençait aujourd'hui ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-secondary-foreground/80">
            Les inscriptions sont ouvertes pour la nouvelle saison. Toutes les catégories d'âge, du U10 au U20.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-bold text-primary-foreground shadow-gold transition hover:scale-105">
            Candidater maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Témoignages</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Ils ont vécu l'expérience</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Ibrahim K.", r: "Joueur U18", q: "L'académie m'a donné la rigueur et la technique pour passer pro. Une famille, un cadre, une vision." },
              { n: "Aminata D.", r: "Mère d'élève", q: "Mon fils a grandi en confiance et en discipline. Les coachs sont remarquables d'humanité." },
              { n: "Moussa T.", r: "Ancien joueur", q: "Aujourd'hui je joue en Europe. Tout a commencé ici, à Farafina. Merci coach." },
            ].map((t) => (
              <div key={t.n} className="rounded-lg border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-elegant">
                <Quote className="text-primary" />
                <p className="mt-4 text-sm text-foreground/90">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <div className="mt-3">
                  <div className="font-bold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
