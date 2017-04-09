/**
 * @overview The users handler middleware.
 */
'use strict';

import Joi from 'joi';
import Boom from 'boom';

import {
  validateFields,
  validateFilters
} from './../../lib/queryValidators';
import { getFieldsObject } from './../../lib/utils';

export class UsersValidators {
  /**
   * @name list
   * @method
   *
   * @description
   * Validates fields to show, filters and sorts by.
   */
  static async list (ctx, next) {

  }

  /*
   * @name create
   * @method
   *
   * @description
   * Validates the payload from the user to create an account.
   */
  static async create (ctx, next) {
    const data = ctx.request.body;
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(40).required(),
      firstName: Joi.string().alphanum().min(3).max(40).required(),
      lastName: Joi.string().alphanum().min(3).max(40).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordValidationRegex).required(),
      passwordRepeat: Joi.string().required().equal(Joi.ref('password')),
      agreesToS: Joi.boolean().equal(true).required(),
    });
    const result = Joi.validate(data, schema);

    if (result.error) {
      throw Boom.badRequest(result.error.details[0].message);
    }

    return next();
  }
}
