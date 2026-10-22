import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { products, careerPlan } from '@/data/mockData';
import { ArrowRight, CheckCircle2, Users, GraduationCap, Briefcase, Heart, HelpCircle } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CareerStartersPage() {
  const { tr, lang } = useI18n();
  const product = products.lifeStages.find(p => p.slug === 'career-starters');

  if (!product) {
    return <div className="p-20 text-center">{tr('Product not found', 'Produkt nicht gefunden')}</div>;
  }

  // Use German fields for German UI labels
  const name = lang === 'de' ? product.nameDe : product.name;
  const description = lang === 'de' ? product.shortDescriptionDe : product.shortDescription;
  const features = lang === 'de' ? product.featuresDe : product.features;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { label: tr('Career Starters', 'Berufseinsteiger') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-secondary font-medium mb-4">
                <GraduationCap className="h-4 w-4" />
                {tr('Age 18-30', 'Alter 18-30')}
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
              <ul className="mt-6 space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-primary" asChild>
                  <Link to="/products/career-starters/apply">
                    {tr("Get Started", "Jetzt starten")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/help">
                    {tr('Talk to an Advisor', 'Beratung anfordern')}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
                <div className="w-80 h-80 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="h-24 w-24 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Perfect for Your Stage of Life', 'Perfekt für Ihre Lebensphase')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Briefcase className="h-6 w-6" />,
                title: tr('Starting Your Career', 'Berufseinstieg'),
                description: tr(
                  "Affordable premiums that won't strain your entry-level budget.",
                  'Bezahlbare Beiträge, die Ihr Einstiegsbudget nicht belasten.'
                ),
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: tr('Mental Health Focus', 'Fokus auf mentale Gesundheit'),
                description: tr(
                  'Comprehensive mental health support including therapy and counseling.',
                  'Umfassende Unterstützung für die mentale Gesundheit, einschließlich Therapie und Beratung.'
                ),
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: tr('Grow With Us', 'Mit uns wachsen'),
                description: tr(
                  'Easy upgrade paths as your needs and career evolve.',
                  'Einfache Aufstiegsmöglichkeiten, während sich Ihre Bedürfnisse und Karriere entwickeln.'
                ),
              },
            ].map((benefit, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Comparison Table - Updated section */}
      <section id="coverage-details" className="section-padding bg-slate-50/50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground text-center">
              {tr('The right protection for every budget', 'Der passende Schutz für jedes Budget')}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tr('Choose from our three flexible coverage options.', 'Wählen Sie aus unseren drei flexiblen Tarifoptionen.')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {careerPlan.map((option) => {
              const displayFeatures = lang === 'de' ? option.featuresDe : option.features;
              const displayName = lang === 'de' ? option.nameDe : option.name; 
              return (
              <Card 
                key={option.id} 
                className={option.recommended 
                  ? "border-primary shadow-lg relative flex flex-col" 
                  : "shadow-sm border-border flex flex-col"}
              >
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white border-none px-3">
                      {tr('Recommended', 'Empfehlung')}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-lg font-bold">{displayName}</CardTitle>
                  <div className="mt-2 flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">€{option.price}</span>
                    <span className="text-sm text-muted-foreground">/{tr('mo', 'Mon.')}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <ul className="space-y-3 mb-8">
                    {/* Use the locale-specific displayFeatures rather than option.features */}
                    {displayFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={option.recommended ? 'default' : 'outline'} className="w-full">
                    <Link to="/products/career-starters/apply">{tr('Select Plan', 'Tarif wählen')}</Link>
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated section */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{tr('Frequently Asked Questions', 'Häufig gestellte Fragen')}</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full border-t border-border">
            {/* FAQ 1: Eligibility */}
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Who is this plan designed for?', 'Für wen ist dieser Tarif gedacht?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'This plan is specifically designed for students, trainees, and young professionals aged 18 to 30 who are looking for affordable yet comprehensive protection.',
                  'Dieser Tarif wurde speziell für Studierende, Auszubildende und Berufseinsteiger im Alter von 18 bis 30 Jahren entwickelt, die einen günstigen, aber umfassenden Schutz suchen.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2: Changing jobs */}
            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('What happens if I change my job?', 'Was passiert, wenn ich den Job wechsle?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Your coverage remains active even if you change employers or move from studies to a full-time position. You can take your insurance with you seamlessly.',
                  'Ihr Versicherungsschutz bleibt bestehen, auch wenn Sie den Arbeitgeber wechseln oder vom Studium in eine Vollzeitstelle übergehen. Sie können Ihre Versicherung nahtlos mitnehmen.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3: Age limits */}
            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('What happens when I turn 31?', 'Was passiert, wenn ich 31 werde?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'When you exceed the age limit, we offer a smooth transition to our standard professional plans with special loyalty discounts.',
                  'Wenn Sie die Altersgrenze überschreiten, bieten wir Ihnen einen reibungslosen Übergang in unsere Standard-Tarife für Berufstätige mit speziellen Treuerabatten an.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4: Flexibility */}
            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Can I adjust my coverage later?', 'Kann ich meinen Schutz später anpassen?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Yes, you can upgrade your plan or add supplementary modules (like dental or travel) at any time as your career and income grow.',
                  'Ja, Sie können Ihren Tarif jederzeit upgraden oder Zusatzmodule (wie Zahn- oder Reiseversicherung) hinzufügen, wenn Ihre Karriere und Ihr Einkommen wachsen.'
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            {tr('Start Your Coverage Today', 'Starten Sie Ihren Schutz noch heute')}
          </h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            {tr(
              'Get a personalized quote in minutes. No obligations, just the information you need to make the right choice.',
              'Erhalten Sie in wenigen Minuten ein persönliches Angebot. Keine Verpflichtungen, nur die Informationen, die Sie für die richtige Entscheidung benötigen.'
            )}
          </p>
          <Button size="lg" variant="default" className="bg-background text-foreground hover:bg-background/90" asChild>
            <Link to="/products/career-starters/apply">
              {tr('Get Your Free Quote', 'Jetzt kostenloses Angebot erhalten')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}