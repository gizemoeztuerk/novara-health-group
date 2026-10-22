import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, CreditCard, Shield, Stethoscope, CalendarClock } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function MyInsurancePage() {
  const { tr } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('My Health Insurance', 'Meine Krankenversicherung') }
            ]} 
            className="mb-6" 
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Customer overview', 'Kundenübersicht')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('My Health Insurance', 'Meine Krankenversicherung')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'A personalized dashboard: your policy summary, quick self-service actions, and the next steps that matter.',
                  'Ein personalisiertes Dashboard: Ihre Policenübersicht, schnelle Self-Service-Aktionen und die wichtigsten nächsten Schritte.'
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/service/documents">
                    {tr('Documents', 'Dokumente')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/service/claims">{tr('Submit a claim', 'Leistungsantrag stellen')}</Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{tr('Active plan', 'Aktiver Plan')}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">NOVARA SmartCare</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tr('Policy ID', 'Versicherungsschein-Nr.')}: NV-2026-013742
                    </p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: tr('Status', 'Status'), value: tr('Active', 'Aktiv') }, 
                    { label: tr('Member since', 'Mitglied seit'), value: '2022' }, 
                    { label: tr('Digital services', 'Digitale Services'), value: tr('Enabled', 'Aktiviert') }
                  ].map((x) => (
                    <div key={x.label} className="rounded-xl bg-muted/20 p-3">
                      <p className="text-xs text-muted-foreground">{x.label}</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{x.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {tr('Quick actions', 'Schnellzugriff')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tr('The most common tasks one click away.', 'Die häufigsten Aufgaben nur einen Klick entfernt.')}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { 
                icon: <CreditCard className="h-5 w-5" />, 
                title: tr('Submit a claim', 'Antrag stellen'), 
                text: tr('Upload invoices and track status.', 'Rechnungen hochladen und Status verfolgen.'), 
                href: '/service/claims/new' 
              },
              { 
                icon: <FileText className="h-5 w-5" />, 
                title: tr('Find documents', 'Dokumente finden'), 
                text: tr('Search forms, certificates and policies.', 'Formulare, Bescheinigungen und Policen suchen.'), 
                href: '/service/documents' 
              },
              { 
                icon: <Stethoscope className="h-5 w-5" />, 
                title: tr('Find a doctor', 'Arzt finden'), 
                text: tr('Search providers and specializations.', 'Leistungserbringer und Fachrichtungen suchen.'), 
                href: '/service/doctors' 
              },
            ].map((c) => (
              <Card key={c.title} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {c.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                  <Button variant="link" className="mt-4 px-0 text-primary" asChild>
                    <Link to={c.href}>
                      {tr('Open', 'Öffnen')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-soft mt-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {tr('Need help planning an ambulatory surgery?', 'Hilfe bei der Planung einer ambulanten OP?')}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tr(
                      'Use our checklist journey to understand requirements and upload the right documents.',
                      'Nutzen Sie unsere Checkliste, um Anforderungen zu verstehen und die richtigen Dokumente hochzuladen.'
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                  <Button asChild>
                    <Link to="/service/ambulatory-surgery">
                      {tr('Open checklist', 'Checkliste öffnen')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}