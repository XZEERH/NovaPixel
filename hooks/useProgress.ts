import { useState } from 'react';
import { AppStep } from '@/types/global';

export const useProgress = () => {
  const [step, setStep] = useState<AppStep>('idle');
  const [progress, setProgress] = useState(0);

  const updateStep = (newStep: AppStep, val: number) => {
    setStep(newStep);
    setProgress(val);
  };

  return { step, progress, updateStep };
};