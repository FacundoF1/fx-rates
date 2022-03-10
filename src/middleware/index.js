const createError = require('http-errors');
const { expressCacheMiddleware } = require('./cache');

const error404Handler = (req, res, next) => {
  next(createError(404));
};

const errorHandler = (err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
};

module.exports = {
  errorHandler,
  error404Handler,
  expressCacheMiddleware,
};
