/**
 * @overview The actions of the ActivationToken model.
 */
'use strict';

import crypto from 'crypto';

import pool from './../../lib/pgpool';

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
    const SALT = crypto.randomBytes(64);
    const ENCODING = 'hex';

    const hash = crypto.createHash(HASH_ALGORITHM);

    // Hash the user's email and encode it. This will be the activation token.
    const token = hash.update(`${userEmail}${SALT}`).digest(ENCODING);

    const sqlString = `
    INSERT INTO activation_tokens (user_id, token)
    VALUES ($1, $2)
    RETURNING *;
    `;

    const result = await pool.query(sqlString, [userId, token]);
    return result.rows[0];
  }

  /**
   * Returns the token with user_id = id
   *
   * @param {Number} userId - The user's id.
   */
  static async retrieve (userId) {
    const sqlString = `
    SELECT *
    FROM activation_tokens
    WHERE user_id = $1;
    `;

    const result = await pool.query(sqlString, [userId]);
    return result.rows[0];
  }

  /**
   * Returns the user id based on the activation token provided.
   *
   * @param {String} token - The user activation token.
   *
   * @returns {(Boolean|Number)} - false if not found and the user id if found.
   */
  static async getUserId (token) {
    const sqlString = `
    SELECT user_id
    FROM activation_tokens
    WHERE token = $1;
    `;

    const result = await pool.query(sqlString, [token]);

    if (!result.rows[0]) {
      throw new Error('Not found.');
    }

    return result.rows[0].user_id;
  }

  /**
   * Deletes an activation token.
   *
   * @param {String} token - The activation token.
   *
   * @returns {Boolean} true if succeeded and false otherwise.
   */
  static async delete (token) {
    const sqlString = `
    DELETE
    FROM activation_tokens
    WHERE token = $1;
    `;

    const result = await pool.query(sqlString, [token]);
    return result.rowCount != 0;
  }
}
