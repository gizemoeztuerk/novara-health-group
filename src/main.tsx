import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AccessibilityProvider } from "./a11y/AccessibilityContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </LanguageProvider>
);
