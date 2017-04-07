/**
 * @overview Centralized error handler.
 */
'use strict';

import logger from 'winston';

export default function () {
  /**
   * @name errorHandler
   * @function
   *
   * @description
   * Handles errors thrown in the app.
   * If they are 5xx errors, logs them, if not, responds with a JSON.
   */
  return async function errorHandler (ctx, next) {
    try {
      await next();
    } catch (err) {
      logger.error(err);
    }
  };
}
