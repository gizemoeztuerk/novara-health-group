import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApplyHeader } from '@/components/apply/ApplyHeader';
import { ApplyStepper } from '@/components/apply/ApplyStepper';
import { ApplyNavigation } from '@/components/apply/ApplyNavigation';
import { useApplyZodForm } from '@/components/apply/useApplyZodForm';
import { HeartPulse, CheckCircle2, Shield, Check, Info, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';
import { z } from 'zod';

const steps = [
  { id: 1, title: { en: 'Basic Info', de: 'Basisinfo' } },
  { id: 2, title: { en: 'Plan Selection', de: 'Tarifwahl' } },
  { id: 3, title: { en: 'Personal Details', de: 'Persönliche Daten' } },
  { id: 4, title: { en: 'Review', de: 'Überprüfung' } },
];

type Localized = { en: string; de: string };

type RetireePlan = {
  id: 'silver' | 'gold' | 'platinum';
  name: Localized;
  price: string;
  coverage: Localized;
  deductible: string;
  features: { en: string[]; de: string[] };
  recommended?: boolean;
};

const plans: RetireePlan[] = [
  {
    id: 'silver',
    name: { en: 'Silver Care', de: 'Silver Care' },
    price: '44.90',
    coverage: { en: '70% coverage', de: '70% Abdeckung' },
    deductible: '250',
    features: {
      en: ['Basic medication cover', 'Standard dental', 'GP visits'],
      de: ['Basis-Erstattung für Medikamente', 'Standard-Zahnleistungen', 'Hausarztbesuche'],
    },
  },
  {
    id: 'gold',
    name: { en: 'Gold Secure', de: 'Gold Secure' },
    price: '89.90',
    coverage: { en: '85% coverage', de: '85% Abdeckung' },
    deductible: '150',
    features: {
      en: ['Chronic condition support', 'Premium dental', 'Alternative medicine'],
      de: ['Support bei chronischen Erkrankungen', 'Premium-Zahnleistungen', 'Naturheilverfahren'],
    },
    recommended: true,
  },
  {
    id: 'platinum',
    name: { en: 'Platinum Plus', de: 'Platinum Plus' },
    price: '128.90',
    coverage: { en: '100% coverage', de: '100% Abdeckung' },
    deductible: '0',
    features: {
      en: ['Private room hospital', 'Home care support', 'Global travel health'],
      de: ['Einbettzimmer im Krankenhaus', 'Unterstützung bei häuslicher Pflege', 'Reisekranken­schutz weltweit'],
    },
  },
];

export default function RetireesApplyPage() {
  const { lang, tr } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zip: string;
    plan: RetireePlan['id'];
    currentInsurer: string;
    healthNotes: string;
    agreeTerms: boolean;
    agreeDataProcessing: boolean;
  };

  const stepSchemas = useMemo(() => {
    const emailMsg = tr('Please enter a valid email address', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    return [
      z
        .object({
          email: z.string().min(1, emailMsg).email(emailMsg),
          zip: z.string().min(1, tr('Postal code is required', 'PLZ ist erforderlich')),
        })
        .passthrough(),
      z
        .object({
          plan: z.enum(['silver', 'gold', 'platinum'] as const),
        })
        .passthrough(),
      z
        .object({
          firstName: z.string().min(1, tr('First name is required', 'Vorname ist erforderlich')),
          lastName: z.string().min(1, tr('Last name is required', 'Nachname ist erforderlich')),
        })
        .passthrough(),
      z
        .object({
          agreeTerms: z.literal(true, {
            errorMap: () => ({ message: tr('You must agree to the terms', 'Bitte stimmen Sie den Bedingungen zu') }),
          }),
          agreeDataProcessing: z.literal(true, {
            errorMap: () => ({
              message: tr('Consent to data processing is required', 'Einwilligung zur Datenverarbeitung ist erforderlich'),
            }),
          }),
        })
        .passthrough(),
    ];
  }, [tr]);

  const form = useApplyZodForm<FormValues>({
    currentStep,
    stepSchemas,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zip: '',
      plan: 'gold',
      currentInsurer: '',
      healthNotes: '',
      agreeTerms: false,
      agreeDataProcessing: false,
    },
  });

  const values = form.watch();

  const handleNext = async () => {
    const ok = await form.trigger();
    if (!ok) return;
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    form.clearErrors();
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = form.handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCurrentStep(4);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const planId = form.watch('plan');
  const selectedPlan = useMemo(() => plans.find((p) => p.id === planId), [planId]);

  return (
    <div>
      <ApplyHeader
        breadcrumbs={[
          { label: tr('Products', 'Produkte'), href: '/products' },
          { label: tr('Retirees', 'Rentner'), href: '/products/retirees' },
          { label: tr('Apply', 'Antrag') },
        ]}
        icon={<HeartPulse className="h-8 w-8 text-primary" />}
        title={tr('Retirees Insurance Application', 'Rentenversicherung Antrag')}
        subtitle={tr('Tailored coverage for your golden years.', 'Maßgeschneiderter Schutz für Ihren Ruhestand.')}
        tagline={tr('Your Health. Your Tempo.', 'Deine Gesundheit. Dein Tempo.')}
      />

      <ApplyStepper currentStep={currentStep} steps={steps.map((s) => ({ id: s.id, title: tr(s.title.en, s.title.de) }))} />

      {/* Form Content */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Form {...form}>
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  {tr('Let\'s start with the basics', 'Starten wir mit den Grundlagen')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr('Email address', 'E-Mail-Adresse')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr('Postal code', 'PLZ')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={tr('e.g. 10115', 'z. B. 10115')} {...field} />
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 1: Plan Selection */}
          {currentStep === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Select your coverage plan', 'Wählen Sie Ihren Tarif')}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-4">
                          {plans.map((option) => (
                            <label
                      key={option.id}
                      htmlFor={option.id}
                      className={cn(
                        'relative flex cursor-pointer rounded-xl border-2 p-4 transition-all',
                        field.value === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                      )}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      {option.recommended && (
                        <div className="absolute -top-3 left-4 bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-medium">
                          {tr('Recommended', 'Empfohlen')}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                                field.value === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                              )}
                            >
                              {field.value === option.id && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{tr(option.name.en, option.name.de)}</h3>
                              <p className="text-sm text-muted-foreground">
                                {lang === 'de'
                                  ? `${option.coverage.de} • €${option.deductible} Selbstbeteiligung`
                                  : `${option.coverage.en} • €${option.deductible} deductible`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-xl font-bold text-primary">€{option.price}</p>
                            <p className="text-xs text-muted-foreground">{tr('/month', '/Monat')}</p>
                          </div>
                        </div>
                        <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                          {option.features[lang].map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Personal & Notes */}
          {currentStep === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Personal details', 'Persönliche Daten')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">
                          {tr('First name', 'Vorname')} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">
                          {tr('Last name', 'Nachname')} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">{tr('Phone (optional)', 'Telefon (optional)')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentInsurer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">
                          {tr('Current insurer (optional)', 'Aktueller Versicherer (optional)')}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder={tr('e.g. AOK, TK', 'z. B. AOK, TK')} {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="healthNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">{tr('Notes (optional)', 'Hinweise (optional)')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tr(
                            'Chronic conditions, medication needs, or care preferences…',
                            'Chronische Erkrankungen, Medikamentenbedarf oder Pflegewünsche…'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{tr('Why we ask for this information', 'Warum wir diese Informationen benötigen')}</p>
                      <p className="text-muted-foreground mt-1">
                        {tr(
                          'This is a demonstration of an application flow. Form entries remain in this browser session and are not submitted to an insurance provider. Please enter fictional data only.',
                          'Dies ist eine Demonstration eines Antragsablaufs. Formulareingaben verbleiben in dieser Browsersitzung und werden nicht an eine Versicherung übermittelt. Bitte nur erfundene Daten eingeben.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Review your application', 'Antrag prüfen')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> {tr('Application info', 'Antragsdaten')}
                    </h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Name', 'Name')}</dt>
                        <dd className="font-medium">{values.firstName} {values.lastName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Email', 'E-Mail')}</dt>
                        <dd className="font-medium">{values.email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Postal code', 'PLZ')}</dt>
                        <dd className="font-medium">{values.zip}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" /> {tr('Selected plan', 'Ausgewählter Tarif')}
                    </h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Plan', 'Tarif')}</dt>
                        <dd className="font-medium">{selectedPlan ? tr(selectedPlan.name.en, selectedPlan.name.de) : ''}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Monthly', 'Monatlich')}</dt>
                        <dd className="font-medium text-primary">€{selectedPlan?.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="agreeTerms"
                              checked={field.value}
                              onCheckedChange={(c) => field.onChange(Boolean(c))}
                            />
                          </FormControl>
                          <div>
                            <FormLabel htmlFor="agreeTerms" className="font-normal text-sm leading-tight">
                              {tr('I agree to the', 'Ich stimme den')}{' '}
                              <Link to="/terms" className="text-primary hover:underline">
                                {tr('Terms of Service', 'Nutzungsbedingungen')}
                              </Link>{' '}
                              {tr('and', 'und der')}{' '}
                              <Link to="/privacy" className="text-primary hover:underline">
                                {tr('Privacy Policy', 'Datenschutzerklärung')}
                              </Link>{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormMessage className="form-error mt-1" />
                          </div>
                        </div>
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
                            <Checkbox
                              id="agreeData"
                              checked={field.value}
                              onCheckedChange={(c) => field.onChange(Boolean(c))}
                            />
                          </FormControl>
                          <div>
                            <FormLabel htmlFor="agreeData" className="font-normal text-sm">
                              {tr(
                                'I understand this is a demonstration using fictional data',
                                'Mir ist bewusst, dass dies eine Demo mit erfundenen Daten ist'
                              )}{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormMessage className="form-error mt-1" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <p className="text-xs text-muted-foreground">{tr('Prototype only • no server submission', 'Nur Prototyp • keine Serverübertragung')}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <Card className="animate-scale-in text-center p-8 md:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">{tr('Demo flow completed', 'Demo-Ablauf abgeschlossen')}</h2>
              <p className="text-muted-foreground mb-6">
                {tr(
                  'This is a frontend-only demonstration. Nothing was sent or stored on a server, and no confirmation email will be sent.',
                  'Dies ist eine reine Frontend-Demo. Es wurde nichts an einen Server gesendet oder dort gespeichert und keine Bestätigungs-E-Mail verschickt.'
                )}
              </p>
              <Button asChild>
                <Link to="/">{tr('Return to home', 'Zur Startseite')}</Link>
              </Button>
            </Card>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <ApplyNavigation
              currentStep={currentStep}
              stepsCount={steps.length}
              isSubmitting={isSubmitting}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          )}
          </Form>
        </div>
      </section>
    </div>
  );
}
