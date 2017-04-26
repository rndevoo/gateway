// @flow

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
 * @param {string[]} keysArray - The array of keys to validate.
 * @param {string[]} validKeys - The array of valid keys.
 *
 * @returns {boolean} true if valid, false otherwise.
 */
export function validateKeys (
  keysArray: string[] = [],
  validKeys: string[] = [],
): boolean {
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
 * @param {string[]} filtersArray - The array of filter names.
 * @param {string[]} forbiddenFilters - The array of forbidden filter names.
 *
 * @returns {boolean} true if valid, false otherwise.
 */
export function validateFilters (
  filtersArray: string[] = [],
  forbiddenFilters: string[] = [],
): boolean {
  // Check if there's a filter in the forbidden filters array.
  const filtersAreForbidden = filtersArray
    .some((filter) => forbiddenFilters.includes(filter));

  return !filtersAreForbidden;
}
