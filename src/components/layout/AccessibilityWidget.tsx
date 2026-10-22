import { useState } from "react";
import { Link } from "react-router-dom";
import { Accessibility, Minus, Plus, Contrast, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccessibility } from "@/a11y/AccessibilityContext";
import { useI18n } from "@/i18n/LanguageContext";

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const { fontScale, increaseFont, decreaseFont, reset, highContrast, toggleContrast } = useAccessibility();
  const { tr } = useI18n();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!open && (
        <Button
          type="button"
          size="icon"
          className="rounded-full shadow-lg btn-glow"
          onClick={() => setOpen(true)}
          aria-label={tr("Open accessibility settings", "Barrierefreiheit-Einstellungen öffnen")}
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      )}

      {open && (
        <Card className="w-[320px] shadow-xl border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">
                  {tr("Accessibility", "Barrierefreiheit")}
                </CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tr(
                    "Adjust text size and contrast for easier reading.",
                    "Passen Sie Schriftgröße und Kontrast für bessere Lesbarkeit an."
                  )}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="-mr-2 -mt-2"
                onClick={() => setOpen(false)}
                aria-label={tr("Close", "Schließen")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{tr("Text size", "Schriftgröße")}</span>
                <span className="text-xs text-muted-foreground">{Math.round(fontScale * 100)}%</span>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={decreaseFont} aria-label={tr("Decrease text size", "Schrift verkleinern")}
                >
                  <Minus className="mr-2 h-4 w-4" /> A-
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={increaseFont} aria-label={tr("Increase text size", "Schrift vergrößern")}
                >
                  <Plus className="mr-2 h-4 w-4" /> A+
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3">
              <div>
                <p className="text-sm font-medium">{tr("High contrast", "Hoher Kontrast")}</p>
                <p className="text-xs text-muted-foreground">
                  {tr("Improves readability", "Verbessert die Lesbarkeit")}
                </p>
              </div>
              <Button
                type="button"
                variant={highContrast ? "default" : "outline"}
                size="sm"
                onClick={toggleContrast}
                aria-pressed={highContrast}
                aria-label={tr("Toggle high contrast", "Hohen Kontrast umschalten")}
              >
                <Contrast className="mr-2 h-4 w-4" />
                {highContrast ? tr("On", "An") : tr("Off", "Aus")}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" className="flex-1" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {tr("Reset", "Zurücksetzen")}
              </Button>
              <Button type="button" variant="outline" asChild className="flex-1">
                <Link to="/accessibility" onClick={() => setOpen(false)}>
                  {tr("Statement", "Erklärung")}
                </Link>
              </Button>
            </div>

            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
              <li>{tr("Keyboard focus highlights", "Tastatur-Fokus-Hervorhebung")}</li>
              <li>{tr("Skip-to-content link", "Sprung zum Hauptinhalt")}</li>
              <li>{tr("Readable color contrast (toggle above)", "Gute Farbkontraste (oben umschaltbar)")}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
