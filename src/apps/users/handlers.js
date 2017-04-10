/**
 * @overview The users handlers.
 */
'use strict';

import Boom from 'boom';

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
    const filters = ctx.state.filters;
    const fields = ctx.state.fields;
    const sorts = ctx.state.sorts;

    ctx.body = await User
      .find(filters)
      .populate('preferences')
      .select(fields)
      .sort(sorts);
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

    const userDoc = await User
      .findOne({ _id: id })
      .select(fields);

    if (!userDoc) {
      throw Boom.notFound('User not found');
    }

    ctx.body = userDoc.toObject();
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

    let user;
    try {
      user = await User.create(data);
    } catch (e) {
      switch (e.code) {
        case 11000:
          throw Boom.conflict(e.message);
        default:
          throw Boom.badRequest(e.message);
      }
    }
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
      throw Boom.notFound('The requested user does not exist');
    }

    ctx.status = 200;
  }
}
