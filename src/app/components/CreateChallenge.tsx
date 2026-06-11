import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, Target } from "lucide-react";
import { mockChallenges } from "../data/mockData";
import { Challenge, Difficulty } from "../types";
import { ChallengeForm } from "./ChallengeForm";
import { SuccessToast } from "./SuccessToast";

export function CreateChallenge() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(values: {
    title: string;
    description: string;
    deadline: string;
    points: number;
    difficulty: Difficulty;
  }) {
    setLoading(true);
    setTimeout(() => {
      const newChallenge: Challenge = {
        id: `chall-${Date.now()}`,
        title: values.title,
        description: values.description,
        deadline: values.deadline,
        points: values.points,
        difficulty: values.difficulty,
        status: "active",
        submissions: [],
      };
      mockChallenges.push(newChallenge);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate("/challenges"), 1500);
    }, 600);
  }

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

      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <Target size={18} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
              Créer un challenge
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Statut par défaut : Actif
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <ChallengeForm
            submitLabel="Créer le challenge"
            onSubmit={handleSubmit}
            onCancel={() => navigate("/challenges")}
            loading={loading}
          />
        </div>
      </div>

      {showSuccess && (
        <SuccessToast message="Challenge créé avec succès !" onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
