import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, CalendarPlus } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function AppointmentNewPage() {
  const { tr } = useI18n();
  const { toast } = useToast();
  const [topic, setTopic] = useState(tr('General consultation', 'Allgemeine Beratung'));
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: tr('Demo request completed', 'Demo-Anfrage abgeschlossen'),
      description: tr(
        'This is a local simulation. No appointment was booked or transmitted.',
        'Dies ist eine lokale Simulation. Es wurde kein Termin gebucht oder übermittelt.'
      ),
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('Appointments', 'Termine'), href: '/service/appointments' },
              { label: tr('Book appointment', 'Termin buchen') },
            ]}
            className="mb-6"
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Book appointment', 'Termin buchen')}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {tr(
              'Request a call or video appointment with our service team.',
              'Fordern Sie einen Telefon- oder Videotermin mit unserem Service-Team an.'
            )}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft lg:col-span-2">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="topic">{tr('Topic', 'Thema')}</Label>
                    <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">{tr('Preferred date', 'Wunschtermin')}</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <p className="text-xs text-muted-foreground">
                      {tr('Example date only; no appointment will be booked.', 'Nur Beispieldatum; es wird kein Termin gebucht.')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{tr('Notes (optional)', 'Anmerkungen (optional)')}</Label>
                    <Textarea 
                      id="notes" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                      placeholder={tr('What do you need help with?', 'Wobei benötigen Sie Hilfe?')} 
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit">
                      <CalendarPlus className="mr-2 h-4 w-4" /> 
                      {tr('Request', 'Anfragen')}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/service/appointments">
                        {tr('View appointments', 'Termine ansehen')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="font-semibold text-foreground">
                  {tr('What happens next?', 'Was passiert als Nächstes?')}
                </h2>
                <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>{tr('The form demonstrates a possible appointment-request journey.', 'Das Formular zeigt einen möglichen Ablauf für Terminanfragen.')}</li>
                  <li>{tr('No email, SMS or booking request is sent in this demo.', 'In dieser Demo wird keine E-Mail, SMS oder Buchungsanfrage versendet.')}</li>
                  <li>{tr('Rescheduling would require a production backend.', 'Für Umbuchungen wäre ein produktives Backend erforderlich.')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}