import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/LanguageContext';
import { ArrowRight, Building2, CheckCircle2, Users, ShieldCheck, BarChart3 } from 'lucide-react';

export default function CorporateHealthInsurancePage() {
  const { tr } = useI18n();

  const bullets = [
    tr('Modular packages: dental, vision, prevention, hospital extras', 'Modulare Bausteine: Zahn, Sehen, Vorsorge, Klinik-Extras'),
    tr('Simple onboarding with payroll support', 'Einfache Einführung mit Unterstützung für die Lohnbuchhaltung'),
    tr('Fast reimbursement for employees', 'Schnelle Erstattung für Mitarbeitende'),
    tr('HR reporting and one service hotline', 'HR-Reports und eine zentrale Service-Hotline'),
  ];

  const valueProps = [
    {
      icon: <Users className="h-5 w-5" />,
      title: tr('Attract & retain talent', 'Talente gewinnen & binden'),
      text: tr('Make benefits tangible with clear modules and digital service.', 'Machen Sie die Vorteile mit klaren Modulen und digitalem Service greifbar.'),
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: tr('Low admin effort', 'Wenig Verwaltungsaufwand'),
      text: tr('Standardised processes and structured request forms.', 'Standardisierte Prozesse und strukturierte Antragswege.'),
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: tr('Measurable impact', 'Messbarer Effekt'),
      text: tr('Optional HR reporting and employee feedback loops.', 'Optionales HR-Reporting und Feedback-Loop mit Mitarbeitenden.'),
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { label: tr('Company Health Insurance', 'Betriebliche Krankenversicherung') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Employer-sponsored benefits', 'Arbeitgeberfinanzierte Benefits')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Company Health Insurance (bKV)', 'Betriebliche Krankenversicherung (bKV)')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Flexible modules for companies: strengthen employer branding and give employees fast, modern support.',
                  'Flexible Bausteine für Unternehmen: Employer Branding stärken und Mitarbeitenden schnell, modern helfen.'
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/help">
                    {tr('Request consultation', 'Beratung anfordern')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/service/forms">{tr('Send inquiry via form', 'Anfrage per Formular')}</Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{tr('For companies', 'Für Unternehmen')}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">NOVARA bKV</p>
                    <p className="mt-1 text-sm text-muted-foreground">{tr('From €9.90 per employee', 'Ab 9,90 € pro Mitarbeitenden')}</p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {b}
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
          <h2 className="font-display text-2xl font-bold text-foreground">{tr('Why companies choose bKV', 'Warum Unternehmen bKV wählen')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tr('Three simple levers for impact without complexity.', 'Drei Hebel für Wirkung ohne Komplexität.')}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {valueProps.map((v) => (
              <Card key={v.title} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-soft mt-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{tr('Next step: a short needs check', 'Nächster Schritt: kurzer Bedarfscheck')}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tr(
                      'Tell us company size and goals. We propose a modular package and rollout plan.',
                      'Unternehmensgröße und Ziele angeben. Wir schlagen Bausteine und Rollout-Plan vor.'
                    )}
                  </p>
                </div>
                <Button asChild>
                  <Link to="/service/forms">{tr('Open inquiry form', 'Anfrageformular öffnen')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
