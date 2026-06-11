import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { EventsList } from "./components/EventsList";
import { EventDetail } from "./components/EventDetail";
import { CreateEvent } from "./components/CreateEvent";
import { EditEvent } from "./components/EditEvent";
import { ChallengesList } from "./components/ChallengesList";
import { ChallengeDetail } from "./components/ChallengeDetail";
import { CreateChallenge } from "./components/CreateChallenge";
import { EditChallenge } from "./components/EditChallenge";
import { ArticlesList } from "./components/ArticlesList";
import { CreateArticle } from "./components/CreateArticle";
import { EditArticle } from "./components/EditArticle";
import { ClassDiagram } from "./components/ClassDiagram";
import { HistoryPage } from "./components/HistoryPage";
import { Settings } from "./components/Settings";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "events", Component: EventsList },
      { path: "events/new", Component: CreateEvent },
      { path: "events/:id", Component: EventDetail },
      { path: "events/:id/edit", Component: EditEvent },
      { path: "challenges", Component: ChallengesList },
      { path: "challenges/new", Component: CreateChallenge },
      { path: "challenges/:id", Component: ChallengeDetail },
      { path: "challenges/:id/edit", Component: EditChallenge },
      { path: "articles", Component: ArticlesList },
      { path: "articles/new", Component: CreateArticle },
      { path: "articles/:id/edit", Component: EditArticle },
      { path: "class-diagram", Component: ClassDiagram },
      { path: "history", Component: HistoryPage },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
