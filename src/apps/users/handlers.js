/**
 * @overview The user handlers.
 */
'use strict';

import { User } from './models/user';

export class UserHandlers {
  static async list (ctx) {
    const options = {
      showProfile: ctx.query.show_profile,
      showPreferences: ctx.query.show_preferences,
    };
    ctx.body = await User.list(options);
  }

  static async retrieve (ctx) {
    const { id } = ctx.params;
    const fields = [
      'username',
      'first_name',
      'birth_date',
      'gender_identity',
    ];
    const result = await User.retrieve('id', id, fields);

    if (!result) {
      ctx.status = 404;
      return;
    }

    ctx.body = result;
  }

  static async delete (ctx) {
    const { id } = ctx.params;
    const success = await User.delete('id', id);

    ctx.status = success ? 202 : 404;
  }
}
