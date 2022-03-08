"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerErrorInstances = exports.Logger = void 0;
class Logger {
    static printInstances() {
        return '';
    }
    ;
}
exports.Logger = Logger;
function loggerErrorInstances() {
    // TODO: Add loggers specific for instances
    return function (target, propertyKey, descriptor) {
        console.error(`
        Error:
            ${target}
            ${propertyKey}
            ${descriptor}
        `);
    };
}
exports.loggerErrorInstances = loggerErrorInstances;
//# sourceMappingURL=systemLogger.js.map