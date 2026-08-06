import { NextRequest, NextResponse } from 'next/server';

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

    // === Step 1: Upload ke tmpfiles.org untuk dapat URL publik sementara ===
    const uploadForm = new FormData();
    uploadForm.append('file', file);

    const uploadRes = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      return NextResponse.json({ status: false, message: 'Gagal upload file ke server sementara' }, { status: 502 });
    }

    const uploadData = await uploadRes.json();
    const tmpUrl: string | undefined = uploadData?.data?.url;

    if (!tmpUrl) {
      return NextResponse.json({ status: false, message: 'URL sementara tidak tersedia' }, { status: 502 });
    }

    // tmpfiles.org: https://tmpfiles.org/12345/img.jpg → direct: https://tmpfiles.org/dl/12345/img.jpg
    const directUrl = tmpUrl.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');

    // === Step 2: Kirim URL ke kyzzz AI API ===
    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}&url=${encodeURIComponent(directUrl)}`
      : `${API_BASE}/upscale?apikey=${API_KEY}&url=${encodeURIComponent(directUrl)}`;

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
      return NextResponse.json(
        { status: false, message: aiData.message || 'AI tidak mengembalikan hasil' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: true,
      result: resultUrl,
      original: directUrl,
    });

  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json(
      {
        status: false,
        message: isTimeout
          ? 'Timeout. Coba file ukuran lebih kecil.'
          : err.message || 'Terjadi kesalahan server',
      },
      { status: 500 }
    );
  }
}
