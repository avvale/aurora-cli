import kebabCase from 'lodash-es/kebabCase';

/**
 * Convert a string to Kebab Case.
 *
 * @example
 * 'Foo Bar'.toSnakeCase()      // Will return `foo-bar`.
 * 'fooBar'.toSnakeCase()       // Will return `foo-bar`.
 * '--FOO-BAR--'.toSnakeCase()  // Will return `foo-bar`.
 *
 * @returns {string}
 *   The Kebab Case string.
 */
String.prototype.toKebabCase = function (this: string): string
{
    return kebabCase(this);
};