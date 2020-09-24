"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticLogger = void 0;
const path_1 = require("path");
const util_1 = require("util");
const logger_util_1 = require("./logger.util");
const logger_constant_1 = require("./logger.constant");
class StaticLogger extends logger_util_1.Colorize {
    static mergeConfig(config) {
        return {
            ...StaticLogger.config,
            ...config
        };
    }
    static generateTimeStamp() {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit'
        };
        const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
        return timestamp;
    }
    static formatLog(level, message, context, config) {
        const { color: isColorize, timestamp } = config;
        const formattedTimestamp = timestamp
            ? ` ${StaticLogger.generateTimeStamp()} `
            : ' ';
        let formattedLevel = `[${level}]`;
        let formattedContext = `[${context}]`;
        let formattedMessage = message;
        const color = logger_constant_1.LOGGER_LEVEL[level].COLOR;
        if (isColorize) {
            formattedLevel = StaticLogger[color](formattedLevel);
            formattedContext = StaticLogger.yellow(formattedContext);
            formattedMessage = StaticLogger[color](formattedMessage);
        }
        return {
            formattedLevel,
            formattedContext,
            formattedMessage,
            formattedTimestamp
        };
    }
    static formatTrace(errorTrace, callback) {
        errorTrace.forEach((trace, index) => {
            const trimedTrace = trace.trim();
            if (trimedTrace.startsWith('at')) {
                const trimedRawTrace = trimedTrace.replace('at', '').trim();
                const additionalInfo = trimedRawTrace.match(/\((.*?)\)/g);
                const filePath = Array.isArray(additionalInfo) && additionalInfo.length > 0
                    ? additionalInfo[0].replace(/\(|\)/g, '')
                    : trimedRawTrace;
                const parsedFilePath = path_1.parse(filePath);
                const hasFileName = !!parsedFilePath.ext;
                let fileName = parsedFilePath.base;
                const lastIndexOfColon = fileName.lastIndexOf(':');
                hasFileName && lastIndexOfColon > -1
                    ? fileName = fileName.substring(0, lastIndexOfColon)
                    : fileName = '';
                const invokedFunction = Array.isArray(additionalInfo) && additionalInfo.length > 0
                    ? trimedRawTrace.replace(/\((.*?)\).*/g, '').trim()
                    : '';
                callback({
                    invokedFunction,
                    fileName,
                    filePath
                }, index);
            }
        });
    }
    static printVerboseLog(logs) {
        const { formattedContext, formattedMessage, formattedLevel, formattedTimestamp } = logs;
        process.stdout.write(`${formattedLevel}${formattedTimestamp}${formattedContext} ${formattedMessage}\n`);
    }
    static printVerboseData(data, config) {
        const { depth, color, showHidden } = config;
        let depthLevel = null;
        if (depth === true) {
            depthLevel = null;
        }
        else if (depth === false) {
            depthLevel = -1;
        }
        else if (!Number.isNaN(depth)) {
            depthLevel = depth;
        }
        const formattedData = util_1.inspect(data, {
            depth: depthLevel,
            colors: color,
            showHidden
        });
        process.stdout.write(`${formattedData}\n`);
    }
    static printVerboseTrace(trace, config) {
        if (trace) {
            let colorizedInvokedFn = trace.invokedFunction
                ? `${trace.invokedFunction} `
                : '';
            let colorizedFilePath = trace.filePath
                ? trace.filePath
                : '';
            const fileName = trace.fileName
                ? trace.fileName
                : '';
            let dash = '-';
            if (config.color) {
                colorizedInvokedFn = StaticLogger.yellow(colorizedInvokedFn);
                colorizedFilePath = StaticLogger.dim(colorizedFilePath);
                dash = StaticLogger.dim(dash);
            }
            process.stdout.write(`${dash} ${colorizedInvokedFn}${fileName}\n`);
            process.stdout.write(`  ${colorizedFilePath}\n`);
        }
    }
    static printOneLineLog(logs, breakLine) {
        const { formattedContext, formattedMessage, formattedLevel, formattedTimestamp } = logs;
        const br = breakLine ? '\n' : ' ';
        process.stdout.write(`${formattedLevel}${formattedTimestamp}${formattedContext} ${formattedMessage}${br}`);
    }
    static printOneLineData(data, config, breakLine) {
        const { depth, color, showHidden } = config;
        const br = breakLine ? '\n' : ' ';
        let depthLevel = null;
        if (depth === true) {
            depthLevel = null;
        }
        else if (depth === false) {
            depthLevel = -1;
        }
        else if (!Number.isNaN(depth)) {
            depthLevel = depth;
        }
        const breakLength = 999999;
        const formattedData = util_1.inspect(data, {
            colors: color,
            depth: depthLevel,
            showHidden,
            breakLength,
            compact: breakLength
        });
        process.stdout.write(`${formattedData}${br}`);
    }
    static printOneLineTrace(trace, breakLine) {
        const br = breakLine ? '\n' : ' ';
        process.stdout.write(`${trace}${br}`);
    }
    static info(message, context, data, config) {
        var _a;
        const level = (_a = logger_constant_1.LOGGER_LEVEL.INFO.LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        let mergedConfig = StaticLogger.config;
        if (config) {
            mergedConfig = StaticLogger.mergeConfig(config);
        }
        const logs = StaticLogger.formatLog(level, message, context, mergedConfig);
        if (mergedConfig.verbose) {
            StaticLogger.printVerboseLog(logs);
            if (mergedConfig.showData) {
                StaticLogger.printVerboseData(data, mergedConfig);
            }
        }
        else {
            StaticLogger.printOneLineLog(logs, !mergedConfig.showData);
            if (mergedConfig.showData) {
                StaticLogger.printOneLineData(data, mergedConfig, true);
            }
        }
    }
    static warn(message, context, data, config) {
        var _a;
        const level = (_a = logger_constant_1.LOGGER_LEVEL.WARN.LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        let mergedConfig = StaticLogger.config;
        if (config) {
            mergedConfig = StaticLogger.mergeConfig(config);
        }
        const logs = StaticLogger.formatLog(level, message, context, mergedConfig);
        if (mergedConfig.verbose) {
            StaticLogger.printVerboseLog(logs);
            if (mergedConfig.showData) {
                StaticLogger.printVerboseData(data, mergedConfig);
            }
        }
        else {
            StaticLogger.printOneLineLog(logs, !mergedConfig.showData);
            if (mergedConfig.showData) {
                StaticLogger.printOneLineData(data, mergedConfig, true);
            }
        }
    }
    static error(message, error, context, data, config) {
        var _a;
        const level = (_a = logger_constant_1.LOGGER_LEVEL.ERROR.LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        let mergedConfig = StaticLogger.config;
        if (config) {
            mergedConfig = StaticLogger.mergeConfig(config);
        }
        const logs = StaticLogger.formatLog(level, message, context, mergedConfig);
        const isError = error instanceof Error;
        if (mergedConfig.verbose) {
            StaticLogger.printVerboseLog(logs);
            if (mergedConfig.showData) {
                StaticLogger.printVerboseData(data, mergedConfig);
            }
            if (isError) {
                const errorStack = error.stack || '';
                const errorTrace = errorStack.split('\n');
                StaticLogger.formatTrace(errorTrace, eachTrace => {
                    StaticLogger.printVerboseTrace(eachTrace, mergedConfig);
                });
            }
        }
        else {
            StaticLogger.printOneLineLog(logs, !mergedConfig.showData && !isError);
            if (mergedConfig.showData) {
                StaticLogger.printOneLineData(data, mergedConfig, false);
            }
            if (isError) {
                const errorStack = error.stack || '';
                const errorTrace = errorStack.split('\n');
                const totalTrace = errorTrace.length;
                let printedTrace = '';
                StaticLogger.formatTrace(errorTrace, (eachTrace, index) => {
                    const willPrintSpace = !printedTrace ? '' : ' ';
                    const willPrintComma = index === totalTrace - 1 ? '' : ',';
                    if (eachTrace) {
                        let colorizedInvokedFn = eachTrace.invokedFunction
                            ? `${eachTrace.invokedFunction} `
                            : '';
                        let colorizedFilePath = eachTrace.filePath
                            ? `(${eachTrace.filePath})`.replace(process.cwd(), '')
                            : '';
                        if (mergedConfig.color) {
                            colorizedInvokedFn = StaticLogger.yellow(colorizedInvokedFn);
                            colorizedFilePath = StaticLogger.dim(colorizedFilePath);
                        }
                        printedTrace += `${willPrintSpace}${colorizedInvokedFn}${colorizedFilePath}${willPrintComma}`;
                    }
                });
                StaticLogger.printOneLineTrace(printedTrace, true);
            }
        }
    }
}
exports.StaticLogger = StaticLogger;
StaticLogger.config = {
    timestamp: true,
    color: true,
    verbose: true,
    showHidden: true,
    depth: true
};
//# sourceMappingURL=static_logger.module.js.map