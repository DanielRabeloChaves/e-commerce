import axios from 'axios';
import baseUrl from './baseUrl';

const apiFile = axios.create({  
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
  },
});

if (typeof window !== 'undefined') {
    apiFile.interceptors.request.use(async config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}
export default apiFile;