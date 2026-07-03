// types/global.ts

/**
 * Mendefinisikan status proses AI secara global.
 * Kita samakan AppStep dengan ProcessStatus agar tidak terjadi error import.
 */
export type ProcessStatus = 
  | 'idle' 
  | 'uploading' 
  | 'preparing' 
  | 'enhancing' 
  | 'rendering' 
  | 'completed' 
  | 'error';

// Alias untuk kompatibilitas komponen lama
export type AppStep = ProcessStatus;

export type ThemeMode = 'dark';

export interface StepDetail {
  label: string;
  progress: number;
}

export interface NavLink {
  name: string;
  href: string;
  icon?: any;
}