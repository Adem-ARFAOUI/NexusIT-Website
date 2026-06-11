import { useLanguage } from "../i18n/LanguageContext";

/* ─── UML Class box data ─────────────────────────────────────────── */
const classes = [
  {
    id: "Member",
    name: "Member",
    color: "#06b6d4",
    fields: [
      "+ id: string",
      "+ firstName: string",
      "+ lastName: string",
      "+ registrationDate: string",
    ],
    methods: [],
  },
  {
    id: "Event",
    name: "Event",
    color: "#7c3aed",
    fields: [
      "+ id: string",
      "+ title: string",
      "+ date: string",
      "+ location: string",
      "+ description: string",
      "+ image?: string",
      "+ status: upcoming | past",
      "+ members: Member[]",
    ],
    methods: [],
  },
  {
    id: "Article",
    name: "Article",
    color: "#f59e0b",
    fields: [
      "+ id: string",
      "+ title: string",
      "+ type: article | document",
      "+ content: string",
      "+ author: string",
      "+ publishedAt: string",
      "+ tags: string[]",
      "+ fileUrl?: string",
    ],
    methods: [],
  },
  {
    id: "Submission",
    name: "Submission",
    color: "#10b981",
    fields: [
      "+ id: string",
      "+ challengeId: string",
      "+ memberId: string",
      "+ memberFirstName: string",
      "+ memberLastName: string",
      "+ submissionDate: string",
      "+ status: pending | validated | rejected",
      "+ pointsAwarded: number",
      "+ note?: string",
    ],
    methods: [],
  },
  {
    id: "Challenge",
    name: "Challenge",
    color: "#ec4899",
    fields: [
      "+ id: string",
      "+ title: string",
      "+ description: string",
      "+ deadline: string",
      "+ points: number",
      "+ difficulty: easy | medium | hard",
      "+ status: active | finished",
      "+ submissions: Submission[]",
    ],
    methods: [],
  },
  {
    id: "HistoryEntry",
    name: "HistoryEntry",
    color: "#8b5cf6",
    fields: [
      "+ id: string",
      "+ actionType: ActionType",
      "+ entityType: EntityType",
      "+ entityName: string",
      "+ author: string",
      "+ authorRole: admin | member",
      "+ date: string",
      "+ details?: string",
    ],
    methods: [],
  },
];

/* Layout positions on a 1200×700 SVG canvas */
const positions: Record<string, { x: number; y: number }> = {
  Member:       { x: 40,  y: 280 },
  Event:        { x: 260, y: 60  },
  Article:      { x: 260, y: 440 },
  Submission:   { x: 700, y: 280 },
  Challenge:    { x: 900, y: 60  },
  HistoryEntry: { x: 900, y: 440 },
};

const BOX_W = 220;
const HEADER_H = 34;
const ROW_H = 18;
const PADDING = 10;

function boxHeight(cls: typeof classes[number]) {
  const rows = cls.fields.length + (cls.methods.length > 0 ? cls.methods.length + 1 : 0);
  return HEADER_H + PADDING + rows * ROW_H + PADDING;
}

function centerX(id: string) {
  return positions[id].x + BOX_W / 2;
}
function centerY(id: string, cls: typeof classes[number]) {
  return positions[id].y + boxHeight(cls) / 2;
}

/* ─── Relation arrows ─────────────────────────────────────────────── */
const relations: { from: string; to: string; label: string; fromSide?: "right" | "left" | "bottom" | "top"; toSide?: "right" | "left" | "bottom" | "top" }[] = [
  { from: "Event",     to: "Member",       label: "1..*  inscrit",   fromSide: "left",   toSide: "right"  },
  { from: "Challenge", to: "Submission",   label: "1..*  reçoit",    fromSide: "left",   toSide: "right"  },
  { from: "Submission",to: "Member",       label: "*..*  soumis par",fromSide: "left",   toSide: "right"  },
  { from: "HistoryEntry", to: "Event",     label: "trace",           fromSide: "top",    toSide: "bottom" },
  { from: "HistoryEntry", to: "Challenge", label: "trace",           fromSide: "top",    toSide: "bottom" },
  { from: "HistoryEntry", to: "Article",   label: "trace",           fromSide: "left",   toSide: "right"  },
];

function sidePoint(id: string, cls: typeof classes[number], side: "right" | "left" | "bottom" | "top" = "right") {
  const { x, y } = positions[id];
  const h = boxHeight(cls);
  if (side === "right") return { x: x + BOX_W, y: y + h / 2 };
  if (side === "left")  return { x, y: y + h / 2 };
  if (side === "bottom") return { x: x + BOX_W / 2, y: y + h };
  return { x: x + BOX_W / 2, y };
}

/* ─── Component ──────────────────────────────────────────────────── */
export function ClassDiagram() {
  const { t } = useLanguage();
  const dark = document.documentElement.classList.contains("dark");

  const bg = dark ? "#0f0a1e" : "#f8f6ff";
  const cardBg = dark ? "#1a1030" : "#ffffff";
  const borderColor = dark ? "#2d1f4a" : "#e5dff5";
  const textColor = dark ? "#e2d9f3" : "#1e1040";
  const mutedColor = dark ? "#8b7cb0" : "#7c3aed";
  const fieldColor = dark ? "#c4b8df" : "#3d2b6b";

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      {/* Page header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
          {t("nav_class_diagram")}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Diagramme UML des classes du système Nexus IT Club
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {classes.map((cls) => (
          <span
            key={cls.id}
            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
            style={{ background: `${cls.color}20`, color: cls.color, border: `1px solid ${cls.color}40` }}
          >
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: cls.color }} />
            {cls.name}
          </span>
        ))}
      </div>

      {/* Diagram canvas — scrollable on small screens */}
      <div
        className="rounded-2xl overflow-auto"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <svg
          viewBox="0 0 1160 760"
          width="1160"
          height="760"
          style={{ minWidth: "900px", fontFamily: "'Inter', 'Nunito', sans-serif" }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={dark ? "#1a1030" : "#ede9f6"} strokeWidth="0.5" />
            </pattern>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={mutedColor} />
            </marker>
            <marker id="diamond" markerWidth="10" markerHeight="10" refX="1" refY="5" orient="auto">
              <polygon points="0,5 4,0 8,5 4,10" fill="none" stroke={mutedColor} strokeWidth="1" />
            </marker>
          </defs>
          <rect width="1160" height="760" fill={bg} />
          <rect width="1160" height="760" fill="url(#grid)" />

          {/* Title watermark */}
          <text x="580" y="740" textAnchor="middle" fontSize="11" fill={dark ? "#2d1f4a" : "#ddd5f5"}>
            Nexus IT Club — Class Diagram v1.0
          </text>

          {/* ── Relation arrows ── */}
          {relations.map((rel) => {
            const fromCls = classes.find((c) => c.id === rel.from)!;
            const toCls   = classes.find((c) => c.id === rel.to)!;
            const p1 = sidePoint(rel.from, fromCls, rel.fromSide ?? "right");
            const p2 = sidePoint(rel.to, toCls, rel.toSide ?? "left");
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            return (
              <g key={`${rel.from}-${rel.to}`}>
                <line
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={mutedColor}
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                  markerEnd="url(#arrow)"
                  opacity="0.7"
                />
                <text
                  x={mx} y={my - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fill={mutedColor}
                  fontStyle="italic"
                >
                  {rel.label}
                </text>
              </g>
            );
          })}

          {/* ── Class boxes ── */}
          {classes.map((cls) => {
            const { x, y } = positions[cls.id];
            const h = boxHeight(cls);
            const sepY = y + HEADER_H;

            return (
              <g key={cls.id}>
                {/* Shadow */}
                <rect
                  x={x + 4} y={y + 4}
                  width={BOX_W} height={h}
                  rx={10} ry={10}
                  fill={cls.color}
                  opacity="0.12"
                />
                {/* Card */}
                <rect
                  x={x} y={y}
                  width={BOX_W} height={h}
                  rx={10} ry={10}
                  fill={cardBg}
                  stroke={cls.color}
                  strokeWidth="2"
                />
                {/* Header fill */}
                <rect
                  x={x} y={y}
                  width={BOX_W} height={HEADER_H}
                  rx={10} ry={10}
                  fill={cls.color}
                  opacity="0.18"
                />
                {/* Clip top corners for header bottom */}
                <rect x={x} y={y + HEADER_H - 10} width={BOX_W} height={10} fill={cls.color} opacity="0.18" />
                {/* Header separator */}
                <line
                  x1={x} y1={sepY} x2={x + BOX_W} y2={sepY}
                  stroke={cls.color} strokeWidth="1.5" opacity="0.5"
                />
                {/* Class name */}
                <text
                  x={x + BOX_W / 2}
                  y={y + HEADER_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={cls.color}
                  fontFamily="'Nunito', sans-serif"
                >
                  {cls.name}
                </text>
                {/* «stereotype» */}
                <text
                  x={x + BOX_W / 2}
                  y={y + HEADER_H / 2 - 7}
                  textAnchor="middle"
                  fontSize="8"
                  fill={cls.color}
                  opacity="0.6"
                >
                  «interface»
                </text>

                {/* Fields */}
                {cls.fields.map((field, fi) => (
                  <text
                    key={fi}
                    x={x + 10}
                    y={sepY + PADDING + fi * ROW_H + 12}
                    fontSize="9.5"
                    fill={fieldColor}
                    fontFamily="'Courier New', monospace"
                  >
                    {field}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Relationship legend */}
      <div className="mt-6 rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)", fontFamily: "'Nunito', sans-serif" }}>
          Relations entre les classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            { from: "Event", to: "Member", type: "Association 1..*", desc: "Un événement inscrit plusieurs membres" },
            { from: "Challenge", to: "Submission", type: "Composition 1..*", desc: "Un challenge contient des soumissions" },
            { from: "Submission", to: "Member", type: "Association *..*", desc: "Une soumission est liée à un membre" },
            { from: "HistoryEntry", to: "Event", type: "Dépendance", desc: "L'historique trace les actions sur les événements" },
            { from: "HistoryEntry", to: "Challenge", type: "Dépendance", desc: "L'historique trace les actions sur les challenges" },
            { from: "HistoryEntry", to: "Article", type: "Dépendance", desc: "L'historique trace les actions sur les articles" },
          ].map((rel) => (
            <div
              key={`${rel.from}-${rel.to}`}
              className="rounded-lg p-3 text-xs"
              style={{ background: "var(--background)", border: "1px solid var(--border)" }}
            >
              <p className="font-semibold mb-0.5" style={{ color: "#7c3aed" }}>
                {rel.from} → {rel.to}
              </p>
              <p style={{ color: "var(--muted-foreground)" }}>
                <span className="font-medium">{rel.type}</span> — {rel.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
