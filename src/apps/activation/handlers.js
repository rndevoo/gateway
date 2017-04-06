/**
 * @overview The activation handlers.
 */
'use strict';

import { User } from './../users/models/user';
import { Profile } from './../users/models/profile';
import { UserPreferences } from './../users/models/userPreferences';
import { ActivationToken } from './models/activationToken';
import { sendActivationMail } from './../../lib/mails';

export class ActivationHandlers {
  static async activate (ctx) {
    const { activation_token: token } = ctx.query;

    const { userId } = await ActivationToken
      .findOne({ token })
      .select({ userId: 1 });

    if (!userId) {
      ctx.throw(404);
    }

    try {
      await Promise.all([
        User.update({ _id: userId }, { $set: { isActive: true }}),
        Profile.create({ userId }),
        UserPreferences.create({ userId }),
        ActivationToken.deleteOne({ token }),
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
