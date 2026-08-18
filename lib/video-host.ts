import { put } from '@vercel/blob';

// ImgBB cuma menerima gambar, jadi untuk video kita pakai Vercel Blob
// (sudah jadi dependency proyek ini - lihat services/upload-service.ts)
// supaya video juga punya URL publik sebelum dikirim ke API upscale-vid.
export async function uploadVideoForHosting(file: File): Promise<string> {
  const blob = await put(`novapixel/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });
  return blob.url;
}
