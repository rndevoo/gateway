// @flow

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
 * @returns {string} The activation token.
 */
export function genActivationToken (): string {
  const HASH_ALGORITHM = 'sha256';
  // Random bytes to use as salt.
  const RANDOM_BYTES = crypto.randomBytes(64);
  const ENCODING = 'hex';

  const hash = crypto.createHash(HASH_ALGORITHM);

  const token: string = hash.update(RANDOM_BYTES).digest(ENCODING);

  return token;
}

/**
 * @name getFieldsObject
 * @function
 *
 * @description
 * Returns an object of fields ready to be passed to Mongoose's .select().
 *
 * @param {string[]} [fieldsArray] - The array of fields.
 *
 * @returns {Object} The object to be passed. E.g., { username: 1 }
 */
export function getFieldsObject (fieldsArray: string[] = []): Object {
  let fields = {};
  fieldsArray.forEach((field) => {
    fields[field] = 1;
  });

  return fields;
}

/**
 * @name getSortsObject
 * @function
 *
 * @description
 * Returns an object of sorts ready to be passed to Mongoose's .sort().
 *
 * @param {string[]} [sortsArray] - The array of sorts. E.g., ['-email']
 *
 * @returns {Object} The object to be passed. E.g., { username: -1 }
 */
export function getSortsObject (sortsArray: string[] = []): Object {
  let sorts = {};
  sortsArray.forEach((sort) => {
    sorts[sort] = sort[0] === '-' ? -1 : 1;
  });

  return sorts;
}
