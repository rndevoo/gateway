// @flow

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
  static async detail (ctx: Object) {
    const { user: { id }, fields } = ctx.state;

    let userDoc = await User
      .findOne({ _id: id })
      .populate('preferences')
      .select(fields);

    ctx.body = userDoc.toObject();
  }

  /**
   * @name update
   * @method
   *
   * @description
   * Updates the user currently logged in.
   */
  static async update (ctx: Object) {
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
  static async updatePreferences (ctx: Object) {
    const userId = ctx.state.user.id;
    const data = ctx.body;

    await UserPreferences.update({ user: userId }, { $set: data });
  }
}
