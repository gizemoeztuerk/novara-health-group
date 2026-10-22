import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { 
  Briefcase, TrendingUp, Users, Award, 
  ArrowRight, CheckCircle2, Phone, Mail, FileText
} from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function BrokersPage() {
  const { tr } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-16 md:py-24 ">
          <Breadcrumbs
            items={[{ label: tr('For Brokers', 'Für Makler') }]}
            className="mb-6 [&_*]:text-primary-foreground/60"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                {tr('Partner with NOVARA', 'Partner von NOVARA werden')}
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl">
                {tr(
                  'Join our network of trusted insurance brokers and offer your clients comprehensive health insurance solutions backed by 50+ years of expertise.',
                  'Werden Sie Teil unseres Netzwerks vertrauenswürdiger Versicherungsmakler und bieten Sie Ihren Kunden umfassende Krankenversicherungslösungen an, die auf über 50 Jahren Erfahrung basieren.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/login?type=broker">
                    {tr('Broker Portal', 'Makler-Portal')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  asChild
                >
                  <Link to="#contact">
                    {tr('Become a Partner', 'Partner werden')}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary-foreground/10 border-0">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary-foreground/70" />
                    <p className="font-display text-primary-foreground/70 text-2xl font-bold">15%</p>
                    <p className="text-sm text-primary-foreground/70">{tr('Avg. Commission', 'Durschn. Provision')}</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary-foreground/10 border-0">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary-foreground/70" />
                    <p className="font-display text-2xl font-bold text-primary-foreground/70">2000+</p>
                    <p className="text-sm text-primary-foreground/70">{tr('Active Partners', 'Aktive Partner')}</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary-foreground/10 border-0">
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-primary-foreground/70" />
                    <p className="font-display text-2xl font-bold text-primary-foreground/70">A+</p>
                    <p className="text-sm text-primary-foreground/70">{tr('Financial Rating', 'Finanzrating')}</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary-foreground/10 border-0">
                  <CardContent className="p-6 text-center">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary-foreground/70" />
                    <p className="font-display text-2xl font-bold text-primary-foreground/70">50+</p>
                    <p className="text-sm text-primary-foreground/70">{tr('Products', 'Produkte')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            {tr('Why Partner with Us?', 'Warum Sie unser Partner werden sollten?')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: tr('Competitive Commissions', 'Wettbewerbsfähige Provisionen'),
                description: tr('Industry-leading commission rates with transparent tracking and fast payouts.', 'Branchenführende Provisionssätze mit transparentem Tracking und schnellen Auszahlungen.'),
                features: [tr('Up to 15% on new business', 'Bis zu 15% bei Neugeschäft'), tr('Recurring trail commissions', 'Laufende Bestandspflegeprovisionen'), tr('Monthly payouts', 'Monatliche Auszahlungen')],
              },
              {
                title: tr('Dedicated Support', 'Engagierter Support'),
                description: tr('Your success is our priority. Get personalized support from our broker team.', 'Ihr Erfolg ist unsere Priorität. Erhalten Sie persönlichen Support von unserem Makler-Team.'),
                features: [tr('Dedicated account manager', 'Persönlicher Account Manager'), tr('Priority hotline', 'Vorrangige Hotline'), tr('Training & certification', 'Schulung & Zertifizierung')],
              },
              {
                title: tr('Digital Tools', 'Digitale Tools'),
                description: tr('Modern tools to help you sell and manage your client portfolio efficiently.', 'Moderne Tools, die Ihnen helfen, Ihr Kundenportfolio effizient zu verwalten und zu verkaufen.'),
                features: [tr('Online quote system', 'Online-Angebotssystem'), tr('Client management portal', 'Kundenverwaltungsportal'), tr('Marketing materials', 'Marketingmaterialien')],
              },
            ].map((benefit, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            {tr('Broker Resources', 'Ressourcen für Makler')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: tr('Product Catalog', 'Produktkatalog'), 
                description: tr('Complete overview of all products', 'Vollständige Übersicht aller Produkte'), 
                icon: <FileText /> 
              },
              { 
                title: tr('Rate Calculator', 'Tarifrechner'), 
                description: tr('Calculate premiums instantly', 'Prämien sofort berechnen'), 
                icon: <TrendingUp /> 
              },
              { 
                title: tr('Training Portal', 'Schulungsportal'), 
                description: tr('Certifications and courses', 'Zertifizierungen und Kurse'), 
                icon: <Award /> 
              },
              { 
                title: tr('Marketing Kit', 'Marketing-Kit'), 
                description: tr('Brochures and presentations', 'Broschüren und Präsentationen'), 
                icon: <Briefcase /> 
              },
            ].map((resource, i) => (
              <Link key={i} to="/login?type=broker" className="group">
                <Card className="card-hover h-full">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {resource.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {tr('Access all resources through your', 'Greifen Sie auf alle Ressourcen zu über Ihr')}{' '}
            <Link to="/login?type=broker" className="text-primary hover:underline">
              {tr('Broker Portal', 'Makler-Portal')}
            </Link>
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="container-wide">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {tr('Become a Partner', 'Partner werden')}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {tr(
                      'Interested in joining our broker network? Get in touch with our partnership team to discuss how we can work together.',
                      'Haben Sie Interesse, unserem Maklernetzwerk beizutreten? Kontaktieren Sie unser Partner-Team, um eine Zusammenarbeit zu besprechen.'
                    )}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{tr('Broker Hotline', 'Makler-Hotline')}</p>
                        <a href="tel:08009876543" className="text-primary hover:underline">
                          0800 987 6543
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{tr('Email', 'E-Mail')}</p>
                        <a href="mailto:partners@novara-health.example" className="text-primary hover:underline">
                          partners@novara-health.example
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <Button size="lg" asChild className="mb-4">
                    <Link to="/brokers/apply">
                      {tr('Apply to Join', 'Jetzt bewerben')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login?type=broker">
                      {tr('Existing Partner? Sign In', 'Bereits Partner? Anmelden')}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}