import axios from 'axios';
import { ApiResponse } from '@/types/api';

export const processMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  try {
    const { data } = await axios.get<ApiResponse>('/api/proxy', {
      params: { url, type },
      timeout: 295000, // sedikit di bawah edge timeout
    });

    const finalUrl = data.result || data.url;

    if (!finalUrl) {
      throw new Error(data.message || 'AI tidak mengembalikan hasil. Coba file lain.');
    }

    return finalUrl;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new Error('Proses AI timeout. Coba lagi dengan file lebih kecil.');
    }
    const msg = error.response?.data?.message || error.message || 'Gagal memproses';
    throw new Error(msg);
  }
};