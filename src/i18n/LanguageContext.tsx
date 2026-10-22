import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "de";

type Dictionary = Record<string, { en: string; de: string }>;

// Minimal UI dictionary for shared chrome and key CTAs.
// Page-specific content still largely comes from mockData (label/labelDe, etc.).
const dict: Dictionary = {
  "brand.group": { en: "Health Group", de: "Health Group" },
  "nav.login": { en: "Login", de: "Anmelden" },
  "nav.getStarted": { en: "Get Started", de: "Jetzt starten" },
  "nav.skip": { en: "Skip to main content", de: "Zum Hauptinhalt springen" },

  "cookie.title": { en: "Demo privacy preferences", de: "Demo-Datenschutzeinstellungen" },
  "cookie.body": {
    en: "This is a demonstration of a consent interface. No analytics or marketing tracking is active; your choice is stored only in this browser.",
    de: "Dies ist eine Demo für Einwilligungseinstellungen. Es findet kein Analytics- oder Marketing-Tracking statt; Ihre Auswahl wird nur in diesem Browser gespeichert.",
  },
  "cookie.required": { en: "Required", de: "Erforderlich" },
  "cookie.acceptAll": { en: "Accept All", de: "Alle akzeptieren" },
  "cookie.necessaryOnly": { en: "Necessary Only", de: "Nur notwendige" },
  "cookie.save": { en: "Save Preferences", de: "Auswahl speichern" },
  "cookie.manage": { en: "Manage", de: "Verwalten" },

  "home.ready": { en: "Ready to get started?", de: "Bereit, loszulegen?" },
  "home.readySub": {
    en: "Find the right coverage in minutes. No commitments, free quotes.",
    de: "Finden Sie in wenigen Minuten den passenden Schutz. Unverbindlich, kostenlose Angebote.",
  },
  "home.browseProducts": { en: "Browse Products", de: "Produkte ansehen" },
  "home.contactUs": { en: "Contact Us", de: "Kontakt" },
};

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  /** Quick inline translation helper. */
  tr: (en: string, de: string) => string;
  pick: (obj: object | null | undefined, baseKey: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "novara-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") setLangState(saved);
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  // Keep <html lang="…"> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "de" : "en");
  }, [lang, setLang]);

  const t = useCallback((key: string) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang];
  }, [lang]);

  const tr = useCallback((en: string, de: string) => (lang === "de" ? de : en), [lang]);

  // Read bilingual fields such as label / labelDe without unsafe public casts.
  const pick = useCallback((obj: object | null | undefined, baseKey: string): string => {
    if (!obj) return "";
    const fields = obj as Record<string, unknown>;
    const translated = fields[`${baseKey}De`];
    const value = lang === "de" && translated ? translated : fields[baseKey];
    return typeof value === "string" ? value : String(value ?? "");
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang, t, tr, pick }),
    [lang, setLang, toggleLang, t, tr, pick]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
