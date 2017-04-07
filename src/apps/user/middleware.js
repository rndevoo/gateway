/**
 * @overview The user handler middleware.
 */
'use strict';

import { validateFieldsArray } from './../../lib/queryValidators';
import { getFieldsObject } from './../../lib/utils';

export class UserValidators {
  static async detailFields (ctx, next) {
    const validFields = [
      'username',
      'firstName',
      'lastName',
      'email',
      'createdAt',
      'isAdmin',
      'active',
    ];

    const fieldsArray = ctx.state.query.fields;

    if (!validateFieldsArray(fieldsArray, validFields)) {
      ctx.throw(400);
    }

    const fields = getFieldsObject(fieldsArray);

    // Pass the object of fields in the context.
    ctx.state.fields = fields;
    return next();
  }
}
