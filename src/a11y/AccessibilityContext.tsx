import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

type AccessibilityContextValue = {
  fontScale: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  reset: () => void;
  highContrast: boolean;
  toggleContrast: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const STORAGE_KEY = "novara-a11y";
const FONT_STEPS = [0.9, 1, 1.1, 1.2, 1.3] as const;
const DEFAULT_SCALE = 1;

function clampToSteps(value: number) {
  // Pick the closest step.
  return FONT_STEPS.reduce((prev, cur) =>
    Math.abs(cur - value) < Math.abs(prev - value) ? cur : prev,
    FONT_STEPS[1]
  );
}

function getSystemHighContrastPreference(): boolean {
  // Best-effort: browsers support one or more of these.
  try {
    return (
      window.matchMedia?.("(prefers-contrast: more)")?.matches === true ||
      window.matchMedia?.("(forced-colors: active)")?.matches === true
    );
  } catch {
    return false;
  }
}

function readStoredState(): { fontScale: number; highContrast: boolean } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const fontScale =
      typeof parsed?.fontScale === "number" ? clampToSteps(parsed.fontScale) : DEFAULT_SCALE;
    const highContrast =
      typeof parsed?.highContrast === "boolean" ? parsed.highContrast : false;
    return { fontScale, highContrast };
  } catch {
    return null;
  }
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const stored = typeof window !== "undefined" ? readStoredState() : null;

  const [fontScale, setFontScale] = useState<number>(stored?.fontScale ?? DEFAULT_SCALE);
  const [highContrast, setHighContrast] = useState<boolean>(
    stored?.highContrast ?? getSystemHighContrastPreference()
  );

  // Apply root font scaling (Tailwind uses rem, so this scales the whole UI).
  useLayoutEffect(() => {
    const base = 16;
    document.documentElement.style.fontSize = `${Math.round(base * fontScale)}px`;
  }, [fontScale]);

  // Apply high-contrast mode to the root element.
  // We set both a class (for Tailwind/CSS selectors) and an attribute (for future-proofing).
  // Also hint the UA for built-in form controls.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    root.setAttribute("data-contrast", highContrast ? "high" : "normal");
    root.style.colorScheme = highContrast ? "dark" : "light";
  }, [highContrast]);

  // Persist settings.
  useLayoutEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontScale, highContrast }));
    } catch {
      // ignore
    }
  }, [fontScale, highContrast]);

  const increaseFont = useCallback(() => {
    setFontScale((current) => {
      const currentIndex = FONT_STEPS.findIndex((step) => step === current);
      const nextIndex = Math.min(Math.max(currentIndex, 0) + 1, FONT_STEPS.length - 1);
      return FONT_STEPS[nextIndex];
    });
  }, []);

  const decreaseFont = useCallback(() => {
    setFontScale((current) => {
      const currentIndex = FONT_STEPS.findIndex((step) => step === current);
      return FONT_STEPS[Math.max(currentIndex - 1, 0)];
    });
  }, []);

  const toggleContrast = useCallback(() => setHighContrast((value) => !value), []);

  const reset = useCallback(() => {
    setFontScale(DEFAULT_SCALE);
    setHighContrast(false);
  }, []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({ fontScale, increaseFont, decreaseFont, reset, highContrast, toggleContrast }),
    [fontScale, increaseFont, decreaseFont, reset, highContrast, toggleContrast]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
