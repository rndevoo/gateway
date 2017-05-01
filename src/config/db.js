/**
 * @overview The mongoose centralized connection configuration.
 */
'use strict';

import mongoose from 'mongoose';
import logger from './winston';

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const mongoConnectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Mongoose's default promise is not the native one.
mongoose.Promise = Promise;

// Create the connection but don't connect to it yet.
const db = mongoose.createConnection();

// Log database events.
db.on('error', (err) => {
  logger.error(`Mongoose connection error: ${err}`);
}).once('open', () => {
  logger.info(`Mongoose connection opened successfuly on ${mongoConnectionString}`);
}).once('disconnected', () => {
  logger.info('Mongoose disconnected');
});

// Close the MongoDB connection if main server is shutted down.
process.on('SIGINT', () => {
  db.close(() => process.exit(0));
});

export { db as default, mongoConnectionString };
