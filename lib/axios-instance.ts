import axios from 'axios';
const apiClient = axios.create({ timeout: 300000 }); // 5 Menit
export default apiClient;