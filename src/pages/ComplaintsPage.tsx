import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/LanguageContext';
import { CheckCircle2, ClipboardCheck, Clock, Eye, FileWarning, MessageSquareQuote } from 'lucide-react';

function makeRef(prefix = 'CMP') {
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${prefix}-${y}${m}${d}-${rnd}`;
}

export default function ComplaintsPage() {
  const { tr } = useI18n();
  const steps = useMemo(
    () => [
      {
        icon: <FileWarning className="h-5 w-5" />,
        title: tr('1) Submit your complaint', '1) Beschwerde einreichen'),
        text: tr('Use the form below. Attach details, dates and documents if available.', 'Nutzen Sie das Formular. Fügen Sie Details, Daten und ggf. Dokumente hinzu.'),
      },
      {
        icon: <Eye className="h-5 w-5" />,
        title: tr('2) We review transparently', '2) Transparente Prüfung'),
        text: tr('We classify your case, check policy rules, and involve the responsible team.', 'Wir klassifizieren den Fall, prüfen Regeln und binden das zuständige Team ein.'),
      },
      {
        icon: <Clock className="h-5 w-5" />,
        title: tr('3) Response with timeline', '3) Antwort mit Zeitplan'),
        text: tr('You receive a reference number and clear next steps (and expected dates).', 'Sie erhalten eine Referenznummer und klare nächste Schritte (inkl. erwarteter Daten).'),
      },
      {
        icon: <ClipboardCheck className="h-5 w-5" />,
        title: tr('4) Improvement & feedback loop', '4) Verbesserung & Feedback-Loop'),
        text: tr('We document outcomes, learn from criticism and update processes.', 'Wir dokumentieren Ergebnisse, lernen aus Kritik und verbessern Prozesse.'),
      },
    ],
    [tr],
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const [trackingRef, setTrackingRef] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: tr('Help & Contact', 'Hilfe & Kontakt'), href: '/help' },
              { label: tr('Complaints & Quality', 'Beschwerden & Qualität') },
            ]}
            className="mb-6"
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Transparent complaint handling', 'Transparente Beschwerdebearbeitung')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Complaints & Quality Management', 'Beschwerde- & Qualitätsmanagement')}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {tr(
                  'A clear and accountable process to review criticism, respond effectively, and improve our services.',
                  'Ein klarer, nachvollziehbarer Prozess, um Kritik zu prüfen, wirksam zu reagieren und unseren Service zu verbessern.'
                )}
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <MessageSquareQuote className="mr-2 h-4 w-4" />
              {tr('Submit complaint', 'Beschwerde einreichen')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-3">
          <Card className="shadow-soft lg:col-span-2">
            <CardHeader>
              <CardTitle>{tr('How it works', 'So funktioniert es')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {steps.map((s) => (
                  <div key={s.title} className="rounded-xl border p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {s.icon}
                    </div>
                    <p className="font-semibold text-foreground">{s.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-muted/20 p-5">
                <p className="font-medium text-foreground">{tr('Response times (SLA)', 'Antwortzeiten (SLA)')}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• {tr('Confirmation within 1 business day', 'Eingangsbestätigung innerhalb von 1 Werktag')}</li>
                  <li>• {tr('Initial assessment within 3 business days', 'Ersteinschätzung innerhalb von 3 Werktagen')}</li>
                  <li>• {tr('Final response usually within 10 business days', 'Abschlussantwort i.d.R. innerhalb von 10 Werktagen')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{tr('Track your complaint', 'Beschwerde nachverfolgen')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">
                {tr('Enter your reference number to see the current status.', 'Geben Sie Ihre Referenznummer ein, um den Status zu sehen.')}
              </p>
              <div className="mt-4 space-y-2">
                <Label htmlFor="ref">{tr('Reference number', 'Referenznummer')}</Label>
                <Input id="ref" value={trackingRef} onChange={(e) => setTrackingRef(e.target.value)} placeholder="CMP-YYYYMMDD-XXXXX" />
              </div>
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={() => {
                  if (!trackingRef.trim()) {
                    setTrackingResult(tr('Please enter a reference number.', 'Bitte Referenznummer eingeben.'));
                    return;
                  }
                  setTrackingResult(
                    tr(
                      'No real status exists in this demo; tracking is simulated.',
                      'In dieser Demo gibt es keinen echten Vorgangsstatus; die Nachverfolgung ist simuliert.'
                    )
                  );
                }}
              >
                {tr('Check status', 'Status prüfen')}
              </Button>
              {trackingResult ? (
                <div className="mt-4 rounded-xl bg-muted/20 p-4 text-sm text-muted-foreground">{trackingResult}</div>
              ) : null}

              {reference ? (
                <div className="mt-6 rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">{tr('Your latest reference', 'Ihre letzte Referenz')}</p>
                  <p className="mt-1 font-semibold text-foreground">{reference}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="shadow-soft lg:col-span-3">
            <CardHeader>
              <CardTitle>{tr('What we improve', 'Was wir verbessern')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: tr('Clear communication', 'Klare Kommunikation'),
                    text: tr('Less jargon, more concrete dates and next steps.', 'Weniger Fachsprache, mehr konkrete Daten und nächste Schritte.'),
                  },
                  {
                    title: tr('Process transparency', 'Prozess-Transparenz'),
                    text: tr('Reference numbers, status updates and accountability.', 'Referenznummern, Statusupdates und Verantwortlichkeiten.'),
                  },
                  {
                    title: tr('Faster resolution', 'Schnellere Klärung'),
                    text: tr('Structured intake forms and better routing to experts.', 'Strukturierte Formulare und bessere Weiterleitung an Experten.'),
                  },
                ].map((x) => (
                  <div key={x.title} className="rounded-xl bg-muted/20 p-5">
                    <p className="font-semibold text-foreground">{x.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {tr('Continuous monitoring', 'Kontinuierliches Monitoring')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setReference(null);
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{tr('Submit a complaint', 'Beschwerde einreichen')}</DialogTitle>
            <DialogDescription>
              {tr(
                'Tell us what happened. We use your input to respond and improve.',
                'Schildern Sie, was passiert ist. Wir nutzen Ihr Feedback für Antwort und Verbesserung.'
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{tr('Name', 'Name')}</Label>
                <Input placeholder={tr('Your full name', 'Vor- und Nachname')} />
              </div>
              <div className="space-y-2">
                <Label>{tr('Email', 'E-Mail')}</Label>
                <Input type="email" placeholder="name@example.com" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{tr('Topic', 'Thema')}</Label>
                <Select defaultValue="service">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">{tr('Customer service', 'Kundenservice')}</SelectItem>
                    <SelectItem value="claims">{tr('Claims & reimbursements', 'Leistung & Erstattung')}</SelectItem>
                    <SelectItem value="billing">{tr('Billing', 'Abrechnung')}</SelectItem>
                    <SelectItem value="digital">{tr('App / portal', 'App / Portal')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{tr('Policy ID (optional)', 'Versicherungsschein-Nr. (optional)')}</Label>
                <Input placeholder="NV-2026-013742" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{tr('What happened?', 'Was ist passiert?')}</Label>
              <Textarea rows={6} placeholder={tr('Include dates, names, and desired outcome…', 'Bitte Daten, Namen und gewünschtes Ergebnis angeben…')} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {tr('Cancel', 'Abbrechen')}
              </Button>
              <Button
                onClick={() => {
                  const ref = makeRef();
                  setReference(ref);
                  setTrackingRef(ref);
                  setTrackingResult(
                    tr(
                      'Demo reference created locally: no complaint was submitted.',
                      'Demo-Referenz lokal erstellt: es wurde keine Beschwerde übermittelt.'
                    )
                  );
                  setDialogOpen(false);
                }}
              >
                {tr('Submit', 'Absenden')}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              {tr(
                'Prototype: No real submission is performed. In production, we would store and audit the case securely and provide binding communication.',
                'Prototyp: Es erfolgt keine echte Übermittlung. In der Produktion würden wir den Fall sicher speichern, auditieren und verbindlich kommunizieren.'
              )}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
