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

    // Upload ke Catbox.moe — free, no signup, public URL, support image & video
    const catboxForm = new FormData();
    catboxForm.append('reqtype', 'fileupload');
    catboxForm.append('userhash', '');
    catboxForm.append('fileToUpload', file);

    const catboxRes = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: catboxForm,
    });

    if (!catboxRes.ok) {
      throw new Error(`Upload gagal: ${catboxRes.status}`);
    }

    // Catbox return plain text URL langsung
    const publicUrl = (await catboxRes.text()).trim();

    if (!publicUrl || !publicUrl.startsWith('http')) {
      throw new Error('URL publik tidak valid dari server upload');
    }

    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}&url=${encodeURIComponent(publicUrl)}`
      : `${API_BASE}/upscale?apikey=${API_KEY}&url=${encodeURIComponent(publicUrl)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 110000);

    const aiRes = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!aiRes.ok) {
      throw new Error(`AI API error: ${aiRes.status}`);
    }

    const aiData = await aiRes.json();
    const resultUrl = aiData.data || aiData.result || aiData.url;

    if (!resultUrl) {
      throw new Error(aiData.message || 'AI tidak mengembalikan hasil');
    }

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