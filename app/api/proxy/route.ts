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
    const { data } = await axios.get(endpoint, { params: { url } });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ status: false, message: 'AI API Error' }, { status: 500 });
  }
}