import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const type = searchParams.get('type');

  if (!url) {
    return NextResponse.json({ status: false, message: 'URL required' }, { status: 400 });
  }

  // Video belum tersedia
  if (type === 'video') {
    return NextResponse.json(
      { status: false, message: 'Video HD coming soon' },
      { status: 501 }
    );
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    const response = await fetch(
      `https://api.siputzx.my.id/api/tools/upscale?url=${encodeURIComponent(url)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { status: false, message: `API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();

    // siputzx response: { status: true, data: "<url>" }
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
          ? 'Timeout. Coba gambar dengan ukuran lebih kecil.'
          : err.message || 'Gagal menghubungi API',
      },
      { status: 500 }
    );
  }
}