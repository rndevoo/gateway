/**
 * @overview The registration handlers.
 */
'use strict';

import bcrypt from 'bcrypt';

import { sendActivationMail } from './../../lib/mails';

import { User } from './../users/models/user';
import { ActivationToken } from './../activation/models/activationToken';

export class RegistrationHandlers {
  static async registrate (ctx) {
    const SALT_ROUNDS = parseInt(process.env.PASS_SALT_ROUNDS, 10);
    const data = ctx.request.body;

    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = new User(data);
    await user.save();

    const token = new ActivationToken({ userId: user._id });
    await token.save();

    sendActivationMail(user, token.token);

    ctx.status = 201;
  }
}
