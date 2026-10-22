import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n/LanguageContext';

export default function ImprintPage() {
  const { tr } = useI18n();
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Imprint', 'Impressum') }]} className="mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Imprint', 'Impressum')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Demo imprint for the case study. Replace with your official company data.',
              'Demo-Impressum für die Case Study. Ersetzen Sie dies durch Ihre offiziellen Unternehmensangaben.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Card className="shadow-soft">
            <CardContent className="p-6 md:p-10 space-y-6">
              <div>
                <h2 className="font-semibold text-foreground">{tr('Operator', 'Betreiber')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">NOVARA Health Group GmbH</p>
                <p className="text-sm text-muted-foreground">{tr('Example Street 12, 10115 Pusemuckel, Germany', 'Beispielstraße 12, 10115 Pusemuckel, Deutschland')}</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{tr('Contact', 'Kontakt')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{tr('Email', 'E-Mail')}: service@novara-health.example</p>
                <p className="text-sm text-muted-foreground">{tr('Phone', 'Telefon')}: 0800 123 4567</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{tr('Registration', 'Registerangaben')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{tr('Commercial register: HRB 000000, Amtsgericht Pusemuckel', 'Handelsregister: HRB 000000, Amtsgericht Pusemuckel')}</p>
                <p className="text-sm text-muted-foreground">{tr('VAT ID', 'USt-IdNr.')}: DE000000000</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{tr('Disclaimer', 'Haftungsausschluss')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'Despite careful control, we assume no liability for the content of external links.',
                    'Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.'
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
