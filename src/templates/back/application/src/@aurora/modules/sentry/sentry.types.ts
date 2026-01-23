export interface SentryOptions {
  dsn: string;
  environment?: string;
  release: string;
  isActive?: boolean;
}

export enum SentryLevel {
  FATAL = 'fatal',
  ERROR = 'error',
  WARNING = 'warning',
  LOG = 'log',
  INFO = 'info',
  DEBUG = 'debug',
}

export enum SentryCronStatus {
  IN_PROGRESS = 'in_progress',
  OK = 'ok',
  ERROR = 'error',
}
