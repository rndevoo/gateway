/**
 * @overview The registration handler validators.
 */
'use strict';

import Joi from 'joi';

export async function registrationValidator (ctx, next) {
  const data = ctx.request.body;

  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const schemaOptions = {
    username: Joi.string().alphanum().min(3).max(40).required(),
    firstName: Joi.string().alphanum().min(3).max(40).required(),
    lastName: Joi.string().alphanum().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordValidationRegex).required(),
    passwordRepeat: Joi.string().required().equal(Joi.ref('password')),
    agreesToS: Joi.boolean().equal(true).required(),
  };

  const schema = Joi.object().keys(schemaOptions);

  const result = Joi.validate(data, schema);

  if (result.error) {
    ctx.throw(400);
  }

  await next();
}
