"use client";

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { processMedia } from '@/services/api-service';
import { ProcessStatus } from '@/types/global';

export const useEnhancer = (type: 'image' | 'video') => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reset = () => {
    setStatus('idle');
    setOriginalUrl(null);
    setResultUrl(null);
    setErrorMessage(null);
  };

  const startProcessing = async (file: File) => {
    try {
      setErrorMessage(null);
      setResultUrl(null);
      setStatus('uploading');

      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      if (!blob.url) throw new Error('Upload gagal — tidak ada URL yang dikembalikan');

      setOriginalUrl(blob.url);
      setStatus('preparing');
      await new Promise(r => setTimeout(r, 800));

      setStatus('enhancing');
      const enhanced = await processMedia(blob.url, type);

      if (!enhanced) throw new Error('AI tidak mengembalikan hasil');

      setStatus('rendering');
      setResultUrl(enhanced);
      await new Promise(r => setTimeout(r, 500));

      setStatus('completed');
    } catch (error: any) {
      console.error('Enhancement Error:', error);
      setErrorMessage(error?.message || 'Terjadi kesalahan saat memproses');
      setStatus('error');
    }
  };

  return { status, originalUrl, resultUrl, errorMessage, reset, startProcessing };
};