import { useState, useMemo } from "react";
import {
  History, Filter, CalendarDays, ChevronLeft, ChevronRight,
  Calendar, Trophy, User, Star, Plus, Edit, Trash2,
  CheckCircle, XCircle, UserPlus, Send, Shield,
} from "lucide-react";
import { mockHistory } from "../data/mockData";
import { ActionType, EntityType, HistoryEntry } from "../types";

/* ─── Config ─────────────────────────────────────────────── */

const PAGE_SIZE = 10;

const ACTION_CONFIG: Record<ActionType, { label: string; icon: React.FC<{ size?: number }>; color: string; bg: string }> = {
  create_event:        { label: "Création événement",       icon: ({ size }) => <Plus size={size} />,          color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  edit_event:          { label: "Modification événement",   icon: ({ size }) => <Edit size={size} />,          color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  delete_event:        { label: "Suppression événement",    icon: ({ size }) => <Trash2 size={size} />,        color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  create_challenge:    { label: "Création challenge",       icon: ({ size }) => <Plus size={size} />,          color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  edit_challenge:      { label: "Modification challenge",   icon: ({ size }) => <Edit size={size} />,          color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  delete_challenge:    { label: "Suppression challenge",    icon: ({ size }) => <Trash2 size={size} />,        color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  validate_submission: { label: "Soumission validée",       icon: ({ size }) => <CheckCircle size={size} />,   color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  reject_submission:   { label: "Soumission rejetée",       icon: ({ size }) => <XCircle size={size} />,       color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  member_registration: { label: "Inscription membre",       icon: ({ size }) => <UserPlus size={size} />,      color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
  member_participation:{ label: "Participation membre",     icon: ({ size }) => <User size={size} />,          color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
  member_submission:   { label: "Soumission membre",        icon: ({ size }) => <Send size={size} />,          color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
};

const ENTITY_CONFIG: Record<EntityType, { label: string; icon: React.FC<{ size?: number }>; color: string }> = {
  event:     { label: "Événement", icon: ({ size }) => <Calendar size={size} />,  color: "#a78bfa" },
  challenge: { label: "Challenge", icon: ({ size }) => <Trophy size={size} />,    color: "#fbbf24" },
  member:    { label: "Membre",    icon: ({ size }) => <User size={size} />,      color: "#818cf8" },
  score:     { label: "Score",     icon: ({ size }) => <Star size={size} />,      color: "#34d399" },
};

const ADMINS = Array.from(new Set(
  mockHistory.filter((h) => h.authorRole === "admin").map((h) => h.author)
));

type DateShortcut = "today" | "week" | "month" | "";

/* ─── Helpers ─────────────────────────────────────────────── */

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

/* ─── Main component ──────────────────────────────────────── */

export function HistoryPage() {
  // Filter state
  const [entityFilter, setEntityFilter]   = useState<EntityType | "all">("all");
  const [adminFilter, setAdminFilter]     = useState<string>("all");
  const [dateFrom, setDateFrom]           = useState("");
  const [dateTo, setDateTo]               = useState("");
  const [shortcut, setShortcut]           = useState<DateShortcut>("");
  const [page, setPage]                   = useState(1);

  // Apply date shortcut
  function applyShortcut(s: DateShortcut) {
    const now = new Date();
    setShortcut(s);
    if (s === "today") {
      const d = toDateInput(now);
      setDateFrom(d);
      setDateTo(d);
    } else if (s === "week") {
      const mon = new Date(now);
      mon.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
      setDateFrom(toDateInput(mon));
      setDateTo(toDateInput(now));
    } else if (s === "month") {
      setDateFrom(toDateInput(new Date(now.getFullYear(), now.getMonth(), 1)));
      setDateTo(toDateInput(now));
    } else {
      setDateFrom("");
      setDateTo("");
    }
    setPage(1);
  }

  function clearDates() {
    setDateFrom("");
    setDateTo("");
    setShortcut("");
    setPage(1);
  }

  // Derived filtered list — newest first
  const filtered = useMemo(() => {
    let list = [...mockHistory].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (entityFilter !== "all") list = list.filter((h) => h.entityType === entityFilter);
    if (adminFilter !== "all")  list = list.filter((h) => h.author === adminFilter);

    if (dateFrom) {
      const from = startOfDay(new Date(dateFrom));
      list = list.filter((h) => new Date(h.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      list = list.filter((h) => new Date(h.date) <= to);
    }

    return list;
  }, [entityFilter, adminFilter, dateFrom, dateTo]);

  // Reset page when filters change
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Aggregates for mini stats
  const adminActions  = filtered.filter((h) => h.authorRole === "admin").length;
  const memberActions = filtered.filter((h) => h.authorRole === "member").length;

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <History size={18} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
              Historique des actions
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Traçabilité complète — lecture seule
            </p>
          </div>
        </div>

        {/* read-only badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#c4b5fd" }}
        >
          <Shield size={12} />
          Immuable — aucune modification possible
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total",          value: filtered.length,  color: "#7c3aed" },
          { label: "Actions admin",  value: adminActions,     color: "#a78bfa" },
          { label: "Activités membres", value: memberActions, color: "#818cf8" },
          { label: "Pages",          value: totalPages,       color: "#8b7cb8" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</p>
            <p className="text-2xl" style={{ color, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters panel ── */}
      <div
        className="rounded-xl p-5 mb-5 space-y-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Filter size={13} style={{ color: "#7c3aed" }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Filtres</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Entity type */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
              Type d'entité
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "event", "challenge", "member", "score"] as const).map((e) => {
                const cfg = e !== "all" ? ENTITY_CONFIG[e] : null;
                return (
                  <button
                    key={e}
                    onClick={() => { setEntityFilter(e); setPage(1); }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all"
                    style={
                      entityFilter === e
                        ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontWeight: 700 }
                        : { background: "var(--secondary)", color: "var(--muted-foreground)" }
                    }
                  >
                    {cfg && <cfg.icon size={10} />}
                    {e === "all" ? "Tous" : cfg!.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin filter */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
              Administrateur
            </label>
            <select
              value={adminFilter}
              onChange={(e) => { setAdminFilter(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 rounded-lg text-xs outline-none"
              style={{
                background: "var(--input-background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                colorScheme: "dark",
              }}
            >
              <option value="all">Tous les admins</option>
              {ADMINS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {/* Date range */}
          <div className="sm:col-span-2">
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
              Plage de dates
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Shortcuts */}
              {(["today", "week", "month"] as DateShortcut[]).map((s) => (
                <button
                  key={s}
                  onClick={() => applyShortcut(shortcut === s ? "" : s)}
                  className="px-2.5 py-1.5 rounded-md text-xs transition-all"
                  style={
                    shortcut === s
                      ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontWeight: 700 }
                      : { background: "var(--secondary)", color: "var(--muted-foreground)" }
                  }
                >
                  {s === "today" ? "Aujourd'hui" : s === "week" ? "Cette semaine" : "Ce mois"}
                </button>
              ))}

              {/* From */}
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setShortcut(""); setPage(1); }}
                className="px-2.5 py-1.5 rounded-md text-xs outline-none"
                style={{ background: "var(--input-background)", color: "var(--foreground)", border: "1px solid var(--border)", colorScheme: "dark" }}
              />
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>→</span>
              {/* To */}
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setShortcut(""); setPage(1); }}
                className="px-2.5 py-1.5 rounded-md text-xs outline-none"
                style={{ background: "var(--input-background)", color: "var(--foreground)", border: "1px solid var(--border)", colorScheme: "dark" }}
              />
              {(dateFrom || dateTo) && (
                <button
                  onClick={clearDates}
                  className="text-xs px-2 py-1.5 rounded-md transition-all"
                  style={{ color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline list ── */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <History size={40} className="mb-4 opacity-25" style={{ color: "var(--muted-foreground)" }} />
          <p style={{ color: "var(--muted-foreground)" }}>Aucune entrée pour ces filtres</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {/* Column header */}
          <div
            className="hidden sm:grid grid-cols-[32px_1fr_180px_160px_140px] gap-4 px-5 py-3 text-xs uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)", background: "rgba(124,58,237,0.05)" }}
          >
            <span />
            <span>Action / Entité</span>
            <span>Auteur</span>
            <span>Type</span>
            <span>Date & heure</span>
          </div>

          <ul>
            {paginated.map((entry, i) => (
              <HistoryRow
                key={entry.id}
                entry={entry}
                isLast={i === paginated.length - 1}
              />
            ))}
          </ul>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} sur {filtered.length} entrées
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-30"
              style={{ background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              <ChevronLeft size={13} /> Préc.
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`dots-${i}`} className="px-1 text-xs" style={{ color: "var(--muted-foreground)" }}>…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className="w-8 h-8 rounded-lg text-xs transition-all"
                    style={
                      safePage === p
                        ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontWeight: 700 }
                        : { background: "var(--secondary)", color: "var(--muted-foreground)" }
                    }
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-30"
              style={{ background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              Suiv. <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Row component ───────────────────────────────────────── */

function HistoryRow({ entry, isLast }: { entry: HistoryEntry; isLast: boolean }) {
  const action = ACTION_CONFIG[entry.actionType];
  const entity = ENTITY_CONFIG[entry.entityType];
  const ActionIcon = action.icon;
  const EntityIcon = entity.icon;

  const dateObj = new Date(entry.date);
  const dateStr = dateObj.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const isAdmin = entry.authorRole === "admin";
  const initials = entry.author.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <li
      className="grid grid-cols-1 sm:grid-cols-[32px_1fr_180px_160px_140px] gap-3 sm:gap-4 px-5 py-4 items-start sm:items-center transition-colors hover:bg-white/[0.02]"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      {/* Action icon */}
      <div
        className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center shrink-0"
        style={{ background: action.bg, border: `1px solid ${action.color}30` }}
      >
        <ActionIcon size={14} />
      </div>

      {/* Entity name + action label + details */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          {/* mobile icon */}
          <span
            className="sm:hidden inline-flex w-5 h-5 rounded items-center justify-center"
            style={{ background: action.bg }}
          >
            <ActionIcon size={10} />
          </span>
          <p className="text-sm truncate" style={{ color: "var(--foreground)", fontWeight: 600 }}>
            {entry.entityName}
          </p>
        </div>
        <p className="text-xs" style={{ color: action.color }}>
          {action.label}
        </p>
        {entry.details && (
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted-foreground)" }}>
            {entry.details}
          </p>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
          style={
            isAdmin
              ? { background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)", fontWeight: 700 }
              : { background: "rgba(129,140,248,0.15)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.3)", fontWeight: 700 }
          }
        >
          {initials}
        </div>
        <div>
          <p className="text-xs" style={{ color: "var(--foreground)", fontWeight: 500 }}>
            {entry.author}
          </p>
          <p className="text-xs" style={{ color: isAdmin ? "#c4b5fd" : "#818cf8" }}>
            {isAdmin ? "Admin" : "Membre"}
          </p>
        </div>
      </div>

      {/* Entity type badge */}
      <div className="flex items-center gap-1.5">
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
          style={{ background: `${entity.color}15`, color: entity.color, border: `1px solid ${entity.color}30`, fontWeight: 600 }}
        >
          <EntityIcon size={10} />
          {entity.label}
        </span>
      </div>

      {/* Date */}
      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        <div className="flex items-center gap-1">
          <CalendarDays size={11} style={{ color: "#7c3aed", flexShrink: 0 }} />
          {dateStr}
        </div>
        <div className="mt-0.5 pl-4">{timeStr}</div>
      </div>
    </li>
  );
}
