import * as handlebars from 'handlebars';
import * as _ from 'lodash';

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
handlebars.registerHelper('toCamelCase', function(value)
{
    return _.camelCase(value);
});
