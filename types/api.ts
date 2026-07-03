export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  result?: T;
  url?: string;
}