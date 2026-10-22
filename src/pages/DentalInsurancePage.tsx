import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { products, dentalOptions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Smile, ArrowRight, Sparkles, ShieldPlus, Users, HelpCircle } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DentalInsurancePage() {
  const { tr, pick, lang } = useI18n();
  
  const product = products.supplementary.find((p) => p.slug === 'dental');
  
  if (!product) return (
    <div className="container py-20 text-center">
      {tr('Product not found', 'Produkt nicht gefunden')}
    </div>
  );

  const features = (lang === 'de' && (product).featuresDe) 
    ? (product).featuresDe 
    : product.features;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { label: tr('Supplementary Insurance', 'Zusatzversicherungen'), href: '/products/supplementary' },
              { label: tr('Dental Insurance', 'Zahnzusatzversicherung') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit bg-primary hover:bg-secondary">
                {pick(product, 'price')}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {pick(product, 'name')}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {pick(product, 'shortDescription')}
              </p>
              
              <ul className="mt-6 space-y-2">
                {(features || []).map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products/supplementary/dental/apply">
                    {tr("Get Started", "Jetzt starten")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/help">
                    {tr('Talk to an Advisor', 'Beratung anfordern')}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
                  <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center">
                    <Smile className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Perfect Protection for Your Smile', 'Perfekter Schutz für Ihr Lächeln')}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: tr('Preventive care', 'Vorsorge'),
                text: tr(
                  'Professional cleaning and check-ups for long-term dental health.', 
                  'Professionelle Zahnreinigung (PZR) und Kontrollen für langfristige Zahngesundheit.'
                ),
              },
              {
                icon: <ShieldPlus className="h-6 w-6" />,
                title: tr('High prosthetics coverage', 'Hochwertiger Zahnersatz'),
                text: tr(
                  'Transparent reimbursements for crowns, bridges, and implants.', 
                  'Transparente und hohe Erstattung für Kronen, Brücken und Implantate.'
                ),
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: tr('Family-friendly', 'Familienfreundlich'),
                text: tr(
                  'Orthodontics support for children and clear limits.', 
                  'Unterstützung bei Kieferorthopädie für Kinder und klare Leistungsgrenzen.'
                ),
              },
            ].map((x, idx) => (
              <Card key={idx} className="card-hover border-border shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {x.icon}
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {x.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {x.text}
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
            {dentalOptions.map((option) => {
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
                  <CardTitle className="text-lg font-bold">{option.name}</CardTitle>
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
                    <Link to="/products/supplementary/dental/apply">{tr('Select Plan', 'Tarif wählen')}</Link>
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{tr('Frequently Asked Questions', 'Häufig gestellte Fragen')}</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full border-t border-border">
          {/* FAQ 1: Waiting period */}
          <AccordionItem value="item-1" className="border-b border-border">
            <AccordionTrigger className="text-left font-medium py-4">
              {tr('Is there a waiting period?', 'Gibt es eine Wartezeit?')}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {tr(
                'For professional dental cleaning, there is no waiting period. For high-end prosthetics, a standard 3-month waiting period applies.',
                'Für professionelle Zahnreinigung gibt es keine Wartezeit. Für Zahnersatz gilt in der Regel eine Wartezeit von 3 Monaten.'
              )}
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 2: Existing treatments */}
          <AccordionItem value="item-2" className="border-b border-border">
            <AccordionTrigger className="text-left font-medium py-4">
              {tr('Are ongoing treatments covered?', 'Sind laufende Behandlungen versichert?')}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {tr(
                'Treatments that have already started or were recommended by a dentist before signing the contract are generally not covered.',
                'Behandlungen, die vor Vertragsabschluss bereits begonnen haben oder vom Zahnarzt bereits angeraten wurden, sind in der Regel nicht versichert.'
              )}
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 3: Professional dental cleaning limit */}
          <AccordionItem value="item-3" className="border-b border-border">
            <AccordionTrigger className="text-left font-medium py-4">
              {tr('How often is dental cleaning covered?', 'Wie oft wird die Zahnreinigung übernommen?')}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {tr(
                'Depending on your chosen plan, we cover professional dental cleaning up to twice a year without a deductible.',
                'Je nach gewähltem Tarif übernehmen wir die professionelle Zahnreinigung bis zu zweimal im Jahr ohne Eigenanteil.'
              )}
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 4: Dental implants */}
          <AccordionItem value="item-4" className="border-b border-border">
            <AccordionTrigger className="text-left font-medium py-4">
              {tr('Are dental implants included?', 'Sind Implantate mitversichert?')}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {tr(
                'Yes, our Comfort and Premium plans offer high coverage for implants, including bone grafting if necessary.',
                'Ja, unsere Comfort- und Premium-Tarife bieten hohe Erstattungen für Implantate, einschließlich notwendigem Knochenaufbau.'
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            {tr('Start Smiling with Confidence', 'Sorglos Lächeln')}
          </h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            {tr(
              'No waiting periods for preventive care. Get covered today and visit your dentist tomorrow.',
              'Keine Wartezeiten für Vorsorge. Sichern Sie sich noch heute ab ve gehen Sie morgen entspannt zum Zahnarzt.'
            )}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products/supplementary/dental/apply">
              {tr('Start Application', 'Antrag starten')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}