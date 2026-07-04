"use client";

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { processMedia } from '@/services/api-service';
import { ProcessStatus } from '@/types/global';

export const useEnhancer = (type: 'image' | 'video') => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const startProcessing = async (file: File) => {
    try {
      setResultUrl(null); // Reset hasil lama
      setStatus('uploading');
      
      // Tahap 20%: Upload ke Vercel Blob
      const blob = await upload(file.name, file, { 
        access: 'public', 
        handleUploadUrl: '/api/upload' 
      });
      
      if (!blob.url) throw new Error("Upload failed - No URL returned");
      
      setOriginalUrl(blob.url);
      console.log("File uploaded to:", blob.url);

      // Tahap 40%: Preparing
      setStatus('preparing');
      await new Promise(r => setTimeout(r, 1000)); // Simulasi persiapan
      
      // Tahap 70%: Enhancing (Memanggil API Proxy)
      setStatus('enhancing');
      const enhanced = await processMedia(blob.url, type);
      
      if (!enhanced) throw new Error("AI Processing returned empty result");

      // Tahap 90%: Rendering
      setStatus('rendering');
      setResultUrl(enhanced);
      
      // Tahap 100%: Completed
      setStatus('completed');
    } catch (error: any) {
      console.error("Enhancement Error Log:", error);
      setStatus('error');
      // Jangan langsung balik ke idle agar user bisa lihat pesan error di console
    }
  };

  return { status, originalUrl, resultUrl, startProcessing };
};