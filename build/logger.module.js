"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const static_logger_module_1 = require("./static_logger.module");
class Logger extends static_logger_module_1.StaticLogger {
    static getInstance(config) {
        if (!Logger.instance) {
            Logger.instance = new Logger();
            Logger.config = config || Logger.config;
        }
        return Logger.instance;
    }
    info(message, context, data) {
        const loggerConfig = {
            ...Logger.config
        };
        if (arguments.length > 2)
            loggerConfig.showData = true;
        Logger.info(message, context, data, loggerConfig);
    }
    warn(message, context, data) {
        const loggerConfig = {
            ...Logger.config
        };
        if (arguments.length > 2)
            loggerConfig.showData = true;
        Logger.warn(message, context, data, loggerConfig);
    }
    error(message, error, context, data) {
        const loggerConfig = {
            ...Logger.config
        };
        if (arguments.length > 3)
            loggerConfig.showData = true;
        Logger.error(message, error, context, data, loggerConfig);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.module.js.map