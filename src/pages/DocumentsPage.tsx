import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { Download, Search, FileText, Filter } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

type DocType = 'Form' | 'Guide' | 'Policy' | 'Certificate';
type Audience = 'Customer' | 'Broker';

type DocumentItem = {
  title: string;
  type: DocType;
  audience: Audience;
  description: string;
};

export default function DocumentsPage() {
  const { tr } = useI18n();
  const location = useLocation();

  // Define the document list with localization support
  const docs: DocumentItem[] = useMemo(() => [
    {
      title: tr('Claim submission form (PDF)', 'Leistungsantrag (PDF)'),
      type: 'Form',
      audience: 'Customer',
      description: tr('Use this when you prefer paper-based submission or need a printable copy.', 'Nutzen Sie dieses Formular für die postalische Einreichung veya als Druckvorlage.'),
    },
    {
      title: tr('Ambulatory surgery checklist', 'Checkliste: Ambulante Operationen'),
      type: 'Guide',
      audience: 'Customer',
      description: tr('Step-by-step preparation and required documents for outpatient procedures.', 'Schritt-für-Schritt-Vorbereitung und benötigte Unterlagen für ambulante Eingriffe.'),
    },
    {
      title: tr('Policy conditions - NOVARA SmartCare', 'AVB - NOVARA SmartCare'),
      type: 'Policy',
      audience: 'Customer',
      description: tr('The full policy wording for your plan.', 'Die Allgemeinen Versicherungsbedingungen (AVB) für Ihren Tarif.'),
    },
    {
      title: tr('Insurance certificate (German/English)', 'Versicherungsbescheinigung (DE/EN)'),
      type: 'Certificate',
      audience: 'Customer',
      description: tr('A standard proof of insurance for authorities, employers, or travel.', 'Ein standardisierter Versicherungsnachweis für Behörden, Arbeitgeber oder Reisen.'),
    },
    {
      title: tr('Broker product argumentation', 'Verkaufsargumentation für Makler'),
      type: 'Guide',
      audience: 'Broker',
      description: tr('Key value propositions and FAQs for consultations.', 'Zentrale Verkaufsargumente und FAQs für das Beratungsgespräch.'),
    },
    {
      title: tr('Broker onboarding checklist', 'Onboarding-Checkliste für Partner'),
      type: 'Form',
      audience: 'Broker',
      description: tr('A quick checklist for new partners to start selling quickly.', 'Schnellstart-Guide für neue Partner zur Kooperationsaufnahme.'),
    },
  ], [tr]);

  const presetTypeFromPath = useMemo(() => {
    if (location.pathname.endsWith('/policy')) return 'Policy';
    if (location.pathname.endsWith('/certificates')) return 'Certificate';
    return 'All';
  }, [location.pathname]);

  const [query, setQuery] = useState('');
  const [type, setType] = useState<'All' | DocType>(presetTypeFromPath);
  const [audience, setAudience] = useState<'All' | Audience>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      const matchesType = type === 'All' || d.type === type;
      const matchesAudience = audience === 'All' || d.audience === audience;
      const matchesQuery = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
      return matchesType && matchesAudience && matchesQuery;
    });
  }, [audience, query, type, docs]);

  const typeLabels: Record<'All' | DocType, string> = {
    All: tr('All', 'Alle'),
    Form: tr('Form', 'Formular'),
    Guide: tr('Guide', 'Leitfaden'),
    Policy: tr('Policy', 'AVB'),
    Certificate: tr('Certificate', 'Nachweis'),
  };

  const audienceLabels: Record<'All' | Audience, string> = {
    All: tr('All Users', 'Alle Nutzer'),
    Customer: tr('Customer', 'Kunde'),
    Broker: tr('Broker', 'Makler'),
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('Documents & Forms', 'Dokumente & Formulare') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Documents & Forms', 'Dokumente & Formulare')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Find and download the right document quickly. Search by keyword, type, or target audience.',
                  'Finden und laden Sie schnell das passende Dokument herunter. Suche nach Stichwort oder Typ.'
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant={type === 'All' ? 'default' : 'outline'} onClick={() => setType('All')}>
                  {typeLabels.All}
                </Button>
                <Button size="sm" variant={type === 'Policy' ? 'default' : 'outline'} onClick={() => setType('Policy')}>
                  {typeLabels.Policy}
                </Button>
                <Button size="sm" variant={type === 'Certificate' ? 'default' : 'outline'} onClick={() => setType('Certificate')}>
                  {typeLabels.Certificate}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 shadow-soft">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tr('Search documents…', 'Dokumente suchen…')}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Filter className="h-3.5 w-3.5" /> {tr('Filters', 'Filter')}
                </span>
                {(Object.keys(audienceLabels) as Array<keyof typeof audienceLabels>).map((a) => (
                  <Button
                    key={a}
                    size="sm"
                    variant={a === audience ? 'secondary' : 'outline'}
                    onClick={() => setAudience(a)}
                    className="h-7 text-xs"
                  >
                    {audienceLabels[a]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((d) => (
              <Card key={d.title} className="shadow-soft card-hover border-l-4 border-l-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                          {typeLabels[d.type]}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                          {audienceLabels[d.audience]}
                        </Badge>
                      </div>
                      <h2 className="mt-3 font-semibold text-foreground">{d.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                      {tr('Preview', 'Vorschau')}
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" /> {tr('Download', 'Download')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                {tr('No documents match your filters.', 'Keine Dokumente entsprechen Ihren Filtern.')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}