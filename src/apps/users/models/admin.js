'use strict';

import { User } from './user';

export class Admin {
  static async create (data) {
    await User.create(data, { isAdmin: true });
  }
}
