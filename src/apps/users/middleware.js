/**
 * @overview The users handler middleware.
 */
'use strict';

import Joi from 'joi';
import Boom from 'boom';

import { validateKeys } from './../../lib/queryValidators';
import { getFieldsObject, getSortsObject } from './../../lib/utils';

export class UsersValidators {
  /**
   * @name list
   * @method
   *
   * @description
   * Validates fields to show, filters and sorts.
   */
  static async list (ctx, next) {
    // Pass the object of fields in the context.
    ctx.state.fields = getFieldsObject(ctx.state.fields);
    ctx.state.sorts = getSortsObject(ctx.state.sorts);
    return next();
  }

  /**
   * @name detail
   * @method
   *
   * @description
   * Sends the public details of the requested user.
   */
  static async detail (ctx, next) {
    const validFields = [
      'username',
      'firstName',
      'bio',
      'birthDate',
    ];

    const fieldsArray = ctx.state.fields.length
      ? ctx.state.fields
      : validFields;

    if (!validateKeys(fieldsArray, validFields)) {
      throw Boom.badRequest('Invalid querystring');
    }

    // Pass the object of fields in the context.
    ctx.state.fields = getFieldsObject(fieldsArray);
    return next();
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
