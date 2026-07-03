import { useState } from 'react';
import { useUpload } from './useUpload';
import { useProgress } from './useProgress';
import { processImageHD } from '@/services/image-service';
import { ImageProcessData } from '@/types/image';

export const useImage = () => {
  const [data, setData] = useState<ImageProcessData | null>(null);
  const { uploadToBlob } = useUpload();
  const { step, updateStep } = useProgress();
  const [error, setError] = useState<string | null>(null);

  const enhance = async (file: File) => {
    try {
      setError(null);
      updateStep('uploading', 20);
      const url = await uploadToBlob(file);
      
      updateStep('preparing', 40);
      updateStep('enhancing', 70);
      const enhancedUrl = await processImageHD(url);
      
      updateStep('rendering', 90);
      setData({ originalUrl: url, enhancedUrl });
      updateStep('completed', 100);
    } catch (err: any) {
      setError(err.message || 'AI Processing failed');
      updateStep('idle', 0);
    }
  };

  return { enhance, data, step, error };
};