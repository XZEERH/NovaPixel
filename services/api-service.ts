import apiClient from '@/lib/axios-instance';
import { ApiResponse } from '@/types/api';

export const processMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  try {
    const { data } = await apiClient.get<ApiResponse>(`/api/proxy`, {
      params: { url, type },
      // Menunggu hingga 5 menit karena proses video AI sangat lama
      timeout: 300000 
    });
    
    // API FAA terkadang mengembalikan .result atau .url
    const finalUrl = data.result || data.url;
    
    if (!finalUrl) {
      console.error("API Response Data:", data);
      throw new Error(data.message || "AI Engine did not provide a result URL");
    }
    
    return finalUrl;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || "Unknown AI Proxy Error";
    throw new Error(errorMsg);
  }
};