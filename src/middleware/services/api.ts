import axios, { AxiosInstance } from 'axios';
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from '@middleware/api.middleware';

const API_URL = (import.meta.env?.VITE_API_URL as string) || '/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors
api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Add response interceptors
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;
