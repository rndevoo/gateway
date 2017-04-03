/**
 * @overview The activation handlers.
 */
'use strict';

import { User } from './../users/models/user';
import { Profile } from './../users/models/profile';
import { Preferences } from './../users/models/preferences';
import { ActivationToken } from './models';
import { sendActivationMail } from './../../../lib/mails';

export class ActivationHandlers {
  static async activate (ctx) {
    const { token } = ctx.params;

    let userId;
    try {
      userId = await ActivationToken.getUserId(token);
    } catch (e) {
      ctx.status = 400;
      return;
    }

    await Promise.all([
      User.update(userId, { is_active: true }),
      Profile.create(userId),
      Preferences.create(userId),
    ]);

    await ActivationToken.delete(token);

    ctx.status = 200;
  }

  static async resendEmail (ctx) {
    const { user } = ctx.state;
    console.log(typeof user.id);
    const { token } = await ActivationToken.retrieve(user.id);
    await sendActivationMail(user.email, token);

    ctx.status = 202;
  }
}
