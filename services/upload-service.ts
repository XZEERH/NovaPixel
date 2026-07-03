import { put } from '@vercel/blob';

export const uploadFile = async (file: File) => {
  // Catatan: Di production, token ini diambil dari process.env di Vercel
  const blob = await put(file.name, file, {
    access: 'public',
  });
  return blob.url;
};