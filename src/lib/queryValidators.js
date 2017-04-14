/**
 * @overview Validators of query parameters.
 */
'use strict';

/**
 * @name validateKeys
 * @function
 *
 * @description
 * Validates an array of keys.
 *
 * @param {String[]} keysArray - The array of keys to validate.
 * @param {String[]} validKeys - The array of valid keys.
 *
 * @returns {Boolean} true if valid, false otherwise.
 */
export function validateKeys (keysArray = [], validKeys = []) {
  // This is just verifying that every key is valid.
  const keysAreValid = keysArray
    .every((key) => validKeys.includes(key));

  return keysAreValid;
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
