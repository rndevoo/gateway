/**
 * @overview The User model.
 */
'use strict';

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
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'UserPreferences',
  },
});

const User = db.model('User', UserSchema);

export { User };
