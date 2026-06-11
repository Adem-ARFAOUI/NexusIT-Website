import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Trophy, Clock, Star, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react";
import { mockChallenges } from "../data/mockData";
import { Challenge, Difficulty, Submission, SubmissionStatus } from "../types";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { SuccessToast } from "./SuccessToast";

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string; border: string }> = {
  easy: { label: "Facile", color: "#34d399", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  medium: { label: "Moyen", color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  hard: { label: "Difficile", color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
};

const submissionStatusConfig: Record<SubmissionStatus, { label: string; color: string; bg: string; border: string }> = {
  pending: { label: "En attente", color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  validated: { label: "Validée", color: "#34d399", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  rejected: { label: "Rejetée", color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
};

export function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | undefined>(
    () => mockChallenges.find((c) => c.id === id)
  );
  const [showDelete, setShowDelete] = useState(false);
  const [blockMsg, setBlockMsg] = useState("");
  const [toast, setToast] = useState("");

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-20">
        <p style={{ color: "var(--muted-foreground)" }}>Challenge introuvable.</p>
        <Link to="/challenges" className="mt-4 text-sm" style={{ color: "#7c3aed" }}>← Retour</Link>
      </div>
    );
  }

  const diff = difficultyConfig[challenge.difficulty];
  const isFinished = challenge.status === "finished";
  const deadline = new Date(challenge.deadline);
  const deadlineStr = deadline.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  function updateSubmission(submissionId: string, newStatus: SubmissionStatus) {
    setChallenge((prev) => {
      if (!prev) return prev;
      const updated: Challenge = {
        ...prev,
        submissions: prev.submissions.map((s) =>
          s.id === submissionId
            ? { ...s, status: newStatus, pointsAwarded: newStatus === "validated" ? prev.points : 0 }
            : s
        ),
      };
      // Sync to mock store
      const idx = mockChallenges.findIndex((c) => c.id === prev.id);
      if (idx !== -1) mockChallenges[idx] = updated;
      return updated;
    });
    setToast(
      newStatus === "validated"
        ? `Soumission validée — ${challenge.points} points attribués !`
        : "Soumission rejetée."
    );
  }

  function handleDelete() {
    const hasValidated = challenge.submissions.some((s) => s.status === "validated");
    if (hasValidated) {
      setShowDelete(false);
      setBlockMsg("Impossible de supprimer ce challenge : il contient des soumissions validées.");
      return;
    }
    const idx = mockChallenges.findIndex((c) => c.id === id);
    if (idx !== -1) mockChallenges.splice(idx, 1);
    navigate("/challenges");
  }

  const pending = challenge.submissions.filter((s) => s.status === "pending");
  const validated = challenge.submissions.filter((s) => s.status === "validated");
  const rejected = challenge.submissions.filter((s) => s.status === "rejected");

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      <Link
        to="/challenges"
        className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={14} />
        Retour aux challenges
      </Link>

      {blockMsg && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-5 text-sm"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span className="flex-1">{blockMsg}</span>
          <button onClick={() => setBlockMsg("")} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                  <Trophy size={18} className="text-white" />
                </div>
                <div>
                  <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)", lineHeight: 1.3 }}>
                    {challenge.title}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {!isFinished && (
                  <Link
                    to={`/challenges/${id}/edit`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-90 transition-all"
                    style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600 }}
                  >
                    <Edit size={12} />
                    Modifier
                  </Link>
                )}
                <button
                  onClick={() => setShowDelete(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-90 transition-all"
                  style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", fontWeight: 600 }}
                >
                  <Trash2 size={12} />
                  Supprimer
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, fontWeight: 600 }}
              >
                {diff.label}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={
                  isFinished
                    ? { background: "rgba(139,124,184,0.15)", color: "#a78bfa", border: "1px solid rgba(139,124,184,0.3)", fontWeight: 600 }
                    : { background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600 }
                }
              >
                {isFinished ? "Terminé" : "Actif"}
              </span>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <Clock size={14} style={{ color: "#7c3aed" }} />
                <span>Limite : {deadlineStr}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star size={14} style={{ color: "#fbbf24" }} />
                <span style={{ color: "#fbbf24", fontWeight: 700 }}>{challenge.points} points</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
              <h4 className="mb-2" style={{ color: "var(--foreground)" }}>Description</h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {challenge.description}
              </p>
            </div>
          </div>

          {/* Submission stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "En attente", value: pending.length, color: "#fbbf24" },
              { label: "Validées", value: validated.length, color: "#34d399" },
              { label: "Rejetées", value: rejected.length, color: "#f87171" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <p className="text-2xl mb-1" style={{ color, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions panel */}
        <div>
          <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Users size={15} style={{ color: "#7c3aed" }} />
                <h4 style={{ color: "var(--foreground)" }}>Soumissions</h4>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", fontWeight: 700 }}
              >
                {challenge.submissions.length}
              </span>
            </div>

            {challenge.submissions.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center px-4">
                <Trophy size={28} className="mb-3 opacity-30" style={{ color: "var(--muted-foreground)" }} />
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Aucune soumission</p>
              </div>
            ) : (
              <ul>
                {challenge.submissions.map((sub, i) => (
                  <SubmissionRow
                    key={sub.id}
                    submission={sub}
                    points={challenge.points}
                    isLast={i === challenge.submissions.length - 1}
                    onValidate={() => updateSubmission(sub.id, "validated")}
                    onReject={() => updateSubmission(sub.id, "rejected")}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteConfirmDialog
          eventTitle={challenge.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      {toast && <SuccessToast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

function SubmissionRow({
  submission,
  points,
  isLast,
  onValidate,
  onReject,
}: {
  submission: Submission;
  points: number;
  isLast: boolean;
  onValidate: () => void;
  onReject: () => void;
}) {
  const cfg = submissionStatusConfig[submission.status];
  const dateStr = new Date(submission.submissionDate).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric",
  });
  const initials = `${submission.memberFirstName[0]}${submission.memberLastName[0]}`.toUpperCase();
  const isPending = submission.status === "pending";

  return (
    <li
      className="px-5 py-4"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)", fontWeight: 700 }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm" style={{ color: "var(--foreground)", fontWeight: 600 }}>
            {submission.memberFirstName} {submission.memberLastName}
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Soumis le {dateStr}
          </p>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-xs shrink-0"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontWeight: 600 }}
        >
          {cfg.label}
        </span>
      </div>

      {submission.pointsAwarded > 0 && (
        <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: "#fbbf24" }}>
          <Star size={11} />
          {submission.pointsAwarded} points attribués
        </div>
      )}

      {submission.note && (
        <p className="text-xs mb-2 italic" style={{ color: "var(--muted-foreground)" }}>
          Note : {submission.note}
        </p>
      )}

      {isPending && (
        <div className="flex gap-2">
          <button
            onClick={onValidate}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs hover:opacity-90 transition-all"
            style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600 }}
          >
            <CheckCircle size={12} />
            Valider
          </button>
          <button
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs hover:opacity-90 transition-all"
            style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", fontWeight: 600 }}
          >
            <XCircle size={12} />
            Rejeter
          </button>
        </div>
      )}
    </li>
  );
}
