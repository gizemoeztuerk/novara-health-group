import { Link } from 'react-router-dom';
import { footerLinks } from '@/data/mockData';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export function Footer() {
  const { lang, pick, tr, t } = useI18n();
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="NOVARA" className="h-10 w-10 rounded-lg" loading="lazy" />
              <div>
                <span className="font-display text-xl font-bold">NOVARA</span>
                <span className="ml-1 text-sm opacity-70">{t('brand.group')}</span>
              </div>
            </Link>
            <p className="mb-6 text-background/70 max-w-md">
              {lang === 'de'
                ? 'Deine Gesundheit. Dein Tempo. Moderne Krankenversicherung, die sich Ihrem Leben anpasst.'
                : 'Your health. Your pace. Modern health insurance that adapts to your life.'}
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                0800 123 4567 (kostenlos)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                service@novara-health.example
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {tr("Pusemuckel, Germany", "Pusemuckel, Deutschland")}
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold mb-4">{lang === 'de' ? 'Produkte' : 'Products'}</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {pick(link, 'label')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-display font-semibold mb-4">{lang === 'de' ? 'Service' : 'Service'}</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {pick(link, 'label')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">{lang === 'de' ? 'Unternehmen' : 'Company'}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {pick(link, 'label')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} NOVARA {t('brand.group')}. {tr('All rights reserved.', 'Alle Rechte vorbehalten.')}
            </p>
            <div className="flex flex-wrap gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  {pick(link, 'label')}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-background/40">
            {lang === 'de'
              ? 'Datenschutzeinstellungen sind simuliert; kein Analytics- oder Marketing-Tracking aktiv.'
              : 'Consent preferences are simulated; no analytics or marketing tracking is active.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
