/**
 * @overview The actions of the Preferences model.
 */
'use strict';

import pool from './../../../lib/pgpool';
import { getSqlUpdateStringAndValues } from './../../../lib/utils';

export class Preferences {
  /**
   * Updates the preferences of a user.
   *
   * @param {Number} userId - The user's id.
   * @param {Object} data - The data to update the preferences with.
   */
  static async update (userId, data) {
    const startParametersFrom = 1;
    let { sqlUpdateString, sqlValues } = getSqlUpdateStringAndValues(
      data,
      startParametersFrom,
    );

    const sqlString = `
    UPDATE user_preferences up
    SET ${sqlUpdateString}
    WHERE up.user_id = $1;
    `;

    sqlValues = [userId, ...sqlValues];

    const result = await pool.query(sqlString, sqlValues);
    return result.rowCount != 0;
  }
}
