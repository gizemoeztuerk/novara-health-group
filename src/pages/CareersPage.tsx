import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jobs } from '@/data/mockData';
import { 
  Search, MapPin, Clock, Monitor, Briefcase, 
  ArrowRight, Filter, X, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';

export default function CareersPage() {
  const { tr, pick } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRemote, setSelectedRemote] = useState<string | null>(null);

  const departments = [...new Set(jobs.map(j => pick(j, 'department')))];
  const locations = [...new Set(jobs.map(j => pick(j, 'location')))];
  const remoteOptions = [...new Set(jobs.map(j => pick(j, 'remote')))];

  const filteredJobs = jobs.filter(job => {
    const title = pick(job, 'title');
    const desc = pick(job, 'description');
    const dept = pick(job, 'department');
    const loc = pick(job, 'location');
    const remote = pick(job, 'remote');

    const q = searchQuery.toLowerCase();
    const matchesSearch = title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
    const matchesDepartment = !selectedDepartment || dept === selectedDepartment;
    const matchesLocation = !selectedLocation || loc === selectedLocation;
    const matchesRemote = !selectedRemote || remote === selectedRemote;

    return matchesSearch && matchesDepartment && matchesLocation && matchesRemote;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment(null);
    setSelectedLocation(null);
    setSelectedRemote(null);
  };

  const hasActiveFilters = searchQuery || selectedDepartment || selectedLocation || selectedRemote;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-16 md:py-24">
          <Breadcrumbs
            items={[{ label: tr('Careers', 'Karriere') }]}
            className="mb-6 [&_*]:text-primary-foreground/60"
          />
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              {tr('Shape the Future of Health', 'Die Zukunft der Gesundheit gestalten')}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              {tr(
                'Join our team of passionate professionals dedicated to making health insurance accessible and transparent.',
                'Werden Sie Teil unseres Teams aus leidenschaftlichen Experten, die sich dafür einsetzen, die Krankenversicherung zugänglich und transparent zu gestalten.'
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{tr('500+ Employees', '500+ Mitarbeiter')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{tr('4 Locations', '4 Standorte')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span>{tr('Remote Options', 'Remote-Optionen')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why NOVARA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Why Work at NOVARA?', 'Warum bei NOVARA arbeiten?')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: tr('Meaningful Work', 'Sinnvolle Arbeit'),
                description: tr("Make a real difference in people's lives by improving healthcare access.", 'Helfen Sie Menschen wirklich, indem Sie den Zugang zur Gesundheitsversorgung verbessern.'),
              },
              {
                title: tr('Work-Life Balance', 'Work-Life-Balance'),
                description: tr('Flexible hours, remote options, and 30 days vacation to recharge.', 'Flexible Arbeitszeiten, Remote-Optionen und 30 Tage Urlaub zum Auftanken.'),
              },
              {
                title: tr('Growth Opportunities', 'Entwicklungschancen'),
                description: tr('Dedicated learning budget and clear career progression paths.', 'Eigenes Lernbudget und klare Karrierepfade.'),
              },
              {
                title: tr('Great Benefits', 'Attraktive Vorteile'),
                description: tr('Comprehensive health coverage, stock options, and modern office perks.', 'Umfassende Krankenversicherung, Mitarbeiterbeteiligung und moderne Büro-Extras.'),
              },
            ].map((item, i) => (
              <Card key={i} className="shadow-soft card-hover">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            {tr('Open Positions', 'Offene Stellen')}
          </h2>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={tr('Search positions...', 'Stellen suchen...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                {tr('Filter:', 'Filter:')}
              </span>
              
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(selectedDepartment === dept ? null : dept)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedDepartment === dept
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {dept}
                </button>
              ))}
              
              <div className="w-px h-6 bg-border self-center mx-1" />
              
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(selectedLocation === loc ? null : loc)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedLocation === loc
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {loc}
                </button>
              ))}
              
              <div className="w-px h-6 bg-border self-center mx-1" />
              
              {remoteOptions.map(remote => (
                <button
                  key={remote}
                  onClick={() => setSelectedRemote(selectedRemote === remote ? null : remote)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedRemote === remote
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {remote}
                </button>
              ))}
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 rounded-full text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  {tr('Clear', 'Löschen')}
                </button>
              )}
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">{tr('No positions match your criteria.', 'Keine Stellen entsprechen Ihren Kriterien.')}</p>
                  <Button variant="link" onClick={clearFilters}>{tr('Clear filters', 'Filter zurücksetzen')}</Button>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Link key={job.id} to={`/careers/${job.id}`} className="block group">
                  <Card className="card-hover border-2 border-transparent hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {pick(job, 'title')}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {pick(job, 'description')}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Briefcase className="h-4 w-4" />
                              {pick(job, 'department')}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {pick(job, 'location')}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Monitor className="h-4 w-4" />
                              {pick(job, 'remote')}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {pick(job, 'type')}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" className="shrink-0 group-hover:bg-primary/10">
                          {tr('View Details', 'Details ansehen')}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* Results count */}
          <p className="mt-4 text-sm text-muted-foreground">
            {tr(`Showing ${filteredJobs.length} of ${jobs.length} positions`, `${filteredJobs.length} von ${jobs.length} Stellen werden angezeigt`)}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {tr("Don't see the right fit?", 'Nicht das Richtige dabei?')}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {tr(
                  "We're always looking for talented individuals. Send us your CV and we'll keep you in mind for future opportunities.",
                  'Wir sind immer auf der Suche nach talentierten Köpfen. Senden Sie uns Ihren Lebenslauf, und wir merken Sie für zukünftige Chancen vor.'
                )}
              </p>
              <Button size="lg" asChild>
                <Link to="/careers/speculative">{tr('Send Speculative Application', 'Initiativbewerbung senden')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}