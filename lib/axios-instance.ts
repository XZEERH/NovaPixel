import axios from 'axios';

const apiClient = axios.create({
  timeout: 300000, // 5 menit
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;