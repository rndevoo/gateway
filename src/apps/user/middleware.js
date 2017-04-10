/**
 * @overview The user handler middleware.
 */
'use strict';

import { getFieldsObject } from './../../lib/utils';

export class UserValidators {
  static async detail (ctx, next) {
    ctx.state.fields = getFieldsObject(ctx.state.fields);
    return next();
  }
}
