import { useState } from "react";
import { Event } from "../types";

interface FormValues {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

interface Props {
  initial?: Partial<FormValues>;
  submitLabel: string;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function EventForm({ initial = {}, submitLabel, onSubmit, onCancel, loading }: Props) {
  const [values, setValues] = useState<FormValues>({
    title: initial.title ?? "",
    date: initial.date ?? "",
    location: initial.location ?? "",
    description: initial.description ?? "",
    image: initial.image ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  function set(key: keyof FormValues, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!values.title.trim()) newErrors.title = "Le titre est obligatoire";
    if (!values.date) newErrors.date = "La date est obligatoire";
    if (!values.location.trim()) newErrors.location = "Le lieu est obligatoire";
    if (!values.description.trim()) newErrors.description = "La description est obligatoire";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(values);
  }

  const inputStyle = {
    background: "var(--input-background)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s",
  } as React.CSSProperties;

  const errorStyle = { color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" };
  const labelStyle = { color: "var(--muted-foreground)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.375rem", display: "block" };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label style={labelStyle}>
          Titre <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Ex: Hackathon IA & Innovation"
          style={{ ...inputStyle, borderColor: errors.title ? "#dc2626" : "var(--border)" }}
        />
        {errors.title && <p style={errorStyle}>{errors.title}</p>}
      </div>

      {/* Date */}
      <div>
        <label style={labelStyle}>
          Date et heure <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          type="datetime-local"
          value={values.date}
          onChange={(e) => set("date", e.target.value)}
          style={{ ...inputStyle, borderColor: errors.date ? "#dc2626" : "var(--border)", colorScheme: "dark" }}
        />
        {errors.date && <p style={errorStyle}>{errors.date}</p>}
      </div>

      {/* Location */}
      <div>
        <label style={labelStyle}>
          Lieu <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
          placeholder="Ex: Amphi A, Bâtiment Principal"
          style={{ ...inputStyle, borderColor: errors.location ? "#dc2626" : "var(--border)" }}
        />
        {errors.location && <p style={errorStyle}>{errors.location}</p>}
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>
          Description <span style={{ color: "#f87171" }}>*</span>
        </label>
        <textarea
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Décrivez l'événement..."
          rows={4}
          style={{ ...inputStyle, borderColor: errors.description ? "#dc2626" : "var(--border)", resize: "vertical" }}
        />
        {errors.description && <p style={errorStyle}>{errors.description}</p>}
      </div>

      {/* Image URL */}
      <div>
        <label style={labelStyle}>Image (URL, optionnel)</label>
        <input
          value={values.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="https://..."
          style={inputStyle}
        />
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.7rem", marginTop: "0.25rem" }}>
          Laissez vide pour utiliser une image par défaut
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-sm transition-all duration-150 hover:opacity-90"
          style={{
            background: "var(--secondary)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            fontWeight: 600,
          }}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-lg text-sm transition-all duration-150 hover:opacity-90 disabled:opacity-60"
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
