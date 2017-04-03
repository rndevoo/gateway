/**
 * @overview The actions of the User model.
 */
'use strict';

import bcrypt from 'bcrypt';

import pool from './../../../../lib/pgpool';

export class User {
  /**
   * Returns the complete list of users of LetsMeet.
   * This method is only allowed to admins.
   *
   * @param {Object} options - Object containing options.
   * @param {Boolean} [options.showProfile=false] - Whether to include profile information in the list or not.
   * @param {Boolean} [options.showPreferences=false] - Whether to include user preferences in the list or not.
   *
   * @returns {Array} List of users.
   */
  static async list ({ showProfile = false, showPreferences = false }) {
    const sqlJoinProfiles = `
    LEFT JOIN profiles ON users.id = profiles.user_id
    `;

    const sqlJoinPreferences = `
    LEFT JOIN user_preferences ON users.id = user_preferences.user_id
    `;

    const sqlString = `
    SELECT *
    FROM users
    ${showProfile ? sqlJoinProfiles : ''}
    ${showPreferences ? sqlJoinPreferences : ''};
    `;

    let result = await pool.query(sqlString);

    return result.rows;
  }

  /**
   * Returns the user specified.
   *
   * @param {String} getBy - The field to identify the user by.
   * @param {(Number|String)} value - The value to identify the user with.
   * @param {String[]} fields - The list of fields of the user's data to return.
   *
   * @returns {Object} The user object.
   */
  static async retrieve (getBy, value, fields = ['*']) {
    const sqlString = `
    SELECT ${fields.join(', ')}
    FROM users
    LEFT JOIN profiles ON users.id = profiles.user_id
    LEFT JOIN user_preferences ON users.id = user_preferences.user_id
    WHERE users.${getBy} = $1;
    `;

    let result = await pool.query(sqlString, [value]);

    return result.rows[0];
  }

  /**
   * Creates a new user.
   *
   * @param {Object} data - The data needed to create the user.
   * @param {String} data.username - The user's username.
   * @param {String} data.firstName - The user's first name.
   * @param {String} data.lastName - The user's last name.
   * @param {String} data.email - The user's email.
   * @param {String} data.password - The user's plaintext password.
   *
   * @param {Boolean} [isAdmin=false] - Whether to create an admin user or not.
   *
   * @throws - If arguments are invalid or duplicate keys.
   *
   * @returns {Object} The created user's data.
   */
  static async create (data, isAdmin = false) {
    const SALT_ROUNDS = 10;

    // If we're creating an admin make it immediately active
    const isActive = isAdmin;
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const sqlString = `
    INSERT INTO users (username, first_name, last_name, email, password, is_active, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;

    const sqlValues = [
      data.username,
      data.firstName,
      data.lastName,
      data.email,
      hashedPassword,
      isActive,
      isAdmin,
    ];

    let result;
    try {
      result = await pool.query(sqlString, sqlValues);
    } catch (e) {
    }

    return result.rows[0];
  }

  /**
   * Updates a user.
   *
   * @param {Number} id - The user's id.
   * @param {Object} data - The object containing the fields and values to be updated.
   *
   * @returns {Boolean} true if succeeded and false otherwise.
   */
  static async update (id, data) {
    const sqlUpdateString = Object.keys(data).map((key) => {
      return `${key} = ${data[key]}`;
    }).join(', ');

    const sqlString = `
    UPDATE users
    SET ${sqlUpdateString}
    LEFT JOIN profiles ON users.id = profiles.user_id
    LEFT JOIN user_preferences ON users.id = user_preferences.user_id
    WHERE id = $1;
    `;

    const result = await pool.query(sqlString, [id]);
    return result.rowCount != 0;
  }

  /**
   * Deletes a user.
   *
   * @param {String} getBy - The field to identify the user by.
   * @param {(String|Number)} value - The value to identify the user with.
   *
   * @returns {Boolean} Returns true if succeeded and false otherwise.
   */
  static async delete (getBy, value) {
    // Why not a soft delete?
    const sqlString = `
    DELETE
    FROM users
    WHERE ${getBy} = $1;
    `;

    const result = await pool.query(sqlString, [value]);
    return result.rowCount != 0;
  }
}
