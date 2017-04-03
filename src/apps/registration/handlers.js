/**
 * @overview The registration handlers.
 */
'use strict';

import validator from 'validator';

import { sendActivationMail } from './../../lib/mails';

import { User } from './../users/models/user';
import { ActivationToken } from './../activation/models';

export class RegistrationHandlers {
  static async registrate (ctx) {
    const data = ctx.request.body;

    // TODO: Validate input

    const user = await User.create(data);
    const newToken = await ActivationToken.create(user.id, user.email);

    sendActivationMail(user.email, newToken);

    ctx.status = 201;
  }
}
