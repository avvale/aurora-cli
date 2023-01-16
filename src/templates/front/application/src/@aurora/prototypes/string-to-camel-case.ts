import camelCase from 'lodash-es/camelCase';

/**
 * Convert a string to Camel Case.
 *
 * @example
 * 'Foo Bar'.toSnakeCase()      // Will return `fooBar`.
 * 'fooBar'.toSnakeCase()       // Will return `fooBar`.
 * '--FOO-BAR--'.toSnakeCase()  // Will return `fooBar`.
 *
 * @returns {string}
 *   The Camel Case string.
 */
String.prototype.toCamelCase = function (this: string): string
{
    return camelCase(this);
};