import { useState } from "react";
import { Difficulty } from "../types";

interface FormValues {
  title: string;
  description: string;
  deadline: string;
  points: number;
  difficulty: Difficulty;
}

interface Props {
  initial?: Partial<FormValues>;
  submitLabel: string;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

const difficulties: { value: Difficulty; label: string; color: string }[] = [
  { value: "easy", label: "Facile", color: "#34d399" },
  { value: "medium", label: "Moyen", color: "#fbbf24" },
  { value: "hard", label: "Difficile", color: "#f87171" },
];

export function ChallengeForm({ initial = {}, submitLabel, onSubmit, onCancel, loading }: Props) {
  const [values, setValues] = useState<FormValues>({
    title: initial.title ?? "",
    description: initial.description ?? "",
    deadline: initial.deadline ?? "",
    points: initial.points ?? 100,
    difficulty: initial.difficulty ?? "medium",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  function set<K extends keyof FormValues>(key: K, val: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!values.title.trim()) e.title = "Le titre est obligatoire";
    if (!values.description.trim()) e.description = "La description est obligatoire";
    if (!values.deadline) e.deadline = "La date limite est obligatoire";
    if (!values.points || values.points < 1) e.points = "Les points doivent être supérieurs à 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(values);
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--input-background)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    color: "var(--muted-foreground)",
    fontSize: "0.8125rem",
    fontWeight: 600,
    marginBottom: "0.375rem",
    display: "block",
  };
  const errorStyle: React.CSSProperties = { color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" };
  const required = <span style={{ color: "#f87171" }}>*</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label style={labelStyle}>Titre {required}</label>
        <input
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Ex: Défi Python : Algorithmes de tri"
          style={{ ...inputStyle, borderColor: errors.title ? "#dc2626" : "var(--border)" }}
        />
        {errors.title && <p style={errorStyle}>{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description {required}</label>
        <textarea
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Décrivez les règles et objectifs du challenge..."
          rows={4}
          style={{ ...inputStyle, borderColor: errors.description ? "#dc2626" : "var(--border)", resize: "vertical" }}
        />
        {errors.description && <p style={errorStyle}>{errors.description}</p>}
      </div>

      {/* Deadline */}
      <div>
        <label style={labelStyle}>Date limite {required}</label>
        <input
          type="datetime-local"
          value={values.deadline}
          onChange={(e) => set("deadline", e.target.value)}
          style={{ ...inputStyle, borderColor: errors.deadline ? "#dc2626" : "var(--border)", colorScheme: "dark" }}
        />
        {errors.deadline && <p style={errorStyle}>{errors.deadline}</p>}
      </div>

      {/* Points */}
      <div>
        <label style={labelStyle}>Points {required}</label>
        <input
          type="number"
          min={1}
          max={1000}
          value={values.points}
          onChange={(e) => set("points", Number(e.target.value))}
          style={{ ...inputStyle, borderColor: errors.points ? "#dc2626" : "var(--border)" }}
        />
        {errors.points && <p style={errorStyle}>{errors.points}</p>}
      </div>

      {/* Difficulty */}
      <div>
        <label style={labelStyle}>Niveau de difficulté {required}</label>
        <div className="flex gap-3">
          {difficulties.map(({ value, label, color }) => (
            <button
              key={value}
              type="button"
              onClick={() => set("difficulty", value)}
              className="flex-1 py-2 rounded-lg text-sm transition-all"
              style={
                values.difficulty === value
                  ? { background: `${color}20`, color, border: `1px solid ${color}60`, fontWeight: 700 }
                  : { background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all"
          style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)", fontWeight: 600 }}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#ffffff",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
          }}
        >
          {loading ? "Enregistrement..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
