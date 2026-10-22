import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigation } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { lang, toggleLang, pick, t } = useI18n();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="#main-content" className="skip-link">
        {t('nav.skip')}
      </a>
      
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="NOVARA"
              className="h-12 w-12 rounded-lg"
              loading="eager"
            />
            <div className="hidden sm:flex flex-col items-center">
              <span className="font-display text-xl font-bold text-foreground text-center">NOVARA</span>
              <span className="text-sm text-muted-foreground text-center -mt-1">{t('brand.group')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.main.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocusCapture={() => item.children && setActiveDropdown(item.id)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveDropdown(null);
                  }
                }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {pick(item, 'label')}
                  {item.children && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      activeDropdown === item.id && "rotate-180"
                    )} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-2 animate-fade-in">
                    <div className="w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href}
                          className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {pick(child, 'label')}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Button variant="ghost" size="sm" onClick={toggleLang} aria-label="Toggle language">
              {lang === 'en' ? 'DE' : 'EN'}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <LogIn className="mr-1 h-4 w-4" />
                {t('nav.login')}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/products">
                {t('nav.getStarted')}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-down">
          <div className="container-wide py-4 space-y-1">
            {navigation.main.map((item) => (
              <div key={item.id}>
                <Link
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pick(item, 'label')}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {pick(child, 'label')}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border mt-4 flex flex-col gap-2">
              <Button variant="ghost" onClick={toggleLang} className="justify-start" aria-label="Toggle language">
                {lang === 'en' ? 'Deutsch (DE)' : 'English (EN)'}
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Link>
              </Button>
              <Button asChild>
                <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.getStarted')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
