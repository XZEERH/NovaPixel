import { useState } from 'react';
import { put } from '@vercel/blob';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToBlob = async (file: File) => {
    setIsUploading(true);
    try {
      const blob = await put(file.name, file, { access: 'public' });
      return blob.url;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadToBlob, isUploading };
};