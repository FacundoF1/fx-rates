import createError from 'http-errors';
import { expressCacheMiddleware } from './cache';

const error404Handler = (req, res, next) => {
  next(createError(404));
};

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

export {
  errorHandler,
  error404Handler,
  expressCacheMiddleware,
  // baseRequest
};
