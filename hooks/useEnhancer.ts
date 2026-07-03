import { useState } from 'react';
import { uploadFile } from '@/services/upload-service';

export const useEnhancer = (enhanceFn: (url: string) => Promise<string>) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [original, setOriginal] = useState<string | null>(null);

  const processFile = async (file: File) => {
    try {
      setStatus('processing');
      setStep(10); // Uploading
      
      const publicUrl = await uploadFile(file);
      setOriginal(publicUrl);
      setStep(30); // Preparing
      
      setStep(50); // Enhancing
      const enhancedUrl = await enhanceFn(publicUrl);
      
      setStep(80); // Rendering
      setResult(enhancedUrl);
      
      setStep(100); // Completed
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return { status, step, result, original, processFile };
};