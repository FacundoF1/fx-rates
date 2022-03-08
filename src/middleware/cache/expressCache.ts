import cache from 'memory-cache';

const memCache = new cache.Cache();
const expressCacheMiddleware = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url
    const cacheContent = memCache.get(key);
    if (cacheContent) {
        const response = JSON.parse(cacheContent);
        res.send(response);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            memCache.put(key, body);
            res.sendResponse(body);
        }
        next();
    }
};

export { expressCacheMiddleware };
