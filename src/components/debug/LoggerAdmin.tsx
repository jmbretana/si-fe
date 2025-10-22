import React from "react";
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Chip,
} from "@mui/material";
import { logger } from "../../utils/logger";

const LoggerAdmin: React.FC = () => {
  const [isEnabled, setIsEnabled] = React.useState(
    typeof globalThis.LOGGER_ENABLED !== "undefined"
      ? globalThis.LOGGER_ENABLED
      : true
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    globalThis.LOGGER_ENABLED = enabled;
    setIsEnabled(enabled);
  };

  const handleTest = () => {
    logger.debug("🐛 Test debug message");
    logger.info("ℹ️ Test info message");
    logger.warn("⚠️ Test warning message");
    logger.error("❌ Test error message");
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        🔧 Logger Control
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Chip
          label={isEnabled ? "Habilitado" : "Deshabilitado"}
          color={isEnabled ? "success" : "error"}
          size="small"
        />
        <Chip
          label={process.env.NODE_ENV === "development" ? "DEV" : "PROD"}
          color={process.env.NODE_ENV === "development" ? "warning" : "default"}
          size="small"
        />
      </Box>

      <FormControlLabel
        control={
          <Switch checked={isEnabled} onChange={handleToggle} color="primary" />
        }
        label="Habilitar Logger"
        sx={{ mb: 2 }}
      />

      <Box>
        <Button
          variant="outlined"
          onClick={handleTest}
          disabled={!isEnabled}
          size="small"
        >
          🧪 Probar Logs
        </Button>
      </Box>

      <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          💡 Control desde Consola:
        </Typography>
        <Typography
          variant="body2"
          component="pre"
          sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
        >
          {`// Habilitar/Deshabilitar desde consola:
window.LOGGER_ENABLED = true;   // Habilitar
window.LOGGER_ENABLED = false;  // Deshabilitar

// Usar logger directamente:
window.logger.info('Test message');`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoggerAdmin;
