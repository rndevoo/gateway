/**
 * @overview The ActivationToken model.
 */
'use strict';

import mongoose from 'mongoose';

import db from './../../../config/db';
import { genActivationToken } from './../../../lib/utils';

const Schema = mongoose.Schema;

const ActivationTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    index: true,
    unique: true,
    default: genActivationToken,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h',
  },
});

const ActivationToken = db
  .model('ActivationToken', ActivationTokenSchema);

export { ActivationToken };
