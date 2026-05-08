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
import { Trophy, Users, Target, ArrowRight, Quote, Star, ChevronDown, Zap, Award, Flame, ShieldCheck, Calendar, MapPin, GraduationCap, HeartPulse, PlayCircle, CheckCircle2 } from "lucide-react";

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
      <section className="relative overflow-hidden bg-background py-32">
        <div className="pointer-events-none absolute -left-32 top-20 font-impact text-[20rem] font-bold text-primary/[0.04]">FARAFINA</div>
        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-deep">
              <img src={coachImg} alt="Coach et joueurs" width={1280} height={896} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Complexe de l'ENA</div>
                <div className="font-impact text-3xl">Dakar, Sénégal</div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-4 rotate-3 rounded-xl bg-primary p-6 text-primary-foreground shadow-gold-lg md:-right-8">
              <div className="font-impact text-5xl font-bold leading-none">12+</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider">ans d'excellence</div>
            </div>
            <div className="absolute -left-4 top-8 -rotate-6 rounded-xl border-2 border-primary bg-black px-5 py-3 text-white shadow-elegant md:-left-8">
              <div className="font-impact text-2xl">★ ★ ★ ★ ★</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Académie certifiée</div>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              <span className="h-px w-8 bg-primary" /> L'académie
            </span>
            <h2 className="mt-4 font-impact text-5xl font-bold leading-[0.95] md:text-7xl">
              L'excellence <br /><span className="text-gold-gradient">au cœur de Dakar.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Au Complexe sportif de l'ENA, Farafina Foot Academy combine méthodes européennes,
              valeurs sénégalaises et accompagnement individuel pour faire éclore les champions de demain.
            </p>
            <div className="mt-10 grid gap-4">
              {[
                { icon: Trophy, t: "Excellence sportive", d: "Programme inspiré des meilleurs centres de formation européens." },
                { icon: Users, t: "Accompagnement humain", d: "Suivi scolaire, mental, médical et nutritionnel personnalisé." },
                { icon: Target, t: "Vision long terme", d: "Préparer chaque enfant à une carrière sportive et professionnelle." },
              ].map((f) => (
                <div key={f.t} className="group flex gap-5 rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-gold">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-gold transition group-hover:rotate-6">
                    <f.icon size={24} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold">{f.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US — bold dark section */}
      <section className="relative overflow-hidden bg-secondary py-32 text-secondary-foreground grain">
        <div className="absolute inset-0 bg-gold-radial opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Pourquoi nous choisir</span>
            <h2 className="mt-4 font-impact text-5xl font-bold leading-[0.95] md:text-7xl">
              4 raisons de <span className="text-primary">croire en l'avenir</span> de votre enfant
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Flame, t: "Passion", d: "Une équipe qui transmet l'amour du jeu, jour après jour." },
              { icon: ShieldCheck, t: "Sécurité", d: "Cadre encadré, médicalisé, supervisé par des professionnels." },
              { icon: Zap, t: "Performance", d: "Préparation physique et technique de niveau international." },
              { icon: Award, t: "Réussite", d: "30+ joueurs propulsés en clubs pros en Afrique et Europe." },
            ].map((f, i) => (
              <div key={f.t} className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-black/40 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-primary">
                <div className="absolute -right-6 -top-6 font-impact text-9xl text-primary/10 transition group-hover:text-primary/20">0{i+1}</div>
                <f.icon className="text-primary" size={32} />
                <h3 className="mt-6 font-impact text-2xl font-bold">{f.t}</h3>
                <p className="mt-3 text-sm text-secondary-foreground/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TALENTS SPOTLIGHT */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Nos talents</span>
              <h2 className="mt-4 font-impact text-5xl font-bold leading-[0.95] md:text-7xl">
                Les visages de <br /><span className="text-gold-gradient">la nouvelle vague</span>
              </h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:underline">
              Voir la galerie <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { img: playerImg, n: "Mamadou Diallo", p: "Attaquant · U18", num: "10" },
              { img: matchImg, n: "Ousmane Mbaye", p: "Milieu · U16", num: "08" },
              { img: drillsImg, n: "Pape Sané", p: "Défenseur · U20", num: "04" },
            ].map((p, i) => (
              <div key={p.n} className={`group relative overflow-hidden rounded-2xl shadow-elegant ${i === 1 ? "md:translate-y-12" : ""}`}>
                <div className="aspect-[3/4] overflow-hidden bg-black">
                  <img src={p.img} alt={p.n} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute right-4 top-4 grid h-14 w-14 place-items-center rounded-full bg-primary font-impact text-2xl font-bold text-black shadow-gold">
                  {p.num}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">{p.p}</div>
                  <div className="mt-1 font-impact text-3xl">{p.n}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="relative overflow-hidden bg-secondary py-32 text-secondary-foreground">
        <img src={teamImg} alt="" width={1280} height={896} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="absolute inset-0 bg-gold-radial opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Rejoignez l'académie</span>
            <h2 className="mt-4 font-impact text-6xl font-bold leading-[0.9] md:text-8xl">
              Et si <span className="text-gold-gradient">demain</span><br />commençait <em className="not-italic text-primary">aujourd'hui</em> ?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-secondary-foreground/80">
              Inscriptions ouvertes — saison 2026. Toutes catégories de U10 à U20, garçons et filles. Places limitées.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-bold uppercase tracking-wide text-primary-foreground shadow-gold-lg transition hover:scale-105">
                Candidater maintenant <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <a href="https://wa.me/221770000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-8 py-4 font-bold uppercase tracking-wide text-white backdrop-blur transition hover:border-primary">
                WhatsApp direct
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Calendar, t: "Saison 2026", d: "Reprise mi-septembre. Tests d'entrée en août." },
              { icon: MapPin, t: "Complexe ENA", d: "Dakar — terrain professionnel, vestiaires, salle de musculation." },
              { icon: Users, t: "U10 → U20", d: "8 catégories d'âge, garçons et filles." },
              { icon: Trophy, t: "Tournois", d: "Compétitions nationales et tournois internationaux." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-primary/20 bg-black/40 p-6 backdrop-blur transition hover:border-primary">
                <c.icon className="text-primary" size={26} />
                <div className="mt-4 font-impact text-xl">{c.t}</div>
                <p className="mt-1 text-sm text-secondary-foreground/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Témoignages</span>
            <h2 className="mt-4 font-impact text-5xl font-bold leading-[0.95] md:text-7xl">
              Ils ont <span className="text-gold-gradient">vécu</span> l'expérience
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { n: "Ibrahima Sarr", r: "Joueur U18", q: "L'académie m'a donné la rigueur et la technique. Aujourd'hui je rêve d'évoluer en Europe — et j'y crois vraiment." },
              { n: "Awa Ndoye", r: "Maman de Cheikh, U13", q: "Mon fils a grandi en confiance et en discipline. Les coachs sont des éducateurs avant d'être des techniciens. Une vraie famille." },
              { n: "Moussa Sow", r: "Ancien joueur, pro à l'étranger", q: "Tout a commencé ici, à Farafina. Le mental, la rigueur, l'ambition — c'est là que je les ai forgés. Merci coach." },
            ].map((t, i) => (
              <div key={t.n} className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-2 hover:border-primary hover:shadow-gold ${i === 1 ? "md:bg-secondary md:text-secondary-foreground" : ""}`}>
                <Quote className="text-primary" size={36} />
                <p className="mt-6 text-base leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <div className="mt-4 border-t border-current/10 pt-4">
                  <div className="font-impact text-xl">{t.n}</div>
                  <div className="text-xs uppercase tracking-wider opacity-60">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
