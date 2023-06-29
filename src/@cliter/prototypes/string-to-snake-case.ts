import * as _ from 'lodash';

/**
 * Convert a string to Snake Case.
 *
 * @example
 * 'Foo Bar'.toSnakeCase()      // Will return `foo_bar`.
 * 'fooBar'.toSnakeCase()       // Will return `foo_bar`.
 * '--FOO-BAR--'.toSnakeCase()  // Will return `foo_bar`.
 *
 * @returns {string}
 *   The Snake Cased string.
 */
String.prototype.toSnakeCase = function (this: string): string
{
    return _.snakeCase(this);
};
