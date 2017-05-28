/**
 * @overview
 * Winston (our logger) configuration.
 */
import * as winston from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL;

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: LOG_LEVEL,
    }),
  ],
});

export default winston;
