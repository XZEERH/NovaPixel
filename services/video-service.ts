import apiClient from '@/lib/AxiosInstance';
import { ENDPOINTS } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const processVideoHD = async (url: string): Promise<string> => {
  try {
    const { data } = await apiClient.get<ApiResponse>(ENDPOINTS.VIDEO_HD, {
      params: { url }
    });

    const resultUrl = data.result || data.url;
    if (!resultUrl) throw new Error(data.message || 'Result URL not found');

    return resultUrl;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to process Video HD');
  }
};