/**
 * @overview The development server's entry file.
 */
'use strict';

import dotenv from 'dotenv';

dotenv.load();

const start = require('./src/server').default;

start();
