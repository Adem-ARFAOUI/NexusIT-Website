import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

export function SuccessToast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg"
      style={{
        background: "rgba(16,185,129,0.15)",
        border: "1px solid rgba(16,185,129,0.3)",
        backdropFilter: "blur(12px)",
        maxWidth: "360px",
      }}
    >
      <CheckCircle size={18} style={{ color: "#34d399", flexShrink: 0 }} />
      <p className="text-sm flex-1" style={{ color: "#d1fae5", fontWeight: 500 }}>
        {message}
      </p>
      <button onClick={onClose} style={{ color: "#6ee7b7" }}>
        <X size={14} />
      </button>
    </div>
  );
}
