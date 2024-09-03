import axios from 'axios';
import baseUrl from './baseUrl';

const api = axios.create({  
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

if (typeof window !== 'undefined') {
    api.interceptors.request.use(async config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}
export default api;