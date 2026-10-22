import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { 
  FileText, CreditCard, Calendar, Stethoscope, 
  Download, ArrowRight, User, Shield, Settings, HelpCircle
} from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';

export default function ServicePage() {
  const { tr } = useI18n();
  const serviceCategories = [
    {
      title: tr('My Health Insurance', 'Meine Krankenversicherung'),
      description: tr('Manage your policy, view coverage, and update your details', 'Verwalten Sie Ihren Vertrag, sehen Sie Leistungen ein und aktualisieren Sie Ihre Daten'),
      href: '/service/my-insurance',
      icon: <Shield className="h-6 w-6" />,
      items: [
        { label: tr('Policy Overview', 'Vertragsübersicht'), href: '/service/my-insurance' },
        { label: tr('Coverage Details', 'Leistungsdetails'), href: '/service/coverage' },
        { label: tr('Ambulatory Surgery', 'Ambulante Operation'), href: '/service/ambulatory-surgery' },
      ],
    },
    {
      title: tr('Claims & Reimbursements', 'Rechnungen & Erstattungen'),
      description: tr('Submit claims and track their status', 'Rechnungen digital einreichen und den Status verfolgen'),
      href: '/service/claims',
      icon: <CreditCard className="h-6 w-6" />,
      items: [
        { label: tr('Submit a Claim', 'Rechnung einreichen'), href: '/service/claims/new' },
        { label: tr('Claim Status', 'Erstattungsstatus'), href: '/service/claims/status' },
        { label: tr('Payment History', 'Zahlungshistorie'), href: '/service/claims/history' },
      ],
    },
    {
      title: tr('Documents & Forms', 'Dokumente & Formulare'),
      description: tr('Download forms and access your documents', 'Formulare herunterladen und Dokumente abrufen'),
      href: '/service/documents',
      icon: <FileText className="h-6 w-6" />,
      items: [
        { label: tr('Download Forms', 'Formulare herunterladen'), href: '/service/documents' },
        { label: tr('Policy Documents', 'Vertragsdokumente'), href: '/service/documents/policy' },
        { label: tr('Certificates', 'Bescheinigungen'), href: '/service/documents/certificates' },
      ],
    },
    {
      title: tr('Appointments', 'Termine'),
      description: tr('Schedule consultations and manage appointments', 'Beratungstermine buchen und verwalten'),
      href: '/service/appointments',
      icon: <Calendar className="h-6 w-6" />,
      items: [
        { label: tr('Book Appointment', 'Termin buchen'), href: '/service/appointments/new' },
        { label: tr('My Appointments', 'Meine Termine'), href: '/service/appointments' },
        { label: tr('Find a Doctor', 'Arzt finden'), href: '/service/doctors' },
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-accent/50 border-b border-border">
        <div className="container-wide py-8">
          <Breadcrumbs
            items={[{ label: tr('Service', 'Service') }]}
            className="mb-4"
          />
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {tr('Service Center', 'Service-Center')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
            {tr(
              'Manage your insurance, submit claims, and access all the tools you need.',
              'Verwalten Sie Ihre Versicherung, reichen Sie Rechnungen ein und nutzen Sie alle Tools, die Sie brauchen.'
            )}
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            {tr('Quick Actions', 'Schnellaktionen')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              { label: tr('Submit Claim', 'Rechnung einreichen'), icon: <CreditCard />, href: '/service/claims/new' },
              { label: tr('Forms & Requests', 'Formulare & Anträge'), icon: <Download />, href: '/service/forms' },
              { label: tr('Personal Area', 'Persönlicher Bereich'), icon: <User />, href: '/service/personal' },
              { label: tr('Get Help', 'Hilfe'), icon: <HelpCircle />, href: '/help' },
            ].map((action) => (
              <Link key={action.label} to={action.href} className="group">
                <Card className="card-hover h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {action.icon}
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Service Categories */}
          <div className="grid gap-6 md:grid-cols-2">
            {serviceCategories.map((category) => (
              <Card key={category.title} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {category.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.href}
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              {item.label}
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {tr('Planning an Ambulatory Surgery?', 'Planen Sie eine ambulante Operation?')}
                  </h2>
                  <p className="text-muted-foreground">
                    {tr('Learn about coverage, submit notifications, and get certificates', 'Informieren Sie sich über Leistungen, reichen Sie Meldungen ein und erhalten Sie Bescheinigungen')}
                  </p>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link to="/service/ambulatory-surgery">
                  {tr('Learn More', 'Mehr erfahren')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
