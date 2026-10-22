import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function CoveragePage() {
  const { tr } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Coverage details', 'Leistungsumfang') }
            ]} 
            className="mb-6" 
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Coverage details', 'Leistungsumfang')}
              </h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {tr(
                  'Clear, scannable coverage information to reduce uncertainty and support self-service.',
                  'Übersichtliche Informationen zu Ihrem Versicherungsschutz, um Unsicherheiten zu klären.'
                )}
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">NOVARA SmartCare</Badge>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: tr('Outpatient treatment', 'Ambulante Behandlung'),
                items: [
                  tr('Doctor visits', 'Arztbesuche'),
                  tr('Diagnostics and imaging', 'Diagnostik und Bildgebung'),
                  tr('Prescriptions (conditions apply)', 'Arznei- und Verbandmittel'),
                ],
              },
              {
                title: tr('Hospital & surgery', 'Stationäre Behandlung'),
                items: [
                  tr('Planned inpatient stays', 'Geplante stationäre Aufenthalte'),
                  tr('Ambulatory surgery (with checklist)', 'Ambulante Operationen'),
                  tr('Aftercare and follow-up', 'Nachsorge und Rehabilitation'),
                ],
              },
              {
                title: tr('Prevention', 'Vorsorge'),
                items: [
                  tr('Check-ups and screenings', 'Vorsorgeuntersuchungen'),
                  tr('Vaccinations according to guidelines', 'Schutzimpfungen laut Richtlinien'),
                  tr('Health coaching (digital)', 'Digitales Gesundheitscoaching'),
                ],
              },
              {
                title: tr('Digital services', 'Digitale Services'),
                items: [
                  tr('Telemedicine', 'Telemedizin / Video-Sprechstunde'),
                  tr('Online claims & document center', 'Online-Leistungsanträge & Postfach'),
                  tr('Secure messaging (concept)', 'Sicheres Messaging-System'),
                ],
              },
            ].map((block) => (
              <Card key={block.title} className="shadow-soft card-hover">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-foreground">{block.title}</h2>
                  <ul className="mt-3 space-y-2">
                    {block.items.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}