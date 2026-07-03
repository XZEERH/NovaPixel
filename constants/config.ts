export const API_ENDPOINTS = {
  IMAGE_HD: 'https://api-faa.my.id/faa/hdv2',
  VIDEO_HD: 'https://api-faa.my.id/faa/hdvid',
};

export const STEPS: Record<ProcessStatus, { label: string; progress: number }> = {
  idle: { label: 'Ready', progress: 0 },
  uploading: { label: 'Uploading File...', progress: 20 },
  preparing: { label: 'Preparing AI Engine...', progress: 40 },
  enhancing: { label: 'Enhancing Pixels...', progress: 70 },
  rendering: { label: 'Rendering Final Output...', progress: 90 },
  completed: { label: 'Task Completed', progress: 100 },
  error: { label: 'Error Occurred', progress: 0 },
};