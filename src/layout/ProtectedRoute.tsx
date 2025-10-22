import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // TEMPORAL: Validación de autenticación deshabilitada
  // Descomentar las líneas siguientes para volver a habilitar la validación

  /* 
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Check for token/user in storage as fallback
  const hasStoredAuth =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!isAuthenticated && !hasStoredAuth) {
    return <Navigate to="/login" replace />;
  }
  */

  return <>{children}</>;
};

export default ProtectedRoute;
