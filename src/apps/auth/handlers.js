'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from './../users/models/user';

export class AuthHandlers {
  static async login (ctx) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.status = 400;
      return;
    }

    const user = await User.retrieve('username', username);
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      ctx.status = 400;
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = '2 days';

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    ctx.body = { token, user };
  }

  static async refresh (ctx) {
    ctx.body = ctx.state.user;
  }

  static async password (ctx) {
    // TODO
  }
}
