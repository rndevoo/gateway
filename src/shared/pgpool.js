'use strict';

import Pool from 'pg-pool';

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: MAX_POOL_CLIENTS,
  idleTimeoutMillis: IDLE_TIMEOUT_MS,
};

export default new Pool(config);
