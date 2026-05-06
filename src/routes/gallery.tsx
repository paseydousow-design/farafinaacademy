import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import hero from "@/assets/hero-football.jpg";
import coach from "@/assets/coach-training.jpg";
import dribble from "@/assets/player-dribble.jpg";
import team from "@/assets/team-group.jpg";
import match from "@/assets/match-action.jpg";
import drills from "@/assets/training-drills.jpg";

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
  { src: hero, alt: "Entraînement au coucher du soleil" },
  { src: dribble, alt: "Joueur en action" },
  { src: team, alt: "Équipe de l'académie" },
  { src: match, alt: "Action de match" },
  { src: coach, alt: "Coach et joueurs" },
  { src: drills, alt: "Exercices techniques" },
];

function GalleryPage() {
  return (
    <Layout>
      <PageHero title="Galerie" subtitle="L'académie en images : entraînements, matchs et moments forts." />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg">
              <img src={img.src} alt={img.alt} loading="lazy" className="h-72 w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-2 text-sm font-semibold text-secondary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
