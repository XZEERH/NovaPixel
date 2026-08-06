import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

const API_KEY = 'kyzz5369077165784';
const API_BASE = 'https://api.kyzzz.xyz/api/tools';
const IMGBB_KEY = '1771bef0a804415dcb82b2b9d9dc5034';

async function uploadToImgBB(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');

  const body = new URLSearchParams();
  body.append('key', IMGBB_KEY);
  body.append('image', base64);
  body.append('expiration', '3600');

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`ImgBB upload gagal: ${res.status}`);

  const data = await res.json();
  const url = data?.data?.url;
  if (!url) throw new Error('ImgBB tidak mengembalikan URL');
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ status: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    let publicUrl: string;

    if (type === 'video') {
      const videoForm = new FormData();
      videoForm.append('file', file);

      const res = await fetch('https://file.io/?expires=1h', {
        method: 'POST',
        body: videoForm,
      });

      if (!res.ok) throw new Error(`Upload video gagal: ${res.status}`);

      const data = await res.json();
      publicUrl = data?.link;
      if (!publicUrl) throw new Error('URL video tidak tersedia');

    } else {
      publicUrl = await uploadToImgBB(file);
    }

    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}&url=${encodeURIComponent(publicUrl)}`
      : `${API_BASE}/upscale?apikey=${API_KEY}&url=${encodeURIComponent(publicUrl)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 110000);

    const aiRes = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!aiRes.ok) throw new Error(`AI API error: ${aiRes.status}`);

    const aiData = await aiRes.json();
    const resultUrl = aiData.data || aiData.result || aiData.url;

    if (!resultUrl) throw new Error(aiData.message || 'AI tidak mengembalikan hasil');

    return NextResponse.json({ status: true, result: resultUrl });

  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json({
      status: false,
      message: isTimeout
        ? 'Timeout. Coba file lebih kecil.'
        : err.message || 'Terjadi kesalahan server',
    }, { status: 500 });
  }
}