import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Edit, AlertCircle } from "lucide-react";
import { mockChallenges } from "../data/mockData";
import { Difficulty } from "../types";
import { ChallengeForm } from "./ChallengeForm";
import { SuccessToast } from "./SuccessToast";

export function EditChallenge() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const challenge = mockChallenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-20">
        <p style={{ color: "var(--muted-foreground)" }}>Challenge introuvable.</p>
        <Link to="/challenges" className="mt-4 text-sm" style={{ color: "#7c3aed" }}>
          ← Retour
        </Link>
      </div>
    );
  }

  if (challenge.status === "finished") {
    return (
      <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
        <Link
          to={`/challenges/${id}`}
          className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={14} />
          Retour au détail
        </Link>
        <div className="max-w-xl mx-auto">
          <div
            className="flex items-start gap-4 p-5 rounded-2xl"
            style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}
          >
            <AlertCircle size={20} style={{ color: "#f87171", flexShrink: 0 }} className="mt-0.5" />
            <div>
              <p className="text-sm mb-1" style={{ color: "#f87171", fontWeight: 700 }}>
                Modification impossible
              </p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Ce challenge est terminé et ne peut plus être modifié.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const deadlineLocal = challenge.deadline
    ? new Date(challenge.deadline).toISOString().slice(0, 16)
    : "";

  function handleSubmit(values: {
    title: string;
    description: string;
    deadline: string;
    points: number;
    difficulty: Difficulty;
  }) {
    setLoading(true);
    setTimeout(() => {
      const idx = mockChallenges.findIndex((c) => c.id === id);
      if (idx !== -1) {
        mockChallenges[idx] = {
          ...mockChallenges[idx],
          title: values.title,
          description: values.description,
          deadline: values.deadline,
          points: values.points,
          difficulty: values.difficulty,
        };
      }
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate(`/challenges/${id}`), 1500);
    }, 600);
  }

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      <Link
        to={`/challenges/${id}`}
        className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={14} />
        Retour au détail
      </Link>

      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6d28d9, #7c3aed)" }}
          >
            <Edit size={18} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
              Modifier le challenge
            </h1>
            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted-foreground)" }}>
              {challenge.title}
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <ChallengeForm
            initial={{
              title: challenge.title,
              description: challenge.description,
              deadline: deadlineLocal,
              points: challenge.points,
              difficulty: challenge.difficulty,
            }}
            submitLabel="Sauvegarder les modifications"
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/challenges/${id}`)}
            loading={loading}
          />
        </div>
      </div>

      {showSuccess && (
        <SuccessToast message="Challenge modifié avec succès !" onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
