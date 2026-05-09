import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-secondary-foreground md:py-32">
      <div className="absolute inset-0 bg-ember-radial" />
      <div className="absolute inset-0 bg-pitch-radial" />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 39h40M39 0v40' stroke='white' stroke-width='0.5'/></svg>\")" }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {eyebrow ?? "Farafina Foot Academy"}
        </div>
        <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-secondary-foreground/80 md:text-xl">{subtitle}</p>}
        <div className="mt-8 h-1 w-24 rounded-full bg-gold" />
      </div>
    </section>
  );
}
