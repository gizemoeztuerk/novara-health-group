/**
 * NOVARA Health Group - Mock Data
 * 
 * This file contains all mock data structures for CMS content.
 * In production, replace with API calls to your CMS/backend.
 */

// Navigation structure
export const navigation = {
  main: [
    {
      id: 'products',
      label: 'Products',
      labelDe: 'Produkte',
      href: '/products',
      children: [
        { id: 'full-insurance', label: 'Full Insurance', labelDe: 'Vollversicherung', href: '/products/full-insurance' },
        { id: 'corporate-health', label: 'Company Health Insurance', labelDe: 'Betriebliche Krankenversicherung', href: '/products/corporate-health' },
        { id: 'dog-insurance', label: 'Dog Insurance', labelDe: 'Hundeversicherung', href: '/products/supplementary/dog-insurance' },
        { id: 'dental', label: 'Dental Insurance', labelDe: 'Zahnversicherung', href: '/products/supplementary/dental' },
        { id: 'career-starters', label: 'Career Starters', labelDe: 'Berufseinsteiger', href: '/products/career-starters' },
        { id: 'retirees', label: 'Retirees', labelDe: 'Pensionäre', href: '/products/retirees' },
      ],
    },
    {
      id: 'health',
      label: 'Health & Prevention',
      labelDe: 'Ratgeber',
      href: '/health',
    },
    {
      id: 'service',
      label: 'Service',
      labelDe: 'Service',
      href: '/service',
      children: [
        { id: 'personal', label: 'Personal Area', labelDe: 'Persönlicher Bereich', href: '/service/personal' },
        { id: 'forms', label: 'Forms & Requests', labelDe: 'Formulare & Anträge', href: '/service/forms' },
        { id: 'my-insurance', label: 'My Health Insurance', labelDe: 'Meine Krankenversicherung', href: '/service/my-insurance' },
        { id: 'ambulatory-surgery', label: 'Ambulatory Surgery', labelDe: 'Ambulante Chirurgie', href: '/service/ambulatory-surgery' },
        { id: 'documents', label: 'Documents & Forms', labelDe: 'Dokumente & Formulare', href: '/service/documents' },
      ],
    },
    {
      id: 'brokers',
      label: 'For Brokers',
      labelDe: 'Für Makler',
      href: '/brokers',
    },
    {
      id: 'careers',
      label: 'Careers',
      labelDe: 'Karriere',
      href: '/careers',
    },
    {
      id: 'help',
      label: 'Help & Contact',
      labelDe: 'Hilfe & Kontakt',
      href: '/help',
      children: [
        { id: 'contact', label: 'Contact & FAQ', labelDe: 'Kontakt & FAQ', href: '/help' },
        { id: 'complaints', label: 'Complaints & Quality', labelDe: 'Beschwerden & Qualität', href: '/help/complaints' },
      ],
    },
  ],
  secondary: [
    { id: 'login', label: 'Login', labelDe: 'Anmelden', href: '/login' },
  ],
};

// Products data
export const products = {
  primary: [
    {
      id: 'full-insurance',
      slug: 'full-insurance',
      name: 'Full Insurance',
      nameDe: 'Vollversicherung',
      shortDescription: 'Comprehensive private health coverage with transparent options and digital service.',
      shortDescriptionDe: 'Umfassende private Krankenversicherung mit transparenten Optionen und digitalen Services.',
      price: 'individual quote',
      priceDe: 'individuelles Angebot',
      icon: 'shield',
      features: [
        'Choice of doctors and appointments',
        'Hospital comfort options (room/doctor)',
        'Digital claims and documents',
        'Preventive care and mental health support',
      ],
      featuresDe: [
        'Freie Arztwahl und Terminzugang',
        'Komfort im Krankenhaus (Zimmer/Arzt)',
        'Digitale Einreichung & Dokumente',
        'Vorsorge und Unterstützung bei mentaler Gesundheit',
      ],
    },
    {
      id: 'corporate-health',
      slug: 'corporate-health',
      name: 'Company Health Insurance',
      nameDe: 'Betriebliche Krankenversicherung (bKV)',
      shortDescription: 'Employer-sponsored health benefits to attract and retain talent.',
      shortDescriptionDe: 'Arbeitgeberfinanzierte Gesundheitsleistungen zur Mitarbeiterbindung und -gewinnung.',
      price: 'from €9.90/employee',
      priceDe: 'ab 9,90 €/Mitarbeiter',
      icon: 'building',
      features: [
        'Modular packages for companies',
        'Simple onboarding and payroll support',
        'Fast reimbursement for employees',
        'HR reporting and service hotline',
      ],
      featuresDe: [
        'Modulare Bausteine für Unternehmen',
        'Einfache Einführung & Lohnbuchhaltung',
        'Schnelle Erstattung für Mitarbeitende',
        'HR-Reports und Service-Hotline',
      ],
    },
  ],
  supplementary: [
    {
      id: 'dog-insurance',
      slug: 'dog-insurance',
      name: 'Dog Insurance',
      nameDe: 'Hundezusatzversicherung',
      shortDescription: 'Comprehensive protection for your four-legged family member',
      shortDescriptionDe: 'Umfassender Schutz für Ihr vierbeiniges Familienmitglied',
      price: 'from €19.90/month',
      priceDe: 'ab 19,90 €/Monat',
      icon: 'dog',
      features: [
        'Up to 100% coverage for vet costs',
        'Surgery and emergency care included',
        'No deductible options available',
        'Preventive care coverage',
      ],
      featuresDe: [
        'Bis zu 100% Erstattung der Tierarztkosten',
        'OP und Notfallbehandlung inklusive',
        'Optionen ohne Selbstbeteiligung',
        'Vorsorgeleistungen abgedeckt',
      ],
    },
    {
      id: 'dental',
      slug: 'dental',
      name: 'Dental Insurance',
      nameDe: 'Zahnzusatzversicherung',
      shortDescription: 'Keep smiling with complete comprehensive dental coverage',
      shortDescriptionDe: 'Behalten Sie Ihr Lächeln mit einer umfassenden Zahnversicherung',
      price: 'from €12.50/month',
      priceDe: 'ab 12,50 €/Monat',
      icon: 'smile',
      features: [
        '90% coverage for dental prosthetics',
        'Professional cleaning covered',
        'Orthodontics for children included',
        'No waiting period for basic care',
      ],
      featuresDe: [
        '90% Erstattung für Zahnersatz',
        'Professionelle Zahnreinigung inklusive',
        'Kieferorthopädie für Kinder enthalten',
        'Keine Wartezeit für Basisleistungen',
      ],
    },
  ],
  lifeStages: [
    {
      id: 'career-starters',
      slug: 'career-starters',
      icon: 'graduationCap',
      name: 'Career Starters',
      nameDe: 'Berufseinsteiger',
      shortDescription: 'Start your professional journey with the right coverage',
      shortDescriptionDe: 'Starten Sie Ihre Karriere mit dem richtigen Schutz',
      targetAge: '18-30',
      price: 'from €12.90/month',
      priceDe: 'ab 12,90 €/Monat',
      features: [
        'Affordable entry-level premiums',
        'Flexible upgrade options',
        'Mental health support included',
        'Digital health services',
      ],
      featuresDe: [
        'Günstige Einstiegsbeiträge',
        'Flexible Upgrade-Optionen',
        'Psychische Gesundheit inklusive',
        'Digitale Gesundheitsservices',
      ],
    },
    {
      id: 'retirees',
      slug: 'retirees',
      icon: 'heart',
      name: 'Retirees',
      nameDe: 'Pensionäre',
      shortDescription: 'Enjoy your retirement with peace of mind',
      shortDescriptionDe: 'Genießen Sie Ihren Ruhestand mit Sicherheit',
      targetAge: '60+',
      price: 'from €44.90/month',
      priceDe: 'ab 44,90 €/Monat',
      features: [
        'Comprehensive senior care',
        'Chronic condition management',
        'Home care support',
        'Medication cost coverage',
      ],
      featuresDe: [
        'Umfassende Versorgung im Alter',
        'Management chronischer Erkrankungen',
        'Unterstützung bei häuslicher Pflege',
        'Erstattung von Medikamentenkosten',
      ],
    },
  ],
};

// Jobs data
export const jobs = [
  {
    id: 'j1',
    title: 'Senior Software Engineer',
    titleDe: 'Senior Software Engineer (m/w/d)',
    department: 'Technology',
    departmentDe: 'Technologie',
    location: 'Pusemuckel',
    locationDe: 'Pusemuckel',
    type: 'Full-time',
    typeDe: 'Vollzeit',
    remote: 'Hybrid',
    remoteDe: 'Hybrid',
    postedDate: '2026-01-10',
    description: 'Join our digital transformation team to build the future of health insurance.',
    descriptionDe: 'Gestalten Sie die Zukunft der Krankenversicherung in unserem Digital-Team.',
    requirements: [
      '5+ years of experience in software development',
      'Expertise in React, TypeScript, and Node.js',
      'Experience with cloud platforms (AWS/GCP)',
      'Strong problem-solving skills',
    ],
    requirementsDe: [
      'Mindestens 5 Jahre Erfahrung in der Softwareentwicklung',
      'Sehr gute Kenntnisse in React, TypeScript und Node.js',
      'Erfahrung mit Cloud-Plattformen (AWS/GCP)',
      'Ausgeprägte Problemlösungsfähigkeiten',
    ],
    benefits: [
      '30 days vacation',
      'Flexible working hours',
      'Company health insurance',
      'Professional development budget',
    ],
    benefitsDe: [
      '30 Tage Urlaub',
      'Flexible Arbeitszeiten',
      'Betriebliche Krankenversicherung',
      'Budget für Weiterbildung und persönliche Entwicklung',
    ],
  },
  {
    id: 'j2',
    title: 'Customer Service Representative',
    titleDe: 'Kundenberater (m/w/d)',
    department: 'Customer Service',
    departmentDe: 'Kundenservice',
    location: 'Munich',
    locationDe: 'München',
    type: 'Full-time',
    typeDe: 'Vollzeit',
    remote: 'On-site',
    remoteDe: 'Vor Ort',
    postedDate: '2026-01-05',
    description: 'Help our customers navigate their health insurance journey with empathy and expertise.',
    descriptionDe: 'Unterstützen Sie unsere Kunden mit Empathie und Expertise.',
    requirements: [
      'Customer service experience',
      'Excellent communication skills',
      'German fluency required',
      'Health insurance knowledge a plus',
    ],
    requirementsDe: [
      'Erfahrung im Kundenservice',
      'Ausgezeichnete Kommunikationsfähigkeiten',
      'Sehr gute Deutschkenntnisse erforderlich',
      'Kenntnisse im Bereich Krankenversicherung von Vorteil',
    ],
    benefits: [
      '30 days vacation',
      'Training programs',
      'Company health insurance',
      'Team events',
    ],
    benefitsDe: [
      '30 Tage Urlaub',
      'Schulungs- und Trainingsprogramme',
      'Betriebliche Krankenversicherung',
      'Teamevents',
    ],
  },
  {
    id: 'j3',
    title: 'UX Designer',
    titleDe: 'UX Designer (m/w/d)',
    department: 'Design',
    departmentDe: 'Design',
    location: 'Hamburg',
    locationDe: 'Hamburg',
    type: 'Full-time',
    typeDe: 'Vollzeit',
    remote: 'Remote',
    remoteDe: 'Remote',
    postedDate: '2025-12-15',
    description: 'Create intuitive digital experiences that make health insurance accessible to everyone.',
    descriptionDe: 'Gestalten Sie intuitive digitale Erlebnisse für unsere Kunden.',
    requirements: [
      '3+ years UX design experience',
      'Proficiency in Figma',
      'User research skills',
      'Portfolio demonstrating healthcare/fintech projects',
    ],
    requirementsDe: [
      'Mindestens 3 Jahre Erfahrung im UX-Design',
      'Sehr gute Kenntnisse in Figma',
      'Erfahrung in User Research',
      'Portfolio mit Projekten im Healthcare- oder Fintech-Umfeld',
    ],
    benefits: [
      'Fully remote work',
      '30 days vacation',
      'Equipment budget',
      'Conference attendance',
    ],
    benefitsDe: [
      '100% Remote-Arbeit',
      '30 Tage Urlaub',
      'Budget für Equipment',
      'Teilnahme an Konferenzen',
    ],
  },
  {
    id: 'j4',
    title: 'Data Analyst',
    titleDe: 'Datenanalyst (m/w/d)',
    department: 'Analytics',
    departmentDe: 'Analytik',
    location: 'Pusemuckel',
    locationDe: 'Pusemuckel',
    type: 'Full-time',
    typeDe: 'Vollzeit',
    remote: 'Hybrid',
    remoteDe: 'Hybrid',
    postedDate: '2025-11-20',
    description: 'Turn data into insights that drive better health outcomes.',
    descriptionDe: 'Verwandeln Sie Daten in Erkenntnisse für bessere Gesundheit.',
    requirements: [
      '2+ years data analysis experience',
      'SQL and Python proficiency',
      'Experience with BI tools',
      'Statistical analysis skills',
    ],
    requirementsDe: [
      'Mindestens 2 Jahre Erfahrung in der Datenanalyse',
      'Sehr gute Kenntnisse in SQL und Python',
      'Erfahrung mit BI-Tools',
      'Kenntnisse in statistischer Analyse',
    ],
    benefits: [
      '30 days vacation',
      'Flexible hours',
      'Learning budget',
      'Stock options',
    ],
    benefitsDe: [
      '30 Tage Urlaub',
      'Flexible Arbeitszeiten',
      'Weiterbildungsbudget',
      'Aktienoptionen',
    ],
  },
];

// FAQ data
export const faqs = [
  {
    id: 'faq1',
    category: 'General',
    question: 'How do I submit a claim?',
    questionDe: 'Wie reiche ich eine Rechnung ein?',
    answer: 'You can submit claims through your customer portal, via our mobile app, or by e-mail. Simply upload a photo of your invoice and we\'ll process it within 5 business days.',
    answerDe: 'Sie können Rechnungen über Ihr Kundenportal, unsere App oder per E-Mail einreichen. Laden Sie einfach ein Foto Ihrer Rechnung hoch und wir bearbeiten sie innerhalb von 5 Werktagen.',
  },
  {
    id: 'faq2',
    category: 'Coverage',
    question: 'What is covered under ambulatory surgery?',
    questionDe: 'Was wird bei ambulanter Chirurgie abgedeckt?',
    answer: 'Ambulatory surgery coverage includes outpatient procedures, pre-operative consultations, anesthesia, and follow-up care. Check your policy details for specific coverage limits.',
    answerDe: 'Die ambulante Chirurgie umfasst ambulante Eingriffe, Voruntersuchungen, Narkose und Nachsorge. Prüfen Sie Ihre Police für spezifische Deckungsgrenzen.',
  },
  {
    id: 'faq3',
    category: 'Account',
    question: 'How do I reset my portal password?',
    questionDe: 'Wie setze ich mein Portal-Passwort zurück?',
    answer: 'Click "Forgot Password" on the login page and enter your e-mail. You\'ll receive a reset link within minutes.',
    answerDe: 'Klicken Sie auf "Passwort vergessen" auf der Anmeldeseite und geben Sie Ihre E-Mail ein. Sie erhalten innerhalb von Minuten einen Reset-Link.',
  },
];

// Ambulatory surgery checklist
export const ambulatorySurgeryChecklist = [
  {
    id: 'as1',
    title: 'Before the Procedure',
    titleDe: 'Vor dem Eingriff',
    items: [
      { id: 'as1-1', text: 'Notify NOVARA about your planned surgery', textDe: 'Informieren Sie NOVARA über Ihren geplanten Eingriff' },
      { id: 'as1-2', text: 'Request cost estimate from your provider', textDe: 'Fordern Sie einen Kostenvoranschlag an' },
      { id: 'as1-3', text: 'Submit pre-authorization if required', textDe: 'Reichen Sie ggf. die Vorabgenehmigung ein' },
      { id: 'as1-4', text: 'Confirm coverage with our team', textDe: 'Bestätigen Sie die Deckung mit unserem Team' },
    ],
  },
  {
    id: 'as2',
    title: 'Day of Surgery',
    titleDe: 'Am Tag des Eingriffs',
    items: [
      { id: 'as2-1', text: 'Bring your insurance card', textDe: 'Bringen Sie Ihre Versichertenkarte mit' },
      { id: 'as2-2', text: 'Have emergency contact ready', textDe: 'Halten Sie Notfallkontakte bereit' },
      { id: 'as2-3', text: 'Follow pre-surgery instructions', textDe: 'Befolgen Sie die Anweisungen vor dem Eingriff' },
    ],
  },
  {
    id: 'as3',
    title: 'After the Procedure',
    titleDe: 'Nach dem Eingriff',
    items: [
      { id: 'as3-1', text: 'Keep all receipts and invoices', textDe: 'Bewahren Sie alle Belege und Rechnungen auf' },
      { id: 'as3-2', text: 'Submit claims within 90 days', textDe: 'Reichen Sie Ansprüche innerhalb von 90 Tagen ein' },
      { id: 'as3-3', text: 'Schedule follow-up appointments', textDe: 'Vereinbaren Sie Nachsorgetermine' },
    ],
  },
];

// Documents for download
export const documents = [
  { id: 'doc1', name: 'Claim Form', nameDe: 'Antragsformular', type: 'PDF', size: '245 KB', category: 'Forms' },
  { id: 'doc2', name: 'Surgery Notification', nameDe: 'OP-Mitteilung', type: 'PDF', size: '180 KB', category: 'Forms' },
  { id: 'doc3', name: 'Cost Estimate Template', nameDe: 'Kostenvoranschlag-Vorlage', type: 'PDF', size: '120 KB', category: 'Templates' },
  { id: 'doc4', name: 'Coverage Guide 2024', nameDe: 'Leistungsübersicht 2024', type: 'PDF', size: '1.2 MB', category: 'Guides' },
];

// Homepage content
export const homepageContent = {
  hero: {
    headline: 'Your health. Your pace.',
    headlineDe: 'Deine Gesundheit. Dein Tempo.',
    subheadline: 'Modern health insurance that adapts to your life, not the other way around.',
    subheadlineDe: 'Moderne Krankenversicherung, die sich Ihrem Leben anpasst, nicht umgekehrt.',
    cta: 'Explore Products',
    ctaDe: 'Produkte entdecken',
  },
  entryTiles: [
    {
      id: 'customers',
      title: 'For Customers',
      titleDe: 'Für Kunden',
      description: 'Access your portal, submit claims, manage your policy',
      descriptionDe: 'Portal-Zugang, Rechnungen einreichen, Police verwalten',
      href: '/login?type=customer',
      icon: 'user',
    },
    {
      id: 'brokers',
      title: 'For Brokers',
      titleDe: 'Für Makler',
      description: 'Partner resources, commissions, client management',
      descriptionDe: 'Partner-Ressourcen, Provisionen, Kundenverwaltung',
      href: '/brokers',
      icon: 'briefcase',
    },
    {
      id: 'corporate',
      title: 'For Companies',
      titleDe: 'Für Unternehmen',
      description: 'Group insurance solutions for your employees',
      descriptionDe: 'Gruppenversicherungslösungen für Ihre Mitarbeiter',
      href: '/corporate',
      icon: 'building',
    },
    {
      id: 'careers',
      title: 'Careers',
      titleDe: 'Karriere',
      description: 'Join our team and shape the future of health',
      descriptionDe: 'Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der Gesundheit mit',
      href: '/careers',
      icon: 'users',
    },
  ],
  stats: [
    { value: '500K+', label: 'Customers', labelDe: 'Kunden' },
    { value: '98%', label: 'Satisfaction', labelDe: 'Zufriedenheit' },
    { value: '24h', label: 'Claim Processing', labelDe: 'Bearbeitungszeit' },
    { value: '50+', label: 'Years Experience', labelDe: 'Jahre Erfahrung' },
  ],
};

// Cookie consent categories
export const cookieCategories = [
  {
    id: 'necessary',
    name: 'Necessary',
    nameDe: 'Notwendig',
    description: 'Essential cookies required for the website to function properly.',
    descriptionDe: 'Essenzielle Cookies für die Grundfunktionen der Website.',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    nameDe: 'Analyse',
    description: 'Help us understand how visitors interact with our website.',
    descriptionDe: 'Helfen uns zu verstehen, wie Besucher unsere Website nutzen.',
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    nameDe: 'Marketing',
    description: 'Used to deliver personalized advertisements.',
    descriptionDe: 'Für personalisierte Werbung.',
    required: false,
  },
];

// Footer links
export const footerLinks = {
  company: [
    { label: 'About Us', labelDe: 'Über uns', href: '/about' },
    { label: 'Careers', labelDe: 'Karriere', href: '/careers' },
    { label: 'Press', labelDe: 'Presse', href: '/press' },
    { label: 'Contact', labelDe: 'Kontakt', href: '/help' },
  ],
  legal: [
    { label: 'Privacy Policy', labelDe: 'Datenschutz', href: '/privacy' },
    { label: 'Imprint', labelDe: 'Impressum', href: '/imprint' },
    { label: 'Terms of Service', labelDe: 'AGB', href: '/terms' },
    { label: 'Accessibility', labelDe: 'Barrierefreiheit', href: '/accessibility' },
    { label: 'Security', labelDe: 'Sicherheit', href: '/security' },
  ],
  products: [
    { label: 'Full Insurance', labelDe: 'Vollversicherung', href: '/products/full-insurance' },
    { label: 'Company Health Insurance', labelDe: 'Betriebliche Krankenversicherung', href: '/products/corporate-health' },
    { label: 'Dog Insurance', labelDe: 'Hundeversicherung', href: '/products/supplementary/dog-insurance' },
    { label: 'Dental Insurance', labelDe: 'Zahnversicherung', href: '/products/supplementary/dental' },
    { label: 'Career Starters', labelDe: 'Berufseinsteiger', href: '/products/career-starters' },
    { label: 'Retirees', labelDe: 'Pensionäre', href: '/products/retirees' },
  ],
  service: [
    { label: 'Customer Portal', labelDe: 'Kundenportal', href: '/login?type=customer' },
    { label: 'Submit Claim', labelDe: 'Rechnung einreichen', href: '/service/claims' },
    { label: 'Find Doctor', labelDe: 'Arzt finden', href: '/service/doctors' },
    { label: 'FAQ', labelDe: 'Häufige Fragen', href: '/help#faq' },
  ],
};

// Dog insurance application steps
export const dogInsuranceSteps = [
  {
    id: 1,
    title: 'Your Dog',
    titleDe: 'Ihr Hund',
    description: 'Tell us about your pet',
    descriptionDe: 'Erzählen Sie uns etwas über Ihr Haustier',
  },
  {
    id: 2,
    title: 'Coverage',
    titleDe: 'Schutz',
    description: 'Choose your coverage level',
    descriptionDe: 'Wählen Sie Ihren Schutzumfang',
  },
  {
    id: 3,
    title: 'Your Details',
    titleDe: 'Ihre Daten',
    description: 'Personal information',
    descriptionDe: 'Persönliche Angaben',
  },
  {
    id: 4,
    title: 'Review',
    titleDe: 'Überprüfung',
    description: 'Review and confirm',
    descriptionDe: 'Prüfen und bestätigen',
  },
  {
    id: 5,
    title: 'Complete',
    titleDe: 'Abschluss',
    description: 'Finalize your application',
    descriptionDe: 'Antrag abschließen',
  },
];

// Dog breeds for application form
export const dogBreeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Dachshund',
  'Yorkshire Terrier',
  'Mixed Breed',
  'Other',
];

// Coverage options
export const coverageOptions = [
  {
    id: 'basic',
    name: 'Basic',
    nameDe: 'Basis',
    price: '19.90',
    coverage: '70%',
    deductible: 250,
    features: ['Surgery coverage', 'Emergency care', 'Basic medication'],
    featuresDe: ['OP-Schutz', 'Notfallversorgung', 'Basis-Medikamente'],
  },
  {
    id: 'comfort',
    name: 'Comfort',
    nameDe: 'Komfort',
    price: '34.90',
    coverage: '85%',
    deductible: 150,
    features: ['All Basic features', 'Preventive care', 'Physiotherapy', 'Alternative medicine'],
    featuresDe: ['Alle Basis-Leistungen', 'Vorsorge', 'Physiotherapie', 'Alternative Heilmethoden'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    nameDe: 'Premium',
    price: '49.90',
    coverage: '100%',
    deductible: 0,
    features: ['All Comfort features', 'No deductible', 'Dental care', 'Behavioral therapy', 'Travel coverage'],
    featuresDe: ['Alle Komfort-Leistungen', 'Ohne Selbstbeteiligung', 'Zahnbehandlung', 'Verhaltenstherapie', 'Reiseschutz'],
  },
];

export const dentalOptions = [
  {
    id: 'basic',
    name: 'Dental Basic', 
    nameDe: 'Dental Basis',
    price: '9.90',
    coverage: '80% reimbursement', 
    coverageDe: '80% Erstattung',
    deductible: '0',
    features: ['Professional cleaning (1x/year)', 'Fillings included'],
    featuresDe: ['Professionelle Zahnreinigung (1×/Jahr)', 'Füllungen inklusive'], 
  },
  {
    id: 'smart',
    name: 'Dental Smart', 
    nameDe: 'Dental Smart',
    price: '18.90',
    coverage: '90% reimbursement', 
    coverageDe: '90% Erstattung',
    deductible: '0',
    features: ['Professional cleaning (2x/year)', 'Root canal treatment', 'Orthodontics'],
    featuresDe: ['Professionelle Zahnreinigung (2×/Jahr)', 'Wurzelbehandlung', 'Kieferorthopädie'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Dental Premium', 
    nameDe: 'Dental Premium',
    price: '29.90',
    coverage: '100% reimbursement', 
    coverageDe: '100% Erstattung',
    deductible: '0',
    features: ['Bleaching bonus', 'Implants & crowns', 'No waiting period'],
    featuresDe: ['Bleaching-Bonus', 'Implantate & Kronen', 'Keine Wartezeit'],
  },
];

export const careerPlan = [
  {
    id: 'basic',
    name: 'Basic',
    nameDe: 'Basis',
    price: '12.90',
    coverage: '70%',
    deductible: 150,
    features: ['Essential liability', 'Basic support'],
    featuresDe: ['Wichtige Haftpflicht', 'Basis-Support'],
  },
  {
    id: 'smart',
    name: 'SmartCare',
    nameDe: 'SmartCare',
    price: '19.90',
    coverage: '85%',
    deductible: 50,
    features: ['Global coverage', '24/7 hotline', 'Legal protection'],
    featuresDe: ['Weltweiter Schutz', '24/7 Hotline', 'Rechtsschutz'],
    recommended: true,
  },
  {
    id: 'plus',
    name: 'Plus',
    nameDe: 'Plus',
    price: '29.90',
    coverage: '100%',
    deductible: 0,
    features: ['Zero deductible', 'All-risk inclusion', 'Mental health bonus'],
    featuresDe: ['0 € Selbstbeteiligung', 'All-Risk Einschluss', 'Bonus für mentale Gesundheit'],
  },
];

export const retireePlan = [
  {
    id: 'silver',
    name: 'Silver Care',
    nameDe: 'Silver Care',
    price: '44.90',
    coverage: '70%',
    deductible: 250,
    features: ['Basic medication cover', 'Standard dental', 'GP visits'],
    featuresDe: ['Basis-Erstattung für Medikamente', 'Standard-Zahnleistungen', 'Hausarztbesuche'],
  },
  {
    id: 'gold',
    name: 'Gold Secure',
    nameDe: 'Gold Secure',
    price: '89.90',
    coverage: '85%',
    deductible: 150,
    features: ['Chronic condition support', 'Premium dental', 'Alternative medicine'],
    featuresDe: ['Support bei chronischen Erkrankungen', 'Premium-Zahnleistungen', 'Naturheilverfahren'],
    recommended: true,
  },
  {
    id: 'platinum',
    name: 'Platinum Plus',
    nameDe: 'Platinum Plus',
    price: '128.90',
    coverage: '100%',
    deductible: 0,
    features: ['Private room hospital', 'Home care support', 'Global travel health'],
    featuresDe: ['Einbettzimmer im Krankenhaus', 'Unterstützung bei häuslicher Pflege', 'Reisekrankenschutz weltweit'],
  },
];