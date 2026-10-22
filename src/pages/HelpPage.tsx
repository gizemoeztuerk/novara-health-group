import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { faqs } from '@/data/mockData';
import { useI18n } from '@/i18n/LanguageContext';
import { Search, Phone, Mail, MessageSquare, MapPin, Clock, CheckCircle2, Send, HelpCircle, FileWarning } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function HelpPage() {
  const { tr, pick } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const subjectValues = useMemo(
    () => ['general', 'claims', 'coverage', 'billing', 'technical', 'feedback'] as const,
    []
  );

  const schema = useMemo(() => {
    const emailMsg = tr('Please enter a valid email address', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    return z.object({
      name: z.string().min(1, tr('Name is required', 'Name ist erforderlich')),
      email: z.string().min(1, tr('Email is required', 'E-Mail ist erforderlich')).email(emailMsg),
      subject: z.enum(subjectValues, {
        errorMap: () => ({ message: tr('Please select a subject', 'Bitte wählen Sie ein Thema aus') }),
      }),
      message: z.string().min(1, tr('Message is required', 'Nachricht ist erforderlich')),
      agreeDataProcessing: z.boolean().refine((checked) => checked, {
        message: tr('You must consent to data processing', 'Sie müssen der Datenverarbeitung zustimmen'),
      }),
    });
  }, [subjectValues, tr]);

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
      agreeDataProcessing: false,
    },
  });

  const filteredFaqs = faqs.filter(
    faq =>
      pick(faq, 'question').toLowerCase().includes(searchQuery.toLowerCase()) ||
      pick(faq, 'answer').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFormSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[{ label: tr('Help & Contact', 'Hilfe & Kontakt') }]}
            className="mb-6 [&_*]:text-primary-foreground/60"
          />
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl">{tr('How can we help?', 'Wie können wir helfen?')}</h1>
            <p className="mt-4 text-primary-foreground/80">
              {tr(
                'Find answers to common questions or get in touch with our support team.',
                'Finden Sie Antworten auf häufige Fragen oder kontaktieren Sie unser Support-Team.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{tr('Call Us', 'Rufen Sie uns an')}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{tr('Free hotline available 24/7', 'Kostenlose Hotline 24/7 verfügbar')}</p>
                <a href="tel:08001234567" className="font-display text-lg font-bold text-primary hover:underline">
                  0800 123 4567
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{tr('E-mail Us', 'Schreiben Sie uns')}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{tr('Response within 24 hours', 'Antwort innerhalb von 24 Stunden')}</p>
                <a href="mailto:service@novara-health.example" className="text-primary hover:underline">
                  service@novara-health.example
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{tr('Live Chat', 'Live-Chat')}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{tr('Mon-Fri, 8am-8pm CET', 'Mo-Fr, 8:00-20:00 Uhr')}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.dispatchEvent(new CustomEvent('novara-open-chat'))}
                >
                  {tr('Start Chat', 'Chat starten')}
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileWarning className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{tr('Complaints & Quality', 'Beschwerden & Qualität')}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {tr('Transparent complaint process and improvement loop', 'Transparenter Prozess und Verbesserungs-Loop')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/help/complaints">{tr('Open page', 'Seite öffnen')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{tr('Frequently Asked Questions', 'Häufig gestellte Fragen')}</h2>
              <div className="relative mx-auto max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={tr('Search FAQs...', 'FAQs durchsuchen...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {filteredFaqs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">{tr('No FAQs match your search.', 'Keine FAQs entsprechen Ihrer Suche.')}</p>
                  <Button variant="link" onClick={() => setSearchQuery('')}>
                    {tr('Clear search', 'Suche löschen')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium">{pick(faq, 'question')}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{pick(faq, 'answer')}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{tr('Send us a Message', 'Schicken Sie uns eine Nachricht')}</h2>
              <p className="mb-6 text-muted-foreground">
                {tr(
                  "Can't find what you're looking for? Fill out the form and we'll get back to you within 24 hours.",
                  'Nicht gefunden, was Sie suchen? Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.'
                )}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{tr('Address', 'Adresse')}</p>
                    <p className="text-sm text-muted-foreground">Friedrichstraße 123, 12234 Pusemuckel</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{tr('Office Hours', 'Bürozeiten')}</p>
                    <p className="text-sm text-muted-foreground">{tr('Mon-Fri: 8am-6pm CET', 'Mo-Fr: 8:00-18:00 Uhr')}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                {formSubmitted ? (
                  <div className="animate-scale-in py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 font-display text-xl font-bold text-foreground">{tr('Demo message completed', 'Demo-Nachricht abgeschlossen')}</h3>
                    <p className="mb-4 text-muted-foreground">{tr("No message was transmitted, and no support team will reply. This is only a demonstration.", 'Es wurde keine Nachricht übermittelt; ein Support-Team wird nicht antworten. Dies ist nur eine Demo.')}</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormSubmitted(false);
                        form.reset();
                      }}
                    >
                      {tr('Send Another Message', 'Weitere Nachricht senden')}
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tr('Name', 'Name')} <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input id="name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tr('Email', 'E-Mail')} <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input id="contactEmail" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {tr('Subject', 'Betreff')} <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger id="subject">
                                  <SelectValue placeholder={tr('Select a topic', 'Thema auswählen')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">{tr('General Inquiry', 'Allgemeine Anfrage')}</SelectItem>
                                <SelectItem value="claims">{tr('Claims', 'Schadensfälle')}</SelectItem>
                                <SelectItem value="coverage">{tr('Coverage Questions', 'Fragen zum Schutz')}</SelectItem>
                                <SelectItem value="billing">{tr('Billing', 'Abrechnung')}</SelectItem>
                                <SelectItem value="technical">{tr('Technical Support', 'Technischer Support')}</SelectItem>
                                <SelectItem value="feedback">{tr('Feedback', 'Feedback')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {tr('Message', 'Nachricht')} <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="message"
                                rows={5}
                                placeholder={tr('How can we help you?', 'Wie können wir Ihnen helfen?')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="agreeDataProcessing"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start space-x-3">
                              <FormControl>
                                <Checkbox id="helpDataProcessing" checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel htmlFor="helpDataProcessing" className="text-sm font-normal leading-relaxed text-muted-foreground">
                                {tr(
                                  'I consent to the processing of my data to handle my inquiry.',
                                  'Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.'
                                )}
                                <span className="text-destructive"> *</span>
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        <Send className="mr-2 h-4 w-4" />
                        {tr('Send Message', 'Nachricht senden')}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
