'use strict';

import jwt from 'koa-jwt';

const JWT_SECRET = process.env.JWT_SECRET;

const jwtReady = jwt({ secret: JWT_SECRET });

export default jwtReady;
