import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

const items = [
  { id: 'CLM-10291', date: '2026-01-14', amount: '128.40', status: 'In review' as const },
  { id: 'CLM-10188', date: '2026-01-06', amount: '56.00', status: 'Paid' as const },
  { id: 'CLM-10077', date: '2025-12-20', amount: '89.90', status: 'Missing info' as const },
];

export default function ClaimStatusPage() {
  const { tr, lang } = useI18n();

  function statusBadge(status: (typeof items)[number]['status']) {
    if (status === 'Paid') {
      return <Badge className="bg-success text-success-foreground">{tr('Paid', 'Bezahlt')}</Badge>;
    }
    if (status === 'Missing info') {
      return <Badge variant="destructive">{tr('Missing info', 'Info fehlt')}</Badge>;
    }
    return <Badge variant="secondary">{tr('In review', 'In Prüfung')}</Badge>;
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Claims', 'Leistungsanträge'), href: '/service/claims' }, 
              { label: tr('Claim status', 'Bearbeitungsstatus') }
            ]} 
            className="mb-6" 
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Claim status', 'Bearbeitungsstatus')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr('Browse fictional example claims and their demonstration statuses.', 'Beispielhafte Leistungsfälle und fiktive Bearbeitungsstände ansehen.')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((c) => (
              <Card key={c.id} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {statusBadge(c.status)}
                        <span className="text-xs text-muted-foreground">
                          {new Date(c.date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US')}
                        </span>
                      </div>
                      <h2 className="mt-3 font-semibold text-foreground">{c.id}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tr('Invoice amount:', 'Rechnungsbetrag:')} €{c.amount}
                      </p>
                      {c.status === 'Missing info' && (
                        <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-muted-foreground">
                          {tr(
                            'Please add missing invoice details. In the real portal, you would upload an updated file.',
                            'Bitte ergänzen Sie fehlende Rechnungsdetails. Im echten Portal würden Sie hier eine aktualisierte Datei hochladen.'
                          )}
                        </div>
                      )}
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/service/claims/new">
                {tr('Submit new claim', 'Neuen Antrag einreichen')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/service/claims/history">
                {tr('View payment history', 'Zahlungshistorie anzeigen')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}