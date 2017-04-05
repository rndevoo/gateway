/**
 * @overview The user handlers.
 */
'use strict';

import { User } from './models/user';

export class UserHandlers {
  static async list (ctx) {
    ctx.body = await User.find();
  }

  static async retrieve (ctx) {
    const { id } = ctx.params;
    const fields = [
      'username',
      'firstName',
      'bio',
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
