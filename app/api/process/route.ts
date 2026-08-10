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

    // Kirim file langsung ke kyzzz via POST multipart (sesuai curl docs)
    const kyzzzForm = new FormData();
    kyzzzForm.append('image', file, file.name);
    kyzzzForm.append('url', '');

    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}`
      : `${API_BASE}/upscale?apikey=${API_KEY}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 110000);

    const aiRes = await fetch(endpoint, {
      method: 'POST',
      body: kyzzzForm,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!aiRes.ok) {
      const errText = await aiRes.text().catch(() => '');
      throw new Error(`AI API error: ${aiRes.status} - ${errText.slice(0, 100)}`);
    }

    const contentType = aiRes.headers.get('content-type') || '';

    // Response JSON (URL hasil)
    if (contentType.includes('application/json')) {
      const aiData = await aiRes.json();
      const resultUrl = aiData.data || aiData.result || aiData.url;
      if (!resultUrl) throw new Error(aiData.message || 'AI tidak mengembalikan hasil');
      return NextResponse.json({ status: true, result: resultUrl });
    }

    // Response binary image/video langsung
    if (contentType.includes('image/') || contentType.includes('video/')) {
      const buffer = Buffer.from(await aiRes.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${contentType};base64,${base64}`;
      return NextResponse.json({ status: true, result: dataUrl });
    }

    // Fallback parse text
    const text = await aiRes.text();
    try {
      const parsed = JSON.parse(text);
      const resultUrl = parsed.data || parsed.result || parsed.url;
      if (!resultUrl) throw new Error(parsed.message || 'Format response tidak dikenal');
      return NextResponse.json({ status: true, result: resultUrl });
    } catch {
      throw new Error(`Response tidak valid: ${text.slice(0, 150)}`);
    }

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