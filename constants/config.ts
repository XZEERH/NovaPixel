import { ProcessStatus, StepDetail } from "@/types/global";

/**
 * Endpoint API External NovaPixel
 */
export const API_ENDPOINTS = {
  IMAGE_HD: 'https://api-faa.my.id/faa/hdv2',
  VIDEO_HD: 'https://api-faa.my.id/faa/hdvid',
};

/**
 * Konfigurasi Progress Bar dan Label sesuai Status Proses
 */
export const STEPS: Record<ProcessStatus, StepDetail> = {
  idle: { 
    label: 'Ready to enhance', 
    progress: 0 
  },
  uploading: { 
    label: 'Uploading to secure storage...', 
    progress: 20 
  },
  preparing: { 
    label: 'Initializing AI Engine...', 
    progress: 40 
  },
  enhancing: { 
    label: 'Analyzing and enhancing pixels...', 
    progress: 70 
  },
  rendering: { 
    label: 'Rendering high definition output...', 
    progress: 90 
  },
  completed: { 
    label: 'Process completed successfully', 
    progress: 100 
  },
  error: { 
    label: 'Processing failed', 
    progress: 0 
  },
};

/**
 * Konfigurasi Umum Aplikasi
 */
export const APP_CONFIG = {
  name: 'NovaPixel',
  tagline: 'Enhance Every Pixel.',
  description: 'Professional AI tool to upscale images and videos with cinematic quality.',
  maxImageSize: 10 * 1024 * 1024, // 10MB
  maxVideoSize: 50 * 1024 * 1024, // 50MB
};