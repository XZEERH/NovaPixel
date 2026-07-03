import apiClient from '@/lib/axios-instance';
import { API_ENDPOINTS } from '@/constants/config';

export const enhanceImage = async (imageUrl: string) => {
  const response = await apiClient.get(API_ENDPOINTS.IMAGE_HD, {
    params: { url: imageUrl }
  });
  return response.data.result || response.data.url;
};

export const enhanceVideo = async (videoUrl: string) => {
  const response = await apiClient.get(API_ENDPOINTS.VIDEO_HD, {
    params: { url: videoUrl }
  });
  return response.data.result || response.data.url;
};