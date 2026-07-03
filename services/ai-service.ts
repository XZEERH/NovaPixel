import axios from 'axios';

export const enhanceMedia = async (url: string, type: 'image' | 'video'): Promise<string> => {
  const response = await axios.get('/api/enhance', {
    params: { url, type }
  });
  
  if (response.data.status === false) {
    throw new Error(response.data.message || 'Processing failed');
  }

  // Ambil URL hasil dari berbagai kemungkinan field response
  const resultUrl = response.data.result || response.data.url;
  if (!resultUrl) throw new Error('No result URL received');
  
  return resultUrl;
};