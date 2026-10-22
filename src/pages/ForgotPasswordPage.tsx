import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function ForgotPasswordPage() {
  const { tr } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: tr('Demo request completed', 'Demo-Anfrage abgeschlossen'),
      description: tr(
        'This is a demonstration. No email or password reset link has been sent.',
        'Dies ist eine Demo. Es wurde keine E-Mail und kein Link zum Zurücksetzen verschickt.'
      ),
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Breadcrumbs 
            items={[
              { label: tr('Login', 'Anmelden'), href: '/login' }, 
              { label: tr('Reset password', 'Passwort zurücksetzen') }
            ]} 
            className="mb-6" 
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {tr('Reset your password', 'Passwort zurücksetzen')}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {tr(
                  "Enter your email address and we'll send a reset link.",
                  "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen."
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link to="/login">{tr('Back to login', 'Zurück zum Login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/help">
                    {tr('Need help?', 'Brauchen Sie Hilfe?')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="shadow-soft">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <KeyRound className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {tr('Security note', 'Sicherheitshinweis')}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tr(
                        'We never reveal whether an email exists. This prevents account enumeration.',
                        'Wir geben niemals preis, ob eine E-Mail-Adresse existiert. Dies verhindert Account-Enumeration.'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft lg:col-span-2">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">{tr('Email', 'E-Mail')}</Label>
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="border-0 bg-transparent focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit">
                      {tr('Send reset link', 'Reset-Link senden')}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/login">{tr('Cancel', 'Abbrechen')}</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-foreground">{tr('Tips', 'Tipps')}</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {tr('Check your spam folder.', 'Überprüfen Sie Ihren Spam-Ordner.')}</li>
                  <li>• {tr('Use a strong, unique password.', 'Verwenden Sie ein starkes, einzigartiges Passwort.')}</li>
                  <li>• {tr('Enable 2FA in your portal settings (future feature).', 'Aktivieren Sie 2FA in Ihren Portaleinstellungen (zukünftige Funktion).')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}