import { AlertTriangle } from "lucide-react";

interface Props {
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ eventTitle, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onCancel}
      />
      {/* Dialog */}
      <div
        className="relative w-full max-w-md rounded-2xl p-6 z-10"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(220,38,38,0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}
          >
            <AlertTriangle size={24} style={{ color: "#f87171" }} />
          </div>
          <h3
            className="mb-2"
            style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}
          >
            Confirmer la suppression
          </h3>
          <p className="text-sm mb-1" style={{ color: "var(--muted-foreground)" }}>
            Êtes-vous sûr de vouloir supprimer l&apos;événement
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--foreground)", fontWeight: 600 }}>
            &ldquo;{eventTitle}&rdquo; ?
          </p>
          <p className="text-xs mb-6" style={{ color: "var(--muted-foreground)" }}>
            Cette action est irréversible. Toutes les données associées seront définitivement supprimées.
          </p>
          <div className="flex gap-3 w-full">
            <button
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
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-lg text-sm transition-all duration-150 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                color: "#ffffff",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(220,38,38,0.4)",
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
