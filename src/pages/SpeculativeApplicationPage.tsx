import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, FileUp, Mail, Sparkles } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SpeculativeApplicationPage() {
  const { tr } = useI18n();
  const { toast } = useToast();

  const fileRef = useRef<HTMLInputElement>(null);

  const areaValues = useMemo(
    () => ['product', 'engineering', 'data', 'sales', 'operations'] as const,
    []
  );

  const schema = useMemo(() => {
    const emailMsg = tr('Please enter a valid email address', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    const urlMsg = tr('Please enter a valid URL', 'Bitte geben Sie eine gültige URL ein');

    return z.object({
      name: z.string().min(1, tr('Full name is required', 'Name ist erforderlich')),
      email: z.string().min(1, tr('Email is required', 'E-Mail ist erforderlich')).email(emailMsg),
      area: z.enum(areaValues),
      portfolio: z.string().url(urlMsg).optional().or(z.literal('')),
      message: z.string().min(1, tr('Message is required', 'Nachricht ist erforderlich')),
      attachment: z.instanceof(File).optional(),
      consent: z.boolean().refine((checked) => checked, {
        message: tr('Consent is required', 'Einwilligung ist erforderlich'),
      }),
    });
  }, [areaValues, tr]);

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      area: 'product',
      portfolio: '',
      message: '',
      attachment: undefined,
      consent: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    toast({
      title: tr('Demo form completed', 'Demo-Formular abgeschlossen'),
      description: tr(
        'Nothing was sent to a recruiting team. This is a frontend-only demonstration.',
        'Es wurde nichts an ein Recruiting-Team gesendet. Dies ist eine reine Frontend-Demonstration.'
      ),
    });
    form.reset({ ...values, attachment: undefined, consent: false, message: '' });
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('Careers', 'Karriere'), href: '/careers' },
              { label: tr('Speculative Application', 'Initiativbewerbung') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{tr('Speculative application', 'Initiativbewerbung')}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  "Don't see a perfect match? Tell us what you're looking for and how you can help NOVARA build a modern, trustworthy health experience.",
                  'Keine passende Stelle gefunden? Sagen Sie uns, wonach Sie suchen und wie Sie NOVARA dabei helfen können, eine moderne, vertrauenswürdige Gesundheitserfahrung aufzubauen.'
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/careers">
                    {tr('Browse open roles', 'Offene Stellen ansehen')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help">{tr('Contact support', 'Support kontaktieren')}</Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tr('What to include', 'Was Sie mitschicken sollten')}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tr(
                        'A short intro, the role family you target, and links to your portfolio or LinkedIn.',
                        'Eine kurze Vorstellung, den angestrebten Bereich und Links zu Ihrem Portfolio oder LinkedIn.'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft lg:col-span-2">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tr('Full name', 'Vollständiger Name')}</FormLabel>
                            <FormControl>
                              <Input id="name" placeholder="Max Mustermann" {...field} />
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
                            <FormLabel>{tr('Email', 'E-Mail')}</FormLabel>
                            <FormControl>
                              <Input id="email" type="email" placeholder="max@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tr('Area of interest', 'Interessenbereich')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={tr('Choose', 'Wählen')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="product">{tr('Product / UX', 'Produkt / UX')}</SelectItem>
                                <SelectItem value="engineering">{tr('Engineering', 'Entwicklung')}</SelectItem>
                                <SelectItem value="data">{tr('Data / Analytics', 'Daten / Analytik')}</SelectItem>
                                <SelectItem value="sales">{tr('Sales / Partnerships', 'Vertrieb / Partnerschaften')}</SelectItem>
                                <SelectItem value="operations">{tr('Operations', 'Betrieb')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              {tr('We route your request to the right team.', 'Wir leiten Ihre Anfrage an das passende Team weiter.')}
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tr('Portfolio / LinkedIn (optional)', 'Portfolio / LinkedIn (optional)')}</FormLabel>
                            <FormControl>
                              <Input id="portfolio" placeholder="https://…" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{tr('Message', 'Nachricht')}</FormLabel>
                          <FormControl>
                            <Textarea
                              id="message"
                              placeholder={tr(
                                'What role are you looking for and what impact can you make at NOVARA?',
                                'Nach welcher Rolle suchen Sie und welchen Beitrag können Sie bei NOVARA leisten?'
                              )}
                              className="min-h-[140px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-xl border border-border bg-muted/10 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <FileUp className="h-4 w-4 text-primary" />
                          {tr('CV / references (optional)', 'Lebenslauf / Zeugnisse (optional)')}
                        </div>
                        <FormField
                          control={form.control}
                          name="attachment"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  ref={fileRef}
                                  type="file"
                                  className="max-w-[240px]"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.onChange(file);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {tr('Prototype note: file uploads are mocked in this demo.', 'Prototyp-Hinweis: Datei-Uploads sind in dieser Demo simuliert.')}
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/10 p-4">
                            <FormControl>
                              <Checkbox id="consent" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed font-normal">
                              {tr(
                                'I understand this is a demo and will only enter fictional data.',
                                'Mir ist bewusst, dass dies eine Demo ist und ich nur erfundene Daten eingebe.'
                              )}
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-wrap gap-3">
                      <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                        {tr('Send application', 'Bewerbung absenden')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" asChild>
                        <Link to="/careers">{tr('Back to jobs', 'Zurück zu den Jobs')}</Link>
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-foreground">{tr('Recruiting contact', 'Recruiting-Kontakt')}</h2>
                <div className="rounded-xl bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">{tr('For urgent questions, email', 'Bei dringenden Fragen schreiben Sie an')}</p>
                  <p className="mt-1 inline-flex items-center gap-2 font-medium text-foreground">
                    <Mail className="h-4 w-4 text-primary" /> talent@novara-health.example
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tr('Typical response time:', 'Typische Antwortzeit:')}{' '}
                  <span className="font-medium text-foreground">{tr('2-3 business days', '2-3 Werktage')}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
