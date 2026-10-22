import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { products, coverageOptions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Dog, ArrowRight, Zap, ShieldCheck, HeartPulse, HelpCircle } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DogInsurancePage() {
  const { lang, pick, tr } = useI18n();
  const product = products.supplementary.find((p) => p.slug === 'dog-insurance');
  
  if (!product) {
    return (
      <div className="container py-20 text-center">
        {tr('Product not found', 'Produkt nicht gefunden')}
      </div>
    );
  }

  const name = pick(product, 'name');
  const shortDescription = pick(product, 'shortDescription');
  const price = pick(product, 'price');
  const features = (lang === 'de' ? (product).featuresDe : product.features) || [];

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: tr('Products', 'Produkte'), href: '/products' },
              { 
                label: tr('Supplementary Insurance', 'Zusatzversicherung'), 
                href: '/products/supplementary' 
              },
              { label: name },
            ]}
            className="mb-6"
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit bg-primary hover:bg-secondary">
                {price}
              </Badge>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{shortDescription}</p>

              <ul className="mt-6 space-y-2">
                {features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products/supplementary/dog-insurance/apply">
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
                  <Dog className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section*/}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Why Protect Your Best Friend?', 'Warum Ihren besten Freund schützen?')}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: tr('Fast reimbursements', 'Schnelle Erstattung'),
                text: tr(
                  'Digital submission, transparent status updates, and fast payouts.',
                  'Digitale Einreichung, transparente Status-Updates und schnelle Auszahlung.'
                ),
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: tr('Flexible plans', 'Flexible Tarife'),
                text: tr(
                  'Basic to premium, choose the protection that fits your dog.',
                  'Basis bis Premium, wählen Sie den Schutz, der zu Ihrem Hund passt.'
                ),
              },
              {
                icon: <HeartPulse className="h-6 w-6" />,
                title: tr('Emergencies & surgery', 'Notfälle & OP'),
                text: tr(
                  'Coverage for emergency care and surgeries. For peace of mind...',
                  'Abdeckung für Notfallversorgung und Operationen. Für ein beruhigendes Gefühl...'
                ),
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="card-hover border-border shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.text}
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
            {coverageOptions.map((option) => {
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
                    <Link to="/products/supplementary/dog-insurance/apply">{tr('Select Plan', 'Tarif wählen')}</Link>
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
            {/* FAQ 1: Breed coverage */}
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Is my dog breed covered?', 'Ist meine Hunderasse versichert?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Yes, we cover almost all breeds. Some specific working breeds or those with pre-existing genetic conditions might have different conditions.',
                  'Ja, wir versichern fast alle Rassen. Bestimmte Arbeitsrassen oder solche mit genetischen Vorerkrankungen können abweichende Bedingungen haben.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2: Waiting period */}
            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('When does the coverage start?', 'Ab wann gilt der Versicherungsschutz?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Standard coverage for illnesses starts after a 30-day waiting period. However, accidents are covered immediately from the first day.',
                  'Der Schutz bei Krankheiten beginnt nach 30 Tagen. Unfälle sind jedoch ab dem ersten Tag sofort versichert.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3: Age limit */}
            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('Is there an age limit for enrollment?', 'Gibt es eine Altersgrenze für die Aufnahme?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Dogs can be insured from 8 weeks old. While there is no upper age limit for renewal, premiums may adjust as your dog gets older.',
                  'Hunde können ab einem Alter von 8 Wochen versichert werden. Es gibt keine Altersgrenze für die Verlängerung, aber die Beiträge können sich mit zunehmendem Alter anpassen.'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4: Paying invoices */}
            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4">
                {tr('How do I submit a vet bill?', 'Wie reiche ich eine Tierarztrechnung ein?')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {tr(
                  'Simply take a photo of the bill and upload it through our app. Most claims are processed and reimbursed within 48 hours.',
                  'Machen Sie einfach ein Foto der Rechnung und laden Sie es in unserer App hoch. Die meisten Ansprüche werden innerhalb von 48 Stunden erstattet.'
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
            {tr('Ready to Protect Your Dog?', 'Bereit, Ihren Hund zu schützen?')}
          </h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            {tr(
              'Join thousands of happy pet owners. Get your quote in less than 2 minutes.',
              'Schließen Sie sich tausenden glücklichen Tierbesitzern an. Erhalten Sie Ihr Angebot in weniger als 2 Minuten.'
            )}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products/supplementary/dog-insurance/apply">
              {tr('Get Your Quote Now', 'Jetzt Angebot anfordern')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}