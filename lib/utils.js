/**
 * @overview Utility functions.
 */
'use strict';

/**
 * Returns the string and array of parameters to pass to Postgres.
 *
 * @param {Object} data - The data to be processed.
 * @param {Number} startParametersFrom - Start enumarating parameters from this number.
 *
 * @returns {Object} - Object containing the string and array of parameters.
 */
export function getSqlUpdateStringAndValues (data, startParametersFrom) {
  const dataObjectKeys = Object.keys(data);

  let sqlUpdateString = dataObjectKeys.map((key, index) => {
    let parameterNumber = startParametersFrom + index;
    return `${key} = $${parameterNumber}`;
  }).join(', ');

  let sqlValues = dataObjectKeys.map((key) => data[key]);

  return { sqlUpdateString, sqlValues };
}

/**
 * Returns the string of parameters to pass to Postgres.
 *
 * @param {String[]} fields - The fields to be selected.
 * @param {Number} startParametersFrom - Start enumarating parameters from this number.
 *
 * @returns {String} The string of Postgres parameters.
 */
export function getSqlSelectFieldsString (fields, startParametersFrom) {
  let sqlSelectString = fields.map((field, index) => {
    let parameterNumber = startParametersFrom + index;
    return `$${parameterNumber}`;
  }).join(', ');

  return sqlSelectString;
}
