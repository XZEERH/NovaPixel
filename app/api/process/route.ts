import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';
export const maxDuration = 120;

const API_KEY = 'kyzz5369077165784';
const API_BASE = 'https://api.kyzzz.xyz/api/tools';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ status: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    const blob = await put(`novapixel/${Date.now()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    if (!blob.url) {
      return NextResponse.json({ status: false, message: 'Upload gagal' }, { status: 502 });
    }

    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}&url=${encodeURIComponent(blob.url)}`
      : `${API_BASE}/upscale?apikey=${API_KEY}&url=${encodeURIComponent(blob.url)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 110000);

    const aiRes = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!aiRes.ok) {
      return NextResponse.json({ status: false, message: `AI API error: ${aiRes.status}` }, { status: 502 });
    }

    const aiData = await aiRes.json();
    const resultUrl = aiData.data || aiData.result || aiData.url;

    if (!resultUrl) {
      return NextResponse.json({ status: false, message: aiData.message || 'AI tidak mengembalikan hasil' }, { status: 502 });
    }

    return NextResponse.json({ status: true, result: resultUrl, original: blob.url });

  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json({
      status: false,
      message: isTimeout ? 'Timeout. Coba file lebih kecil.' : err.message || 'Terjadi kesalahan server',
    }, { status: 500 });
  }
}