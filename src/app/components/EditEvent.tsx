import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Edit } from "lucide-react";
import { mockEvents } from "../data/mockData";
import { Event } from "../types";
import { EventForm } from "./EventForm";
import { SuccessToast } from "./SuccessToast";

export function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-20">
        <p style={{ color: "var(--muted-foreground)" }}>Événement introuvable.</p>
        <Link to="/" className="mt-4 text-sm" style={{ color: "#7c3aed" }}>
          ← Retour à la liste
        </Link>
      </div>
    );
  }

  const dateLocal = event.date
    ? new Date(event.date).toISOString().slice(0, 16)
    : "";

  function handleSubmit(values: { title: string; date: string; location: string; description: string; image: string }) {
    setLoading(true);
    setTimeout(() => {
      const idx = mockEvents.findIndex((e) => e.id === id);
      if (idx !== -1) {
        const now = new Date();
        const eventDate = new Date(values.date);
        mockEvents[idx] = {
          ...mockEvents[idx],
          title: values.title,
          date: values.date,
          location: values.location,
          description: values.description,
          image: values.image || mockEvents[idx].image,
          status: eventDate > now ? "upcoming" : "past",
        };
      }
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate(`/events/${id}`), 1500);
    }, 600);
  }

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      <Link
        to={`/events/${id}`}
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
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
              Modifier l&apos;événement
            </h1>
            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted-foreground)" }}>
              {event.title}
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <EventForm
            initial={{
              title: event.title,
              date: dateLocal,
              location: event.location,
              description: event.description,
              image: event.image ?? "",
            }}
            submitLabel="Sauvegarder les modifications"
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/events/${id}`)}
            loading={loading}
          />
        </div>
      </div>

      {showSuccess && (
        <SuccessToast
          message="Événement modifié avec succès !"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
