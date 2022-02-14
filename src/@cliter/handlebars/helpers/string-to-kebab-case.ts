import * as handlebars from 'handlebars';
import * as _ from 'lodash';

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
handlebars.registerHelper('toKebabCase', function(value)
{
    return _.kebabCase(value);
});
