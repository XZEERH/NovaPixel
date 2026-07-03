import apiClient from '@/lib/axios-instance';
import { AIResponse } from '@/types';

export const processMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  // Kita gunakan API internal route untuk menghindari CORS
  const { data } = await apiClient.get<AIResponse>(`/api/proxy`, {
    params: { url, type }
  });
  
  const finalUrl = data.result || data.url;
  if (!finalUrl) throw new Error(data.message || 'Failed to get result URL');
  return finalUrl;
};