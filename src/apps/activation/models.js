/**
 * @overview The actions of the ActivationToken model.
 */
'use strict';

import crypto from 'crypto';

import pool from './../../shared/pgpool';

export class ActivationToken {
  /**
   * Creates a new activation token.
   *
   * @param {Number} userId - The user's id.
   * @param {String} userEmail - The user's email.
   *
   * @returns {Boolean} Returns true if succeeded and false otherwise.
   */
  static async create (userId, userEmail) {
    const HASH_ALGORITHM = 'sha256';
    const ENCODING = 'hex';

    // Hash the user's email and encode it. This will be the activation token.
    let token = crypto.createHash(HASH_ALGORITHM).update(userEmail);
    token = token.digest(ENCODING);

    const sqlString = `
    INSERT INTO activation_tokens (user_id, token)
    VALUES ($1, $2);
    `;

    const result = await pool.query(sqlString, [userId, token]);
    return result.rowCount != 0;
  }
}
