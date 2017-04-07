/**
 * @overview The activation handlers.
 */
'use strict';

import { User } from './../users/models/user';
import { UserPreferences } from './../users/models/userPreferences';
import { ActivationToken } from './models/activationToken';
import { sendActivationMail } from './../../lib/mails';

export class ActivationHandlers {
  static async activate (ctx) {
    const { activation_token: queryToken } = ctx.query;

    const token = await ActivationToken
      .findOne({ token: queryToken })
      .select({ user: 1 });

    if (!token) {
      ctx.throw(404);
    }

    try {
      await Promise.all([
        User.update({ _id: token.user }, { $set: { isActive: true }}),
        UserPreferences.create({ user: token.user }),
        ActivationToken.deleteOne({ token: queryToken }),
      ]);
    } catch (e) {
      ctx.throw(500);
    }

    ctx.status = 200;
  }

  static async resendEmail (ctx) {
    const { user } = ctx.state;
    const { token } = await ActivationToken
      .findOne({ userId: user.id })
      .select({ token: 1 });

    await sendActivationMail(user, token);

    ctx.status = 202;
  }
}
