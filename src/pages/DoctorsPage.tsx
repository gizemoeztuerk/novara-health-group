import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Stethoscope, MapPin, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

type Doctor = { name: string; specialty: string; city: string; accepting: boolean };

export default function DoctorsPage() {
  const { tr } = useI18n();
  const [query, setQuery] = useState('');

  // German medical specialties and sample data
  const doctors: Doctor[] = useMemo(() => [
    { name: 'Dr. Anna Keller', specialty: tr('General Practice', 'Allgemeinmedizin'), city: 'Pusemuckel', accepting: true },
    { name: 'Dr. Murat Kaya', specialty: tr('Orthopedics', 'Orthopädie'), city: 'Hamburg', accepting: false },
    { name: 'Dr. Lina Schmidt', specialty: tr('Dermatology', 'Dermatologie'), city: 'München', accepting: true },
    { name: 'Dr. Paul Weber', specialty: tr('Cardiology', 'Kardiologie'), city: 'Bremen', accepting: true },
  ], [tr]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter((d) =>
      [d.name, d.specialty, d.city].some((x) => x.toLowerCase().includes(q))
    );
  }, [query, doctors]);

  return (
    <div>
      <section id="top" className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Find a doctor', 'Arztsuche') }
            ]} 
            className="mb-6" 
          />
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Find a doctor', 'Arztsuche')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  'Search our provider directory. This demo shows how a doctor search can reduce support load.',
                  'Durchsuchen Sie unser Partner-Netzwerk. Diese Demo zeigt, wie eine Arztsuche den Support entlasten kann.'
                )}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 shadow-soft">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tr('Search name, specialty, city…', 'Suche nach Name, Fachrichtung, Stadt…')}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((d) => (
              <Card key={d.name} className="shadow-soft card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={d.accepting ? 'secondary' : 'outline'}>
                          {d.accepting 
                            ? tr('Accepting patients', 'Nimmt Patienten an') 
                            : tr('Waitlist', 'Warteliste')}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {d.city}
                        </span>
                      </div>
                      <h2 className="mt-3 font-semibold text-foreground">{d.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{d.specialty}</p>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button size="sm">
                      {tr('Request appointment', 'Termin anfragen')}
                    </Button>
                    <Button size="sm" variant="outline">
                      {tr('View details', 'Details ansehen')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              {tr('No doctors match your search.', 'Keine Ärzte gefunden, die Ihrer Suche entsprechen.')}
            </div>
          )}

          <div className="mt-8">
            <Button variant="link" className="px-0 text-primary" asChild>
              <a href="#top">
                {tr('Back to top', 'Zurück nach oben')} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}