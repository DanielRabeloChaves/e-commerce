import axios from 'axios';
import baseUrl from './baseUrl';

const api = axios.create({  
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

api.interceptors.request.use(async config => {
  const token = await sessionStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;