import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/LanguageContext';
import { CheckCircle2, FileText, HeartPulse, Shield, UserRound, XCircle } from 'lucide-react';

export default function PersonalPage() {
  const { tr } = useI18n();

  const [profile, setProfile] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '+49 151 0000000',
    address: 'Musterstraße 12, 28195 Bremen',
  });

  const [health, setHealth] = useState({
    allergies: 'Penicillin',
    chronic: tr('None', 'Keine'),
    notes: tr('Prefer appointments in the morning.', 'Termine vorzugsweise morgens.'),
  });

  const treatmentRecommendations = useMemo(
    () => [
      {
        id: 't1',
        title: tr('Preventive check-up', 'Vorsorgeuntersuchung'),
        text: tr('Book your annual preventive screening. Covered in most plans.', 'Buchen Sie Ihre jährliche Vorsorge. In den meisten Tarifen abgedeckt.'),
      },
      {
        id: 't2',
        title: tr('Dental cleaning', 'Professionelle Zahnreinigung'),
        text: tr('A cleaning every 6-12 months supports long-term dental health.', 'Eine Reinigung alle 6-12 Monate unterstützt die Zahngesundheit langfristig.'),
      },
      {
        id: 't3',
        title: tr('Stress & sleep coaching', 'Stress- & Schlaf-Coaching'),
        text: tr('Digital coaching modules with short daily exercises.', 'Digitale Coaching-Module mit kurzen täglichen Übungen.'),
      },
    ],
    [tr],
  );

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('Personal Area', 'Persönlicher Bereich') },
            ]}
            className="mb-6"
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Self-service profile', 'Self-Service Profil')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Personal Area', 'Persönlicher Bereich')}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {tr(
                  'Manage your personal data, health preferences, insurances, and recommendations in one place.',
                  'Verwalten Sie persönliche Daten, Gesundheitsangaben, Versicherungen und Empfehlungen an einem Ort.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-3">
          {/* Personal information */}
          <Card className="shadow-soft lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="h-5 w-5 text-primary" />
                {tr('Personal information', 'Persönliche Daten')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{tr('First name', 'Vorname')}</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{tr('Last name', 'Nachname')}</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{tr('Email', 'E-Mail')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{tr('Phone', 'Telefon')}</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">{tr('Address', 'Adresse')}</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => undefined}>{tr('Save changes', 'Änderungen speichern')}</Button>
                <Button variant="outline" asChild>
                  <a href="/service/forms">{tr('Open forms & requests', 'Formulare & Anträge öffnen')}</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* My insurances */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {tr('My insurances', 'Meine Versicherungen')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              <div className="rounded-xl bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground">{tr('Primary plan', 'Haupttarif')}</p>
                <p className="mt-1 font-semibold text-foreground">NOVARA SmartCare</p>
                <p className="mt-1 text-sm text-muted-foreground">NV-2026-013742</p>
              </div>
              {[tr('Dental add-on', 'Zahnzusatz'), tr('Travel cover', 'Auslandsreise-Schutz')].map((x) => (
                <div key={x} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="font-medium text-foreground">{x}</p>
                    <p className="text-xs text-muted-foreground">{tr('Active', 'Aktiv')}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <a href="/service/my-insurance">{tr('Open insurance overview', 'Übersicht öffnen')}</a>
              </Button>
            </CardContent>
          </Card>

          {/* Health information */}
          <Card className="shadow-soft lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                {tr('Health information', 'Gesundheitsangaben')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="allergies">{tr('Allergies', 'Allergien')}</Label>
                  <Input
                    id="allergies"
                    value={health.allergies}
                    onChange={(e) => setHealth((h) => ({ ...h, allergies: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chronic">{tr('Chronic conditions', 'Chronische Erkrankungen')}</Label>
                  <Input
                    id="chronic"
                    value={health.chronic}
                    onChange={(e) => setHealth((h) => ({ ...h, chronic: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">{tr('Notes & preferences', 'Notizen & Präferenzen')}</Label>
                  <Textarea
                    id="notes"
                    value={health.notes}
                    onChange={(e) => setHealth((h) => ({ ...h, notes: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button onClick={() => undefined}>{tr('Save health info', 'Speichern')}</Button>
                <Button variant="outline" asChild>
                  <a href="/help">{tr('Ask a question', 'Frage stellen')}</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Treatment recommendations (explicitly kept) */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {tr('Treatment recommendations', 'Behandlungsempfehlungen')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              {treatmentRecommendations.map((r) => (
                <div key={r.id} className="rounded-xl border p-4">
                  <p className="font-medium text-foreground">{r.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                {tr(
                  'These recommendations are informational and can be reviewed with our advisory team.',
                  'Diese Empfehlungen sind informativ und können mit unserem Beratungsteam besprochen werden.'
                )}
              </p>
            </CardContent>
          </Card>

          {/* Cancellation request */}
          <Card className="shadow-soft lg:col-span-3 border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                {tr('Cancel insurance (request)', 'Kündigung (Anfrage)')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-6 md:grid-cols-3 md:items-start">
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    {tr(
                      'If you want to cancel, send a request here. Our team will review legal deadlines and confirm next steps.',
                      'Wenn Sie kündigen möchten, stellen Sie hier eine Anfrage. Wir prüfen Fristen und bestätigen die nächsten Schritte.'
                    )}
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="policyId">{tr('Policy ID', 'Versicherungsschein-Nr.')}</Label>
                      <Input id="policyId" defaultValue="NV-2026-013742" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">{tr('Reason', 'Grund')}</Label>
                      <Input id="reason" placeholder={tr('e.g., moving abroad', 'z.B. Auslandsaufenthalt')} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="details">{tr('Details (optional)', 'Details (optional)')}</Label>
                      <Textarea id="details" rows={4} placeholder={tr('Anything we should know…', 'Wichtige Hinweise…')} />
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-muted/20 p-5">
                  <p className="text-sm font-medium text-foreground">{tr('What happens next', 'Wie geht es weiter?')}</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• {tr('We confirm deadlines and your last possible cancellation date.', 'Wir prüfen Fristen und das nächstmögliche Kündigungsdatum.')}</li>
                    <li>• {tr('A real service would send a written confirmation; this prototype does not.', 'Ein echter Service würde eine schriftliche Bestätigung senden; diese Demo tut das nicht.')}</li>
                    <li>• {tr('We offer alternatives (downgrade, pause, advisory).', 'Wir bieten Alternativen (Tarifwechsel, Pause, Beratung).')}</li>
                  </ul>
                  <Button className="mt-5 w-full" variant="destructive" onClick={() => undefined}>
                    {tr('Send cancellation request', 'Kündigung anfragen')}
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
