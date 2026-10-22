import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApplyHeader } from '@/components/apply/ApplyHeader';
import { ApplyNavigation } from '@/components/apply/ApplyNavigation';
import { ApplyStepper } from '@/components/apply/ApplyStepper';
import { useApplyZodForm } from '@/components/apply/useApplyZodForm';
import { Smile, CheckCircle2, Shield, Check, Info, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';
import { z } from 'zod';

const dentalSteps = [
  { id: 1, title: { en: 'Basic Info', de: 'Basisinfo' } },
  { id: 2, title: { en: 'Plan Selection', de: 'Tarifwahl' } },
  { id: 3, title: { en: 'Personal Details', de: 'Persönliche Daten' } },
  { id: 4, title: { en: 'Review', de: 'Überprüfung' } },
];

type Localized = { en: string; de: string };
type DentalPlan = {
  id: 'basic' | 'smart' | 'premium';
  name: Localized;
  price: string;
  coverage: Localized;
  deductible: string;
  features: { en: string[]; de: string[] };
  recommended?: boolean;
};

const dentalPlans: DentalPlan[] = [
  {
    id: 'basic',
    name: { en: 'Dental Basic', de: 'Dental Basis' },
    price: '9.90',
    coverage: { en: '80% reimbursement', de: '80% Erstattung' },
    deductible: '0',
    features: {
      en: ['Professional cleaning (1x/year)', 'Fillings included'],
      de: ['Professionelle Zahnreinigung (1×/Jahr)', 'Füllungen inklusive'],
    },
  },
  {
    id: 'smart',
    name: { en: 'Dental Smart', de: 'Dental Smart' },
    price: '18.90',
    coverage: { en: '90% reimbursement', de: '90% Erstattung' },
    deductible: '0',
    features: {
      en: ['Professional cleaning (2x/year)', 'Root canal treatment', 'Orthodontics'],
      de: ['Professionelle Zahnreinigung (2×/Jahr)', 'Wurzelbehandlung', 'Kieferorthopädie'],
    },
    recommended: true,
  },
  {
    id: 'premium',
    name: { en: 'Dental Premium', de: 'Dental Premium' },
    price: '29.90',
    coverage: { en: '100% reimbursement', de: '100% Erstattung' },
    deductible: '0',
    features: {
      en: ['Bleaching bonus', 'Implants & crowns', 'No waiting period'],
      de: ['Bleaching-Bonus', 'Implantate & Kronen', 'Keine Wartezeit'],
    },
  },
];

export default function DentalInsuranceApplyPage() {
  const { lang, tr } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  type FormValues = {
    email: string;
    zip: string;
    plan: DentalPlan['id'];
    firstName: string;
    lastName: string;
    birthDate: string;
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
          plan: z.enum(['basic', 'smart', 'premium'] as const),
        })
        .passthrough(),
      z
        .object({
          firstName: z.string().min(1, tr('First name is required', 'Vorname ist erforderlich')),
          lastName: z.string().min(1, tr('Last name is required', 'Nachname ist erforderlich')),
          birthDate: z.string().min(1, tr('Birth date is required', 'Geburtsdatum ist erforderlich')),
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
      email: '',
      zip: '',
      plan: 'smart',
      firstName: '',
      lastName: '',
      birthDate: '',
      agreeTerms: false,
      agreeDataProcessing: false,
    },
  });

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
  });

  const planId = form.watch('plan');
  const values = form.watch();
  const selectedPlan = useMemo(() => dentalPlans.find((p) => p.id === planId), [planId]);

  return (
    <div className="min-h-screen bg-background">
      <ApplyHeader
        breadcrumbs={[
          { label: tr('Products', 'Produkte'), href: '/products' },
          { label: tr('Dental', 'Zahnzusatz'), href: '/products/supplementary/dental' },
          { label: tr('Apply', 'Antrag') },
        ]}
        icon={<Smile className="h-8 w-8 text-primary" />}
        title={tr('Dental Insurance Application', 'Zahnzusatzversicherung Antrag')}
        subtitle={tr('Secure your smile in just a few steps.', 'Sichern Sie Ihr Lächeln in wenigen Schritten.')}
        tagline={tr('Your Health. Your Tempo.', 'Deine Gesundheit. Dein Tempo.')}
      />

      <ApplyStepper
        currentStep={currentStep}
        steps={dentalSteps.map((s) => ({ id: s.id, title: tr(s.title.en, s.title.de) }))}
      />

      {/* Form Content */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Form {...form}>
          
          {currentStep === 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  {tr("Let's start with the basics", 'Starten wir mit den Grundlagen')}
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

          {currentStep === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Choose your dental plan', 'Wählen Sie Ihren Tarif')}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-4">
                          {dentalPlans.map((plan) => (
                            <label
                              key={plan.id}
                              className={cn(
                                'relative flex cursor-pointer rounded-xl border-2 p-4 transition-all',
                                field.value === plan.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/30'
                              )}
                            >
                              <RadioGroupItem value={plan.id} className="sr-only" />
                      {plan.recommended && (
                        <div className="absolute -top-3 left-4 bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-medium">
                          {tr('Recommended', 'Empfohlen')}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                                field.value === plan.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                              )}
                            >
                              {field.value === plan.id && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <h3 className="font-bold">{tr(plan.name.en, plan.name.de)}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-primary">€{plan.price}</span>
                            <p className="text-xs text-muted-foreground">{tr('/month', '/Monat')}</p>
                          </div>
                        </div>
                        <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                          {plan.features[lang].map((f) => (
                            <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
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

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr('Date of birth', 'Geburtsdatum')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex gap-3">
                  <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground block">{tr('Why we ask for this information', 'Warum wir diese Informationen benötigen')}</span>
                    {tr(
                      'This is a demonstration of an application flow. Form entries remain in this browser session and are not submitted to an insurance provider. Please enter fictional data only.',
                      'Dies ist eine Demonstration eines Antragsablaufs. Formulareingaben verbleiben in dieser Browsersitzung und werden nicht an eine Versicherung übermittelt. Bitte nur erfundene Daten eingeben.'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

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
                      <div className="flex justify-between"><dt className="text-muted-foreground">{tr('Name', 'Name')}</dt><dd className="font-medium">{values.firstName} {values.lastName}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">{tr('Email', 'E-Mail')}</dt><dd className="font-medium">{values.email}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">{tr('Postal code', 'PLZ')}</dt><dd className="font-medium">{values.zip}</dd></div>
                    </dl>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> {tr('Selected plan', 'Ausgewählter Tarif')}</h4>
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
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <div>
                            <FormLabel className="font-normal text-sm leading-tight">
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
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <div>
                            <FormLabel className="font-normal text-sm">
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

                  <p className="text-xs text-muted-foreground">
                    {tr('Prototype only • no server submission', 'Nur Prototyp • keine Serverübertragung')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

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
              <Button asChild><Link to="/">{tr('Return to home', 'Zur Startseite')}</Link></Button>
            </Card>
          )}

          {currentStep < 4 && (
            <ApplyNavigation
              currentStep={currentStep}
              stepsCount={dentalSteps.length}
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