import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ApplyStep = {
  id: number | string;
  title: string;
};

type ApplyStepperProps = {
  steps: ApplyStep[];
  currentStep: number;
};

export function ApplyStepper({ steps, currentStep }: ApplyStepperProps) {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-wide py-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'flex items-center gap-2 px-3 py-2 min-w-max',
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  index < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index === currentStep
                      ? 'border-2 border-primary bg-primary/10 text-primary'
                      : 'border-2 border-muted-foreground/30 text-muted-foreground'
                )}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
