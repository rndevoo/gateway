/**
 * @overview Validators of query parameters.
 */
'use strict';

/**
 * @name validateFieldsArray
 * @function
 *
 * @description
 * Validates an array of fields.
 *
 * @param {String[]} fieldsArray - The array of fields to validate.
 * @param {String[]} validFields - The array of valid fields.
 *
 * @returns {Boolean} True if valid, false otherwise.
 */
export function validateFieldsArray (fieldsArray = [], validFields = []) {
  // This is just verifying that every field is valid.
  const fieldsAreValid = fieldsArray
    .every((field) => validFields.includes(field));

  if (!fieldsAreValid) {
    return false;
  } else {
    return true;
  }
}
