import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import tunnelImg from "@/assets/stadium-tunnel.jpg";
import stadiumImg from "@/assets/stadium-view.jpg";
import coachImg from "@/assets/coach-training.jpg";
import teamImg from "@/assets/team-group.jpg";
import playerImg from "@/assets/player-dribble.jpg";
import matchImg from "@/assets/match-action.jpg";
import drillsImg from "@/assets/training-drills.jpg";
import { Trophy, Users, Target, ArrowRight, Quote, Star, ChevronDown, Zap, Award, Flame, ShieldCheck, Calendar, MapPin } from "lucide-react";

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

function StadiumEntry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from 0 (section top reaches viewport top) to 1 (section bottom reaches viewport bottom)
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Tunnel zoom: scale from 1 → 4, fade out at end
  const tunnelScale = 1 + progress * 3.5;
  const tunnelOpacity = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.3);
  // Stadium reveal: appears in second half
  const stadiumOpacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.3));
  const stadiumScale = 1.2 - Math.min(progress, 1) * 0.2;
  // Text reveal at end
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.2));
  const textY = (1 - textOpacity) * 40;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Stadium background, revealed as we exit the tunnel */}
        <div
          className="absolute inset-0"
          style={{
            opacity: stadiumOpacity,
            transform: `scale(${stadiumScale})`,
            transition: "opacity 0.1s linear",
          }}
        >
          <img src={stadiumImg} alt="Stade" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
        </div>

        {/* Tunnel — zooms toward viewer */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${tunnelScale})`,
            opacity: tunnelOpacity,
          }}
        >
          <img src={tunnelImg} alt="Entrée dans le stade" width={1920} height={1080} className="h-full w-full object-cover" />
        </div>

        {/* Final text reveal */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Bienvenue dans l'arène</span>
          <h2 className="mt-4 font-display text-5xl font-bold text-white md:text-7xl">
            Le terrain <span className="text-primary">t'attend</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/80">
            Chaque grand joueur a un jour franchi ce tunnel. Et toi, es-tu prêt à entrer ?
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
          style={{ opacity: 1 - progress * 2 }}
        >
          <ChevronDown className="animate-bounce" size={28} />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <Layout>
      {/* HERO — VIDEO */}
      <section className="relative isolate min-h-screen overflow-hidden bg-black text-secondary-foreground">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          poster={tunnelImg}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gold-radial opacity-40" />

        {/* Vertical side label */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 text-xs font-bold uppercase tracking-[0.5em] text-primary/70 lg:block">
          Dakar — Sénégal · Est. 2013
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-24 lg:px-16">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Inscriptions ouvertes — Saison 2026
            </span>
            <h1 className="mt-8 font-impact text-7xl font-bold leading-[0.85] text-white md:text-[10rem]">
              Deviens <br />
              <span className="text-gold-gradient">légendaire.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/80 md:text-xl">
              À <strong className="text-primary">Farafina Foot Academy</strong>, nous formons les futures étoiles du football sénégalais. Discipline. Technique. Mental d'acier.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-bold uppercase tracking-wide text-primary-foreground shadow-gold-lg transition hover:scale-105">
                Inscrire mon enfant <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-8 py-4 font-bold uppercase tracking-wide text-white backdrop-blur transition hover:border-primary hover:bg-primary/10">
                Découvrir l'académie
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown size={20} className="animate-bounce" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-primary/30 bg-black/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-primary/20 md:grid-cols-4 md:divide-x">
            {[
              { v: "500+", l: "Joueurs formés", icon: Users },
              { v: "15", l: "Coachs experts", icon: ShieldCheck },
              { v: "12", l: "Années d'excellence", icon: Award },
              { v: "30+", l: "Talents pros", icon: Trophy },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3 px-6 py-4 md:py-5">
                <s.icon className="text-primary" size={22} />
                <div>
                  <div className="font-impact text-2xl font-bold text-primary md:text-3xl">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/60 md:text-xs">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD TICKER */}
      <div className="overflow-hidden border-y-2 border-black bg-primary py-4">
        <div className="ticker-track flex w-max gap-12 whitespace-nowrap font-impact text-2xl font-bold text-black md:text-3xl">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex gap-12">
              {["★ Excellence", "★ Discipline", "★ Talent", "★ Dakar — Sénégal", "★ Farafina Foot Academy", "★ U10 → U20", "★ Complexe de l'ENA", "★ Inscriptions ouvertes"].map((t, i) => (
                <span key={i} className="flex items-center gap-12">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL — STADIUM ENTRY */}
      <StadiumEntry />

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
              { n: "Ibrahima Sarr", r: "Joueur U18", q: "L'académie m'a donné la rigueur et la technique pour passer pro. Une famille, un cadre, une vision." },
              { n: "Awa Ndoye", r: "Mère d'élève", q: "Mon fils a grandi en confiance et en discipline. Les coachs sont remarquables d'humanité." },
              { n: "Moussa Sow", r: "Ancien joueur", q: "Aujourd'hui je joue en Europe. Tout a commencé ici, à Farafina. Merci coach." },
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
