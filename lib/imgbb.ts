// Helper untuk upload gambar ke ImgBB.
// Dipakai sebagai "tempat sementara" agar API upscale kyzzz bisa dipanggil
// dengan parameter ?url= alih-alih multipart file langsung.
// Catatan: ImgBB hanya menerima gambar, TIDAK bisa untuk video.
// Untuk video, gunakan Vercel Blob (lihat services/upload-service.ts / lib/vercel-blob.ts).

const IMGBB_API_KEY = '01f759822fbc3e94a25bc38f24e45d46';
const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

export async function uploadToImgBB(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');

  const form = new FormData();
  form.append('image', base64);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  let res: Response;
  try {
    res = await fetch(`${IMGBB_ENDPOINT}?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: form,
      signal: controller.signal,
    });
  } catch (err: any) {
    throw new Error(
      err?.name === 'AbortError'
        ? 'Timeout saat upload ke ImgBB'
        : `Gagal menghubungi ImgBB: ${err?.message || err}`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    const msg = json?.error?.message || `ImgBB upload failed (status ${res.status})`;
    throw new Error(msg);
  }

  const url: string | undefined = json.data?.url || json.data?.display_url;
  if (!url) {
    throw new Error('ImgBB tidak mengembalikan URL gambar');
  }

  return url;
}
