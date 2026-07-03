/**
 * Status proses AI dari awal hingga selesai
 */
export type ProcessStatus = 
  | 'idle' 
  | 'uploading' 
  | 'preparing' 
  | 'enhancing' 
  | 'rendering' 
  | 'completed' 
  | 'error';

/**
 * Tema aplikasi
 */
export type ThemeMode = 'dark';

/**
 * Struktur data untuk navigasi
 */
export interface NavLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

/**
 * Struktur data untuk step progress
 */
export interface StepDetail {
  label: string;
  progress: number;
}