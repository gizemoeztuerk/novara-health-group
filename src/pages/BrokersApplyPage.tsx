import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, BadgeCheck, Building2, Mail, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function BrokersApplyPage() {
  const { tr } = useI18n();
  const { toast } = useToast();
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('north');
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: tr('Demo request completed', 'Demo-Anfrage abgeschlossen'),
      description: tr(
        'This is a frontend-only demonstration. No application was sent and no team will contact you.',
        'Dies ist eine reine Frontend-Demo. Es wurde kein Antrag gesendet und es erfolgt keine Kontaktaufnahme.'
      ),
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('For Brokers', 'Für Makler'), href: '/brokers' }, 
              { label: tr('Become a partner', 'Partner werden') }
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Become a NOVARA partner', 'NOVARA Partner werden')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Get access to product argumentation, training materials and a dedicated broker support team.',
                  'Erhalten Sie Zugriff auf Produktargumentationen, Schulungsunterlagen und ein dediziertes Makler-Support-Team.'
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/brokers">
                    {tr('Back to broker hub', 'Zurück zum Makler-Hub')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help">{tr('Contact support', 'Support kontaktieren')}</Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tr('What you get', 'Vorteile')}</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• {tr('Training & webinar recordings', 'Schulungen & Webinar-Aufzeichnungen')}</li>
                      <li>• {tr('Downloadable sales decks and forms', 'Verkaufsunterlagen und Formulare zum Download')}</li>
                      <li>• {tr('Fast broker support and feedback loop', 'Schneller Makler-Support und Feedback-Schleife')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                      <Label htmlFor="company">{tr('Company', 'Firma')}</Label>
                      <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Broker GmbH" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">{tr('Contact person', 'Ansprechpartner')}</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Max Mustermann" required />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">{tr('E-mail', 'E-Mail')}</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="max@broker.de" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{tr('Phone', 'Telefon')}</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 …" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{tr('Primary region', 'Primäre Region')}</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder={tr('Choose', 'Wählen')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">{tr('North', 'Nord')}</SelectItem>
                        <SelectItem value="east">{tr('East', 'Ost')}</SelectItem>
                        <SelectItem value="south">{tr('South', 'Süd')}</SelectItem>
                        <SelectItem value="west">{tr('West', 'West')}</SelectItem>
                        <SelectItem value="nationwide">{tr('Nationwide', 'Bundesweit')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {tr('Used for assigning the right partner manager.', 'Wird zur Zuweisung des richtigen Partnermanagers verwendet.')}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/10 p-4">
                    <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                    <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      {tr(
                        'I agree that NOVARA may contact me and store this request for partner onboarding.',
                        'Ich stimme zu, dass NOVARA mich kontaktieren und diese Anfrage zur Partner-Onboarding speichern darf.'
                      )}
                    </Label>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={!consent}>
                      {tr('Request onboarding', 'Onboarding anfragen')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/service/documents">{tr('View documents', 'Unterlagen ansehen')}</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-foreground">{tr('Broker team', 'Makler-Team')}</h2>
                <div className="rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> {tr('Partner onboarding', 'Partner Onboarding')}</p>
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> brokers@novara-health.example</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +49 30 1234 5678</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tr('Typical response time:', 'Typische Antwortzeit:')}{' '}
                  <span className="font-medium text-foreground">{tr('1 business day', '1 Werktag')}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}