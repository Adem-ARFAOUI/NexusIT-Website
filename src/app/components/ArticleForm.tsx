import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Save, X, FileText, File, Tag, Upload, Paperclip, Trash2 } from "lucide-react";
import { Article, ArticleType } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

interface ArticleFormProps {
  initial?: Partial<Article>;
  onSubmit: (data: Omit<Article, "id">) => void;
}

const ACCEPTED = ".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx";
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

export function ArticleForm({ initial = {}, onSubmit }: ArticleFormProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const [title, setTitle] = useState(initial.title ?? "");
  const [type, setType] = useState<ArticleType>(initial.type ?? "article");
  const [content, setContent] = useState(initial.content ?? "");
  const [author, setAuthor] = useState(initial.author ?? "Admin");
  const [tagsRaw, setTagsRaw] = useState((initial.tags ?? []).join(", "));
  const [errors, setErrors] = useState<Record<string, string>>({});

  // File state
  const [fileUrl, setFileUrl]   = useState<string | undefined>(initial.fileUrl);
  const [fileName, setFileName] = useState<string | undefined>(initial.fileName);
  const [fileSize, setFileSize] = useState<number | undefined>(initial.fileSize);
  const [fileMime, setFileMime] = useState<string | undefined>(initial.fileMime);

  function attachFile(file: File) {
    // Revoke old blob URL to avoid memory leaks
    if (fileUrl && fileUrl.startsWith("blob:")) URL.revokeObjectURL(fileUrl);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileName(file.name);
    setFileSize(file.size);
    setFileMime(file.type);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) attachFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) attachFile(file);
  }

  function removeFile() {
    if (fileUrl && fileUrl.startsWith("blob:")) URL.revokeObjectURL(fileUrl);
    setFileUrl(undefined);
    setFileName(undefined);
    setFileSize(undefined);
    setFileMime(undefined);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Le titre est requis.";
    if (!content.trim()) e.content = "Le contenu est requis.";
    if (!author.trim()) e.author = "L'auteur est requis.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({
      title: title.trim(),
      type,
      content: content.trim(),
      author: author.trim(),
      publishedAt: initial.publishedAt ?? new Date().toISOString(),
      tags: tagsRaw.split(",").map((s) => s.trim()).filter(Boolean),
      fileUrl,
      fileName,
      fileSize,
      fileMime,
    });
  }

  const inputStyle = {
    background: "var(--background)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
  };

  const mimeLabel = fileMime ? (MIME_LABELS[fileMime] ?? fileMime.split("/")[1]?.toUpperCase() ?? "FILE") : "";

  return (
    <div className="p-6 lg:p-8 min-h-full" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Nunito', sans-serif", color: "var(--foreground)" }}>
            {initial.id ? t("article_edit") : t("article_create")}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Type selector */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
              {t("article_type_label")}
            </label>
            <div className="flex gap-3">
              {(["article", "document"] as ArticleType[]).map((opt) => {
                const Icon = opt === "article" ? FileText : File;
                const active = type === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setType(opt)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={
                      active
                        ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }
                        : { ...inputStyle, opacity: 0.7 }
                    }
                  >
                    <Icon size={15} />
                    {opt === "article" ? t("article_filter_article") : t("article_filter_document")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              {t("article_title_label")} *
            </label>
            <input
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
              placeholder={t("article_title_label")}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
            {errors.title && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              {t("article_author")} *
            </label>
            <input
              value={author}
              onChange={(e) => { setAuthor(e.target.value); setErrors((p) => ({ ...p, author: "" })); }}
              placeholder={t("article_author")}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
            {errors.author && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.author}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              {t("article_content")} *
            </label>
            <textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: "" })); }}
              placeholder={t("article_content")}
              rows={5}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={inputStyle}
            />
            {errors.content && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.content}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              <span className="inline-flex items-center gap-1"><Tag size={13} /> {t("article_tags_label")}</span>
            </label>
            <input
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="react, typescript, web"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>

          {/* File upload — shown for both types, mandatory visual cue for documents */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              <span className="inline-flex items-center gap-1">
                <Paperclip size={13} />
                {type === "document" ? "Fichier joint (PDF, DOCX, …)" : "Fichier joint (optionnel)"}
              </span>
            </label>

            {/* Drop zone — hidden once a file is attached */}
            {!fileName && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all"
                style={{
                  borderColor: dragging ? "#7c3aed" : "var(--border)",
                  background: dragging ? "rgba(124,58,237,0.06)" : "var(--background)",
                  color: "var(--muted-foreground)",
                }}
              >
                <Upload size={28} style={{ color: dragging ? "#7c3aed" : "var(--muted-foreground)" }} />
                <p className="text-sm text-center">
                  Glissez-déposez un fichier ici<br />
                  <span className="text-xs opacity-60">ou cliquez pour parcourir — PDF, DOC, DOCX, PPT, XLS, TXT</span>
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED}
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            )}

            {/* Attached file preview */}
            {fileName && (
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(124,58,237,0.25)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }}
                >
                  {mimeLabel}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{fileName}</p>
                  {fileSize !== undefined && (
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{fmtSize(fileSize)}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      download={fileName}
                      className="p-1.5 rounded-lg text-xs"
                      style={{ background: "rgba(124,58,237,0.15)", color: "#7c3aed" }}
                      title="Télécharger"
                    >
                      ↓
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 rounded-lg"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                    title="Retirer le fichier"
                  >
                    <Trash2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 rounded-lg text-xs"
                    style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
                    title="Remplacer"
                  >
                    <Upload size={13} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED}
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff" }}
            >
              <Save size={15} />
              {t("article_save")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/articles")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              <X size={15} />
              {t("article_cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
