import { NextRequest, NextResponse } from 'next/server';

// Ganti ke Node.js runtime agar tidak ada batasan 60 detik Edge
export const runtime = 'nodejs';
export const maxDuration = 120; // 2 menit maksimal

const API_KEY = 'kyzz5369077165784';
const API_BASE = 'https://api.kyzzz.xyz/api/tools';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const type = searchParams.get('type');

  if (!url) {
    return NextResponse.json({ status: false, message: 'URL required' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    // Timeout 110 detik agar ada ruang sebelum maxDuration 120 detik
    const timeoutId = setTimeout(() => controller.abort(), 110000);

    // Pilih endpoint berdasarkan type: video atau image
    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}&url=${encodeURIComponent(url)}`
      : `${API_BASE}/upscale?apikey=${API_KEY}&url=${encodeURIComponent(url)}`;

    const response = await fetch(endpoint, { signal: controller.signal });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { status: false, message: `API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Kyzzz API response: { status: true, data: "<url>" } atau { result: "<url>" }
    const finalUrl = data.data || data.result || data.url;

    if (!finalUrl) {
      return NextResponse.json(
        { status: false, message: data.message || 'API tidak mengembalikan hasil' },
        { status: 502 }
      );
    }

    return NextResponse.json({ status: true, result: finalUrl });

  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json(
      {
        status: false,
        message: isTimeout
          ? 'Timeout. API terlalu lama merespons. Coba file lebih kecil.'
          : err.message || 'Gagal menghubungi API',
      },
      { status: 500 }
    );
  }
}
