import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Cookie, Settings2 } from 'lucide-react';
import { cookieCategories } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';

export function CookieConsent() {
  const { lang, t, pick } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<Record<string, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem('novara-cookie-consent');
    if (!savedConsent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = { necessary: true, analytics: true, marketing: true };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    setConsent(necessaryOnly);
    saveConsent(necessaryOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  const saveConsent = (consentData: Record<string, boolean>) => {
    localStorage.setItem('novara-cookie-consent', JSON.stringify(consentData));
    localStorage.setItem('novara-consent-date', new Date().toISOString());
    
    // Mock analytics initialization
    if (consentData.analytics) {
      console.log('[Mock Matomo] Analytics enabled - tracking initialized');
    } else {
      console.log('[Mock Matomo] Analytics disabled - no tracking');
    }
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-slide-up">
      <div className="container-wide">
        <div className="rounded-xl border border-border bg-card shadow-xl max-w-4xl mx-auto">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                  {t('cookie.title')}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('cookie.body')}
                </p>

                {/* Detailed settings */}
                {showDetails && (
                  <div className="mb-4 space-y-3 p-4 rounded-lg bg-muted/50 animate-scale-in">
                    {cookieCategories.map((category) => (
                      <div key={category.id} className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{pick(category, 'name')}</span>
                            {category.required && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                {t('cookie.required')}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {pick(category, 'description')}
                          </p>
                        </div>
                        <Switch
                          checked={consent[category.id]}
                          onCheckedChange={(checked) =>
                            setConsent({ ...consent, [category.id]: checked })
                          }
                          disabled={category.required}
                          aria-label={`Toggle ${category.name} cookies`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default" onClick={handleAcceptAll}>
                    {t('cookie.acceptAll')}
                  </Button>
                  <Button variant="outline" onClick={handleAcceptNecessary}>
                    {t('cookie.necessaryOnly')}
                  </Button>
                  {showDetails ? (
                    <Button variant="ghost" onClick={handleSavePreferences}>
                      {t('cookie.save')}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => setShowDetails(true)}
                      className="gap-1"
                    >
                      <Settings2 className="h-4 w-4" />
                      {t('cookie.manage')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
