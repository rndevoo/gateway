/**
 * @overview The actions of the Profile model.
 */
'use strict';

import pool from './../../../shared/pgpool';

export class Profile {
  /**
   * Creates a new profile for an existing user.
   *
   * @param {String} getBy - The field to identify the user by.
   * @param {(String|Number)} value - The value to identify the user with.
   *
   * @returns {Boolean} Returns true if succeeded and false otherwise.
   */
  static async create (getBy, value) {
    let userId;
    if (getBy === 'id') {
      userId = value;
    } else {
      const sqlGetUserIdString = `
      SELECT id
      FROM users
      WHERE ${getBy} = $1;
      `;

      const users = await pool.query(sqlGetUserIdString, [value]);
      userId = users.rows[0].id;
    }
    const sqlString = `
    INSERT INTO profiles (user_id)
    VALUES ($1);
    `;

    const result = await pool.query(sqlString, [userId]);
    return result.rowCount != 0;
  }
}
