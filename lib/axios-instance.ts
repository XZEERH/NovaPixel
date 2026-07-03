import axios from 'axios';

const apiClient = axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;