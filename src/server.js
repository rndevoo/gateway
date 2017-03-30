'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

const PORT = process.env.PORT || 8080;

app.use(logger());
app.use(bodyParser());

app.listen(PORT, () => {
  console.log(`LetsMeet server running on port: ${PORT}`);
});
