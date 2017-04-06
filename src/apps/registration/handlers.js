/**
 * @overview The registration handlers.
 */
'use strict';

import bcrypt from 'bcrypt';

import { sendActivationMail } from './../../lib/mails';

import { User } from './../users/models/user';
import { ActivationToken } from './../activation/models/activationToken';

export class RegistrationHandlers {
  /**
   * @name registrate
   * @method
   *
   * @description
   * Creates and saves a new user and activation token.
   * Sends an email to the user with a link to verify his email.
   */
  static async registrate (ctx) {
    const SALT_ROUNDS = parseInt(process.env.PASS_SALT_ROUNDS, 10);
    const data = ctx.request.body;

    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await User.create(data);

    const token = await ActivationToken.create({ user: user._id });

    sendActivationMail(user, token.token);

    ctx.status = 201;
  }
}
