/**
 * @overview The user handler middleware.
 */
'use strict';

import { getFieldsObject } from './../../lib/utils';

export class UserValidators {
  /**
   * @name detail
   * @method
   *
   * @description
   * Middleware for parsing the selected fields from the querystring.
   */
  static async detail (ctx, next) {
    ctx.state.fields = getFieldsObject(ctx.state.fields);
    return next();
  }

  /**
   * @name update
   * @method
   *
   * @description
   * Middleware for validating the fields to be updated.
   */
  static async update (ctx, next) {
    // TODO: Validate payload with Ajv.
    return next();
  }

  /**
   * @name updatePassword
   * @method
   *
   * @description
   * Validates passwords.
   */
  static async updatePassword (ctx, next) {
    // TODO: Validate passwords.
    return next();
  }

  /**
   * @name updatePreferences
   * @method
   *
   * @description
   * Validates preferences.
   */
  static async updatePreferences (ctx, next) {
    // TODO: Validate preferences.
    return next();
  }
}
