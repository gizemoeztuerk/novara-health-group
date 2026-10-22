import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApplyHeader } from '@/components/apply/ApplyHeader';
import { ApplyStepper } from '@/components/apply/ApplyStepper';
import { ApplyNavigation } from '@/components/apply/ApplyNavigation';
import { useApplyZodForm } from '@/components/apply/useApplyZodForm';
import { dogInsuranceSteps, dogBreeds, coverageOptions } from '@/data/mockData';
import {
  Dog,
  CheckCircle2,
  Shield,
  Check,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';
import { z } from 'zod';

export default function DogInsuranceApplyPage() {
  const { lang, pick, tr } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = {
    dogName: string;
    breed: string;
    age: string;
    gender: 'male' | 'female';
    neutered: boolean;
    coverage: 'basic' | 'comfort' | 'premium';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    street: string;
    city: string;
    postalCode: string;
    agreeTerms: boolean;
    agreeDataProcessing: boolean;
  };

  const stepSchemas = useMemo(() => {
    const emailMsg = tr('Please enter a valid email address', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    const ageMsg = tr("Please enter your dog's age", 'Bitte geben Sie das Alter Ihres Hundes an');
    return [
      z
        .object({
          dogName: z.string().min(1, tr("Please enter your dog's name", 'Bitte geben Sie den Namen Ihres Hundes ein')),
          breed: z.string().min(1, tr('Please select a breed', 'Bitte wählen Sie eine Rasse')),
          age: z
            .string()
            .min(1, ageMsg)
            .refine((v) => Number.isFinite(Number(v)) && Number(v) >= 0, ageMsg),
          gender: z.enum(['male', 'female']).optional(),
          neutered: z.boolean().optional(),
        })
        .passthrough(),
      z
        .object({
          coverage: z.enum(['basic', 'comfort', 'premium']),
        })
        .passthrough(),
      z
        .object({
          firstName: z.string().min(1, tr('First name is required', 'Vorname ist erforderlich')),
          lastName: z.string().min(1, tr('Last name is required', 'Nachname ist erforderlich')),
          email: z.string().min(1, emailMsg).email(emailMsg),
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
      dogName: '',
      breed: '',
      age: '',
      gender: 'male',
      neutered: false,
      coverage: 'comfort',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      street: '',
      city: '',
      postalCode: '',
      agreeTerms: false,
      agreeDataProcessing: false,
    },
  });

  const values = form.watch();

  const handleNext = async () => {
    const ok = await form.trigger();
    if (!ok) return;
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    form.clearErrors();
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = form.handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCurrentStep(4);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const selectedCoverage = useMemo(() => coverageOptions.find((c) => c.id === values.coverage), [values.coverage]);

  const breedLabel = (breed: string) => {
    if (breed === 'Mixed Breed') return tr('Mixed breed', 'Mischling');
    if (breed === 'Other') return tr('Other', 'Andere');
    return breed;
  };

  // Align the stepper with the actual application flow (0..3 + success screen).
  const stepsForStepper = dogInsuranceSteps.slice(0, 4);

  return (
    <div>
      <ApplyHeader
        breadcrumbs={[
          { label: tr('Products', 'Produkte'), href: '/products' },
          { label: tr('Supplementary', 'Zusatzversicherung'), href: '/products/supplementary' },
          { label: tr('Dog Insurance', 'Hundeversicherung'), href: '/products/supplementary/dog-insurance' },
          { label: tr('Apply', 'Antrag') },
        ]}
        icon={<Dog className="h-8 w-8 text-primary" />}
        title={tr('Dog Insurance Application', 'Antrag: Hundeversicherung')}
        subtitle={tr('Complete your application in just a few minutes.', 'In wenigen Minuten online abschließen.')}
        tagline={tr('Your Health. Your Tempo.', 'Deine Gesundheit. Dein Tempo.')}
      />

      <ApplyStepper
        currentStep={currentStep}
        steps={stepsForStepper.map((s) => ({ id: s.id, title: pick(s, 'title') }))}
      />

      {/* Form Content */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Form {...form}>
          {/* Step 1: Dog Details */}
          {currentStep === 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Tell us about your dog', 'Erzählen Sie uns etwas über Ihren Hund')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="dogName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr("Dog's name", 'Name des Hundes')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={tr('e.g., Max', 'z. B. Max')} {...field} />
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr('Breed', 'Rasse')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder={tr('Select breed', 'Rasse auswählen')} />
                          </SelectTrigger>
                          <SelectContent>
                            {dogBreeds.map((breed) => (
                              <SelectItem key={breed} value={breed}>
                                {breedLabel(breed)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">
                          {tr('Age (years)', 'Alter (Jahre)')} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="20" placeholder={tr('e.g., 3', 'z. B. 3')} {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">{tr('Gender', 'Geschlecht')}</FormLabel>
                        <FormControl>
                          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                            <label className="flex items-center space-x-2">
                              <RadioGroupItem value="male" />
                              <span className="text-sm">{tr('Male', 'Männlich')}</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <RadioGroupItem value="female" />
                              <span className="text-sm">{tr('Female', 'Weiblich')}</span>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="neutered"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          {tr('My dog is neutered/spayed', 'Mein Hund ist kastriert/sterilisiert')}
                        </FormLabel>
                      </div>
                      <FormMessage className="form-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Coverage Selection */}
          {currentStep === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Choose your coverage', 'Wählen Sie Ihren Schutz')}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="coverage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-4">
                          {coverageOptions.map((option) => (
                            <label
                              key={option.id}
                              className={cn(
                                'relative flex cursor-pointer rounded-xl border-2 p-4 transition-all',
                                field.value === option.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/30'
                              )}
                            >
                              <RadioGroupItem value={option.id} className="sr-only" />
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
                                        field.value === option.id
                                          ? 'border-primary bg-primary'
                                          : 'border-muted-foreground'
                                      )}
                                    >
                                      {field.value === option.id && (
                                        <Check className="h-3 w-3 text-primary-foreground" />
                                      )}
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{pick(option, 'name')}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {option.coverage} {tr('coverage', 'Abdeckung')} • €{option.deductible}{' '}
                                        {tr('deductible', 'Selbstbeteiligung')}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-display text-xl font-bold text-primary">€{option.price}</p>
                                    <p className="text-xs text-muted-foreground">{tr('/month', '/Monat')}</p>
                                  </div>
                                </div>
                                <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                                  {(lang === 'de' ? option.featuresDe : option.features).map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                      {feature}
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

          {/* Step 3: Personal Details */}
          {currentStep === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Your details', 'Ihre Daten')}</CardTitle>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        {tr('Email', 'E-Mail')} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage className="form-error" />
                      <p className="form-helper">
                        {tr("We'll send your policy documents to this email", 'Wir senden Ihre Unterlagen an diese E-Mail')}
                      </p>
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">{tr('Phone', 'Telefon')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage className="form-error" />
                      </FormItem>
                    )}
                  />

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
                </div>

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

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('Review your application', 'Antrag prüfen')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Dog className="h-4 w-4 text-primary" /> {tr('Pet details', 'Hundedaten')}
                    </h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Name', 'Name')}</dt>
                        <dd className="font-medium">{values.dogName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Breed', 'Rasse')}</dt>
                        <dd className="font-medium">{breedLabel(values.breed)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Age', 'Alter')}</dt>
                        <dd className="font-medium">
                          {values.age} {tr('years', 'Jahre')}
                        </dd>
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
                        <dd className="font-medium">{selectedCoverage ? pick(selectedCoverage, 'name') : ''}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Coverage', 'Abdeckung')}</dt>
                        <dd className="font-medium">{selectedCoverage?.coverage}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{tr('Monthly', 'Monatlich')}</dt>
                        <dd className="font-medium text-primary">€{selectedCoverage?.price}</dd>
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
                            <FormLabel className="font-normal text-sm leading-tight">
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

          {/* Step 5: Confirmation */}
          {currentStep === 4 && (
            <Card className="animate-scale-in text-center">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">{tr('Demo flow completed', 'Demo-Ablauf abgeschlossen')}</h2>
                <p className="text-muted-foreground mb-6">
                  {tr(
                    'This is a frontend-only demonstration. Nothing was sent or stored on a server, and no confirmation email will be sent.',
                    'Dies ist eine reine Frontend-Demo. Es wurde nichts an einen Server gesendet oder dort gespeichert und keine Bestätigungs-E-Mail verschickt.'
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">{tr('Return to home', 'Zur Startseite')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/help">{tr('Contact support', 'Support kontaktieren')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <ApplyNavigation
              currentStep={currentStep}
              stepsCount={stepsForStepper.length}
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
