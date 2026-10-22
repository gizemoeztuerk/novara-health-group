import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

const appointments = [
  { 
    date: '2026-01-20', 
    time: '10:30', 
    typeEn: 'Phone consultation', 
    typeDe: 'Telefonische Beratung', 
    status: 'Upcoming' as const 
  },
  { 
    date: '2025-12-08', 
    time: '15:00', 
    typeEn: 'Document support', 
    typeDe: 'Unterstützung bei Unterlagen', 
    status: 'Completed' as const 
  },
];

export default function AppointmentsPage() {
  const { tr, lang } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Service', 'Service'), href: '/service' }, 
              { label: tr('Appointments', 'Termine') }
            ]} 
            className="mb-6" 
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Appointments', 'Termine')}
              </h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {tr(
                  'Book a consultation for complex topics: or manage your existing appointments.',
                  'Buchen Sie eine Beratung für komplexe Themen - oder verwalten Sie Ihre bestehenden Termine.'
                )}
              </p>
            </div>
            <Button asChild>
              <Link to="/service/appointments/new">
                {tr('Book appointment', 'Termin buchen')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {appointments.map((a, idx) => (
              <Card key={idx} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant={a.status === 'Upcoming' ? 'secondary' : 'outline'} className="w-fit">
                        {a.status === 'Upcoming' 
                          ? tr('Upcoming', 'Anstehend') 
                          : tr('Completed', 'Abgeschlossen')}
                      </Badge>
                      <h2 className="mt-3 font-semibold text-foreground">
                        {tr(a.typeEn, a.typeDe)}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(a.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'de-DE')} · {a.time}
                      </p>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                  </div>
                  {a.status === 'Upcoming' && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button size="sm" variant="outline">
                        {tr('Reschedule', 'Verschieben')}
                      </Button>
                      <Button size="sm" variant="destructive">
                        {tr('Cancel', 'Absagen')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}