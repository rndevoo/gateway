/**
 * @overview The user handler middleware.
 */
'use strict';

import { validateFieldsQueryAndGetObject } from './../../lib/queryValidators';

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

    let { fields: fieldsQuery } = ctx.query;

    let fields;
    try {
      fields = await validateFieldsQueryAndGetObject(fieldsQuery, validFields);
    } catch (e) {
      ctx.throw(400);
    }

    // Pass the object of fields in the context.
    ctx.state.fields = fields;
    return next();
  }
}
