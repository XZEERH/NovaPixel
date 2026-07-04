import { useState } from 'react';
import { upload } from '@vercel/blob/client';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToBlob = async (file: File) => {
    setIsUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      return blob.url;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadToBlob, isUploading };
};