/**
 * @overview Utility functions.
 */
'use strict';

import crypto from 'crypto';

/**
 * @function
 * @name genActivationToken
 *
 * @description
 * Generates a random hash to use as an activation token.
 *
 * @returns {String} The activation token.
 */
export function genActivationToken () {
  const HASH_ALGORITHM = 'sha256';
  const RANDOM_BYTES = crypto.randomBytes(64);
  const ENCODING = 'hex';

  const hash = crypto.createHash(HASH_ALGORITHM);

  const token = hash.update(RANDOM_BYTES).digest(ENCODING);

  return token;
}

/**
 * @name getFieldsObject
 * @function
 *
 * @description
 * Returns an object of fields ready to be passed to Mongoose's .select().
 *
 * @param {String[]} [fieldsArray] - The array of fields.
 *
 * @returns {Object} The object to be passed. E.g., { username: 1 }
 */
export function getFieldsObject (fieldsArray = []) {
  let fields = {};
  fieldsArray.forEach((field) => {
    fields[field] = 1;
  });

  return fields;
}
