import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import hero from "@/assets/hero-football.jpg";
import coach from "@/assets/coach-training.jpg";
import dribble from "@/assets/player-dribble.jpg";
import team from "@/assets/team-group.jpg";
import match from "@/assets/match-action.jpg";
import drills from "@/assets/training-drills.jpg";
import { useState } from "react";
import { X, Camera } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie — Farafina Foot Academy" },
      { name: "description", content: "Photos d'entraînements, matchs et événements de l'académie." },
      { property: "og:title", content: "Galerie — Farafina Foot" },
      { property: "og:description", content: "Découvrez l'académie en images." },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: hero, alt: "Entraînement au coucher du soleil", cat: "Entraînement", span: "md:col-span-2 md:row-span-2" },
  { src: dribble, alt: "Dribble en action", cat: "Match" },
  { src: team, alt: "Équipe de l'académie", cat: "Équipe" },
  { src: match, alt: "Action de match", cat: "Match", span: "md:col-span-2" },
  { src: coach, alt: "Coach et joueurs", cat: "Coaching" },
  { src: drills, alt: "Exercices techniques", cat: "Entraînement" },
];

function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Layout>
      <PageHero
        eyebrow="L'académie en images"
        title="Galerie"
        subtitle="Plongez dans le quotidien de Farafina : entraînements, matchs, célébrations et instants de complicité."
      />

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pitch">
                <Camera size={14} /> Moments forts
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Notre saison en images</h2>
            </div>
            <div className="hidden text-sm text-muted-foreground md:block">{images.length} clichés sélectionnés</div>
          </div>

          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setOpen(img.src)}
                className={`group relative overflow-hidden rounded-2xl shadow-elegant ${img.span ?? ""}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-60 transition group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 p-4 text-left">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    {img.cat}
                  </span>
                  <div className="mt-2 font-display text-sm font-bold uppercase text-secondary-foreground md:text-base">
                    {img.alt}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[60] grid place-items-center bg-secondary/95 p-4 backdrop-blur animate-fade-up">
          <button className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-gold">
            <X />
          </button>
          <img src={open} alt="" className="max-h-[88vh] w-auto rounded-2xl shadow-deep" />
        </div>
      )}
    </Layout>
  );
}
