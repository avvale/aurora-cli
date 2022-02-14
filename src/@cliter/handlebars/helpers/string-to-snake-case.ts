import * as handlebars from 'handlebars';
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
handlebars.registerHelper('toSnakeCase', function(value)
{
    return _.snakeCase(value);
});
