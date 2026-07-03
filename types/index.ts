export interface AIResponse {
  status: boolean;
  result?: string;
  url?: string; // Menangani variasi response API
  message?: string;
}

export type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

export interface FeatureProps {
  title: string;
  desc: string;
  icon: any;
  link: string;
  status: 'active' | 'soon';
}