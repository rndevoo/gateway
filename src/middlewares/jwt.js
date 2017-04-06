/**
 * @overview Here we set the JWT secret and export the middleware ready
 * to be used.
 */
'use strict';

import jwt from 'koa-jwt';

const JWT_SECRET = process.env.JWT_SECRET;

const jwtReady = jwt({ secret: JWT_SECRET });

export default jwtReady;
