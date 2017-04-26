// @flow

/**
 * @overview The activation handlers.
 */
'use strict';

import Boom from 'boom';

import { User } from './../users/models/user';
import { UserPreferences } from './../users/models/userPreferences';
import { ActivationToken } from './models/activationToken';
import { sendActivationMail } from './../../lib/mails';

export class ActivationHandlers {
  /**
   * @name activate
   * @method
   *
   * @description
   * Activates the user related to the activation token.
   */
  static async activate (ctx: Object) {
    const { activation_token: queryToken } = ctx.query;

    const token = await ActivationToken
      .findOne({ token: queryToken })
      .select({ user: 1 });

    if (!token) {
      throw Boom.notFound('Activation token not found.');
    }

    /**
     * Tries to update the user record, create the user preferences document
     * and delete the activation token, since it is not necessary anymore.
     */
    try {
      await Promise.all([
        User.update({ _id: token.user }, { $set: { isActive: true }}),
        UserPreferences.create({ user: token.user }),
        ActivationToken.deleteOne({ token: queryToken }),
      ]);
    } catch (e) {
      throw Boom.internal('Internal Server Error.');
    }

    ctx.status = 200;
  }

  /**
   * @name resendEmail
   * @method
   *
   * @description
   * Resends the confirmation email.
   */
  static async resendEmail (ctx: Object) {
    const { user } = ctx.state;

    const { token } = await ActivationToken
      .findOne({ userId: user.id })
      .select({ token: 1 });

    await sendActivationMail(user, token);

    ctx.status = 202;
  }
}
