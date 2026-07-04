import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/config';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const type = searchParams.get('type');

  if (!url) return NextResponse.json({ status: false, message: 'URL required' }, { status: 400 });

  try {
    const endpoint = type === 'video' ? API_ENDPOINTS.VIDEO_HD : API_ENDPOINTS.IMAGE_HD;
    const { data } = await axios.get(endpoint, {
      params: { url },
      timeout: 240000, // 4 menit
    });

    if (!data?.result && !data?.url) {
      return NextResponse.json(
        { status: false, message: data?.message || 'API tidak mengembalikan hasil. Coba file lain.' },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');
    return NextResponse.json(
      {
        status: false,
        message: isTimeout
          ? 'Proses AI timeout. File mungkin terlalu besar atau server sedang sibuk.'
          : err.response?.data?.message || err.message || 'AI API Error',
      },
      { status: 500 }
    );
  }
}