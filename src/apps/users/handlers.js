/**
 * @overview The user handlers.
 */
'use strict';

import { User } from './models/user';

export class UserHandlers {
  /**
   * @name list
   * @method
   *
   * @description
   * Sends the list of users.
   */
  static async list (ctx) {
    ctx.body = await User.find();
  }

  /**
   * @name retrieve
   * @method
   *
   * @description
   * Sends the requested user's public information.
   */
  static async retrieve (ctx) {
    const { id } = ctx.params;
    const user = await User
      .findOne({ _id: id })
      .populate('profile')
      .select({
        firstName: 1,
        username: 1,
        bio: 1,
        birthDate: 1,
      });

    if (!user) {
      ctx.throw(404);
    }

    ctx.body = user.toObject;
  }

  /**
   * @name delete
   * @method
   *
   * @description
   * Deletes the requested user.
   */
  static async delete (ctx) {
    const { id } = ctx.params;
    const response = await User.deleteOne({ _id: id });

    if (response.deletedCount != 1) {
      ctx.throw(404);
    }
  }
}
