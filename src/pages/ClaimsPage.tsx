import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileUp, ClipboardList, ReceiptText } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function ClaimsPage() {
  const { tr } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Claims', 'Leistungsanträge') }
            ]} 
            className="mb-6" 
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Claims', 'Leistungsanträge')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Submit invoices digitally, track the status, and review previous reimbursements.',
              'Rechnungen digital einreichen, Status verfolgen und bisherige Erstattungen einsehen.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <FileUp className="h-5 w-5" />,
                title: tr('Submit a claim', 'Antrag einreichen'),
                text: tr(
                  'Upload invoices, add details, and finish in minutes.',
                  'Rechnungen hochladen, Details hinzufügen ve in wenigen Minuten fertig sein.'
                ),
                href: '/service/claims/new',
              },
              {
                icon: <ClipboardList className="h-5 w-5" />,
                title: tr('Claim status', 'Bearbeitungsstatus'),
                text: tr(
                  'Check processing state and missing information.',
                  'Prüfen Sie den Bearbeitungsstand und fehlende Informationen.'
                ),
                href: '/service/claims/status',
              },
              {
                icon: <ReceiptText className="h-5 w-5" />,
                title: tr('Payment history', 'Zahlungshistorie'),
                text: tr(
                  'Review reimbursements and export records.',
                  'Erstattungen überprüfen und Belege exportieren.'
                ),
                href: '/service/claims/history',
              },
            ].map((c) => (
              <Card key={c.title} className="card-hover shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {c.icon}
                  </div>
                  <h2 className="font-semibold text-foreground">{c.title}</h2>
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
        </div>
      </section>
    </div>
  );
}