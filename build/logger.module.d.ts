import { LoggerConfiguration, LoggerService } from './logger.interface';
import { StaticLogger } from './static_logger.module';
export declare class Logger extends StaticLogger implements LoggerService {
    private static instance;
    static getInstance(config?: LoggerConfiguration): Logger;
    info<T>(message: string, context: string, data?: T): void;
    warn<T>(message: string, context: string, data?: T): void;
    error<T>(message: string, error: Error, context: string, data?: T): void;
}
