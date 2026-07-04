import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 300; // 5 menit

const API_ENDPOINTS = {
  IMAGE_HD: 'https://api-faa.my.id/faa/hdv2',
  VIDEO_HD: 'https://api-faa.my.id/faa/hdvid',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const type = searchParams.get('type');

  if (!url) {
    return NextResponse.json({ status: false, message: 'URL required' }, { status: 400 });
  }

  const endpoint = type === 'video' ? API_ENDPOINTS.VIDEO_HD : API_ENDPOINTS.IMAGE_HD;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 290000); // 4 menit 50 detik

    const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'NovaPixel/1.0' },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { status: false, message: `API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const finalUrl = data.result || data.url;

    if (!finalUrl) {
      return NextResponse.json(
        { status: false, message: data.message || 'AI tidak mengembalikan hasil' },
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
          ? 'Proses AI timeout (>5 menit). Coba file yang lebih kecil.'
          : err.message || 'Gagal menghubungi AI server',
      },
      { status: 500 }
    );
  }
}