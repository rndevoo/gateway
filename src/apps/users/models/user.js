'use strict';

import bcrypt from 'bcrypt';

import pool from './../../../shared/pgpool';

export class User {
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

  static async create (data, { isAdmin = false }) {
    const SALT_ROUNDS = 10;

    // If we're creating an admin make it immediately active
    const isActive = isAdmin;
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const sqlString = `
    INSERT INTO users (username, first_name, last_name, email, password, is_active, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
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

    await pool.query(sqlString, sqlValues);
  }

  static async update (id, data) {
    // TODO
  }

  static async delete (getBy, value) {
    // Why not a soft delete?
    const sqlString = `
    DELETE
    FROM users
    WHERE ${getBy} = $1;
    `;

    const result = await pool.query(sqlString, [value]);
    console.log(result);
    return result.rowCount != 0;
  }
}
