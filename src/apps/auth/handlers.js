/**
 * @overview The authentication handlers.
 */
'use strict';

import jwt from 'jsonwebtoken';

import { User } from './../users/models/user';

export class AuthHandlers {
  /**
   * @name login
   * @method
   *
   * @description
   * Checks the credentials and sends a token (JWT) if they match.
   */
  static async login (ctx) {
    const { username, password } = ctx.request.body;

    let userDoc = await User.findOne({ username });

    if (!userDoc) {
      ctx.throw(400);
    }

    // Check if password matches record in database.
    if (!await userDoc.comparePassword(password)) {
      ctx.throw(400);
    }

    // JSON Web Token stuff.
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = '2 days';

    // Generate the token.
    const jwtPayload = { id: userDoc._id, isAdmin: userDoc.isAdmin };
    const jwtOptions = { expiresIn: JWT_EXPIRES_IN, issuer: 'LetsMeet' };
    const token = jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);

    const user = userDoc.toObject();
    delete user.password;
    ctx.body = { token, user };
  }
}
