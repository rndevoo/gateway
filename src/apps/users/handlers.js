/**
 * @overview The users handlers.
 */
'use strict';

import bcrypt from 'bcrypt';

import { sendActivationMail } from './../../lib/mails';

import { User } from './models/user';
import { ActivationToken } from './../activation/models/activationToken';

export class UsersHandlers {
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
   * @name detail
   * @method
   *
   * @description
   * Sends the requested user's public information.
   */
  static async detail (ctx) {
    const { id } = ctx.params;
    const fields = ctx.state.fields;

    const user = await User
      .findOne({ _id: id })
      .populate('profile')
      .select(fields);

    if (!user) {
      ctx.throw(404);
    }

    ctx.body = user.toObject();
  }

  /**
   * @name create
   * @method
   *
   * @description
   * Creates and saves a new user and activation token.
   * Sends an email to the user with a link to verify his email.
   */
  static async create (ctx) {
    const data = ctx.request.body;

    const user = await User.create(data);
    const token = await ActivationToken.create({ user: user._id });

    sendActivationMail(user, token.token);

    ctx.status = 201;
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
