import { Colorize } from './logger.util';
import { LoggerConfigurationExtender } from './logger.interface';
export declare class StaticLogger extends Colorize {
    protected static config: LoggerConfigurationExtender;
    private static mergeConfig;
    private static generateTimeStamp;
    private static formatLog;
    private static formatTrace;
    private static printVerboseLog;
    private static printVerboseData;
    private static printVerboseTrace;
    private static printOneLineLog;
    private static printOneLineData;
    private static printOneLineTrace;
    static info<T>(message: string, context: string, data?: T, config?: LoggerConfigurationExtender): void;
    static warn<T>(message: string, context: string, data?: T, config?: LoggerConfigurationExtender): void;
    static error<T>(message: string, error: Error, context: string, data?: T, config?: LoggerConfigurationExtender): void;
}
