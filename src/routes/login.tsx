import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LogIn } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion admin — Farafina Foot" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) nav({ to: "/admin" });
  }, [session, loading, nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin", data: { full_name: fullName } },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav({ to: "/admin" });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally { setBusy(false); }
  }

  return (
    <Layout>
      <section className="grid min-h-[80vh] place-items-center bg-hero py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-deep">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-gold">
              <LogIn size={22} />
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold">Espace administration</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin" ? "Connectez-vous pour gérer le contenu" : "Créez votre compte admin"}
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-bold">Nom complet</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            )}
            <div>
              <label className="text-sm font-bold">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required maxLength={255}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-bold">Mot de passe</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} maxLength={72}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <p className="mt-1 text-xs text-muted-foreground">Min. 8 caractères.</p>
            </div>
            {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
            <button disabled={busy} type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground shadow-gold transition hover:scale-[1.01] disabled:opacity-60">
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </button>
            <button type="button" onClick={() => { setError(""); setMode(mode === "signin" ? "signup" : "signin"); }}
              className="w-full text-sm text-muted-foreground hover:text-primary">
              {mode === "signin" ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
            <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">← Retour au site</Link>
          </form>
        </div>
      </section>
    </Layout>
  );
}
