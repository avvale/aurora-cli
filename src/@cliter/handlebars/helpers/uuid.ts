import * as handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

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
handlebars.registerHelper('uuid', function(value)
{
    return uuidv4();
});