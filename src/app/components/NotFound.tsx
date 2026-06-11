import { Link } from "react-router";
import { Home, Zap } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-20 px-6 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}
      >
        <Zap size={36} style={{ color: "#7c3aed" }} />
      </div>
      <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)", fontSize: "4rem", fontWeight: 800, lineHeight: 1 }}>
        404
      </h1>
      <p className="mt-3 mb-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          color: "#ffffff",
          fontWeight: 600,
          boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
        }}
      >
        <Home size={14} />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
