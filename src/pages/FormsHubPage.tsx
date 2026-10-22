import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/LanguageContext';
import { ClipboardList, FileText, Search, Send, PhoneCall, Building2, ShieldCheck, Hospital, BellRing, MessageCircleWarning } from 'lucide-react';

type FormItem = {
  id: string;
  category: 'certificates' | 'contact' | 'changes' | 'advice' | 'callback' | 'feedback' | 'jobs' | 'medical';
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
};

function FormRequestDialog({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: FormItem | null;
}) {
  const { tr, lang } = useI18n();
  const [salutation, setSalutation] = useState<'Sie' | 'Du'>('Sie');

  if (!item) return null;

  const title = lang === 'de' ? item.titleDe : item.title;
  const description = lang === 'de' ? item.descriptionDe : item.description;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{tr('First name', 'Vorname')}</Label>
              <Input placeholder={tr('e.g., Jane', 'z.B. Jane')} />
            </div>
            <div className="space-y-2">
              <Label>{tr('Last name', 'Nachname')}</Label>
              <Input placeholder={tr('e.g., Doe', 'z.B. Doe')} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{tr('Email', 'E-Mail')}</Label>
              <Input type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{tr('Policy ID (optional)', 'Versicherungsschein-Nr. (optional)')}</Label>
              <Input placeholder="NV-2026-013742" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{tr('Addressing', 'Ansprache')}</Label>
              <Select value={salutation} onValueChange={(v) => { if (v === "Sie" || v === "Du") setSalutation(v); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sie">{tr('Formal (Sie)', 'Formell (Sie)')}</SelectItem>
                  <SelectItem value="Du">{tr('Informal (Du)', 'Locker (Du)')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {item.category === 'callback' ? (
              <div className="space-y-2">
                <Label>{tr('Preferred time window', 'Bevorzugtes Zeitfenster')}</Label>
                <Select defaultValue="morning">
                  <SelectTrigger>
                    <SelectValue placeholder={tr('Select', 'Auswählen')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">{tr('Morning (9-12)', 'Vormittag (9-12)')}</SelectItem>
                    <SelectItem value="midday">{tr('Midday (12-15)', 'Mittag (12-15)')}</SelectItem>
                    <SelectItem value="afternoon">{tr('Afternoon (15-18)', 'Nachmittag (15-18)')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>{tr('Phone (optional)', 'Telefon (optional)')}</Label>
                <Input placeholder="+49 ..." />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>{tr('Message / details', 'Nachricht / Details')}</Label>
            <Textarea rows={5} placeholder={tr('Describe your request…', 'Beschreiben Sie Ihr Anliegen…')} />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {tr('Cancel', 'Abbrechen')}
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              <Send className="mr-2 h-4 w-4" />
              {tr('Send request', 'Anfrage senden')}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {tr(
              'This is a prototype form. In production, the request would be transmitted securely and you would receive an automatic confirmation.',
              'Dies ist ein Prototyp. In der Produktion wird die Anfrage sicher übertragen und Sie erhalten automatisch eine Empfangsbestätigung.'
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FormsHubPage() {
  const { tr, lang } = useI18n();

  const forms: FormItem[] = useMemo(
    () => [
      {
        id: 'cert-member',
        category: 'certificates',
        title: 'Request membership certificate',
        titleDe: 'Mitgliedsbescheinigung anfordern',
        description: 'For schools, authorities, or personal records.',
        descriptionDe: 'Für Schule, Behörden oder die eigenen Unterlagen.',
      },
      {
        id: 'cert-employer',
        category: 'certificates',
        title: 'Contribution certificate for employer / tax office',
        titleDe: 'Beitragsbescheinigung für Arbeitgeber oder Finanzamt',
        description: 'Proof of contributions for payroll or tax filing.',
        descriptionDe: 'Nachweis der Beiträge für Lohnabrechnung oder Steuer.',
      },
      {
        id: 'cert-aid',
        category: 'certificates',
        title: 'Certificates for Beihilfe office',
        titleDe: 'Bescheinigungen für die Beihilfestelle',
        description: 'Documents required for Beihilfe reimbursement processes.',
        descriptionDe: 'Unterlagen für Beihilfe-Erstattungsverfahren.',
      },
      {
        id: 'cert-travel',
        category: 'certificates',
        title: 'Travel cover certificate (NOVARA Health Group cover abroad)',
        titleDe: 'Bescheinigung über Auslandsschutz (NOVARA Health Group Schutz)',
        description: 'Proof of coverage for international travel.',
        descriptionDe: 'Nachweis der Absicherung auf Auslandsreisen.',
      },
      {
        id: 'general-message',
        category: 'contact',
        title: 'General message',
        titleDe: 'Allgemeine Mitteilung',
        description: 'Send a general request or question to our service team.',
        descriptionDe: 'Allgemeines Anliegen oder Frage an den Service senden.',
      },
      {
        id: 'contact-form',
        category: 'contact',
        title: 'General contact form',
        titleDe: 'Allgemeines Kontaktformular',
        description: 'Structured contact form with routing to the right team.',
        descriptionDe: 'Strukturiertes Kontaktformular mit Weiterleitung an das richtige Team.',
      },
      {
        id: 'change-data',
        category: 'changes',
        title: 'Change personal data',
        titleDe: 'Persönliche Daten ändern',
        description: 'In the future available directly in app/portal. Use Personal Area now.',
        descriptionDe: 'Perspektivisch in App/Portal. Aktuell über den Persönlichen Bereich.',
      },
      {
        id: 'quote-full',
        category: 'advice',
        title: 'Request a quote (Full Insurance)',
        titleDe: 'Angebot anfragen (Vollversicherung)',
        description: 'Get a tailored quote based on your needs.',
        descriptionDe: 'Individuelles Angebot basierend auf Ihren Bedürfnissen erhalten.',
      },
      {
        id: 'advisory',
        category: 'advice',
        title: 'Advisory request (specific consultation)',
        titleDe: 'Beratungsantrag (konkreter Beratungswunsch)',
        description: 'Tell us your topic and we connect you with the right expert.',
        descriptionDe: 'Thema angeben, wir verbinden Sie mit dem passenden Experten.',
      },
      {
        id: 'callback',
        category: 'callback',
        title: 'Request a callback (time windows)',
        titleDe: 'Rückruf anfordern (mit Terminfenstern)',
        description: 'Choose a time window and reason.',
        descriptionDe: 'Zeitfenster und Grund auswählen.',
      },
      {
        id: 'press-optin',
        category: 'contact',
        title: 'Sign up for press distribution list (opt-in)',
        titleDe: 'Anmeldung zum Presseverteiler (Opt-in)',
        description: 'Receive NOVARA press releases and updates.',
        descriptionDe: 'NOVARA Pressemeldungen und Updates erhalten.',
      },
      {
        id: 'feedback-complaint',
        category: 'feedback',
        title: 'Feedback / complaint',
        titleDe: 'Feedback- bzw. Beschwerdeformular',
        description: 'Share feedback or file a complaint.',
        descriptionDe: 'Feedback geben oder Beschwerde einreichen.',
      },
      {
        id: 'job-alert',
        category: 'jobs',
        title: 'Job alert subscription',
        titleDe: 'Job-Alert',
        description: 'Get notified when new jobs match your interests.',
        descriptionDe: 'Benachrichtigung bei passenden neuen Stellen.',
      },
      {
        id: 'apply-form',
        category: 'jobs',
        title: 'Demo application form',
        titleDe: 'Demo-Bewerbungsformular',
        description: 'Explore a demo application form; no email is sent.',
        descriptionDe: 'Demo-Bewerbungsformular ansehen; es wird keine E-Mail versendet.',
      },
      {
        id: 'hospital-stay',
        category: 'medical',
        title: 'Report a hospital stay',
        titleDe: 'Krankenhausaufenthalt melden',
        description: 'Let us know about admissions to enable fast coordination.',
        descriptionDe: 'Aufenthalt melden, damit wir schnell koordinieren können.',
      },
    ],
    [],
  );

  const categories = useMemo(
    () => [
      { id: 'all', label: tr('All', 'Alle'), icon: <ClipboardList className="h-4 w-4" /> },
      { id: 'certificates', label: tr('Certificates', 'Bescheinigungen'), icon: <FileText className="h-4 w-4" /> },
      { id: 'contact', label: tr('Contact', 'Kontakt'), icon: <Building2 className="h-4 w-4" /> },
      { id: 'advice', label: tr('Advice', 'Beratung'), icon: <ShieldCheck className="h-4 w-4" /> },
      { id: 'callback', label: tr('Callback', 'Rückruf'), icon: <PhoneCall className="h-4 w-4" /> },
      { id: 'feedback', label: tr('Feedback', 'Feedback'), icon: <MessageCircleWarning className="h-4 w-4" /> },
      { id: 'jobs', label: tr('Jobs', 'Jobs'), icon: <BellRing className="h-4 w-4" /> },
      { id: 'medical', label: tr('Medical', 'Medizinisch'), icon: <Hospital className="h-4 w-4" /> },
      { id: 'changes', label: tr('Personal', 'Persönlich'), icon: <FileText className="h-4 w-4" /> },
    ],
    [tr],
  );

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<FormItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forms.filter((f) => {
      const inTab = tab === 'all' || f.category === (tab);
      const title = (lang === 'de' ? f.titleDe : f.title).toLowerCase();
      const desc = (lang === 'de' ? f.descriptionDe : f.description).toLowerCase();
      const inQuery = !q || title.includes(q) || desc.includes(q);
      return inTab && inQuery;
    });
  }, [forms, query, tab, lang]);

  return (
    <div>
      <section className="bg-accent/50 border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('Forms & Requests', 'Formulare & Anträge') },
            ]}
            className="mb-6"
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="w-fit">
                {tr('Easy access', 'Schneller Zugriff')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Forms & Requests', 'Formulare & Anträge')}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {tr(
                  'Request certificates, submit messages, book advisory calls, or report medical events.',
                  'Bescheinigungen anfordern, Kontakt aufnehmen, Beratung buchen oder medizinische Ereignisse melden.'
                )}
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="/help/complaints">{tr('Complaints & quality', 'Beschwerden & Qualität')}</a>
            </Button>
          </div>

          <div className="mt-8 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              placeholder={tr('Search forms...', 'Formulare suchen...')}
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex flex-wrap justify-start">
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="gap-2">
                  {c.icon}
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={tab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((f) => (
                  <Card key={f.id} className="shadow-soft card-hover">
                    <CardHeader className="pb-0">
                      <CardTitle className="text-base">
                        {lang === 'de' ? f.titleDe : f.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-3">
                      <p className="text-sm text-muted-foreground">
                        {lang === 'de' ? f.descriptionDe : f.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        {f.id === 'change-data' ? (
                          <Button variant="outline" asChild>
                            <a href="/service/personal">{tr('Open personal area', 'Persönlichen Bereich öffnen')}</a>
                          </Button>
                        ) : f.id === 'quote-full' ? (
                          <Button variant="outline" asChild>
                            <a href="/products/full-insurance">{tr('View product', 'Produkt ansehen')}</a>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setSelected(f);
                              setDialogOpen(true);
                            }}
                          >
                            {tr('Request', 'Anfordern')}
                          </Button>
                        )}
                        <span className="text-xs rounded-full bg-muted px-2 py-1 text-muted-foreground">
                          {categories.find((c) => c.id === f.category)?.label ?? ''}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filtered.length === 0 ? (
                <Card className="mt-8">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {tr('No forms match your search.', 'Keine Formulare passen zu Ihrer Suche.')}
                    </p>
                    <Button variant="link" onClick={() => setQuery('')}>
                      {tr('Clear search', 'Suche löschen')}
                    </Button>
                  </CardContent>
                </Card>
              ) : null}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <FormRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selected}
      />
    </div>
  );
}
