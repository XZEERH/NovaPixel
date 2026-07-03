export type ProcessStatus = 'idle' | 'uploading' | 'preparing' | 'enhancing' | 'rendering' | 'completed' | 'error';

export interface AIResponse {
  status: boolean;
  result?: string;
  url?: string;
  message?: string;
}