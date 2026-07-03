export const API_ENDPOINTS = {
  IMAGE_HD: 'https://api-faa.my.id/faa/hdv2',
  VIDEO_HD: 'https://api-faa.my.id/faa/hdvid',
};

export const PROCESSING_STEPS = [
  { id: 'uploading', label: 'Uploading...', weight: 20 },
  { id: 'preparing', label: 'Preparing AI...', weight: 40 },
  { id: 'enhancing', label: 'Enhancing...', weight: 70 },
  { id: 'rendering', label: 'Rendering...', weight: 90 },
  { id: 'completed', label: 'Completed', weight: 100 },
];