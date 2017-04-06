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

    let user = await User.findOne({ username });

    if (user) {
      user = user.toObject();
    } else {
      ctx.throw(400);
    }

    // Check if password matches record in database
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      ctx.throw(400);
    }

    // JWT constants
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = '2 days';

    // JWT payload
    const jwtPayload = { name: user.firstName, isAdmin: user.isAdmin };
    const jwtOptions = { expiresIn: JWT_EXPIRES_IN, issuer: 'LetsMeet' };
    const token = jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);

    // We don't want to send back the hashed password
    delete user.password;
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
