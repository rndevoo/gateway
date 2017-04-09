/**
 * @overview Validators of query parameters.
 */
'use strict';

/**
 * @name validateFields
 * @function
 *
 * @description
 * Validates an array of fields.
 *
 * @param {String[]} fieldsArray - The array of fields to validate.
 * @param {String[]} validFields - The array of valid fields.
 *
 * @returns {Boolean} true if valid, false otherwise.
 */
export function validateFields (fieldsArray = [], validFields = []) {
  // This is just verifying that every field is valid.
  const fieldsAreValid = fieldsArray
    .every((field) => validFields.includes(field));

  return fieldsAreValid;
}

/**
 * @name validateFiltersArray
 * @function
 *
 * @description
 * Validates an array of filters.
 *
 * @param {String[]} filtersArray - The array of filter names.
 * @param {String[]} forbiddenFilters - The array of forbidden filter names.
 *
 * @returns {Boolean} true if valid, false otherwise.
 */
export function validateFilters (filtersArray = [], forbiddenFilters = []) {
  // Check if there's a filter in the forbidden filters array.
  const filtersAreForbidden = filtersArray
    .some((filter) => forbiddenFilters.includes(filter));

  return !filtersAreForbidden;
}
