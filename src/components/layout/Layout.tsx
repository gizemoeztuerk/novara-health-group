import { Suspense } from "react";
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { AccessibilityWidget } from './AccessibilityWidget';
import { ChatWidget } from './ChatWidget';
import { useI18n } from '@/i18n/LanguageContext';

export function Layout() {
  const { tr } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<div role="status" aria-live="polite" className="container-wide py-16 text-center text-muted-foreground">{tr("Loading page...", "Seite wird geladen...")}</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
      <AccessibilityWidget />
      <ChatWidget />
    </div>
  );
}
