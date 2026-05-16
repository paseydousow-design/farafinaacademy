import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoFarafina from "@/assets/logo_farafina.png";

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
            <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><span>+221 77 000 00 00</span></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><span>contact@farafinafoot.com</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-primary">Suivez-nous</h4>
          <div className="flex gap-3">
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
