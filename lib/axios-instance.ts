import axios from 'axios';

const apiClient = axios.create({
  timeout: 120000, // API AI biasanya lama, set 2 menit
});

export default apiClient;