import apiClient from '@/lib/axios-instance'; // GUNAKAN HURUF KECIL
import { ENDPOINTS } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const processVideoHD = async (url: string): Promise<string> => {
  const { data } = await apiClient.get<ApiResponse>(ENDPOINTS.VIDEO_HD, {
    params: { url }
  });
  return data.result || data.url || '';
};