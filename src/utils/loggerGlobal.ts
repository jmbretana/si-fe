/**
 * Global logger control using simple global variable
 * Set window.LOGGER_ENABLED = false to disable logging
 * Set window.LOGGER_ENABLED = true to enable logging
 */

import { logger } from "./logger";

// Add global variable to window object for console access
declare global {
  interface Window {
    LOGGER_ENABLED: boolean;
    logger: typeof logger;
  }
}

// Only add to window in browser environment
if (typeof window !== "undefined") {
  // Initialize global variable (default to true)
  if (typeof window.LOGGER_ENABLED === "undefined") {
    window.LOGGER_ENABLED = false;
  }

  // Expose logger instance for direct console access
  window.logger = logger;
}

export default logger;
