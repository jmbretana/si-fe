import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { 
  AuthUser, 
  LoginCredentials 
} from '@interfaces';
import {
  login,
  logout,
  updateUser,
  clearError,
  initializeAuthFromStorage,
  checkTokenValidity,
  refreshToken
} from '../middleware/actions/authActions';

/**
 * Custom hook for authentication management
 * Provides easy access to auth state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  // Memoized action creators
  const handleLogin = useCallback((credentials: LoginCredentials) => {
    return dispatch(login(credentials));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);

  const handleUpdateUser = useCallback((userData: Partial<AuthUser>) => {
    return dispatch(updateUser(userData));
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInitializeAuth = useCallback(() => {
    dispatch(initializeAuthFromStorage());
  }, [dispatch]);

  const handleCheckToken = useCallback(() => {
    return dispatch(checkTokenValidity());
  }, [dispatch]);

  const handleRefreshToken = useCallback(() => {
    return dispatch(refreshToken());
  }, [dispatch]);

  // Computed values
  const isLoggedIn = authState.isAuthenticated && !!authState.user;
  const hasError = !!authState.error;
  const isBlocked = authState.loginAttempts >= 5; // Block after 5 failed attempts

  // User info helpers
  const getFullName = useCallback(() => {
    if (!authState.user) return '';
    const { name, surname } = authState.user;
    return [name, surname].filter(Boolean).join(' ') || authState.user.username;
  }, [authState.user]);

  const getUserInitials = useCallback(() => {
    if (!authState.user) return '';
    const { name, surname, username } = authState.user;
    
    if (name && surname) {
      return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    }
    
    if (name) {
      return name.substring(0, 2).toUpperCase();
    }
    
    return username.substring(0, 2).toUpperCase();
  }, [authState.user]);

  const hasRole = useCallback((role: string) => {
    return authState.user?.role === role;
  }, [authState.user]);

  const hasAnyRole = useCallback((roles: string[]) => {
    return authState.user?.role ? roles.includes(authState.user.role) : false;
  }, [authState.user]);

  // Session management
  const isSessionExpiringSoon = useCallback(() => {
    // This would need to be implemented based on your token structure
    // For now, return false
    return false;
  }, []);

  const getSessionTimeRemaining = useCallback(() => {
    // This would need to be implemented based on your token structure
    // For now, return null
    return null;
  }, []);

  return useMemo(() => ({
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    loginAttempts: authState.loginAttempts,
    lastLoginAttempt: authState.lastLoginAttempt,
    
    // Computed values
    isLoggedIn,
    hasError,
    isBlocked,
    
    // Actions
    login: handleLogin,
    logout: handleLogout,
    updateUser: handleUpdateUser,
    clearError: handleClearError,
    initializeAuth: handleInitializeAuth,
    checkToken: handleCheckToken,
    refreshToken: handleRefreshToken,
    
    // User helpers
    getFullName,
    getUserInitials,
    hasRole,
    hasAnyRole,
    
    // Session helpers
    isSessionExpiringSoon,
    getSessionTimeRemaining
  }), [
    authState.user,
    authState.token,
    authState.isAuthenticated,
    authState.isLoading,
    authState.error,
    authState.loginAttempts,
    authState.lastLoginAttempt,
    isLoggedIn,
    hasError,
    isBlocked,
    handleLogin,
    handleLogout,
    handleUpdateUser,
    handleClearError,
    handleInitializeAuth,
    handleCheckToken,
    handleRefreshToken,
    getFullName,
    getUserInitials,
    hasRole,
    hasAnyRole,
    isSessionExpiringSoon,
    getSessionTimeRemaining
  ]);
};

export default useAuth;