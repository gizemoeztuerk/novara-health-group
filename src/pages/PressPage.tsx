import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function PressPage() {
  const { tr, lang } = useI18n();

  // Define press content inside the component to access tr()
  const pressItems = [
    {
      title: tr(
        'NOVARA launches a new self-service hub for insurance customers',
        'NOVARA führt neues Self-Service-Hub für Versicherungskunden ein'
      ),
      date: '2026-01-10',
      excerpt: tr(
        'Guided forms, clear checklists, and faster document access. Built to reduce support calls.',
        'Geführte Formulare, klare Checklisten und schnellerer Zugriff auf Dokumente. Entwickelt, um Supportanfragen zu reduzieren.'
      ),
    },
    {
      title: tr(
        'Ambulatory surgery: transparent journeys improve patient confidence',
        'Ambulante Chirurgie: Transparente Abläufe stärken das Vertrauen der Patienten'
      ),
      date: '2026-01-05',
      excerpt: tr(
        'A structured subsite helps customers understand benefits, pre-checks, and required documents.',
        'Eine strukturierte Unterseite hilft Kunden, Leistungen, Voruntersuchungen und erforderliche Dokumente zu verstehen.'
      ),
    },
    {
      title: tr(
        'Partner area for brokers: product arguments and resources in one place',
        'Partnerbereich für Makler: Produktargumente und Ressourcen an einem Ort'
      ),
      date: '2025-12-18',
      excerpt: tr(
        'Public broker landing plus portal entry. Designed for quick onboarding and training access.',
        'Öffentliche Makler-Landingpage plus Portal-Zugang. Konzipiert für schnelles Onboarding und Zugriff auf Schulungen.'
      ),
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Press', 'Presse') }]} className="mb-6" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Press & News', 'Presse & Aktuelles')}
              </h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {tr(
                  'Demo press page for your case study. Use it to show corporate communication, trust signals, and up-to-date product announcements.',
                  'Demo-Presseseite für Ihre Fallstudie. Nutzen Sie diese, um Unternehmenskommunikation, Vertrauenssignale und aktuelle Produktankündigungen zu zeigen.'
                )}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/help">
                {tr('Press Contact', 'Pressekontakt')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {pressItems.map((item) => (
              <Card key={item.title} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="secondary" className="w-fit">
                      {new Date(item.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'de-DE')}
                    </Badge>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Newspaper className="h-5 w-5" />
                    </div>
                  </div>
                  <h2 className="mt-4 font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  <div className="mt-4">
                    <Button variant="link" className="px-0 text-primary">
                      {tr('Read more', 'Mehr lesen')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}