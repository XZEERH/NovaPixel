"use client";

import { useState } from 'react';
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

      const localPreview = URL.createObjectURL(file);
      setOriginalUrl(localPreview);

      setStatus('uploading');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      setStatus('preparing');
      await new Promise(r => setTimeout(r, 300));

      setStatus('enhancing');

      const res = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.status || !data.result) {
        throw new Error(data.message || 'AI tidak mengembalikan hasil');
      }

      if (data.original) {
        URL.revokeObjectURL(localPreview);
        setOriginalUrl(data.original);
      }

      setStatus('rendering');
      await new Promise(r => setTimeout(r, 400));

      setResultUrl(data.result);
      setStatus('completed');

    } catch (error: any) {
      console.error('Enhancement Error:', error);
      setErrorMessage(error?.message || 'Terjadi kesalahan saat memproses');
      setStatus('error');
    }
  };

  return { status, originalUrl, resultUrl, errorMessage, reset, startProcessing };
};