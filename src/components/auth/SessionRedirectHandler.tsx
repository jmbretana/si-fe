import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@auth/AuthContext';
import { logger } from '@utils/logger';
import { SESSION_CONFIG } from '@utils/constants';

/**
 * Component to handle automatic redirect to login when session is lost
 * Must be inside Router context to use useNavigate
 */
const SessionRedirectHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const wasAuthenticatedRef = useRef(isAuthenticated);

  // Handle session loss: redirect to login if user was authenticated but now isn't
  useEffect(() => {
    if (SESSION_CONFIG.AUTO_REDIRECT_ON_SESSION_LOSS) {
      const wasAuthenticated = wasAuthenticatedRef.current;
      const isCurrentlyAuthenticated = isAuthenticated;
      const isNotOnLoginPage = !location.pathname.includes('/login');

      if (wasAuthenticated && !isCurrentlyAuthenticated && isNotOnLoginPage) {
        logger.warn("SessionRedirectHandler: Session lost, redirecting to login");
        navigate('/login', { 
          replace: true,
          state: { from: location, sessionExpired: true }
        });
      }
    }

    // Update the ref for next comparison
    wasAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated, navigate, location]);

  return <>{children}</>;
};

export default SessionRedirectHandler;