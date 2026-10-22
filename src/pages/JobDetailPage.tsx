import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jobs } from '@/data/mockData';
import { useI18n } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Clock, Monitor, Briefcase, ArrowLeft, CheckCircle2, Upload, Share2, Bookmark, Info } from 'lucide-react';

export default function JobDetailPage() {
  const { lang, pick, tr } = useI18n();
  const { jobId } = useParams();
  const job = jobs.find(j => j.id === jobId);

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const resumeInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => {
    const emailMsg = tr('Please enter a valid e-mail address', 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    const requiredResumeMsg = tr('Resume/CV is required', 'Lebenslauf ist erforderlich');
    const fileTooLargeMsg = tr('File must be 5MB or smaller', 'Datei darf maximal 5 MB groß sein');
    const fileTypeMsg = tr('Please upload a PDF, DOC, or DOCX file', 'Bitte laden Sie eine PDF-, DOC- oder DOCX-Datei hoch');

    const allowedTypes = new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]);

    return z.object({
      firstName: z.string().min(1, tr('First name is required', 'Vorname ist erforderlich')),
      lastName: z.string().min(1, tr('Last name is required', 'Nachname ist erforderlich')),
      email: z.string().min(1, tr('Email is required', 'E-Mail ist erforderlich')).email(emailMsg),
      phone: z.string().optional().or(z.literal('')),
      linkedIn: z.string().url(tr('Please enter a valid URL', 'Bitte geben Sie eine gültige URL ein')).optional().or(z.literal('')),
      coverLetter: z.string().optional().or(z.literal('')),
      resume: z
        .instanceof(File, { message: requiredResumeMsg })
        .refine((f) => f.size <= 5 * 1024 * 1024, fileTooLargeMsg)
        .refine((f) => allowedTypes.has(f.type), fileTypeMsg),
      agreeTerms: z.boolean().refine((checked) => checked, {
        message: tr('You must agree to the terms', 'Sie müssen den Bedingungen zustimmen'),
      }),
      agreeDataProcessing: z.boolean().refine((checked) => checked, {
        message: tr('You must consent to data processing', 'Sie müssen der Datenverarbeitung zustimmen'),
      }),
    });
  }, [tr]);

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedIn: '',
      coverLetter: '',
      resume: undefined as unknown as File,
      agreeTerms: false,
      agreeDataProcessing: false,
    },
  });

  const resume = form.watch('resume');

  const requirements = job ? (lang === 'de' && job.requirementsDe ? job.requirementsDe : job.requirements) : [];
  const benefits = job ? (lang === 'de' && job.benefitsDe ? job.benefitsDe : job.benefits) : [];

  if (!job) {
    return (
      <div className="container-wide section-padding text-center">
        <h1 className="font-display text-2xl font-bold mb-4">{tr('Position Not Found', 'Stelle nicht gefunden')}</h1>
        <p className="text-muted-foreground mb-6">
          {tr('This job posting may have been removed or filled.', 'Diese Stellenausschreibung wurde möglicherweise entfernt oder besetzt.')}
        </p>
        <Button asChild>
          <Link to="/careers">{tr('View All Positions', 'Alle Stellen anzeigen')}</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setApplicationSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (applicationSubmitted) {
    return (
      <div className="container-wide section-padding">
        <div className="max-w-2xl mx-auto">
          <Card className="animate-scale-in text-center">
            <CardContent className="p-8 md:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">{tr('Demo application completed', 'Demo-Bewerbung abgeschlossen')}</h1>
              <p className="text-muted-foreground mb-6">
                {tr(
                  `You completed a demonstration form for the ${pick(job, 'title')} position.`,
                  `Sie haben das Demo-Formular für die Stelle ${pick(job, 'title')} abgeschlossen.`
                )}
              </p>
              <div className="p-4 rounded-lg bg-muted/50 text-left mb-6">
                <h3 className="font-semibold text-foreground mb-2">{tr('Prototype notice', 'Prototyp-Hinweis')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tr('This frontend demo did not transmit or store your application. No HR team will contact you and no email will be sent. Please use fictional data only.',
                      'Diese Frontend-Demo hat Ihre Bewerbung nicht übermittelt oder gespeichert. Es wird sich kein Recruiting-Team melden und keine E-Mail wird verschickt. Bitte nur erfundene Daten verwenden.')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/careers">{tr('View More Positions', 'Weitere Stellen anzeigen')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">{tr('Return to Home', 'Zur Startseite')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: tr('Careers', 'Karriere'), href: '/careers' },
              { label: pick(job, 'title') },
            ]}
            className="mb-6"
          />
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">{pick(job, 'title')}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
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
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label={tr('Save job', 'Job speichern')}>
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label={tr('Share job', 'Job teilen')}>
                <Share2 className="h-5 w-5" />
              </Button>
              {!showApplicationForm && (
                <Button onClick={() => setShowApplicationForm(true)}>
                  {tr('Apply Now', 'Jetzt bewerben')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide section-padding">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Application Form */}
            {showApplicationForm && (
              <Card className="animate-scale-in border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{tr('Apply for this Position', 'Auf diese Stelle bewerben')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tr('First Name', 'Vorname')} <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input id="firstName" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tr('Last Name', 'Nachname')} <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input id="lastName" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tr('Email', 'E-Mail')} <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input id="email" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{tr('Phone', 'Telefon')}</FormLabel>
                              <FormControl>
                                <Input id="phone" type="tel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="linkedIn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tr('LinkedIn Profile', 'LinkedIn Profil')}</FormLabel>
                            <FormControl>
                              <Input
                                id="linkedIn"
                                type="url"
                                placeholder="https://linkedin.com/in/yourprofile"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {tr('Resume/CV', 'Lebenslauf')} <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <div>
                                <input
                                  ref={resumeInputRef}
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.onChange(file);
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => resumeInputRef.current?.click()}
                                  className={cn(
                                    'w-full rounded-lg border-2 border-dashed p-6 text-left transition-colors hover:border-primary/50',
                                    form.formState.errors.resume ? 'border-destructive/50' : 'border-input'
                                  )}
                                >
                                  <div className="text-center">
                                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                    {resume instanceof File ? (
                                      <div>
                                        <p className="text-sm font-medium text-foreground">{resume.name}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{tr('Click to change file', 'Klicken zum Ändern')}</p>
                                      </div>
                                    ) : (
                                      <div>
                                        <p className="text-sm text-muted-foreground">
                                          {tr('Drag and drop your resume here, or', 'Ziehen Sie Ihren Lebenslauf hierher oder')}{' '}
                                          <span className="text-primary">{tr('browse files', 'Dateien durchsuchen')}</span>
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{tr('Cover Letter', 'Anschreiben')}</FormLabel>
                            <FormControl>
                              <Textarea
                                id="coverLetter"
                                rows={5}
                                placeholder={tr("Tell us why you're interested in this position...", 'Erzählen Sie uns, warum Sie an dieser Stelle interessiert sind...')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="rounded-lg border border-info/20 bg-info/10 p-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 shrink-0 mt-0.5 text-info" />
                          <div className="text-sm">
                            <p className="font-medium text-foreground">{tr('Data Processing Notice', 'Hinweis zur Datenverarbeitung')}</p>
                            <p className="mt-1 text-muted-foreground">
                              {tr(
                                'Your application data will be processed for recruitment purposes only. Data is stored for 6 months after the position is filled, then securely deleted. You may request deletion at any time.',
                                'Ihre Bewerbungsdaten werden ausschließlich für Rekrutierungszwecke verarbeitet. Die Daten werden nach Besetzung der Stelle 6 Monate lang gespeichert und dann sicher gelöscht. Sie können jederzeit die Löschung beantragen.'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="agreeTerms"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-start space-x-3">
                                <FormControl>
                                  <Checkbox id="agreeTerms" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel htmlFor="agreeTerms" className="text-sm font-normal leading-relaxed">
                                  {tr('I confirm that the information provided is accurate', 'Ich bestätige, dass die gemachten Angaben korrekt sind')}{' '}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                              </div>
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
                                  <Checkbox id="agreeDataProcessing" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel htmlFor="agreeDataProcessing" className="text-sm font-normal leading-relaxed">
                                  {tr('I understand this is a demo and will only enter fictional data', 'Mir ist bewusst, dass dies eine Demo ist und ich nur erfundene Daten eingebe')}{' '}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? tr('Submitting...', 'Wird gesendet...') : tr('Submit Application', 'Bewerbung absenden')}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={() => {
                            setShowApplicationForm(false);
                            form.reset();
                          }}
                        >
                          {tr('Cancel', 'Abbrechen')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">{tr('About the Role', 'Über die Rolle')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{pick(job, 'description')}</p>

                <h4 className="text-foreground font-semibold mt-6">{tr('Requirements', 'Anforderungen')}</h4>
                <ul className="text-muted-foreground space-y-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-foreground font-semibold mt-6">{tr('Benefits', 'Vorteile')}</h4>
                <ul className="text-muted-foreground space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">{tr('Quick Facts', 'Kurzinfos')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{tr('Department', 'Abteilung')}</p>
                  <p className="font-medium">{pick(job, 'department')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{tr('Location', 'Standort')}</p>
                  <p className="font-medium">{pick(job, 'location')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{tr('Work Type', 'Arbeitsmodell')}</p>
                  <p className="font-medium">{pick(job, 'remote')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{tr('Employment', 'Anstellungsart')}</p>
                  <p className="font-medium">{pick(job, 'type')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{tr('Posted', 'Veröffentlicht')}</p>
                  <p className="font-medium">
                    {new Date(job.postedDate).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {!showApplicationForm && (
              <Button className="w-full" size="lg" onClick={() => setShowApplicationForm(true)}>
                {tr('Apply Now', 'Jetzt bewerben')}
              </Button>
            )}

            <Button variant="outline" className="w-full" asChild>
              <Link to="/careers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tr('Back to All Positions', 'Zurück zu allen Stellen')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
