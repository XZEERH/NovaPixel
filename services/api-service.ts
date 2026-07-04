import axios from 'axios';
import { ApiResponse } from '@/types/api';

const API_ENDPOINTS = {
  IMAGE_HD: 'https://api-faa.my.id/faa/hdv2',
  VIDEO_HD: 'https://api-faa.my.id/faa/hdvid',
};

export const processMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  const endpoint = type === 'video' ? API_ENDPOINTS.VIDEO_HD : API_ENDPOINTS.IMAGE_HD;

  try {
    const { data } = await axios.get<ApiResponse>(endpoint, {
      params: { url },
      timeout: 600000, // 10 menit — tidak ada batas Vercel
    });

    const finalUrl = data.result || data.url;

    if (!finalUrl) {
      console.error('API FAA Response:', data);
      throw new Error(data.message || 'AI tidak mengembalikan hasil. Coba file lain.');
    }

    return finalUrl;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new Error('Proses AI timeout. File terlalu besar atau server sedang sibuk, coba lagi.');
    }
    const msg = error.response?.data?.message || error.message || 'Gagal menghubungi AI server';
    throw new Error(msg);
  }
};