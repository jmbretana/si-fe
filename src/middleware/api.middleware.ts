import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from './auth.middleware';

/**
 * API Middleware
 * Request and response interceptors for API calls
 */

/**
 * Request Interceptor
 * Adds authentication token to requests
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getToken();
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

/**
 * Request Error Interceptor
 */
export const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

/**
 * Response Interceptor
 * Handles successful responses
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * Response Error Interceptor
 * Handles errors and redirects on 401
 */
export const responseErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    // Remove invalid token
    removeToken();
    
    // Redirect to login if not already there
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
  
  return Promise.reject(error);
};
