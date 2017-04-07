/**
 * @overview The user handlers.
 */
'use strict';

import { User } from './../users/models/user';
import { UserPreferences } from './../users/models/userPreferences';

export class UserHandlers {
  /**
   * @name detail
   * @method
   *
   * @description
   * Sends the currently logged in user's data.
   */
  static async detail (ctx) {
    const { id } = ctx.state.user;
    const fields = ctx.state.fields || {};

    let userDoc = await User
      .findOne({ _id: id })
      .populate('userPreferences')
      .select(fields);

    const user = userDoc.toObject();
    ctx.body = user;
  }

  /**
   * @name update
   * @method
   *
   * @description
   * Updates the user currently logged in.
   */
  static async update (ctx) {
    const { id } = ctx.state.user;
    const data = ctx.body;

    await User.update({ _id: id }, { $set: data });
  }

  /**
   * @name updatePreferences
   * @method
   *
   * @description
   * Updates the preferences of the user currently loggen in.
   */
  static async updatePreferences (ctx) {
    const userId = ctx.state.user.id;
    const data = ctx.body;

    await UserPreferences.update({ user: userId }, { $set: data });
  }
}
