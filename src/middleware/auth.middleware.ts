/**
 * Auth Middleware
 * Checks if user is authenticated by verifying token existence
 */

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const requireAuth = (): void => {
  if (!isAuthenticated()) {
    window.location.href = '/login';
  }
};
