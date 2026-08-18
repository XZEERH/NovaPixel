import { NextRequest, NextResponse } from 'next/server';
import { uploadToImgBB } from '@/lib/imgbb';
import { uploadVideoForHosting } from '@/lib/video-host';

export const runtime = 'nodejs';
export const maxDuration = 120;

const API_KEY = 'kyzz5369077165784';
const API_BASE = 'https://api.kyzzz.xyz/api/tools';

// Endpoint image dibetulkan ke /upscale-image/v2 (endpoint lama /upscale sudah tidak sesuai docs)
const IMAGE_ENDPOINT = `${API_BASE}/upscale-image/v2?apikey=${API_KEY}`;
const VIDEO_ENDPOINT = `${API_BASE}/upscale-vid?apikey=${API_KEY}`;

function extractResultUrl(data: any): string | null {
  return data?.data || data?.result || data?.url || null;
}

// Cara BARU: file di-host dulu (ImgBB untuk image, Vercel Blob untuk video),
// lalu kyzzz dipanggil dengan ?url=... (bukan multipart langsung).
// Ini untuk menghindari isu "proses enhancer tidak menghasilkan file" yang
// juga muncul di halaman docs resmi kyzzz saat upload file langsung.
async function callViaHostedUrl(endpoint: string, hostedUrl: string, signal: AbortSignal) {
  const res = await fetch(`${endpoint}&url=${encodeURIComponent(hostedUrl)}`, { signal });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`AI API error: ${res.status} - ${text.slice(0, 150)}`);
  }

  const data = JSON.parse(text);
  const resultUrl = extractResultUrl(data);
  if (!resultUrl) {
    throw new Error(data?.message || data?.error || 'AI tidak mengembalikan hasil (url mode)');
  }
  return resultUrl;
}

// Cara LAMA (dipertahankan sebagai fallback): kirim file langsung sebagai multipart.
// Field name dibetulkan dari "image" menjadi "file" sesuai docs kyzzz.
async function callViaMultipart(endpoint: string, file: File, signal: AbortSignal) {
  const form = new FormData();
  form.append('file', file, file.name);

  const res = await fetch(endpoint, { method: 'POST', body: form, signal });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`AI API error: ${res.status} - ${text.slice(0, 150)}`);
  }

  const data = JSON.parse(text);
  const resultUrl = extractResultUrl(data);
  if (!resultUrl) {
    throw new Error(data?.message || data?.error || 'AI tidak mengembalikan hasil (multipart mode)');
  }
  return resultUrl;
}

export async function POST(req: NextRequest) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 110000);

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ status: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    const endpoint = type === 'video' ? VIDEO_ENDPOINT : IMAGE_ENDPOINT;

    let resultUrl: string | null = null;
    let hostedUrl: string | null = null;
    const errors: string[] = [];

    // 1) Coba cara baru: host dulu filenya, lalu panggil kyzzz via ?url=
    try {
      hostedUrl = type === 'video'
        ? await uploadVideoForHosting(file)
        : await uploadToImgBB(file);

      resultUrl = await callViaHostedUrl(endpoint, hostedUrl, controller.signal);
    } catch (err: any) {
      errors.push(`[url-mode] ${err?.message || err}`);
    }

    // 2) Kalau cara baru gagal, fallback ke multipart langsung (field name sudah dibetulkan)
    if (!resultUrl) {
      try {
        resultUrl = await callViaMultipart(endpoint, file, controller.signal);
      } catch (err: any) {
        errors.push(`[multipart-mode] ${err?.message || err}`);
      }
    }

    clearTimeout(timeoutId);

    if (!resultUrl) {
      return NextResponse.json({
        status: false,
        message: errors.join(' | ') || 'Gagal memproses',
        // hostedUrl disertakan untuk debugging: kalau ini terisi, artinya
        // upload ke storage berhasil dan masalah murni ada di API enhancer-nya.
        hostedUrl,
      }, { status: 502 });
    }

    return NextResponse.json({ status: true, result: resultUrl, original: hostedUrl || undefined });

  } catch (err: any) {
    clearTimeout(timeoutId);
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json({
      status: false,
      message: isTimeout
        ? 'Timeout. Coba file lebih kecil.'
        : err.message || 'Terjadi kesalahan server',
    }, { status: 500 });
  }
}
