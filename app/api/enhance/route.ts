import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/config';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');
  const type = searchParams.get('type'); // 'image' atau 'video'

  if (!targetUrl) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

  try {
    const endpoint = type === 'video' ? API_ENDPOINTS.VIDEO_HD : API_ENDPOINTS.IMAGE_HD;
    
    const response = await axios.get(endpoint, {
      params: { url: targetUrl },
      timeout: 150000, // Timeout panjang untuk proses AI
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'AI Enhancement failed' },
      { status: 500 }
    );
  }
}