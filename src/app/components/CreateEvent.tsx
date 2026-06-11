import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { mockEvents } from "../data/mockData";
import { Event } from "../types";
import { EventForm } from "./EventForm";
import { SuccessToast } from "./SuccessToast";

export function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(values: { title: string; date: string; location: string; description: string; image: string }) {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      const eventDate = new Date(values.date);
      const newEvent: Event = {
        id: `evt-${Date.now()}`,
        title: values.title,
        date: values.date,
        location: values.location,
        description: values.description,
        image: values.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&auto=format",
        status: eventDate > now ? "upcoming" : "past",
        members: [],
      };
      mockEvents.push(newEvent);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    }, 600);
  }

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={14} />
        Retour aux événements
      </Link>

      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
              Créer un événement
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Remplissez les informations ci-dessous
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <EventForm
            submitLabel="Créer l'événement"
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
            loading={loading}
          />
        </div>
      </div>

      {showSuccess && (
        <SuccessToast
          message="Événement créé avec succès !"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
