// Commit 002 - simple logger utility

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export function formatLog(level: LogLevel, message: string): string {
  const ts = new Date().toISOString();
  return `[${ts}] [${level.toUpperCase()}] ${message}`;
}

export function logDebug(msg: string) {
  console.debug(formatLog('debug', msg));
}

export function logInfo(msg: string) {
  console.info(formatLog('info', msg));
}

export function logWarn(msg: string) {
  console.warn(formatLog('warn', msg));
}

export function logError(msg: string) {
  console.error(formatLog('error', msg));
}

// small helper: conditional logger
export function createLogger(prefix: string) {
  return {
    debug: (m: string) => logDebug(`${prefix} - ${m}`),
    info: (m: string) => logInfo(`${prefix} - ${m}`),
    warn: (m: string) => logWarn(`${prefix} - ${m}`),
    error: (m: string) => logError(`${prefix} - ${m}`),
  };
}
