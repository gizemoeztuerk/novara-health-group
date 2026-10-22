import { useCallback, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DefaultValues, FieldValues, Resolver, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ZodSchema } from 'zod';

type Args<T extends FieldValues> = {
  /** The current step index (0-based). */
  currentStep: number;
  /** One schema per step. The last schema is also used for any steps beyond the array length. */
  stepSchemas: ZodSchema[];
  /** Default values for the entire multi-step form. */
  defaultValues: DefaultValues<T>;
  /** Optional RHF options (mode, reValidateMode, etc.). */
  options?: Omit<Parameters<typeof useForm<T>>[0], 'resolver' | 'defaultValues'>;
};

/**
 * React Hook Form + Zod, but validating only the current step.
 *
 * Why: In multi-step forms, validating the whole schema on every step leads to
 * errors for fields the user hasn't seen yet. This hook switches validation
 * schema based on the active step.
 */
export function useApplyZodForm<T extends FieldValues>({
  currentStep,
  stepSchemas,
  defaultValues,
  options,
}: Args<T>): UseFormReturn<T> {
  const stepRef = useRef(currentStep);
  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  const resolver: Resolver<T> = useCallback(async (values, ctx, rhfOptions) => {
    const idx = Math.min(stepRef.current, Math.max(stepSchemas.length - 1, 0));
    const schema = stepSchemas[idx] ?? stepSchemas[0];
    return zodResolver(schema)(values, ctx, rhfOptions);
  }, [stepSchemas]);

  return useForm<T>({
    resolver,
    defaultValues,
    mode: 'onTouched',
    ...options,
  });
}
