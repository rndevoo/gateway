/**
 * @overview The Profile model.
 */
'use strict';

import mongoose from 'mongoose';

import db from './../../../config/db';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
  },
  bio: {
    type: String,
    maxlength: 512,
    trim: true,
  },
  birthDate: Date,
});

const Profile = db.model('Profile', ProfileSchema);

export { Profile };
