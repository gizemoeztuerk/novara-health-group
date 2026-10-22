import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Lock, Bug } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function SecurityPage() {
  const { tr } = useI18n();
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Security', 'Sicherheit') }]} className="mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Security', 'Sicherheit')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Our demo security page outlines the operating principles behind a trustworthy insurance platform.',
              'Diese Demo-Seite beschreibt Grundprinzipien für eine vertrauenswürdige Versicherungsplattform.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: tr('Security-by-design', 'Security-by-Design'),
                text: tr(
                  'Threat modeling, least privilege, and secure defaults for every feature.',
                  'Threat Modeling, Least Privilege und sichere Defaults für jedes Feature.'
                ),
              },
              {
                icon: <Lock className="h-5 w-5" />,
                title: tr('Data protection', 'Datenschutz'),
                text: tr(
                  'Encryption in transit, controlled access, and data minimization.',
                  'Verschlüsselung bei der Übertragung, kontrollierter Zugriff und Datenminimierung.'
                ),
              },
              {
                icon: <Bug className="h-5 w-5" />,
                title: tr('Responsible disclosure', 'Responsible Disclosure'),
                text: tr(
                  'We welcome vulnerability reports and respond quickly.',
                  'Wir begrüßen Hinweise auf Schwachstellen und reagieren schnell.'
                ),
              },
            ].map((x) => (
              <Card key={x.title} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {x.icon}
                  </div>
                  <h2 className="font-semibold text-foreground">{x.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-soft mt-8">
            <CardContent className="p-6 md:p-10 space-y-6">
              <div>
                <h2 className="font-semibold text-foreground">{tr('Operational controls', 'Betriebliche Maßnahmen')}</h2>
                <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>{tr('Centralized logging with retention limits', 'Zentrales Logging mit Aufbewahrungsfristen')}</li>
                  <li>{tr('Regular dependency updates and automated security scanning', 'Regelmäßige Dependency-Updates und automatisierte Security-Scans')}</li>
                  <li>{tr('Role-based access control for internal systems', 'Rollenbasierte Zugriffssteuerung für interne Systeme')}</li>
                  <li>{tr('Backups and recovery tests', 'Backups und Wiederherstellungstests')}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold text-foreground">{tr('Report a vulnerability', 'Schwachstelle melden')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr('Please email', 'Bitte senden Sie eine E-Mail an')} <span className="font-medium">security@novara-health.example</span> {tr('with steps to reproduce.', 'mit Schritten zur Reproduktion.')}
                  {' '}
                  {tr('Do not include sensitive personal data in your report.', 'Bitte fügen Sie keine sensiblen personenbezogenen Daten in den Bericht ein.')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
