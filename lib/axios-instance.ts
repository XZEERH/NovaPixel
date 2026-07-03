// lib/AxiosInstance.ts
import axios from 'axios';

const apiClient = axios.create({
  timeout: 300000, // 5 menit karena proses AI membutuhkan waktu lama
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menangani error secara global jika diperlukan
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;