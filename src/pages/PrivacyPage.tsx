import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/i18n/LanguageContext';

export default function PrivacyPage() {
  const { tr } = useI18n();
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Privacy information', 'Datenschutzhinweise') }]} className="mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Privacy information: academic demo', 'Datenschutzhinweise: Universitätsdemo')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'NOVARA is a fictional insurance service and frontend-only educational prototype, not a real insurer. This page describes observed demo behavior; it is not a legal privacy policy for a real service.',
              'NOVARA ist eine fiktive Versicherung und ein reiner Frontend-Universitätsprototyp, keine echte Versicherung. Diese Seite beschreibt das Verhalten der Demo und ist keine rechtliche Datenschutzerklärung für einen echten Dienst.'
            )}
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide">
          <Card className="shadow-soft">
            <CardContent className="p-6 md:p-10 space-y-8">
              <div>
                <h2 className="font-semibold text-foreground">{tr('1. Demonstration forms', '1. Demo-Formulare')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'Login, insurance applications, uploads, claims, recruiting and contact flows are simulated in the browser. The frontend contains no production backend or email service. Do not enter real personal, password, insurance or health data.',
                    'Login, Versicherungsanträge, Uploads, Leistungsfälle, Bewerbungen und Kontaktanfragen werden nur im Browser simuliert. Das Frontend hat kein produktives Backend oder E-Mail-System. Bitte keine echten Personen-, Passwort-, Versicherungs- oder Gesundheitsdaten eingeben.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('2. Local preferences', '2. Lokale Einstellungen')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'Language, accessibility options and demo consent choices are stored in the browser’s localStorage. Clear this website’s stored data in your browser settings to remove them. No actual analytics or marketing tracker is connected in this prototype.',
                    'Sprache, Barrierefreiheitsoptionen und simulierte Cookie-Einwilligungen werden im localStorage des Browsers gespeichert. Diese können über die Browser-Einstellungen für die Website gelöscht werden. Der Prototyp bindet kein echtes Analytics- oder Marketing-Tracking ein.'
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('3. Third-party fonts and hosting', '3. Externe Schriftarten und Hosting')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'The demo stylesheet loads Google Fonts. When hosted publicly, font requests and hosting infrastructure may involve network metadata such as IP addresses. Hosting-specific privacy notices must be reviewed before public deployment.',
                    'Das Demo-Stylesheet lädt Google Fonts. Bei öffentlichem Hosting können dabei sowie durch den Hosting-Anbieter technische Verbindungsdaten wie IP-Adressen anfallen. Hosting-spezifische Datenschutzhinweise müssen vor einer Veröffentlichung geprüft werden.'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
