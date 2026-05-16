import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/programs", label: "Programmes" },
  { to: "/gallery", label: "Galerie" },
  { to: "/news", label: "Actualités" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-secondary-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">F</span>
          <span className="font-display text-lg font-bold tracking-wide">FARAFINA <span className="text-primary">FOOT</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-secondary-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="ml-1 inline-flex items-center gap-1 rounded-md border border-primary/40 px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
              <Shield size={12} /> Admin
            </Link>
          )}
          <Link to="/inscription" className="ml-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-gold transition hover:scale-105">
            S'inscrire
          </Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="text-secondary-foreground md:hidden" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border/20 bg-secondary px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded px-3 py-2 text-sm text-secondary-foreground hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)} className="mt-2 block rounded-md border border-primary/40 px-4 py-2 text-center text-sm font-bold text-primary">
              Espace admin
            </Link>
          )}
          <Link to="/inscription" onClick={() => setOpen(false)} className="mt-2 block rounded-md bg-primary px-4 py-2 text-center text-sm font-bold text-primary-foreground">
            S'inscrire
          </Link>
        </nav>
      )}
    </header>
  );
}
