import { NavLink, Outlet } from "react-router";
import {
  Calendar, Plus, Home, Menu, X, Trophy, Target,
  History, Sun, Moon, User, Settings, FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import nexusLogo from "../../imports/photo_2026-06-06_13-22-21-1.jpg";
import { useLanguage } from "../i18n/LanguageContext";

/* ─── Theme hook ────────────────────────────────────────── */
function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("nexus-theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("nexus-theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

/* ─── Nav structure — uses t() for labels ─────────────── */
function useNavGroups() {
  const { t } = useLanguage();
  return [
    {
      label: "Navigation",
      items: [
        { to: "/",           icon: Home,     label: t('nav_dashboard'),   end: true },
        { to: "/events",     icon: Calendar, label: t('nav_events'),      end: true },
        { to: "/challenges", icon: Trophy,   label: t('nav_challenges'),  end: true },
        { to: "/articles",   icon: FileText, label: t('nav_articles'),    end: true },
      ],
    },
    {
      label: "Administration",
      items: [
        { to: "/events/new",     icon: Plus,    label: t('nav_create_event'),     end: true },
        { to: "/challenges/new", icon: Target,  label: t('nav_create_challenge'), end: true },
        { to: "/articles/new",   icon: Plus,    label: t('nav_create_article'),   end: true },
        { to: "/history",        icon: History, label: t('nav_history'),           end: true },
      ],
    },
  ];
}

/* ─── Root ──────────────────────────────────────────────── */
export function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { t } = useLanguage();
  const NAV_GROUPS = useNavGroups();

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--sidebar)",
          borderRight: "1px solid var(--sidebar-border)",
          boxShadow: dark ? "4px 0 24px rgba(0,0,0,0.4)" : "4px 0 24px rgba(124,58,237,0.08)",
        }}
      >
        {/* Brand row */}
        <div
          className="flex items-center gap-2.5 px-4 py-4"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          {/* Logo image — circular crop, slight glow ring */}
          <div
            className="shrink-0 w-9 h-9 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px rgba(124,58,237,0.5), 0 0 12px rgba(124,58,237,0.35)",
              background: "#000",
            }}
          >
            <img
              src={nexusLogo}
              alt="Nexus IT Club logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Word mark */}
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--sidebar-foreground)",
                letterSpacing: "0.04em",
              }}
            >
              NEXUS
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#7c3aed",
                textTransform: "uppercase",
              }}
            >
              IT Club
            </span>
          </div>

          {/* Mobile close */}
          <button
            className="ml-auto lg:hidden p-1 rounded"
            onClick={() => setSidebarOpen(false)}
            style={{ color: "var(--sidebar-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p
                className="px-3 mb-1.5 text-xs uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ to, icon: Icon, label, end }) => (
                  <NavLink
                    key={to + label}
                    to={to}
                    end={end}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            background: dark
                              ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(168,85,247,0.18))"
                              : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                            color: "#7c3aed",
                            border: "1px solid rgba(124,58,237,0.3)",
                            fontWeight: 700,
                          }
                        : {
                            color: "var(--sidebar-foreground)",
                            border: "1px solid transparent",
                            opacity: 0.85,
                          }
                    }
                  >
                    <Icon size={15} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          {/* ── Settings section ── */}
          <div>
            <p
              className="px-3 mb-1.5 text-xs uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t('settings')}
            </p>

            {/* Settings link */}
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: dark
                        ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(168,85,247,0.18))"
                        : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                      color: "#7c3aed",
                      border: "1px solid rgba(124,58,237,0.3)",
                      fontWeight: 700,
                    }
                  : {
                      color: "var(--sidebar-foreground)",
                      border: "1px solid transparent",
                      opacity: 0.85,
                    }
              }
            >
              <Settings size={15} />
              {t('nav_settings')}
            </NavLink>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm mt-1"
              style={{
                color: "var(--sidebar-foreground)",
                border: "1px solid transparent",
                opacity: 0.85,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = dark
                  ? "rgba(124,58,237,0.12)"
                  : "rgba(124,58,237,0.07)";
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              }}
            >
              {/* Toggle pill */}
              <div
                className="relative w-11 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 shrink-0"
                style={{
                  background: dark
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(124,58,237,0.2)",
                  border: "1px solid rgba(124,58,237,0.4)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: dark ? "#fff" : "#7c3aed",
                    transform: dark ? "translateX(20px)" : "translateX(0px)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {dark
                    ? <Moon size={11} style={{ color: "#7c3aed" }} />
                    : <Sun size={11} style={{ color: "#fff" }} />
                  }
                </div>
              </div>

              <span style={{ fontSize: "0.875rem" }}>
                {dark ? t('dark_mode') : t('light_mode')}
              </span>
            </button>
          </div>
        </nav>

        {/* Footer — admin profile */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs truncate" style={{ color: "var(--sidebar-foreground)", fontWeight: 600 }}>
                {t('admin')}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
                admin@nexus.club
              </p>
            </div>
            <User size={14} className="ml-auto shrink-0" style={{ color: "var(--muted-foreground)" }} />
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header
          className="flex items-center gap-3 px-5 py-3.5 lg:hidden"
          style={{
            background: "var(--sidebar)",
            borderBottom: "1px solid var(--sidebar-border)",
          }}
        >
          <button onClick={() => setSidebarOpen(true)} style={{ color: "var(--foreground)" }}>
            <Menu size={20} />
          </button>
          <div
            className="w-7 h-7 rounded-full overflow-hidden shrink-0"
            style={{ boxShadow: "0 0 0 1.5px rgba(124,58,237,0.5)" }}
          >
            <img src={nexusLogo} alt="Nexus" className="w-full h-full object-cover" />
          </div>
          <span
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "var(--foreground)", letterSpacing: "0.06em" }}
          >
            NEXUS
          </span>
          {/* Mobile theme toggle */}
          <button
            onClick={toggle}
            className="ml-auto p-2 rounded-lg transition-all"
            style={{ background: "rgba(124,58,237,0.12)", color: "#7c3aed" }}
            aria-label="Basculer le thème"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
