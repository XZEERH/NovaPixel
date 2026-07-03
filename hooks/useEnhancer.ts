import { useState } from 'react';
import { put } from '@vercel/blob';
import { processMedia } from '@/services/api-service';
import { ProcessStatus } from '@/types';

export const useEnhancer = (type: 'image' | 'video') => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const startProcessing = async (file: File) => {
    try {
      setStatus('uploading');
      const blob = await put(file.name, file, { access: 'public', handleUploadUrl: '/api/upload' });
      setOriginalUrl(blob.url);

      setStatus('preparing');
      setStatus('enhancing');
      
      const enhanced = await processMedia(blob.url, type);
      
      setStatus('rendering');
      setResultUrl(enhanced);
      setStatus('completed');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return { status, originalUrl, resultUrl, startProcessing };
};