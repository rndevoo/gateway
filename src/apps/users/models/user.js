/**
 * @overview The User model.
 */
'use strict';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import db from './../../../config/db';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    maxlength: 30,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 30,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    maxlength: 256,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    maxlength: 128,
    required: true,
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    maxlength: 512,
    trim: true,
  },
  birthDate: Date,
  matches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'UserPreferences',
  },
});

const SALT_ROUNDS = parseInt(process.env.PASS_SALT_ROUNDS, 10);

/**
 * @name hashPassPreSave
 * @function
 *
 * @description
 * Pre save hook for the user model.
 * Checks if password was modified and if so, hashes it (bcrypt).
 */
UserSchema.pre('save', async function hashPassPreSave (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

/**
 * @name comparePassword
 * @function
 *
 * @description
 * Compares a plaintext password with the hashed one stored in the database.
 *
 * @param {String} pass - The plaintext password to compare.
 *
 * @returns {Boolean} true if they match, false otherwise.
 */
UserSchema.methods.comparePassword = async function comparePassword (pass) {
  /**
   * I have to select the password explicitly because in the schema,
   * the password field is defined with select: false.
   */
  const { password: storedPassword } = await this.model('User')
    .findOne({ _id: this._id })
    .select({ password: 1 });

  // Compare the plaintext password with the hash stored.
  const isCorrect = await bcrypt.compare(pass, storedPassword);

  return isCorrect;
};

const User = db.model('User', UserSchema);

/**
 * The model is tightly coupled with the main database,
 * @see {@link src/config/db.js}
 * So the schema is exported for registering it in test databases.
 */
export { User, UserSchema };
