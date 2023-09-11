const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const config = require('../config');
const nodeCache = require(path.join(process.cwd(), 'src/config/lib/nodecache'));
const { AppError, globalErrorHandler } = require(path.join(process.cwd(), 'src/modules/core/errors'));

module.exports = () => {
  const app = express();

  // Set security http headers
  app.use(helmet());
  // Development logging
  app.use(morgan('dev'));
  // Limit requests from same API
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please try again in an hour!',
  });
  app.use('/api', limiter);

  // Data sanitization against NoSQL Query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS (Cross Site Scripting) attack
  app.use(xssClean());

  app.use(cookieParser(nodeCache.getValue('COOKIE_SECRET')));
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false }));

  app.set('port', nodeCache.getValue('PORT'));

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach(routePath => require(path.resolve(routePath))(app));
  globalConfig.strategies.forEach(strategyPath => require(path.resolve(strategyPath))());

  app.all('*', (req, res, next) => {
    return next(new AppError(404, `Could not find ${req.originalUrl} on this server`));
  });
  app.use(globalErrorHandler);

  return app;
};
