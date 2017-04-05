/**
 * @overview The authentication handlers.
 */
'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from './../users/models/user';

export class AuthHandlers {
  static async login (ctx) {
    const { username, password } = ctx.request.body;

    const user = await User.findOne({ username });

    if (!user) {
      ctx.throw(400);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      ctx.throw(400);
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = '2 days';

    // Don't send the hashed password.
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    ctx.body = { token, user };
  }

  static async refresh (ctx) {
    ctx.body = ctx.state.user;
  }

  static async password (ctx) {
    const { id: userId } = ctx.state.user;
    const { oldPass, newPass, newPassRepeat } = ctx.request.body;

    const SALT_ROUNDS = process.env.PASS_SALT_ROUNDS;

    const { password } = await User.retrieve('id', userId, ['password']);

    const passwordMatches = await bcrypt.compare(oldPass, password);

    if (!passwordMatches) {
      ctx.throw(400);
    }

    const hashedNewPass = await bcrypt.hash(newPass, SALT_ROUNDS);

    await User.update(userId, { password: hashedNewPass });

    ctx.status = 200;
  }
}
