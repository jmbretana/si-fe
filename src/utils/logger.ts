/**
 * Logger utility with global variable flag control
 * Uses a simple global variable to enable/disable logging
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

// Global variable to control logger state
declare global {
  var LOGGER_ENABLED: boolean | undefined;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Check if logging is enabled based on global variable and environment
   */
  private isLoggingEnabled(level: LogLevel): boolean {
    // Check global variable first, default to true if not set
    const globalEnabled = typeof globalThis.LOGGER_ENABLED !== 'undefined' 
      ? globalThis.LOGGER_ENABLED 
      : true;

    if (!globalEnabled) {
      return false;
    }

    // Always show errors, regardless of environment
    if (level === 'error') {
      return true;
    }

    // Show other logs only in development
    return this.isDevelopment;
  }

  private logWithLevel(level: LogLevel, message: any, ...args: any[]): void {
    if (this.isLoggingEnabled(level)) {
      console[level](message, ...args);
    }
  }

  /**
   * Log general information (development only)
   */
  log(message: any, ...args: any[]): void {
    this.logWithLevel('log', message, ...args);
  }

  /**
   * Log informational messages (development only)
   */
  info(message: any, ...args: any[]): void {
    this.logWithLevel('info', message, ...args);
  }

  /**
   * Log debug information (development only)
   */
  debug(message: any, ...args: any[]): void {
    this.logWithLevel('debug', message, ...args);
  }

  /**
   * Log warnings (development only)
   */
  warn(message: any, ...args: any[]): void {
    this.logWithLevel('warn', message, ...args);
  }

  /**
   * Log errors (always shown, regardless of environment)
   */
  error(message: any, ...args: any[]): void {
    this.logWithLevel('error', message, ...args);
  }

  /**
   * Utility to log API responses 
   */
  apiResponse(endpoint: string, response: any): void {
    if (this.isLoggingEnabled('info')) {
      console.group(`🌐 API Response: ${endpoint}`);
      console.log('Data:', response);
      console.groupEnd();
    }
  }

  /**
   * Utility to log form data
   */
  formData(formName: string, data: any): void {
    if (this.isLoggingEnabled('debug')) {
      console.group(`📋 Form Data: ${formName}`);
      console.log('Values:', data);
      console.groupEnd();
    }
  }

  /**
   * Utility to log Redux actions
   */
  reduxAction(actionType: string, payload?: any): void {
    if (this.isLoggingEnabled('debug')) {
      console.group(`🔄 Redux Action: ${actionType}`);
      if (payload) {
        console.log('Payload:', payload);
      }
      console.groupEnd();
    }
  }

  /**
   * Check if logger is currently enabled
   */
  isEnabled(): boolean {
    return typeof globalThis.LOGGER_ENABLED !== 'undefined' 
      ? globalThis.LOGGER_ENABLED 
      : true;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export individual methods for convenience
export const { 
  log, 
  info, 
  debug, 
  warn, 
  error, 
  apiResponse, 
  formData, 
  reduxAction,
  isEnabled
} = logger;

// Default export
export default logger;