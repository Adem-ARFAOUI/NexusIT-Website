import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Trophy, Plus, Trash2, Edit, ChevronUp, ChevronDown, Filter, Clock, Star, CheckCircle } from "lucide-react";
import { mockChallenges } from "../data/mockData";
import { Challenge, ChallengeStatus, Difficulty } from "../types";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { SuccessToast } from "./SuccessToast";

type SortField = "deadline" | "points" | "title";
type SortDir = "asc" | "desc";

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string; border: string }> = {
  easy: { label: "Facile", color: "#34d399", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  medium: { label: "Moyen", color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  hard: { label: "Difficile", color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
};

export function ChallengesList() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [statusFilter, setStatusFilter] = useState<ChallengeStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("deadline");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteTarget, setDeleteTarget] = useState<Challenge | null>(null);
  const [blockMsg, setBlockMsg] = useState("");
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    let list = [...challenges];
    if (statusFilter !== "all") list = list.filter((c) => c.status === statusFilter);
    list.sort((a, b) => {
      const va =
        sortField === "deadline" ? new Date(a.deadline).getTime()
        : sortField === "points" ? a.points
        : a.title.toLowerCase();
      const vb =
        sortField === "deadline" ? new Date(b.deadline).getTime()
        : sortField === "points" ? b.points
        : b.title.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [challenges, statusFilter, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  }

  function requestDelete(c: Challenge) {
    const hasValidated = c.submissions.some((s) => s.status === "validated");
    if (hasValidated) {
      setBlockMsg(`Impossible de supprimer "${c.title}" : ce challenge contient des soumissions validées.`);
      return;
    }
    setDeleteTarget(c);
  }

  function handleDelete(id: string) {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
    const idx = mockChallenges.findIndex((c) => c.id === id);
    if (idx !== -1) mockChallenges.splice(idx, 1);
    setDeleteTarget(null);
    setToast("Challenge supprimé avec succès.");
  }

  const activeCount = challenges.filter((c) => c.status === "active").length;
  const finishedCount = challenges.filter((c) => c.status === "finished").length;

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
            Gestion des Challenges
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            {challenges.length} challenge{challenges.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <Link
          to="/challenges/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#ffffff",
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
          }}
        >
          <Plus size={16} />
          Nouveau challenge
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: challenges.length, color: "#7c3aed" },
          { label: "Actifs", value: activeCount, color: "#34d399" },
          { label: "Terminés", value: finishedCount, color: "#8b7cb8" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</p>
            <p className="text-2xl" style={{ color, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={14} style={{ color: "var(--muted-foreground)" }} />
        {(["all", "active", "finished"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-3 py-2 rounded-lg text-xs transition-all"
            style={
              statusFilter === s
                ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontWeight: 700 }
                : { background: "var(--secondary)", color: "var(--muted-foreground)" }
            }
          >
            {s === "all" ? "Tous" : s === "active" ? "Actifs" : "Terminés"}
          </button>
        ))}
      </div>

      {/* Sort bar */}
      <div
        className="flex items-center gap-6 px-4 py-2 rounded-lg mb-4 text-xs"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
      >
        {([["deadline", "Date limite"], ["points", "Points"], ["title", "Titre"]] as [SortField, string][]).map(([field, label]) => (
          <button
            key={field}
            onClick={() => toggleSort(field)}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            {label}
            {sortField === field ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
          </button>
        ))}
        <span className="ml-auto">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
      </div>

      {/* Block message */}
      {blockMsg && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-4 text-sm"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}
        >
          <span className="flex-1">{blockMsg}</span>
          <button onClick={() => setBlockMsg("")} className="shrink-0 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Trophy size={40} style={{ color: "var(--muted-foreground)" }} className="mb-4 opacity-30" />
          <p style={{ color: "var(--muted-foreground)" }}>Aucun challenge trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              onDelete={() => requestDelete(c)}
              onEdit={() => navigate(`/challenges/${c.id}/edit`)}
              onClick={() => navigate(`/challenges/${c.id}`)}
            />
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirmDialog
          eventTitle={deleteTarget.title}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {toast && <SuccessToast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

function ChallengeCard({
  challenge,
  onDelete,
  onEdit,
  onClick,
}: {
  challenge: Challenge;
  onDelete: () => void;
  onEdit: () => void;
  onClick: () => void;
}) {
  const diff = difficultyConfig[challenge.difficulty];
  const deadline = new Date(challenge.deadline);
  const deadlineStr = deadline.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const isFinished = challenge.status === "finished";
  const pendingCount = challenge.submissions.filter((s) => s.status === "pending").length;
  const validatedCount = challenge.submissions.filter((s) => s.status === "validated").length;

  return (
    <div
      className="rounded-xl flex flex-col transition-all duration-200 hover:translate-y-[-2px] group"
      style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 rounded-t-xl"
        style={{ background: isFinished ? "rgba(139,124,184,0.5)" : "linear-gradient(90deg, #7c3aed, #a855f7)" }}
      />

      <div className="p-5 flex-1 cursor-pointer" onClick={onClick}>
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, fontWeight: 600 }}
          >
            {diff.label}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs ml-auto"
            style={
              isFinished
                ? { background: "rgba(139,124,184,0.15)", color: "#a78bfa", border: "1px solid rgba(139,124,184,0.3)", fontWeight: 600 }
                : { background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600 }
            }
          >
            {isFinished ? "Terminé" : "Actif"}
          </span>
        </div>

        <h3
          className="mb-2 line-clamp-2 leading-snug"
          style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}
        >
          {challenge.title}
        </h3>
        <p className="text-xs line-clamp-2 mb-4" style={{ color: "var(--muted-foreground)" }}>
          {challenge.description}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Clock size={12} style={{ color: "#7c3aed", flexShrink: 0 }} />
            Limite : {deadlineStr}
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Star size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />
            <span style={{ color: "#fbbf24", fontWeight: 700 }}>{challenge.points} pts</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <CheckCircle size={12} style={{ color: "#7c3aed", flexShrink: 0 }} />
            {validatedCount} validée{validatedCount > 1 ? "s" : ""}
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", fontWeight: 700 }}>
                {pendingCount} en attente
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          disabled={isFinished}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600 }}
          title={isFinished ? "Impossible de modifier un challenge terminé" : ""}
        >
          <Edit size={12} />
          Modifier
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all hover:opacity-90 ml-auto"
          style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", fontWeight: 600 }}
        >
          <Trash2 size={12} />
          Supprimer
        </button>
      </div>
    </div>
  );
}
