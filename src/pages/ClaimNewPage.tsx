import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileUp, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function ClaimNewPage() {
  const { tr } = useI18n();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [policyId, setPolicyId] = useState('NV-2026-013742');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: tr('Demo flow completed', 'Demo-Ablauf abgeschlossen'),
      description: tr(
        'No claim or uploaded document was transmitted or saved on a server.',
        'Es wurde kein Antrag oder hochgeladenes Dokument an einen Server gesendet oder dort gespeichert.'
      ),
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('Claims', 'Leistungsanträge'), href: '/service/claims' },
              { label: tr('Submit a claim', 'Antrag einreichen') },
            ]}
            className="mb-6"
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Submit a claim', 'Antrag einreichen')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Upload an invoice and provide a few details.',
              'Laden Sie eine Rechnung hoch und geben Sie einige Details an.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft lg:col-span-2">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{tr('Full name', 'Vollständiger Name')}</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policy">{tr('Policy ID', 'Versicherungsnummer')}</Label>
                      <Input id="policy" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="amount">{tr('Invoice amount (EUR)', 'Rechnungsbetrag (EUR)')}</Label>
                      <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 128.40" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">{tr('Invoice file', 'Rechnungsdatei')}</Label>
                      <Input id="file" type="file" />
                      <p className="text-xs text-muted-foreground">
                        {tr('PDF/JPG/PNG: max 10MB.', 'PDF/JPG/PNG: max. 10MB.')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{tr('Notes (optional)', 'Anmerkungen (optional)')}</Label>
                    <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={tr('Anything we should know?', 'Gibt es etwas, das wir wissen sollten?')} />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit">
                      <FileUp className="mr-2 h-4 w-4" /> {tr('Submit', 'Einreichen')}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/service/claims/status">
                        {tr('Check status', 'Status prüfen')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="font-semibold text-foreground">{tr('Tip', 'Tipp')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tr(
                    'To reduce back-and-forth, upload readable invoices and include your policy ID. If a document is missing, we will notify you in the status view.',
                    'Um Rückfragen zu vermeiden, laden Sie bitte gut lesbare Rechnungen hoch und geben Sie Ihre Versicherungsnummer an. Falls ein Dokument fehlt, benachrichtigen wir Sie in der Statusübersicht.'
                  )}
                </p>
                <div className="mt-4 rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground">
                  {tr('Average processing time:', 'Durchschnittliche Bearbeitungszeit:')}{' '}
                  <span className="font-medium text-foreground">{tr('2-4 business days', '2-4 Werktage')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}