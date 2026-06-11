import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "./i18n/LanguageContext";

// Apply saved theme before first render to avoid flash
const saved = localStorage.getItem("nexus-theme");
if (saved === "light") {
  document.documentElement.classList.remove("dark");
} else {
  // default to dark
  document.documentElement.classList.add("dark");
}

// Apply saved language direction
const savedLang = localStorage.getItem("nexus-language");
if (savedLang === "ar") {
  document.documentElement.dir = "rtl";
} else {
  document.documentElement.dir = "ltr";
}

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    /* MARKER-MAKE-KIT-DISCOVERY-READ */
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
