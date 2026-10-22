import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Briefcase, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';

export default function LoginPage() {
  const { tr } = useI18n();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'customer';
  const [activeTab, setActiveTab] = useState<'customer' | 'broker'>(
    defaultType === 'broker' ? 'broker' : 'customer'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(tr('Please enter both email and password', 'Bitte geben Sie sowohl E-Mail als auch Passwort ein'));
      return;
    }
    // Mock login - in production this would redirect to actual portal
    alert(tr(
      'This is a mock login. In production, you would be redirected to the secure portal.',
      'Dies ist ein Test-Login. In der Produktion würden Sie zum sicheren Portal weitergeleitet.'
    ));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container-wide max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">N</span>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            {tr('Welcome Back', 'Willkommen zurück')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {tr('Sign in to access your portal', 'Melden Sie sich an, um auf Ihr Portal zuzugreifen')}
          </p>
        </div>

        {/* Portal Selection Tabs */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            onClick={() => setActiveTab('customer')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === 'customer'
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            {tr('Customer Portal', 'Kundenportal')}
          </button>
          <button
            onClick={() => setActiveTab('broker')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === 'broker'
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Briefcase className="h-4 w-4" />
            {tr('Broker Portal', 'Maklerportal')}
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              {activeTab === 'customer' 
                ? tr('Customer Login', 'Kunden-Login') 
                : tr('Broker Login', 'Makler-Login')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{tr('Email', 'E-Mail')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{tr('Password', 'Passwort')}</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {tr('Forgot password?', 'Passwort vergessen?')}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {tr('Sign In', 'Anmelden')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center text-sm">
              {activeTab === 'customer' ? (
                <p className="text-muted-foreground">
                  {tr("Don't have an account?", "Haben Sie noch kein Konto?")}{' '}
                  <Link to="/products" className="text-primary hover:underline font-medium">
                    {tr('Get a quote', 'Angebot einholen')}
                  </Link>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  {tr('Want to become a partner?', 'Möchten Sie Partner werden?')}{' '}
                  <Link to="/brokers" className="text-primary hover:underline font-medium">
                    {tr('Learn more', 'Mehr erfahren')}
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {tr('Need help?', 'Brauchen Sie Hilfe?')}{' '}
            <Link to="/help" className="text-primary hover:underline">
              {tr('Contact Support', 'Support kontaktieren')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}