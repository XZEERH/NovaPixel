// Re-export dari global.ts agar tidak ada duplicate type definition
export type { ProcessStatus, AppStep } from './global';

export interface AIResponse {
  status: boolean;
  result?: string;
  url?: string;
  message?: string;
}