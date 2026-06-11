import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, MapPin, Users, Plus, Trash2, Edit, ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { mockEvents } from "../data/mockData";
import { Event } from "../types";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

type SortField = "date" | "title";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "upcoming" | "past";

export function EventsList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);

  const filtered = useMemo(() => {
    let list = [...events];
    if (statusFilter !== "all") list = list.filter((e) => e.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const va = sortField === "date" ? new Date(a.date).getTime() : a.title.toLowerCase();
      const vb = sortField === "date" ? new Date(b.date).getTime() : b.title.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [events, statusFilter, sortField, sortDir, search]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  }

  function handleDelete(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleteTarget(null);
  }

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const pastCount = events.filter((e) => e.status === "past").length;

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
            Gestion des Événements
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            {events.length} événement{events.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <Link
          to="/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#ffffff",
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
          }}
        >
          <Plus size={16} />
          Nouvel événement
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: events.length, color: "#7c3aed" },
          { label: "À venir", value: upcomingCount, color: "#10b981" },
          { label: "Passés", value: pastCount, color: "#8b7cb8" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--muted-foreground)" }}>
              {label}
            </p>
            <p className="text-2xl" style={{ color, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un événement..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              background: "var(--input-background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "var(--muted-foreground)" }} />
          {(["all", "upcoming", "past"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-lg text-xs transition-all duration-150"
              style={
                statusFilter === s
                  ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontWeight: 700 }
                  : { background: "var(--secondary)", color: "var(--muted-foreground)" }
              }
            >
              {s === "all" ? "Tous" : s === "upcoming" ? "À venir" : "Passés"}
            </button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div
        className="flex items-center gap-6 px-4 py-2 rounded-lg mb-4 text-xs"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
      >
        <button
          onClick={() => toggleSort("date")}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          Date
          {sortField === "date" ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
        </button>
        <button
          onClick={() => toggleSort("title")}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          Titre
          {sortField === "title" ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
        </button>
        <span className="ml-auto">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
      </div>

      {/* Events grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar size={40} style={{ color: "var(--muted-foreground)" }} className="mb-4 opacity-40" />
          <p style={{ color: "var(--muted-foreground)" }}>Aucun événement trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={() => setDeleteTarget(event)}
              onEdit={() => navigate(`/events/${event.id}/edit`)}
              onClick={() => navigate(`/events/${event.id}`)}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteConfirmDialog
          eventTitle={deleteTarget.title}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

function EventCard({
  event,
  onDelete,
  onEdit,
  onClick,
}: {
  event: Event;
  onDelete: () => void;
  onEdit: () => void;
  onClick: () => void;
}) {
  const dateObj = new Date(event.date);
  const dateStr = dateObj.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const isUpcoming = event.status === "upcoming";

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:translate-y-[-2px] group"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-secondary cursor-pointer" onClick={onClick}>
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,11,26,0.8) 0%, transparent 60%)" }}
        />
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs"
          style={
            isUpcoming
              ? { background: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600 }
              : { background: "rgba(139,124,184,0.2)", color: "#a78bfa", border: "1px solid rgba(139,124,184,0.3)", fontWeight: 600 }
          }
        >
          {isUpcoming ? "À venir" : "Passé"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 cursor-pointer" onClick={onClick}>
        <h3
          className="mb-2 line-clamp-2 leading-snug"
          style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}
        >
          {event.title}
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Calendar size={12} style={{ color: "#7c3aed", flexShrink: 0 }} />
            {dateStr} à {timeStr}
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <MapPin size={12} style={{ color: "#7c3aed", flexShrink: 0 }} />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Users size={12} style={{ color: "#7c3aed", flexShrink: 0 }} />
            {event.members.length} participant{event.members.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all duration-150 hover:opacity-90"
          style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600 }}
        >
          <Edit size={12} />
          Modifier
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all duration-150 hover:opacity-90 ml-auto"
          style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", fontWeight: 600 }}
        >
          <Trash2 size={12} />
          Supprimer
        </button>
      </div>
    </div>
  );
}
