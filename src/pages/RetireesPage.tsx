import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { products, retireePlan } from '@/data/mockData';
import { ArrowRight, CheckCircle2, Heart, Home, Pill, Stethoscope, HelpCircle } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function RetireesPage() {
  const { lang, pick, tr } = useI18n();
  const product = products.lifeStages.find(p => p.slug === 'retirees');

  if (!product) return <div>{tr('Product not found', 'Produkt nicht gefunden')}</div>;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { label: pick(product, 'name') },
            ]}
            className="mb-6"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-secondary font-medium mb-4">
                <Heart className="h-4 w-4" />
                {tr('Age 60+', 'Alter 60+')}
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {pick(product, 'name')}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {pick(product, 'shortDescription')}
              </p>
              <ul className="mt-6 space-y-2">
                {(lang === 'de' ? (product).featuresDe : product.features).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-primary" asChild>
                  <Link to="/products/retirees/apply">
                    {tr("Get Started", "Jetzt starten")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/help">{tr('Talk to an Advisor', 'Beratung anfordern')}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-80 h-80 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="h-24 w-24 text-secondary" />
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
            {tr('Designed for Your Golden Years', 'Für Ihre goldenen Jahre entwickelt')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Stethoscope className="h-6 w-6" />,
                title: tr('Comprehensive Care', 'Umfassende Versorgung'),
                description: tr(
                  'Coverage for specialists, preventive care, and chronic condition management.',
                  'Versicherungsschutz für Spezialisten, Vorsorge und chronische Erkrankungen.'
                ),
              },
              {
                icon: <Home className="h-6 w-6" />,
                title: tr('Home Care Support', 'Unterstützung zu Hause'),
                description: tr(
                  'In-home nursing and assistance when you need extra help.',
                  'Pflege und Unterstützung zu Hause, wenn zusätzliche Hilfe benötigt wird.'
                ),
              },
              {
                icon: <Pill className="h-6 w-6" />,
                title: tr('Medication Coverage', 'Medikamentenversicherung'),
                description: tr(
                  'Extensive prescription drug coverage with no surprise costs.',
                  'Umfassende Rezeptmedikamentenversicherung ohne versteckte Kosten.'
                ),
              },
            ].map((benefit, i) => (
              <Card key={i} className='card-hover'>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
            {retireePlan.map((option) => {
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
                    <Link to="/products/retirees/apply">{tr('Select Plan', 'Tarif wählen')}</Link>
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
            {/* FAQ 1: Pre-existing conditions */}
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Are pre-existing conditions covered?', 'Sind Vorerkrankungen mitversichert?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Coverage for pre-existing conditions depends on a health assessment. However, we offer specific modules that focus on managing chronic conditions effectively.',
                  'Die Mitversicherung von Vorerkrankungen hängt von einer Gesundheitsprüfung ab. Wir bieten jedoch spezielle Module an, die auf das Management chronischer Krankheiten fokussiert sind.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2: Coverage abroad */}
            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Does the insurance cover me abroad?', 'Gilt der Versicherungsschutz auch im Ausland?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Yes, our retiree plans include worldwide emergency medical coverage, making them ideal for those who enjoy traveling during retirement.',
                  'Ja, unsere Rententarife beinhalten einen weltweiten medizinischen Notfallschutz, ideal für alle, die ihren Ruhestand gerne mit Reisen verbringen.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3: Care services */}
            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Is long-term care support included?', 'Ist Unterstützung bei Langzeitpflege enthalten?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Our premium plans offer supplementary long-term care benefits, including support for home nursing and professional care assistance.',
                  'Unsere Premium-Tarife bieten zusätzliche Leistungen für die Langzeitpflege, einschließlich Unterstützung für häusliche Pflege und professionelle Pflegeassistenz.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4: Flexibility and cancellation */}
            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Can I change my plan as I age?', 'Kann ich meinen Tarif im Alter anpassen?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Absolutely. You can adjust your coverage levels annually to better suit your changing health needs and lifestyle requirements.',
                  'Absolut. Sie können Ihren Versicherungsschutz jährlich anpassen, um ihn optimal an Ihre sich ändernden gesundheitlichen Bedürfnisse anzupassen.'
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
            {tr('Peace of Mind in Retirement', 'Sorgenfrei im Ruhestand')}
          </h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            {tr(
              'Let us take care of your health coverage so you can focus on enjoying life.',
              'Wir kümmern uns um Ihren Versicherungsschutz, damit Sie das Leben genießen können.'
            )}
          </p>
          <Button size="lg" variant="default" className="bg-background text-foreground hover:bg-background/90" asChild>
            <Link to="/products/retirees/apply">
              {tr('Get Your Free Quote', 'Kostenloses Angebot erhalten')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
