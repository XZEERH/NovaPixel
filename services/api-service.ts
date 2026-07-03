import apiClient from '@/lib/axios-instance'; // GUNAKAN HURUF KECIL
import { AIResponse } from '@/types';

export const processMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  const { data } = await apiClient.get<AIResponse>(`/api/proxy`, {
    params: { url, type }
  });
  
  const finalUrl = data.result || data.url;
  if (!finalUrl) throw new Error(data.message || 'Failed to get result URL');
  return finalUrl;
};