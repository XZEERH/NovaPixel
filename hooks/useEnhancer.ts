"use client";

import { useState } from 'react';
import { upload } from '@vercel/blob/client'; // Menggunakan 'upload' dari client package
import { processMedia } from '@/services/api-service';
import { ProcessStatus } from '@/types/global';

export const useEnhancer = (type: 'image' | 'video') => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const startProcessing = async (file: File) => {
    try {
      setStatus('uploading');
      
      // Gunakan fungsi upload (bukan put) untuk client-side
      const blob = await upload(file.name, file, { 
        access: 'public', 
        handleUploadUrl: '/api/upload' 
      });
      
      setOriginalUrl(blob.url);

      setStatus('preparing');
      // Simulasi delay engine
      await new Promise(r => setTimeout(r, 1000));
      
      setStatus('enhancing');
      const enhanced = await processMedia(blob.url, type);
      
      setStatus('rendering');
      setResultUrl(enhanced);
      setStatus('completed');
    } catch (error) {
      console.error("Enhancement Error:", error);
      setStatus('error');
    }
  };

  return { status, originalUrl, resultUrl, startProcessing };
};