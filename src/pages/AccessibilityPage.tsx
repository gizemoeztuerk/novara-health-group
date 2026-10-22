import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/i18n/LanguageContext';

export default function AccessibilityPage() {
  const { tr } = useI18n();
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Accessibility', 'Barrierefreiheit') }]} className="mb-6" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Accessibility Statement', 'Erklärung zur Barrierefreiheit')}
              </h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {tr(
                  'We aim to make our digital services accessible for everyone.',
                  'Wir möchten unsere digitalen Services für alle zugänglich machen.'
                )}
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">WCAG 2.1 • EN 301 549</Badge>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Card className="shadow-soft">
            <CardContent className="p-6 md:p-10 space-y-8">
              <div>
                <h2 className="font-semibold text-foreground">{tr('What we do', 'Was wir umsetzen')}</h2>
                <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>{tr('Keyboard-friendly navigation with visible focus states.', 'Tastaturfreundliche Navigation mit sichtbaren Fokuszuständen.')}</li>
                  <li>{tr('Skip-to-content link at the top of the page.', 'Sprunglink zum Hauptinhalt am Seitenanfang.')}</li>
                  <li>{tr('Adjustable font size and a high-contrast mode (widget bottom left).', 'Einstellbare Schriftgröße und ein Hochkontrastmodus (widget unten links).')}</li>
                  <li>{tr('Clear headings, landmarks, and form labels.', 'Klare Überschriften, Landmarks und Formularbeschriftungen.')}</li>
                  <li>{tr('Responsive layouts for mobile and desktop.', 'Responsives Layout für Mobilgeräte und Desktop.')}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('Known limitations', 'Bekannte Einschränkungen')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'As this is a case-study prototype, some content is simplified. If you encounter an accessibility issue, please let us know.',
                    'Da es sich um einen Case-Study-Prototyp handelt, sind einige Inhalte vereinfacht. Wenn Sie auf Barrieren stoßen, geben Sie uns bitte Bescheid.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('Feedback', 'Feedback')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr('Contact us at', 'Kontakt:')} <span className="font-medium">accessibility@novara-health.example</span>. {tr('Please include a short description of the issue and the page URL.', 'Bitte mit kurzer Problembeschreibung und Seiten-URL.')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
