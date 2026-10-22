import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

type Article = {
  title: string;
  category: 'Prevention' | 'Mental Health' | 'Fitness' | 'Nutrition';
  readingTime: string;
  excerpt: string;
  titleDe?: string;
  excerptDe?: string;
};

const articles: Article[] = [
  {
    title: 'Prevention checklist: small steps that matter every week',
    titleDe: 'Präventions-Checkliste: kleine Schritte, die jede Woche zählen',
    category: 'Prevention',
    readingTime: '5 min',
    excerpt: 'Practical routines for check-ups, vaccinations, and early warning signs (in plain language).',
    excerptDe: 'Praktische Routinen für Vorsorgeuntersuchungen, Impfungen und Frühwarnzeichen (einfach erklärt).',
  },
  {
    title: 'Mental health at work: how to build sustainable habits',
    titleDe: 'Psychische Gesundheit am Arbeitsplatz: nachhaltige Gewohnheiten entwickeln',
    category: 'Mental Health',
    readingTime: '6 min',
    excerpt: 'Reduce stress with small rituals, realistic boundaries, and support options you can access quickly.',
    excerptDe: 'Stress reduzieren durch kleine Rituale, realistische Grenzen und schnell zugängliche Unterstützungsmöglichkeiten.',
  },
  {
    title: 'Cardio basics: building endurance without overtraining',
    titleDe: 'Cardio Grundlagen: Ausdauer aufbauen ohne Übertraining',
    category: 'Fitness',
    readingTime: '4 min',
    excerpt: 'A simple training approach for beginners and returners, plus how to listen to your body.',
    excerptDe: 'Ein einfacher Trainingsansatz für Anfänger und Wiedereinsteiger, inklusive Tipps, auf den Körper zu hören.',
  },
  {
    title: 'Nutrition: quick wins for everyday energy',
    titleDe: 'Ernährung: schnelle Erfolge für mehr Energie im Alltag',
    category: 'Nutrition',
    readingTime: '5 min',
    excerpt: 'Balanced meals, hydration, and a shopping list that helps you stay consistent.',
    excerptDe: 'Ausgewogene Mahlzeiten, Flüssigkeitszufuhr und eine Einkaufsliste, die hilft, konsequent zu bleiben.',
  },
];

export default function HealthPage() {
  const { lang, tr, pick } = useI18n();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | Article['category']>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
      const matchesQuery =
        !q ||
        pick(a, 'title').toLowerCase().includes(q) ||
        pick(a, 'excerpt').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, pick]);

  const categories: Array<'All' | Article['category']> = ['All', 'Prevention', 'Mental Health', 'Fitness', 'Nutrition'];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs items={[{ label: tr('Health & Prevention', 'Gesundheit & Prävention') }]} className="mb-6" />
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Health & Prevention', 'Gesundheit & Prävention')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Practical guides that support healthier routines.',
                  'Praktische Leitfäden, die gesündere Routinen unterstützen.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-soft">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr('Search articles…', 'Artikel suchen…')}
                className="border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={c === activeCategory ? 'default' : 'outline'}
                onClick={() => setActiveCategory(c)}
              >
                {c === 'All'
                  ? tr('All', 'Alle')
                  : c === 'Prevention'
                  ? tr('Prevention', 'Prävention')
                  : c === 'Mental Health'
                  ? tr('Mental Health', 'Psychische Gesundheit')
                  : c === 'Fitness'
                  ? tr('Fitness', 'Fitness')
                  : c === 'Nutrition'
                  ? tr('Nutrition', 'Ernährung')
                  : c
                }
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((a) => (
              <Card key={pick(a, 'title')} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="w-fit">
                      {tr(a.category, a.category)} {/* Map categories if localized labels differ */}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{a.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-semibold text-foreground">{pick(a, 'title')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{pick(a, 'excerpt')}</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <Button variant="link" className="px-0 text-primary">
                      {tr('Read article', 'Artikel lesen')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/help">{tr('Ask a question', 'Frage stellen')}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              {tr('No articles match your search.', 'Keine Artikel entsprechen Ihrer Suche.')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
