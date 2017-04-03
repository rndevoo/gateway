'use strict';

import Pool from 'pg-pool';

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: process.env.MAX_POOL_CLIENTS,
  idleTimeoutMillis: process.env.IDLE_TIMEOUT_MS,
};

const pool = new Pool(config);

export default pool;
