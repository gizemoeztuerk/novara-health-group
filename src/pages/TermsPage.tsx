import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/i18n/LanguageContext';

export default function TermsPage() {
  const { tr } = useI18n();
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Terms of Service', 'Nutzungsbedingungen') }]} className="mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Terms of Service', 'Nutzungsbedingungen')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Demo template for the case study. Replace with your official terms before production use.',
              'Demo-Vorlage für die Case Study. Vor einem echten Go-live müssen diese Inhalte durch rechtlich geprüfte Nutzungsbedingungen ersetzt werden.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Card className="shadow-soft">
            <CardContent className="p-6 md:p-10 space-y-8">
              <div>
                <h2 className="font-semibold text-foreground">{tr('1. Scope', '1. Geltungsbereich')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'These terms apply to the use of the NOVARA website, including information pages and self-service forms.',
                    'Diese Bedingungen gelten für die Nutzung der NOVARA-Website, einschließlich Informationsseiten und Self-Service-Formularen.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('2. Non-binding information', '2. Unverbindliche Informationen')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'Product information on this website is provided for informational purposes. A binding contract is created only after explicit confirmation.',
                    'Produktinformationen auf dieser Website dienen der Information. Ein verbindlicher Vertrag kommt erst nach ausdrücklicher Bestätigung zustande.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('3. Availability', '3. Verfügbarkeit')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'We aim for high availability, but maintenance windows and third-party dependencies can cause temporary outages.',
                    'Wir streben eine hohe Verfügbarkeit an, jedoch können Wartungsfenster und Abhängigkeiten von Drittanbietern zu temporären Ausfällen führen.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('4. Liability', '4. Haftung')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'Liability is limited to intent and gross negligence, unless mandatory law requires otherwise.',
                    'Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit zwingendes Recht nichts anderes vorsieht.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('5. Contact', '5. Kontakt')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr('Questions about these terms:', 'Fragen zu diesen Bedingungen:')} <span className="font-medium">legal@novara-health.example</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
