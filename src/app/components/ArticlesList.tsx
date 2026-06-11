import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  FileText, File, Plus, Trash2, Edit, ChevronUp, ChevronDown,
  Search, Tag, Calendar, User, Download, ExternalLink,
} from "lucide-react";
import { mockArticles } from "../data/mockData";
import { Article, ArticleType } from "../types";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useLanguage } from "../i18n/LanguageContext";

type SortDir = "asc" | "desc";
type TypeFilter = "all" | ArticleType;

const MIME_LABELS: Record<string, string> = {
  "application/pdf": "PDF",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/vnd.ms-powerpoint": "PPT",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
  "application/vnd.ms-excel": "XLS",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  "text/plain": "TXT",
};

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ArticlesList() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = useMemo(() => {
    let list = [...articles];
    if (typeFilter !== "all") list = list.filter((a) => a.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      const ta = new Date(a.publishedAt).getTime();
      const tb = new Date(b.publishedAt).getTime();
      return sortDir === "desc" ? tb - ta : ta - tb;
    });
    return list;
  }, [articles, typeFilter, sortDir, search]);

  function handleDelete(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleteTarget(null);
    flashSuccess(t("article_deleted"));
  }

  function flashSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  const articleCount = articles.filter((a) => a.type === "article").length;
  const documentCount = articles.filter((a) => a.type === "document").length;

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      {/* Success toast */}
      {successMsg && (
        <div
          className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }}
        >
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
            {t("articles_title")}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            {articleCount} {t("article_filter_article").toLowerCase()} · {documentCount} {t("article_filter_document").toLowerCase()}
          </p>
        </div>
        <button
          onClick={() => navigate("/articles/new")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }}
        >
          <Plus size={16} />
          {t("article_create")}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: t("total_articles"), value: articleCount, icon: FileText, color: "#7c3aed" },
          { label: t("total_documents"), value: documentCount, icon: File, color: "#06b6d4" },
          { label: "Total", value: articles.length, icon: FileText, color: "#10b981" },
          { label: "Résultats", value: filtered.length, icon: Search, color: "#f59e0b" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}22` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</p>
              <p className="font-bold" style={{ color: "var(--foreground)" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters bar */}
      <div
        className="rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "article", "document"] as TypeFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                typeFilter === f
                  ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }
                  : { background: "var(--background)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }
              }
            >
              {f === "all" ? t("article_filter_all") : f === "article" ? t("article_filter_article") : t("article_filter_document")}
            </button>
          ))}
        </div>

        {/* Sort by date */}
        <button
          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0"
          style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
        >
          <Calendar size={13} />
          {t("sort_by_date")}
          {sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--muted-foreground)" }}>
          <FileText size={40} className="mx-auto mb-3 opacity-40" />
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((article) => (
            <ArticleRow
              key={article.id}
              article={article}
              onEdit={() => navigate(`/articles/${article.id}/edit`)}
              onDelete={() => setDeleteTarget(article)}
            />
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteConfirmDialog
          title={t("article_confirm_delete")}
          message={t("article_delete_message")}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

function ArticleRow({
  article,
  onEdit,
  onDelete,
}: {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { t } = useLanguage();
  const isArticle = article.type === "article";
  const TypeIcon = isArticle ? FileText : File;
  const typeColor = isArticle ? "#7c3aed" : "#06b6d4";
  const typeLabel = isArticle ? t("article_filter_article") : t("article_filter_document");

  const date = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const mimeLabel = article.fileMime
    ? (MIME_LABELS[article.fileMime] ?? article.fileMime.split("/")[1]?.toUpperCase() ?? "FILE")
    : null;

  return (
    <div
      className="rounded-xl p-5 flex flex-col sm:flex-row gap-4 transition-all"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Type icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${typeColor}18`, border: `1.5px solid ${typeColor}30` }}
      >
        <TypeIcon size={22} style={{ color: typeColor }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
            style={{ background: `${typeColor}20`, color: typeColor }}
          >
            {typeLabel}
          </span>
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)", fontFamily: "'Nunito', sans-serif" }}
          >
            {article.title}
          </h3>
        </div>

        <p className="text-xs mb-2 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
          {article.content}
        </p>

        <div className="flex items-center gap-4 flex-wrap text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="flex items-center gap-1">
            <User size={11} /> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {date}
          </span>
          {article.tags.length > 0 && (
            <span className="flex items-center gap-1 flex-wrap">
              <Tag size={11} />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Attached file chip */}
        {article.fileName && (
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <div
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs"
              style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)" }}
            >
              {/* File type badge */}
              {mimeLabel && (
                <span
                  className="px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{ background: "#06b6d4", color: "#fff" }}
                >
                  {mimeLabel}
                </span>
              )}
              <span className="truncate max-w-[180px]" style={{ color: "var(--foreground)" }}>
                {article.fileName}
              </span>
              {article.fileSize !== undefined && (
                <span style={{ color: "var(--muted-foreground)" }}>({fmtSize(article.fileSize)})</span>
              )}
            </div>

            {/* Open in new tab */}
            {article.fileUrl && (
              <a
                href={article.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
                title="Ouvrir"
              >
                <ExternalLink size={11} /> Ouvrir
              </a>
            )}

            {/* Download */}
            {article.fileUrl && (
              <a
                href={article.fileUrl}
                download={article.fileName}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                title="Télécharger"
              >
                <Download size={11} /> Télécharger
              </a>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg transition-all"
          style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
          title={t("article_edit")}
        >
          <Edit size={15} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg transition-all"
          style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
          title={t("article_delete")}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
