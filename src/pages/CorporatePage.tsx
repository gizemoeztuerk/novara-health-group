import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { 
  Building, Users, Heart, Shield, 
  ArrowRight, CheckCircle2, Phone, TrendingUp
} from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function CorporatePage() {
  const { tr } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="bg-accent/50 border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <Breadcrumbs
            items={[{ label: tr('For Companies', 'Für Unternehmen') }]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <Building className="h-4 w-4" />
              {tr('Group Insurance Solutions', 'Gruppenversicherungslösungen')}
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {tr("Invest in Your Team's Health", 'Investieren Sie in die Gesundheit Ihres Teams')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {tr(
                'Comprehensive group health insurance plans tailored to your company size and needs. Attract and retain top talent with competitive benefits.',
                'Umfassende betriebliche Krankenversicherungslösungen, zugeschnitten auf Ihre Unternehmensgröße. Gewinnen und binden Sie Talente durch attraktive Zusatzleistungen.'
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/help">
                  {tr('Get a Quote', 'Angebot anfordern')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#solutions">
                  {tr('Explore Solutions', 'Lösungen entdecken')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '1000+', label: tr('Corporate Clients', 'Unternehmenskunden') },
              { value: '250K+', label: tr('Covered Employees', 'Versicherte Mitarbeiter') },
              { value: '99%', label: tr('Renewal Rate', 'Erneuerungsrate') },
              { value: '24h', label: tr('Quote Delivery', 'Angebotserstellung') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">
            {tr('Solutions for Every Company Size', 'Lösungen für jede Unternehmensgröße')}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {tr(
              'From startups to enterprises, we have flexible plans that scale with your business.',
              'Vom Startup bis zum Konzern: Wir bieten flexible Tarife, die mit Ihrem Unternehmen wachsen.'
            )}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: tr('Small Business', 'Kleinunternehmen'),
                subtitle: tr('5-50 employees', '5-50 Mitarbeiter'),
                features: [
                  tr('Standard health coverage', 'Basis-Gesundheitsschutz'),
                  tr('Dental and vision add-ons', 'Zahn- und Sehhilfe-Optionen'),
                  tr('Simple administration', 'Einfache Verwaltung'),
                  tr('Online enrollment', 'Online-Anmeldung'),
                ],
                price: tr('from €89/employee', 'ab 89 € / Mitarbeiter'),
              },
              {
                title: tr('Medium Enterprise', 'Mittelstand'),
                subtitle: tr('51-250 employees', '51-250 Mitarbeiter'),
                features: [
                  tr('Enhanced coverage options', 'Erweiterte Deckungsoptionen'),
                  tr('Wellness programs included', 'Inklusive Wellness-Programme'),
                  tr('Dedicated account manager', 'Persönlicher Account Manager'),
                  tr('Custom plan design', 'Individuelle Tarifgestaltung'),
                ],
                price: tr('from €129/employee', 'ab 129 € / Mitarbeiter'),
                recommended: true,
              },
              {
                title: tr('Large Corporation', 'Großunternehmen'),
                subtitle: tr('250+ employees', '250+ Mitarbeiter'),
                features: [
                  tr('Premium comprehensive coverage', 'Premium-Vollschutz'),
                  tr('On-site health services', 'Gesundheitsservices vor Ort'),
                  tr('Executive health programs', 'Executive-Vorsorgeprogramme'),
                  tr('Global coverage options', 'Globale Absicherung'),
                ],
                price: tr('Custom pricing', 'Individuelle Preise'),
              },
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`card-hover ${plan.recommended ? 'border-2 border-primary' : ''}`}
              >
                {plan.recommended && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    {tr('Most Popular', 'Am beliebtesten')}
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold text-primary mb-4">{plan.price}</p>
                  <Button 
                    variant={plan.recommended ? 'default' : 'outline'} 
                    className="w-full"
                    asChild
                  >
                    <Link to="/help">{tr('Get Quote', 'Angebot anfordern')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Why Companies Choose NOVARA', 'Warum Unternehmen NOVARA wählen')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: tr('Competitive Rates', 'Attraktive Konditionen'),
                description: tr('Bulk pricing that reduces per-employee costs significantly.', 'Rahmenverträge, die die Kosten pro Mitarbeiter deutlich senken.'),
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: tr('Easy Administration', 'Einfache Verwaltung'),
                description: tr('Self-service HR portal for enrollment and changes.', 'HR-Portal für die einfache Anmeldung und Verwaltung.'),
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: tr('Wellness Programs', 'Gesundheitsförderung'),
                description: tr('Health initiatives that boost productivity and morale.', 'Initiativen, die Produktivität und Motivation steigern.'),
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: tr('Compliance Support', 'Rechtssicherheit'),
                description: tr('Stay compliant with German health insurance regulations.', 'Einhaltung aller deutschen Versicherungsregularien.'),
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding">
        <div className="container-wide">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {tr('Ready to protect your team?', 'Bereit, Ihr Team zu schützen?')}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {tr(
                  'Our corporate specialists will help you design the perfect health benefits package for your organization.',
                  'Unsere Firmenkunden-Spezialisten beraten Sie gerne bei der Gestaltung des optimalen Gesundheitspakets.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" asChild>
                  <Link to="/help">
                    {tr('Request a Quote', 'Angebot anfordern')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:08001112222">
                    <Phone className="mr-2 h-4 w-4" />
                    0800 111 2222
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {tr('Or e-mail us at', 'Oder schreiben Sie uns an')}{' '}
                <a href="mailto:corporate@novara-health.example" className="text-primary hover:underline">
                  corporate@novara-health.example
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}