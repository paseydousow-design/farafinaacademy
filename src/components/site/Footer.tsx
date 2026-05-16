import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoFarafina from "@/assets/logo_farafina.png";

const PHONE_NUMBERS = ["33 815 99 17", "76 317 12 02", "77 861 97 05"];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoFarafina} alt="Farafina Foot Academy Logo" className="h-9 w-9 rounded-md object-cover" />
            <span className="font-display text-lg font-bold">FARAFINA FOOT</span>
          </div>
          <p className="mt-4 text-sm text-secondary-foreground/70">
            Former les talents de demain. L'académie qui révèle l'excellence du football africain.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-primary">Navigation</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link to="/about" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/programs" className="hover:text-primary">Programmes</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Galerie</Link></li>
            <li><Link to="/news" className="hover:text-primary">Actualités</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-primary">Contact</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-primary" /><span>Complexe de l'ENA, Dakar, Sénégal</span></li>
            {PHONE_NUMBERS.map((num) => (
              <li key={num} className="flex items-center gap-2"><Phone size={14} className="text-primary" /><span>+221 {num}</span></li>
            ))}
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><span>contact@farafinafoot.com</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-primary">Suivez-nous</h4>
          <div className="flex gap-3">
            <a href="https://www.tiktok.com/@farafina.footacad" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground" title="TikTok">
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.54-.05z"/></svg>
            </a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"><Facebook size={18} /></a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"><Instagram size={18} /></a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"><Youtube size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/10 py-5 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.
      </div>
    </footer>
  );
}
