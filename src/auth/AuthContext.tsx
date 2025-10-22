// AuthContext.tsx - Updated to use Redux
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";
import { AuthUser, LoginCredentials } from "@interfaces";
import { logger } from "@utils/logger";
import { SESSION_CONFIG } from "@utils/constants";

interface AuthContextType {
  // User data
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<AuthUser>) => Promise<void>;
  clearError: () => void;

  // Helpers
  getFullName: () => string;
  getUserInitials: () => string;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const authHook = useAuthHook();

  // Initialize auth state from storage on mount
  useEffect(() => {
    authHook.initializeAuth();
  }, [authHook.initializeAuth]);

  // Auto-check token validity every configurable interval
  useEffect(() => {
    if (authHook.isAuthenticated) {
      const intervalMinutes = SESSION_CONFIG.TOKEN_CHECK_INTERVAL_MINUTES;
      logger.info(
        `AuthContext: Setting up token check interval every ${intervalMinutes} minutes`
      );

      const interval = setInterval(() => {
        logger.info("AuthContext: Checking token validity automatically");
        authHook.checkToken();
      }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds

      return () => clearInterval(interval);
    }
  }, [authHook.isAuthenticated, authHook.checkToken]);

  // Debug: Monitor authentication state changes
  useEffect(() => {
    logger.info(
      `AuthContext: Authentication state changed - isAuthenticated: ${
        authHook.isAuthenticated
      }, user: ${authHook.user?.username || "none"}`
    );
  }, [authHook.isAuthenticated, authHook.user]);

  const contextValue: AuthContextType = {
    // State
    user: authHook.user,
    isAuthenticated: authHook.isAuthenticated,
    isLoading: authHook.isLoading,
    error: authHook.error,

    // Actions
    login: authHook.login,
    logout: authHook.logout,
    updateUser: authHook.updateUser,
    clearError: authHook.clearError,

    // Helpers
    getFullName: authHook.getFullName,
    getUserInitials: authHook.getUserInitials,
    hasRole: authHook.hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Legacy hook for backward compatibility
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export the new hook for direct use (recommended)
export { useAuth as useAuthHook } from "../hooks/useAuth";
