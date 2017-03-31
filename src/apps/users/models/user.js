'use strict';

import bcrypt from 'bcrypt';

import pool from './../../../shared/pgpool';

export class User {
  static async list () {
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
}
