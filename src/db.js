'use strict';

import Pool from 'pg-pool';

const DATABASE_USER = 'diego';
const DATABASE_NAME = 'letsmeet';
const DATABASE_PASSWORD = 'asdf';
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 5432;
const MAX_POOL_CLIENTS = 10;
const IDLE_TIMEOUT_MS = 1000;

const config = {
  user: process.env.DATABASE_USER || DATABASE_USER,
  database: process.env.DATABASE_NAME || DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD || DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || DATABASE_HOST,
  port: process.env.DATABASE_PORT || DATABASE_PORT,
  max: MAX_POOL_CLIENTS,
  idleTimeoutMillis: IDLE_TIMEOUT_MS,
};

export default new Pool(config);
