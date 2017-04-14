/**
 * @overview The meetings handlers.
 */
'use strict';

import { Meeting } from './models/meeting';

export class MeetingsHandlers {
  /**
   * @name list
   * @method
   *
   * @description
   * List the meetings.
   */
  static async list (ctx) {
    // TODO
    ctx.body = await Meeting.find();
  }

  /**
   * @name create
   * @method
   *
   * @description
   * Creates a new meeting.
   */
  static async create (ctx) {
    const data = ctx.request.body;

    await Meeting.create(data);

    ctx.status = 201;
  }
}
