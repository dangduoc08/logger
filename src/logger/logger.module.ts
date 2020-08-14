import {
  LoggerConfiguration,
  LoggerConfigurationExtender,
  LoggerService
} from './logger.interface'
import {
  StaticLogger
} from './static_logger.module'

export class Logger extends StaticLogger implements LoggerService {
  private static instance: Logger
  public static getInstance(config?: LoggerConfiguration): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
      Logger.config = config || Logger.config
    }
    return Logger.instance
  }

  public info<T>(message: string, context: string, data?: T): void {
    const loggerConfig: LoggerConfigurationExtender = {
      ...Logger.config
    }
    if (arguments.length > 2) loggerConfig.showData = true
    Logger.info(message, context, data, loggerConfig)
  }

  public warn<T>(message: string, context: string, data?: T): void {
    const loggerConfig: LoggerConfigurationExtender = {
      ...Logger.config
    }
    if (arguments.length > 2) loggerConfig.showData = true
    Logger.warn(message, context, data, loggerConfig)
  }

  public error<T>(message: string, error: Error, context: string, data?: T): void {
    const loggerConfig: LoggerConfigurationExtender = {
      ...Logger.config
    }
    if (arguments.length > 3) loggerConfig.showData = true
    Logger.error(message, error, context, data, loggerConfig)
  }
}
