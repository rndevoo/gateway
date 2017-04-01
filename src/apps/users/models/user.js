'use strict';

import bcrypt from 'bcrypt';

import pool from './../../../shared/pgpool';

export class User {
  static async list ({ profiles = false, preferences = false }) {
    const sqlJoinProfiles = `
    LEFT JOIN profiles ON users.id = profiles.user_id
    `;

    const sqlJoinPreferences = `
    LEFT JOIN user_preferences ON users.id = user_preferences.user_id
    `;

    const sqlString = `
    SELECT *
    FROM users
    ${profiles ? sqlJoinProfiles : ''}
    ${preferences ? sqlJoinPreferences : ''};
    `;

    let result = await pool.query(sqlString);

    return result;
  }

  static async retrieve (id) {
    const sqlString = `
    SELECT *
    FROM users
    LEFT JOIN profiles ON users.id = profiles.user_id
    LEFT JOIN user_preferences ON users.id = user_preferences.user_id
    WHERE users.id = $1;
    `;

    let result = await pool.query(sqlString, id);

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

  static async delete (id) {
    // Why not a soft delete?
    const sqlString = `
    DELETE
    FROM users
    WHERE id = $1;
    `;

    await pool.query(sqlString, id);
  }
}
