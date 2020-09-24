"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colorize = void 0;
class Colorize {
}
exports.Colorize = Colorize;
Colorize.green = (text) => `\x1b[32m${text}\x1b[0m`;
Colorize.yellow = (text) => `\x1b[33m${text}\x1b[0m`;
Colorize.red = (text) => `\x1b[31m${text}\x1b[0m`;
Colorize.dim = (text) => `\x1b[2m${text}\x1b[0m`;
//# sourceMappingURL=logger.util.js.map