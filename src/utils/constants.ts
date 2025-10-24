/**
 * Global API configuration constants
 */

// Determine API URL based on environment
const getApiUrl = (): string => {
  if (window.location.hostname !== 'localhost') {
    return 'https://simonitor-api.netlify.app/api';
  }
  return 'http://localhost:3001/api';
};

export const API_URL_SERVER = getApiUrl();

/**
 * Session and authentication configuration
 */
export const SESSION_CONFIG = {
  // Tiempo entre verificaciones automáticas del token (en minutos)
  TOKEN_CHECK_INTERVAL_MINUTES: 120,

  // Tiempo de advertencia antes de expiración (en minutos)
  EXPIRATION_WARNING_MINUTES: 5,

  // Máximo número de intentos de login fallidos
  MAX_LOGIN_ATTEMPTS: 5,

  // Tiempo de bloqueo después de intentos fallidos (en minutos)
  LOGIN_LOCKOUT_MINUTES: 15,

  // Redirección automática al login cuando se pierde la sesión
  AUTO_REDIRECT_ON_SESSION_LOSS: true,
} as const;
