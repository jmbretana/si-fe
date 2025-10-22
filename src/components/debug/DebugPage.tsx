import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LoggerAdmin from './LoggerAdmin';
import AuthDebug from './AuthDebug';

/**
 * Debug page that includes all debugging components
 * Use this page during development to test and configure debugging tools
 */
const DebugPage: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        🔧 Debug & Development Tools
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Esta página contiene herramientas de debugging y desarrollo. 
        Solo debe ser visible en modo desarrollo.
      </Typography>

      {/* Logger Administration */}
      <LoggerAdmin />

      {/* Authentication Debug */}
      <AuthDebug />

      {/* Usage Examples */}
      <Paper sx={{ p: 3, m: 2 }}>
        <Typography variant="h6" gutterBottom>
          📚 Ejemplos de Uso del Logger
        </Typography>
        
        <Box component="pre" sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.875rem',
          bgcolor: 'background.default',
          p: 2,
          borderRadius: 1,
          overflow: 'auto'
        }}>
{`// Uso básico en componentes:
import { logger } from '@utils/logger';

// Diferentes niveles de log
logger.debug('Información de debugging');
logger.info('Información general');
logger.warn('Advertencia');
logger.error('Error crítico');

// Logs especializados
logger.apiResponse('users/login', responseData);
logger.formData('LoginForm', formValues);
logger.reduxAction('LOGIN_SUCCESS', { user });

// Control programático
logger.setEnabled(false);  // Deshabilitar
logger.enable();           // Habilitar
logger.toggle();           // Alternar

// Configuración avanzada
logger.configure({
  enabled: true,
  level: 'info',           // debug | info | warn | error
  showInProduction: false
});

// Desde consola del navegador:
window.enableLogger();
window.disableLogger();
window.toggleLogger();
window.configureLogger({ level: 'warn' });
window.logger.info('Test desde consola');`}
        </Box>
      </Paper>

      {/* Environment Info */}
      <Paper sx={{ p: 3, m: 2 }}>
        <Typography variant="h6" gutterBottom>
          🌍 Información del Entorno
        </Typography>
        <Typography variant="body2">
          <strong>NODE_ENV:</strong> {process.env.NODE_ENV}<br/>
          <strong>React Version:</strong> {React.version}<br/>
          <strong>User Agent:</strong> {navigator.userAgent}<br/>
          <strong>URL:</strong> {window.location.href}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DebugPage;