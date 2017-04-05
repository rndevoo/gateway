/**
 * @overview The UserPreferences model.
 */
'use strict';

import mongoose from 'mongoose';

import db from './../../../config/db';

const Schema = mongoose.Schema;;

const UserPreferencesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
  },
});

const UserPreferences = db.model('UserPreferences', UserPreferencesSchema);

export { UserPreferences };
