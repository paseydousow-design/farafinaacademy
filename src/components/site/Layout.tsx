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

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero py-20 text-secondary-foreground">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <h1 className="font-display text-5xl font-bold md:text-6xl">
          <span className="text-primary">/</span> {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-secondary-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}
