import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Calendar, MapPin, Users, Edit, Trash2, ArrowLeft, Clock, User } from "lucide-react";
import { mockEvents } from "../data/mockData";
import { Event } from "../types";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showDelete, setShowDelete] = useState(false);

  const event = events.find((e) => e.id === id);

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

  const dateObj = new Date(event.date);
  const dateStr = dateObj.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const isUpcoming = event.status === "upcoming";

  function handleDelete() {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    navigate("/");
  }

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={14} />
        Retour aux événements
      </Link>

      {/* Hero image */}
      {event.image && (
        <div className="relative w-full h-48 lg:h-64 rounded-2xl overflow-hidden mb-6">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,11,26,0.9) 0%, transparent 50%)" }}
          />
          <div className="absolute bottom-4 left-6 right-6">
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs mb-2"
              style={
                isUpcoming
                  ? { background: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600 }
                  : { background: "rgba(139,124,184,0.2)", color: "#a78bfa", border: "1px solid rgba(139,124,184,0.3)", fontWeight: 600 }
              }
            >
              {isUpcoming ? "À venir" : "Passé"}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          <div
            className="rounded-xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)", lineHeight: 1.3 }}>
                {event.title}
              </h1>
              <div className="flex gap-2 shrink-0">
                <Link
                  to={`/events/${event.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-90"
                  style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600 }}
                >
                  <Edit size={12} />
                  Modifier
                </Link>
                <button
                  onClick={() => setShowDelete(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-90"
                  style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", fontWeight: 600 }}
                >
                  <Trash2 size={12} />
                  Supprimer
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <Calendar size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />
                <span className="capitalize">{dateStr}</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <Clock size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />
                {timeStr}
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <MapPin size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />
                {event.location}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
              <h4 className="mb-3" style={{ color: "var(--foreground)" }}>Description</h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Members panel */}
        <div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <Users size={15} style={{ color: "#7c3aed" }} />
                <h4 style={{ color: "var(--foreground)" }}>Participants</h4>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", fontWeight: 700 }}
              >
                {event.members.length}
              </span>
            </div>

            {event.members.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center px-4">
                <Users size={28} className="mb-3 opacity-30" style={{ color: "var(--muted-foreground)" }} />
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Aucun participant inscrit
                </p>
              </div>
            ) : (
              <ul className="divide-y" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
                {event.members.map((member) => {
                  const regDate = new Date(member.registrationDate);
                  const regStr = regDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
                  const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
                  const hues = ["#7c3aed", "#a855f7", "#6d28d9", "#8b5cf6", "#9333ea"];
                  const color = hues[member.id.charCodeAt(member.id.length - 1) % hues.length];

                  return (
                    <li
                      key={member.id}
                      className="flex items-center gap-3 px-5 py-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{ background: `${color}30`, color, border: `1px solid ${color}50`, fontWeight: 700 }}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm truncate" style={{ color: "var(--foreground)", fontWeight: 600 }}>
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          Inscrit le {regStr}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteConfirmDialog
          eventTitle={event.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
