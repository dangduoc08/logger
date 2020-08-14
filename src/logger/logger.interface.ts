export interface LoggerConfiguration {
  timestamp?: boolean
  color?: boolean
  verbose?: boolean
  showHidden?: boolean
  depth?: number | boolean
}

export interface LoggerConfigurationExtender extends LoggerConfiguration {
  showData?: boolean
}

export interface LoggerService {
  info<T>(message: string, context: string, data?: T): void
  warn<T>(message: string, context: string, data?: T): void
  error<T>(message: string, error: Error, context: string, data?: T): void
}
