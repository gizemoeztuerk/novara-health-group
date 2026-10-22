import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/LanguageContext';
import { CheckCircle2, ArrowRight, Shield, Hospital, Stethoscope, HeartPulse } from 'lucide-react';

export default function FullInsurancePage() {
  const { tr } = useI18n();

  const highlights = [
    {
      icon: <Stethoscope className="h-5 w-5" />,
      title: tr('Choice of doctors', 'Freie Arztwahl'),
      text: tr('Prefer private specialists and shorter waiting times.', 'Private Fachärzte und kürzere Wartezeiten.'),
    },
    {
      icon: <Hospital className="h-5 w-5" />,
      title: tr('Hospital comfort', 'Krankenhaus-Komfort'),
      text: tr('Room and physician options depending on your tariff.', 'Zimmer- und Arztwahl je nach Tarif.'),
    },
    {
      icon: <HeartPulse className="h-5 w-5" />,
      title: tr('Prevention & mental health', 'Vorsorge & mentale Gesundheit'),
      text: tr('Modern benefits with transparent limits.', 'Moderne Leistungen mit transparenten Grenzen.'),
    },
  ];

  const features = [
    tr('Digital claims & document center', 'Digitale Einreichung & Dokumentencenter'),
    tr('Transparent benefit catalogue and limits', 'Transparenter Leistungskatalog und Limits'),
    tr('Optional family modules', 'Optionale Familienbausteine'),
    tr('Travel coverage add-ons available', 'Auslandsreise-Bausteine verfügbar'),
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { label: tr('Full Insurance', 'Vollversicherung') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Primary health coverage', 'Private Krankenversicherung')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Full Insurance', 'Vollversicherung')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Comprehensive health coverage with clear options: choose the benefits that match your life and budget.',
                  'Umfassende Absicherung mit klaren Optionen: Wählen Sie Leistungen passend zu Leben und Budget.'
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/service/forms">
                    {tr('Request a quote', 'Angebot anfragen')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help">{tr('Talk to an advisor', 'Beratung anfordern')}</Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{tr('Example tariff', 'Beispiel-Tarif')}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">NOVARA FullCare</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tr('Individual pricing after risk assessment', 'Individuelle Beiträge nach Risikoprüfung')}
                    </p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground">{tr('Highlights', 'Highlights')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tr('What customers typically choose in a full insurance plan.', 'Was Kundinnen und Kunden häufig wählen.')}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <Card key={h.title} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {h.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-soft mt-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{tr('Ready for a tailored quote?', 'Bereit für ein individuelles Angebot?')}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tr(
                      'Use our structured request form. We come back with transparent options and next steps.',
                      'Nutzen Sie das strukturierte Anfrageformular. Wir melden uns mit transparenten Optionen und nächsten Schritten.'
                    )}
                  </p>
                </div>
                <Button asChild>
                  <Link to="/service/forms">{tr('Open quote request', 'Anfrage öffnen')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
