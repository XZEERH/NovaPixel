export const API_BASE_URL = 'https://api.kyzzz.xyz/api/tools';
export const API_KEY = 'kyzz5369077165784';
export const ENDPOINTS = {
  // Dibetulkan: endpoint lama "/upscale" tidak sesuai docs resmi kyzzz
  IMAGE_HD: `${API_BASE_URL}/upscale-image/v2?apikey=${API_KEY}`,
  VIDEO_HD: `${API_BASE_URL}/upscale-vid?apikey=${API_KEY}`,
};
