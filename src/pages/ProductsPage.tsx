import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { products } from '@/data/mockData';
import { ArrowRight, Shield, Heart, Users, Dog, Smile, CheckCircle2, GraduationCap, PersonStanding, Building2 } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-8 w-8" />,
  building: <Building2 className="h-8 w-8" />,
  dog: <Dog className="h-8 w-8" />,
  smile: <Smile className="h-8 w-8" />,
  graduationCap: <GraduationCap className="h-8 w-8"/>,
  heart: <Heart className="h-8 w-8"/>,
};

export default function ProductsPage() {
  const { lang, pick } = useI18n();
  return (
    <div>
      {/* Header */}
      <section className="bg-accent/50 border-b border-border">
        <div className="container-wide py-8">
          <Breadcrumbs
            items={[{ label: lang === 'de' ? 'Produkte' : 'Products' }]}
            className="mb-4"
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {lang === 'de' ? 'Versicherungsprodukte' : 'Insurance Products'}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
            {lang === 'de'
              ? 'Umfassende Schutzoptionen für jede Lebensphase. Finden Sie die passende Absicherung für Sie und Ihre Familie.'
              : 'Comprehensive coverage options for every stage of life. Find the perfect protection for you and your family.'}
          </p>
        </div>
      </section>

      {/* Full Insurance + Company Health Insurance */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {lang === 'de' ? 'Krankenversicherung' : 'Health Insurance'}
              </h2>
              <p className="text-muted-foreground">
                {lang === 'de'
                  ? 'Vollversicherung und betriebliche Lösungen'
                  : 'Full coverage and employer-sponsored solutions'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {products.primary.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="group">
                <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {iconMap[product.icon] || <Shield className="h-8 w-8" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {pick(product, 'name')}
                        </h3>
                        <p className="text-primary font-medium mt-1">{pick(product, 'price')}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{pick(product, 'shortDescription')}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {(lang === 'de' ? product.featuresDe : product.features).slice(0, 4).map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button variant="default" className="w-full group-hover:bg-primary-dark">
                        {lang === 'de' ? 'Mehr erfahren' : 'Learn More'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Supplementary Insurance */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {lang === 'de' ? 'Zusatzversicherung' : 'Supplementary Insurance'}
              </h2>
              <p className="text-muted-foreground">
                {lang === 'de' ? 'Zusätzlicher Schutz über die Grundabsicherung hinaus' : 'Extra protection beyond basic coverage'}
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {products.supplementary.map((product) => (
              <Link
                key={product.id}
                to={`/products/supplementary/${product.slug}`}
                className="group"
              >
                <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {iconMap[product.icon]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {pick(product, 'name')}
                        </h3>
                        <p className="text-primary font-medium mt-1">{pick(product, 'price')}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {pick(product, 'shortDescription')}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {(((lang === 'de' && (product).featuresDe) ? (product).featuresDe : product.features) || []).slice(0, 4).map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button variant="default" className="w-full group-hover:bg-primary-dark">
                        {lang === 'de' ? 'Mehr erfahren' : 'Learn More'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Life Stage Insurance */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <PersonStanding className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {lang === 'de' ? 'Lebensphasen-Schutz' : 'Life Stage Coverage'}
              </h2>
              <p className="text-muted-foreground">
                {lang === 'de' ? 'Tarife passend zu jeder Lebensphase' : 'Tailored plans for every phase of life'}
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {products.lifeStages.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="group">
                <Card className="h-full card-hover border-2 border-transparent hover:border-secondary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 text-left">
                      <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                        {iconMap[product.icon] || <Shield className="h-7 w-7" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {pick(product, 'name')}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
                            <Users className="h-3 w-3" />
                            {product.targetAge}
                          </div>
                        </div>
                        <p className="text-secondary font-medium mt-1">{pick(product, 'price')}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {lang === 'de' ? product.shortDescriptionDe : product.shortDescription}
                        </p>
                      </div>
                    </div>

                      <ul className="mt-4 space-y-1.5">
                        {(lang === 'de' ? product.featuresDe : product.features).map((feature: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                    <div className="mt-6">
                      <Button variant="secondary" className="w-full group-hover:bg-primary">
                        {lang === 'de' ? 'Optionen ansehen' : 'Explore Options'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {lang === 'de' 
                  ? 'Sind Sie unsicher, welches Produkt zu Ihnen passt?' 
                  : 'Not sure which product is right for you?'}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {lang === 'de' 
                  ? 'Unsere Versicherungsberater helfen Ihnen, den perfekten Schutz basierend auf Ihren Bedürfnissen und Ihrem Budget zu finden.' 
                  : 'Our insurance advisors are here to help you find the perfect coverage based on your needs and budget.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/help">
                    {lang === 'de' ? 'Beratung anfordern' : 'Talk to an Advisor'}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/help#faq">
                    {lang === 'de' ? 'FAQ durchsuchen' : 'Browse FAQ'}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
