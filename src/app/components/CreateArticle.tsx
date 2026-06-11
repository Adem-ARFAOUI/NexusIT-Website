import { useNavigate } from "react-router";
import { ArticleForm } from "./ArticleForm";
import { mockArticles } from "../data/mockData";
import { Article } from "../types";

export function CreateArticle() {
  const navigate = useNavigate();

  function handleSubmit(data: Omit<Article, "id">) {
    const newArticle: Article = {
      ...data,
      id: `a${Date.now()}`,
    };
    mockArticles.unshift(newArticle);
    navigate("/articles");
  }

  return <ArticleForm onSubmit={handleSubmit} />;
}
