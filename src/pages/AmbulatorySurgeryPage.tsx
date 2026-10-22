import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ambulatorySurgeryChecklist, documents } from '@/data/mockData';
import { 
  Stethoscope, CheckCircle2, Download, FileText, Phone, 
  Mail, Info, ChevronDown, ChevronUp,
  Calendar, Send, CheckSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';

export default function AmbulatorySurgeryPage() {
  const { tr, pick } = useI18n();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>('as1');
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<string | null>(null);
  
  const [notificationData, setNotificationData] = useState({
    procedureType: '',
    hospitalName: '',
    scheduledDate: '',
    notes: '',
    agreeDataProcessing: false,
  });

  const [certificateData, setCertificateData] = useState({
    purpose: '',
    recipientName: '',
    deliveryMethod: 'e-mail',
    agreeDataProcessing: false,
  });

  const toggleItem = (id: string) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted('notification');
      setShowNotificationForm(false);
    }, 1000);
  };

  const handleCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted('certificate');
      setShowCertificateForm(false);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-accent/50 border-b border-border">
        <div className="container-wide py-8">
          <Breadcrumbs
            items={[
              { label: tr('Service', 'Service'), href: '/service' },
              { label: tr('My Health Insurance', 'Meine Krankenversicherung'), href: '/service/my-insurance' },
              { label: tr('Ambulatory Surgery', 'Ambulante Operationen') },
            ]}
            className="mb-4"
          />
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {tr('Ambulatory Surgery', 'Ambulante Operationen')}
              </h1>
              <p className="text-muted-foreground">
                {tr('Everything you need to know about outpatient procedures', 'Alles, was Sie über ambulante Eingriffe wissen müssen')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Messages */}
      {formSubmitted && (
        <div className="container-wide pt-6">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 animate-scale-in">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-foreground">
                  {formSubmitted === 'notification'
                    ? tr('Demo notification completed', 'Demo-Benachrichtigung abgeschlossen')
                    : tr('Demo request completed', 'Demo-Anfrage abgeschlossen')}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {tr(
                    'This request was simulated locally. No message or medical information was submitted.',
                    'Diese Anfrage wurde nur lokal simuliert. Es wurden keine Nachrichten oder Gesundheitsinformationen übermittelt.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-wide section-padding">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  {tr('What is Ambulatory Surgery?', 'Was ist eine ambulante Operation?')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  {tr(
                    "Ambulatory surgery, also known as outpatient or same-day surgery, refers to surgical procedures where you don't need to stay overnight in the hospital. You arrive, have your procedure, and return home the same day.",
                    'Ambulante Chirurgie, auch bekannt als tagesklinische Chirurgie, bezieht sich auf chirurgische Eingriffe, bei denen Sie nicht über Nacht im Krankenhaus bleiben müssen. Sie kommen an, lassen den Eingriff vornehmen und kehren noch am selben Tag nach Hause zurück.'
                  )}
                </p>
                <h4 className="text-foreground font-semibold mt-4">{tr('Coverage includes:', 'Der Schutz umfasst:')}</h4>
                <ul className="text-muted-foreground space-y-1">
                  {[
                    tr('Pre-operative consultations and examinations', 'Präoperative Beratungen und Untersuchungen'),
                    tr('Anesthesia and surgical fees', 'Anästhesie- und Chirurgengebühren'),
                    tr('Operating room and equipment costs', 'Kosten für Operationssaal und Ausrüstung'),
                    tr('Post-operative follow-up care', 'Postoperative Nachsorge'),
                    tr('Medications prescribed during treatment', 'Während der Behandlung verschriebene Medikamente')
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Info className="h-4 w-4 text-info shrink-0 mt-0.5" />
                    {tr(
                      'Coverage limits and specific inclusions depend on your policy. Please review your insurance documents or contact us for details.',
                      'Deckungsgrenzen und spezifische Einschlüsse hängen von Ihrer Police ab. Bitte überprüfen Sie Ihre Versicherungsunterlagen oder kontaktieren Sie uns für Details.'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  {tr('Surgery Checklist', 'OP-Checkliste')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ambulatorySurgeryChecklist.map((section) => (
                  <div key={section.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )}
                      className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-semibold text-foreground">{pick(section, 'title')}</span>
                      {expandedSection === section.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedSection === section.id && (
                      <div className="p-4 space-y-3 animate-slide-down">
                        {section.items.map((item) => (
                          <label
                            key={item.id}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                              checkedItems[item.id] ? "bg-primary/10" : "bg-muted/20 hover:bg-muted/40"
                            )}
                          >
                            <Checkbox
                              checked={checkedItems[item.id] || false}
                              onCheckedChange={() => toggleItem(item.id)}
                            />
                            <span className={cn(
                              "text-sm",
                              checkedItems[item.id] ? "text-primary line-through" : "text-foreground"
                            )}>
                              {pick(item, 'text')}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interactive Forms */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    {tr('Submit Surgery Notification', 'OP-Anmeldung einreichen')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showNotificationForm ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {tr('Let us know about your upcoming procedure so we can prepare your coverage.', 'Informieren Sie uns über Ihren bevorstehenden Eingriff, damit wir Ihren Versicherungsschutz vorbereiten können.')}
                      </p>
                      <Button onClick={() => setShowNotificationForm(true)} className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        {tr('Notify Us', 'Uns benachrichtigen')}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleNotificationSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="procedureType">{tr('Procedure Type', 'Art des Eingriffs')}</Label>
                        <Input
                          id="procedureType"
                          value={notificationData.procedureType}
                          onChange={(e) => setNotificationData({...notificationData, procedureType: e.target.value})}
                          placeholder={tr('e.g., Knee arthroscopy', 'z.B. Knie-Arthroskopie')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospitalName">{tr('Hospital/Clinic', 'Krankenhaus/Klinik')}</Label>
                        <Input
                          id="hospitalName"
                          value={notificationData.hospitalName}
                          onChange={(e) => setNotificationData({...notificationData, hospitalName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduledDate">{tr('Scheduled Date', 'Geplantes Datum')}</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={notificationData.scheduledDate}
                          onChange={(e) => setNotificationData({...notificationData, scheduledDate: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">{tr('Additional Notes', 'Zusätzliche Anmerkungen')}</Label>
                        <Textarea
                          id="notes"
                          value={notificationData.notes}
                          onChange={(e) => setNotificationData({...notificationData, notes: e.target.value})}
                          rows={2}
                        />
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="notificationDataProcessing"
                          checked={notificationData.agreeDataProcessing}
                          onCheckedChange={(checked) => setNotificationData({...notificationData, agreeDataProcessing: checked as boolean})}
                          required
                        />
                        <Label htmlFor="notificationDataProcessing" className="text-xs text-muted-foreground">
                          {tr('I understand that this is a simulation and will use fictional health data only', 'Mir ist bewusst, dass dies eine Simulation ist und ich nur erfundene Gesundheitsdaten verwende')}
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          <Send className="mr-2 h-4 w-4" />
                          {tr('Submit', 'Absenden')}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowNotificationForm(false)}>
                          {tr('Cancel', 'Abbrechen')}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    {tr('Request Certificate', 'Bescheinigung anfordern')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showCertificateForm ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {tr('Need a coverage certificate for your healthcare provider?', 'Benötigen Sie eine Versicherungsbestätigung für Ihren Leistungserbringer?')}
                      </p>
                      <Button onClick={() => setShowCertificateForm(true)} variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        {tr('Request Certificate', 'Bescheinigung anfordern')}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleCertificateSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="purpose">{tr('Purpose', 'Zweck')}</Label>
                        <Input
                          id="purpose"
                          value={certificateData.purpose}
                          onChange={(e) => setCertificateData({...certificateData, purpose: e.target.value})}
                          placeholder={tr('e.g., Pre-admission requirement', 'z.B. Aufnahmevoraussetzung')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientName">{tr('Recipient (Hospital/Doctor)', 'Empfänger (Krankenhaus/Arzt)')}</Label>
                        <Input
                          id="recipientName"
                          value={certificateData.recipientName}
                          onChange={(e) => setCertificateData({...certificateData, recipientName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="certificateDataProcessing"
                          checked={certificateData.agreeDataProcessing}
                          onCheckedChange={(checked) => setCertificateData({...certificateData, agreeDataProcessing: checked as boolean})}
                          required
                        />
                        <Label htmlFor="certificateDataProcessing" className="text-xs text-muted-foreground">
                          {tr('I understand this request is only simulated', 'Mir ist bewusst, dass diese Anfrage nur simuliert wird')}
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          <Send className="mr-2 h-4 w-4" />
                          {tr('Request', 'Anfordern')}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowCertificateForm(false)}>
                          {tr('Cancel', 'Abbrechen')}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  {tr('Downloads', 'Downloads')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {documents.filter(d => d.category === 'Forms' || d.name.includes('Surgery')).map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 group">
                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{pick(doc, 'name')}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">{tr('Need Help?', 'Brauchen Sie Hilfe?')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tr('Our surgery specialists are here to answer your questions.', 'Unsere Spezialisten für Operationen sind hier, um Ihre Fragen zu beantworten.')}
                </p>
                <div className="space-y-3">
                  <a href="tel:08001234567" className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">0800 123 4567</p>
                      <p className="text-xs text-muted-foreground">{tr('Free hotline', 'Kostenlose Hotline')}</p>
                    </div>
                  </a>
                  <a href="mailto:surgery@novara-health.example" className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">surgery@novara-health.example</p>
                      <p className="text-xs text-muted-foreground">{tr('Response within 24h', 'Antwort innerhalb von 24 Std.')}</p>
                    </div>
                  </a>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/help">{tr('Visit Help Center', 'Hilfecenter besuchen')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}