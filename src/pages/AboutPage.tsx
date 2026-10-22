import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function AboutPage() {
  const { tr } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[{ label: tr('About Us', 'Über uns') }]} 
            className="mb-6" 
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                NOVARA Health Group
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {tr(
                  'Your health. Your pace. We build calm, trustworthy digital experiences that make health insurance easier to understand and easier to use.',
                  'Ihre Gesundheit. Ihr Tempo. Wir schaffen ruhige, vertrauenswürdige digitale Erlebnisse, die Krankenversicherungen verständlicher und einfacher nutzbar machen.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/products">
                    {tr('Explore Products', 'Produkte entdecken')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help">{tr('Contact Us', 'Kontaktieren Sie uns')}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { 
                      icon: <ShieldCheck className="h-5 w-5" />, 
                      label: tr('Security-first', 'Sicherheit zuerst') 
                    },
                    { 
                      icon: <HeartPulse className="h-5 w-5" />, 
                      label: tr('Care-driven', 'Fürsorgeorientiert') 
                    },
                    { 
                      icon: <Sparkles className="h-5 w-5" />, 
                      label: tr('Digital by default', 'Standardmäßig digital') 
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-primary/5 p-4">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {tr(
                    'A modern health-tech experience needs clarity, speed, and strong privacy. That is our baseline.',
                    'Ein modernes Health-Tech-Erlebnis braucht Klarheit, Geschwindigkeit und starken Datenschutz. Das ist unser Standard.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            {tr('What we stand for', 'Wofür wir stehen')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: tr('Simple experiences', 'Einfache Erlebnisse'),
                description: tr(
                  'Clear journeys with checklists, guided forms, and fast self-service.',
                  'Klare Abläufe mit Checklisten, geführten Formularen und schnellem Self-Service.'
                ),
              },
              {
                title: tr('Transparent coverage', 'Transparente Abdeckung'),
                description: tr(
                  'Explain benefits in plain language and show next best actions.',
                  'Leistungen in einfacher Sprache erklärt und die nächsten Schritte aufgezeigt.'
                ),
              },
              {
                title: tr('Trust & compliance', 'Vertrauen & Compliance'),
                description: tr(
                  'Consent-based analytics, accessibility-by-default, and secure operations.',
                  'Einwilligungsbasierte Analysen, standardmäßige Barrierefreiheit und sichere Abläufe.'
                ),
              },
            ].map((c) => (
              <Card key={c.title} className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}