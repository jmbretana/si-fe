import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../middleware/store/store';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, Paper } from '@mui/material';

const AuthDebug: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user, token } = useAuth();

  // Check storage directly
  const localStorageToken = localStorage.getItem('authToken');
  const sessionStorageToken = sessionStorage.getItem('authToken');
  const localStorageUser = localStorage.getItem('user');
  const sessionStorageUser = sessionStorage.getItem('user');

  return (
    <Paper sx={{ p: 2, m: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>
        Auth Debug Information
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          Redux State:
        </Typography>
        <Typography variant="body2">
          isAuthenticated: {authState.isAuthenticated ? 'true' : 'false'}
        </Typography>
        <Typography variant="body2">
          user: {authState.user ? JSON.stringify(authState.user, null, 2) : 'null'}
        </Typography>
        <Typography variant="body2">
          token: {authState.token ? `${authState.token.substring(0, 20)}...` : 'null'}
        </Typography>
        <Typography variant="body2">
          isLoading: {authState.isLoading ? 'true' : 'false'}
        </Typography>
        <Typography variant="body2">
          error: {authState.error || 'null'}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          useAuth Hook:
        </Typography>
        <Typography variant="body2">
          isAuthenticated: {isAuthenticated ? 'true' : 'false'}
        </Typography>
        <Typography variant="body2">
          user: {user ? JSON.stringify(user, null, 2) : 'null'}
        </Typography>
        <Typography variant="body2">
          token: {token ? `${token.substring(0, 20)}...` : 'null'}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          Storage Check:
        </Typography>
        <Typography variant="body2">
          localStorage token: {localStorageToken ? `${localStorageToken.substring(0, 20)}...` : 'null'}
        </Typography>
        <Typography variant="body2">
          sessionStorage token: {sessionStorageToken ? `${sessionStorageToken.substring(0, 20)}...` : 'null'}
        </Typography>
        <Typography variant="body2">
          localStorage user: {localStorageUser ? localStorageUser.substring(0, 50) + '...' : 'null'}
        </Typography>
        <Typography variant="body2">
          sessionStorage user: {sessionStorageUser ? sessionStorageUser.substring(0, 50) + '...' : 'null'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuthDebug;