import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { homepageContent, products } from '@/data/mockData';
import { useI18n } from '@/i18n/LanguageContext';
import { 
  User, Briefcase, Building, Users, Heart, Shield, Clock, 
  ArrowRight, CheckCircle2, Dog, Smile, Sparkles
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  user: <User className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
  building: <Building className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  dog: <Dog className="h-6 w-6" />,
  smile: <Smile className="h-6 w-6" />,
};

export default function HomePage() {
  const { lang, pick, t, tr } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container-wide relative">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                {tr(
                  'Modern health insurance for modern lives',
                  'Moderne Krankenversicherung für moderne Leben'
                )}
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
                {pick(homepageContent.hero, 'headline')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-slide-up delay-100">
                {pick(homepageContent.hero, 'subheadline')}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-slide-up delay-200">
                <Button size="xl" variant="hero" asChild>
                  <Link to="/products">
                    {pick(homepageContent.hero, 'cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="hero-outline" asChild>
                  <Link to="/help">
                    {tr('Talk to an Expert', 'Beratung anfordern')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Tiles */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              {tr('How can we help you today?', 'Wobei können wir Ihnen heute helfen?')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {tr(
                'Access your portal, find the right coverage, or explore career opportunities',
                'Portal nutzen, passenden Schutz finden oder Karrierechancen entdecken'
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepageContent.entryTiles.map((tile, index) => (
              <Link
                key={tile.id}
                to={tile.href}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20 bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {iconMap[tile.icon]}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {pick(tile, 'title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pick(tile, 'description')}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-primary-dark">
                      {tr('Learn more', 'Mehr erfahren')}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {homepageContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-muted-foreground">{pick(stat, 'label')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-accent/50">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                {tr('Popular Insurance Products', 'Beliebte Versicherungsprodukte')}
              </h2>
              <p className="text-muted-foreground">
                {tr(
                  'Find the perfect coverage for you and your loved ones',
                  'Finden Sie den perfekten Versicherungsschutz für sich und Ihre Lieben'
                )}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                {tr('View All Products', 'Alle Produkte anzeigen')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {products.supplementary.map((product) => (
              <Link
                key={product.id}
                to={`/products/supplementary/${product.slug}`}
                className="group"
              >
                <Card className="h-full card-hover overflow-hidden border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex h-40 md:h-auto md:w-1/3 items-center justify-center bg-primary/5 p-6">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {iconMap[product.icon]}
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-xl font-semibold text-foreground">
                              {lang === 'de' ? product.nameDe : product.name}
                            </h3>
                            <p className="text-sm text-primary font-medium mt-1">
                              {lang === 'de' ? product.priceDe : product.price}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {lang === 'de' ? product.shortDescriptionDe : product.shortDescription}
                        </p>
                        <ul className="mt-4 space-y-1">
                          {(lang === 'de' ? product.featuresDe : product.features).slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-primary-dark">
                          {tr('Learn more & apply', 'Mehr erfahren & bewerben')}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why NOVARA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              {tr('Why choose NOVARA?', 'Warum NOVARA wählen?')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {tr(
                'We combine decades of expertise with modern digital services to give you the best of both worlds',
                'Wir vereinen jahrzehntelange Expertise mit modernen digitalen Dienstleistungen, um Ihnen das Beste aus beiden Welten zu bieten'
              )}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: { en: 'Personal Care', de: 'Persönliche Betreuung' },
                description: {
                  en: 'Dedicated support teams who understand your needs and provide personalized guidance.',
                  de: 'Engagierte Support-Teams, die Ihre Bedürfnisse verstehen und persönliche Beratung bieten.',
                },
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: { en: 'Comprehensive Coverage', de: 'Umfassender Schutz' },
                description: {
                  en: 'From basic to premium plans, we offer flexible options that grow with your life.',
                  de: 'Von Basis- bis Premiumplänen bieten wir flexible Optionen, die mit Ihrem Leben wachsen.',
                },
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: { en: 'Fast Processing', de: 'Schnelle Bearbeitung' },
                description: {
                  en: 'Claims processed within 24 hours. Digital submissions, instant confirmations.',
                  de: 'Ansprüche werden innerhalb von 24 Stunden bearbeitet. Digitale Einreichungen, sofortige Bestätigungen.',
                },
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {lang === 'de' ? feature.title.de : feature.title.en}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'de' ? feature.description.de : feature.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-4">
              {t('home.ready')}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {t('home.readySub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">
                  {t('home.browseProducts')}
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link to="/help">
                  {t('home.contactUs')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}