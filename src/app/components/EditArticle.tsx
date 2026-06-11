import { useNavigate, useParams } from "react-router";
import { ArticleForm } from "./ArticleForm";
import { mockArticles } from "../data/mockData";
import { Article } from "../types";

export function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="p-8 text-center" style={{ color: "var(--muted-foreground)" }}>
        Article introuvable.
      </div>
    );
  }

  function handleSubmit(data: Omit<Article, "id">) {
    const idx = mockArticles.findIndex((a) => a.id === id);
    if (idx !== -1) {
      mockArticles[idx] = { ...mockArticles[idx], ...data };
    }
    navigate("/articles");
  }

  return <ArticleForm initial={{ ...article }} onSubmit={handleSubmit} />;
}
