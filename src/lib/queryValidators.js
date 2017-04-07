/**
 * @overview Validators of query parameters.
 */
'use strict';

import { getFieldsObject } from './utils';

/**
 * @name validateFieldsQueryAndGetObject
 * @function
 *
 * @description
 * Validates a query string of fields and returns the object to be passed to
 * Mongoose's .select().
 *
 * @param {String} [fieldQuery=] - The query string.
 * @param {String[]} validFields - The array of valid fields.
 *
 * @returns {Object} The object ready to be passed to Mongoose.
 */
export function validateFieldsQueryAndGetObject (fieldsQuery = '', validFields = []) {
  return new Promise((resolve, reject) => {
    // If there's no query skip the query validation.
    if (!fieldsQuery) {
      return resolve({});
    }

    const fieldsArray = fieldsQuery.split(',');

    // This is just verifying that every field is valid.
    const fieldsAreValid = fieldsArray
      .every((field) => validFields.includes(field));

    if (!fieldsAreValid) {
      return reject();
    }

    /**
     * @see {@link src/lib/utils.js}
     */
    const fields = getFieldsObject(fieldsArray);

    resolve(fields);
  });
}
