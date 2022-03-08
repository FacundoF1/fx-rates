"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCacheMiddleware = exports.error404Handler = exports.errorHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const cache_1 = require("./cache");
Object.defineProperty(exports, "expressCacheMiddleware", { enumerable: true, get: function () { return cache_1.expressCacheMiddleware; } });
const error404Handler = (req, res, next) => {
    next((0, http_errors_1.default)(404));
};
exports.error404Handler = error404Handler;
// eslint-disable-next-line
const errorHandler = (err, req, res, _next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send({
        message: err.message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=index.js.map