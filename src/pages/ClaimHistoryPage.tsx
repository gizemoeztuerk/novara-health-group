import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/LanguageContext';

const rows = [
  { id: 'CLM-10188', date: '2026-01-06', amount: '56.00', payout: '56.00', status: 'Paid' },
  { id: 'CLM-10012', date: '2025-11-30', amount: '22.50', payout: '22.50', status: 'Paid' },
  { id: 'CLM-09871', date: '2025-10-08', amount: '140.00', payout: '118.00', status: 'Partially paid' },
];

export default function ClaimHistoryPage() {
  const { tr, lang } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Claims', 'Leistungsanträge'), href: '/service/claims' }, 
              { label: tr('Payment history', 'Zahlungshistorie') }
            ]} 
            className="mb-6" 
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Payment history', 'Zahlungshistorie')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr('A structured overview of reimbursements.', 'Eine strukturierte Übersicht Ihrer Erstattungen.')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tr('Claim', 'Antrag')}</TableHead>
                    <TableHead>{tr('Date', 'Datum')}</TableHead>
                    <TableHead className="text-right">{tr('Invoice', 'Rechnung')}</TableHead>
                    <TableHead className="text-right">{tr('Payout', 'Auszahlung')}</TableHead>
                    <TableHead>{tr('Status', 'Status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell>
                        {new Date(r.date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US')}
                      </TableCell>
                      <TableCell className="text-right">€{r.amount}</TableCell>
                      <TableCell className="text-right">€{r.payout}</TableCell>
                      <TableCell>
                        {r.status === 'Paid' ? (
                          <Badge className="bg-success text-success-foreground">
                            {tr('Paid', 'Bezahlt')}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            {tr(r.status, 'Teilweise bezahlt')}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}