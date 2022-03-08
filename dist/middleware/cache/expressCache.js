"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCacheMiddleware = void 0;
const memory_cache_1 = __importDefault(require("memory-cache"));
const memCache = new memory_cache_1.default.Cache();
const expressCacheMiddleware = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cacheContent = memCache.get(key);
    if (cacheContent) {
        const response = JSON.parse(cacheContent);
        res.send(response);
    }
    else {
        res.sendResponse = res.send;
        res.send = (body) => {
            memCache.put(key, body);
            res.sendResponse(body);
        };
        next();
    }
};
exports.expressCacheMiddleware = expressCacheMiddleware;
//# sourceMappingURL=expressCache.js.map