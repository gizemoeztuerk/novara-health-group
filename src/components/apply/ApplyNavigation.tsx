import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/LanguageContext';

type ApplyNavigationProps = {
  currentStep: number;
  stepsCount: number;
  isSubmitting?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

/**
 * Standard navigation for multi-step application flows.
 * Convention: steps are indexed 0..(stepsCount-1) and the success screen is at index stepsCount.
 */
export function ApplyNavigation({
  currentStep,
  stepsCount,
  isSubmitting = false,
  onBack,
  onNext,
  onSubmit,
}: ApplyNavigationProps) {
  const { tr } = useI18n();
  const successIndex = stepsCount;
  const submitIndex = stepsCount - 1;

  if (currentStep >= successIndex) return null;

  return (
    <div className="flex justify-between mt-8">
      <Button variant="outline" onClick={onBack} disabled={currentStep === 0}>
        <ArrowLeft className="mr-2 h-4 w-4" /> {tr('Back', 'Zurück')}
      </Button>
      {currentStep === submitIndex ? (
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? tr('Submitting…', 'Wird gesendet…') : tr('Submit application', 'Antrag absenden')}
        </Button>
      ) : (
        <Button onClick={onNext}>
          {tr('Continue', 'Weiter')} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
