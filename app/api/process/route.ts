import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

const KYZZZ_KEY = 'kyzz5369077165784';
const IMGBB_KEY = '1771bef0a804415dcb82b2b9d9dc5034';

// API image upscaler pengganti kyzzz yaitu theresav (kyzzz sering down).
const THERESAV_KEY = 'luZ0Z';
const THERESAV_ENDPOINT = 'https://api.theresav.biz.id/tools/hd';
const THERESAV_DEFAULT_SCALE = '4';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ status: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    if (type === 'video') {
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString('base64');

      const imgbbBody = new URLSearchParams();
      imgbbBody.append('key', IMGBB_KEY);
      imgbbBody.append('image', base64);
      imgbbBody.append('expiration', '3600');

      const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: imgbbBody.toString(),
      });

      if (!imgbbRes.ok) throw new Error(`Upload video gagal: ${imgbbRes.status}`);

      const imgbbData = await imgbbRes.json();
      const videoUrl = imgbbData?.data?.url;
      if (!videoUrl) throw new Error('URL video tidak tersedia');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 110000);

      const aiRes = await fetch(
        `https://api.kyzzz.xyz/api/tools/upscale-vid?apikey=${KYZZZ_KEY}&url=${encodeURIComponent(videoUrl)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!aiRes.ok) throw new Error(`AI API error: ${aiRes.status}`);

      const aiData = await aiRes.json();
      const resultUrl = aiData.data || aiData.result || aiData.url;
      if (!resultUrl) throw new Error(aiData.message || 'AI tidak mengembalikan hasil');

      return NextResponse.json({ status: true, result: resultUrl });

    } else {
      // IMAGE: Kirim file langsung ke theresav /tools/hd via multipart (pengganti kyzzz)
      // scale bisa dikirim dari client (untuk fitur retry scale nanti), default '4'
      const scale = (formData.get('scale') as string) || THERESAV_DEFAULT_SCALE;

      const theresavForm = new FormData();
      theresavForm.append('scale', scale);
      theresavForm.append('apikey', THERESAV_KEY);
      theresavForm.append('image', file, file.name);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 110000);

      const aiRes = await fetch(THERESAV_ENDPOINT, {
        method: 'POST',
        body: theresavForm,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!aiRes.ok) {
        const errText = await aiRes.text().catch(() => '');
        throw new Error(`AI API error: ${aiRes.status} - ${errText.slice(0, 150)}`);
      }

      const contentType = aiRes.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const aiData = await aiRes.json();
        const resultUrl =
          aiData.data || aiData.result || aiData.url || aiData.output || aiData.image || aiData.link;
        if (!resultUrl) throw new Error(aiData.message || 'AI tidak mengembalikan hasil');
        return NextResponse.json({ status: true, result: resultUrl });
      }

      if (contentType.includes('image/')) {
        const buffer = Buffer.from(await aiRes.arrayBuffer());
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${contentType};base64,${base64}`;
        return NextResponse.json({ status: true, result: dataUrl });
      }

      const text = await aiRes.text();
      try {
        const parsed = JSON.parse(text);
        const resultUrl =
          parsed.data || parsed.result || parsed.url || parsed.output || parsed.image || parsed.link;
        if (!resultUrl) throw new Error(parsed.message || 'Format response tidak dikenal');
        return NextResponse.json({ status: true, result: resultUrl });
      } catch {
        throw new Error(`Response tidak valid: ${text.slice(0, 150)}`);
      }
    }

  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    return NextResponse.json({
      status: false,
      message: isTimeout
        ? 'Timeout. Coba file ukuran lebih kecil.'
        : err.message || 'Terjadi kesalahan server',
    }, { status: 500 });
  }
}