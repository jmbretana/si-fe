import axios, { AxiosInstance } from 'axios';
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from '@middleware/api.middleware';

// Determine API URL based on environment
const getApiUrl = (): string => {
  // Check environment variable first
  const envApiUrl = import.meta.env?.VITE_API_URL as string;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // Fallback based on hostname
  if (window.location.hostname !== "localhost") {
    return "https://newterra-api.netlify.app/.netlify/functions/api";
  }
  
  return "http://localhost:3001/api";
};

const API_URL = getApiUrl();

console.log('🌐 API Configuration:', {
  VITE_API_URL: import.meta.env?.VITE_API_URL,
  API_URL,
  hostname: window.location.hostname
});

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
