import * as _ from 'lodash';

/**
 * Convert a string to Pascal Case (removing non alphabetic characters).
 *
 * @example
 * 'hello_world'.toPascalCase() // Will return `HelloWorld`.
 * 'fOO BAR'.toPascalCase()     // Will return `FooBar`.
 *
 * @returns {string}
 *   The Pascal Cased string.
 */
String.prototype.toPascalCase = function (this: string): string
{
    _.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) });
    return _.pascalCase(this);
};
