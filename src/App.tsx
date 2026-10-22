import { lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PressPage = lazy(() => import("./pages/PressPage"));
const HealthPage = lazy(() => import("./pages/HealthPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const DogInsurancePage = lazy(() => import("./pages/DogInsurancePage"));
const DogInsuranceApplyPage = lazy(() => import("./pages/DogInsuranceApplyPage"));
const DentalInsurancePage = lazy(() => import("./pages/DentalInsurancePage"));
const DentalInsuranceApplyPage = lazy(() => import("./pages/DentalInsuranceApplyPage"));
const CareerStartersPage = lazy(() => import("./pages/CareerStartersPage"));
const CareerStartersApplyPage = lazy(() => import("./pages/CareerStartersApplyPage"));
const RetireesPage = lazy(() => import("./pages/RetireesPage"));
const RetireesApplyPage = lazy(() => import("./pages/RetireesApplyPage"));
const FullInsurancePage = lazy(() => import("./pages/FullInsurancePage"));
const CorporateHealthInsurancePage = lazy(() => import("./pages/CorporateHealthInsurancePage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const MyInsurancePage = lazy(() => import("./pages/MyInsurancePage"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));
const FormsHubPage = lazy(() => import("./pages/FormsHubPage"));
const CoveragePage = lazy(() => import("./pages/CoveragePage"));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage"));
const ClaimsPage = lazy(() => import("./pages/ClaimsPage"));
const ClaimNewPage = lazy(() => import("./pages/ClaimNewPage"));
const ClaimStatusPage = lazy(() => import("./pages/ClaimStatusPage"));
const ClaimHistoryPage = lazy(() => import("./pages/ClaimHistoryPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const AppointmentsPage = lazy(() => import("./pages/AppointmentsPage"));
const AppointmentNewPage = lazy(() => import("./pages/AppointmentNewPage"));
const AmbulatorySurgeryPage = lazy(() => import("./pages/AmbulatorySurgeryPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const SpeculativeApplicationPage = lazy(() => import("./pages/SpeculativeApplicationPage"));
const BrokersPage = lazy(() => import("./pages/BrokersPage"));
const BrokersApplyPage = lazy(() => import("./pages/BrokersApplyPage"));
const CorporatePage = lazy(() => import("./pages/CorporatePage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const ComplaintsPage = lazy(() => import("./pages/ComplaintsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ImprintPage = lazy(() => import("./pages/ImprintPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/press" element={<PressPage />} />

            {/* Content */}
            <Route path="/health" element={<HealthPage />} />
            
            {/* Products */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/supplementary" element={<ProductsPage />} />
            <Route path="/products/supplementary/dog-insurance" element={<DogInsurancePage />} />
            <Route path="/products/supplementary/dog-insurance/apply" element={<DogInsuranceApplyPage />} />
            <Route path="/products/supplementary/dental" element={<DentalInsurancePage />} />
            <Route path="/products/supplementary/dental/apply" element={<DentalInsuranceApplyPage />} />
            <Route path="/products/career-starters" element={<CareerStartersPage />} />
            <Route path="/products/career-starters/apply" element={<CareerStartersApplyPage />} />
            <Route path="/products/retirees" element={<RetireesPage />} />
            <Route path="/products/retirees/apply" element={<RetireesApplyPage />} />
            <Route path="/products/full-insurance" element={<FullInsurancePage />} />
            <Route path="/products/corporate-health" element={<CorporateHealthInsurancePage />} />
            
            {/* Service */}
            <Route path="/service" element={<ServicePage />} />
            <Route path="/service/personal" element={<PersonalPage />} />
            <Route path="/service/forms" element={<FormsHubPage />} />
            <Route path="/service/my-insurance" element={<MyInsurancePage />} />
            <Route path="/service/coverage" element={<CoveragePage />} />
            <Route path="/service/ambulatory-surgery" element={<AmbulatorySurgeryPage />} />

            <Route path="/service/documents" element={<DocumentsPage />} />
            <Route path="/service/documents/policy" element={<DocumentsPage />} />
            <Route path="/service/documents/certificates" element={<DocumentsPage />} />

            <Route path="/service/claims" element={<ClaimsPage />} />
            <Route path="/service/claims/new" element={<ClaimNewPage />} />
            <Route path="/service/claims/status" element={<ClaimStatusPage />} />
            <Route path="/service/claims/history" element={<ClaimHistoryPage />} />

            <Route path="/service/doctors" element={<DoctorsPage />} />

            <Route path="/service/appointments" element={<AppointmentsPage />} />
            <Route path="/service/appointments/new" element={<AppointmentNewPage />} />
            
            {/* Careers */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/speculative" element={<SpeculativeApplicationPage />} />
            <Route path="/careers/:jobId" element={<JobDetailPage />} />
            
            {/* Other pages */}
            <Route path="/brokers" element={<BrokersPage />} />
            <Route path="/brokers/apply" element={<BrokersApplyPage />} />
            <Route path="/corporate" element={<CorporatePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/help/complaints" element={<ComplaintsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/imprint" element={<ImprintPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/security" element={<SecurityPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
