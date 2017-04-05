/**
 * @overview The mongoose centralized connection.
 */
'use strict';

import mongoose from 'mongoose';

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const mongoConnectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.Promise = Promise;

const db = mongoose.createConnection();

db.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

db.once('open', () => {
  console.log(`Mongoose connection open successfuly on ${mongoConnectionString}`);
});

db.once('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  db.close(() => process.exit(0));
});

export { db as default, mongoConnectionString };
