/**
 * @overview The actions of the Profile model.
 */
'use strict';

import pool from './../../../lib/pgpool';

export class Profile {
  /**
   * Creates a new profile for an existing user.
   *
   * @param {Number} userId - The user's id.
   *
   * @returns {Boolean}  True if succeeded and false otherwise.
   */
  static async create (userId) {
    const sqlString = `
    INSERT INTO profiles (user_id)
    VALUES ($1);
    `;

    const result = await pool.query(sqlString, [userId]);
    return result.rowCount != 0;
  }
}
