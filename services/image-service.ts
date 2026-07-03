import apiClient from '@/lib/AxiosInstance';
import { ENDPOINTS } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const processImageHD = async (url: string): Promise<string> => {
  const { data } = await apiClient.get<ApiResponse>(ENDPOINTS.IMAGE_HD, {
    params: { url }
  });
  return data.result || data.url || '';
};