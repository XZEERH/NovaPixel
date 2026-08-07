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

async function callKyzzzAPI(endpoint: string, publicUrl: string): Promise<string> {
  // Coba GET dulu
  const getRes = await fetch(`${endpoint}&url=${encodeURIComponent(publicUrl)}`);

  if (getRes.status === 405) {
    // Fallback ke POST jika GET ditolak
    const postRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: publicUrl }),
    });

    if (!postRes.ok) throw new Error(`AI API error: ${postRes.status}`);
    const postData = await postRes.json();
    const result = postData.data || postData.result || postData.url;
    if (!result) throw new Error(postData.message || 'AI tidak mengembalikan hasil');
    return result;
  }

  if (!getRes.ok) throw new Error(`AI API error: ${getRes.status}`);
  const getData = await getRes.json();
  const result = getData.data || getData.result || getData.url;
  if (!result) throw new Error(getData.message || 'AI tidak mengembalikan hasil');
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ status: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    const publicUrl = await uploadToImgBB(file);

    const endpoint = type === 'video'
      ? `${API_BASE}/upscale-vid?apikey=${API_KEY}`
      : `${API_BASE}/upscale?apikey=${API_KEY}`;

    const resultUrl = await callKyzzzAPI(endpoint, publicUrl);

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