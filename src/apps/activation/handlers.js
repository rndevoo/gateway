/**
 * @overview The activation handlers.
 */
'use strict';

import { User } from './../users/models/user';
import { Profile } from './../users/models/profile';
import { ActivationToken } from './models';

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
    ]);

    await ActivationToken.delete(token);

    ctx.status = 200;
  }

  static async sendEmail (ctx) {
    // TODO
  }
}
