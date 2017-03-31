'use strict';

import pool from './../shared/pgpool.js';

export class User {
  static async list () {
  }

  static async create (data, { isAdmin = false }) {
    // If we're creating an admin make it immediately active
    const isActive = isAdmin;

    // TODO: Use bcrypt to hash password
    const hashedPassword = data.password;

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

  static async createAdmin (data) {
    await User.create(data, { isAdmin: true });
  }
}
