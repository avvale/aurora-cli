import { camelCase, flow, mixin, upperFirst } from 'lodash-es';

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
    const target: { pascalCase: (value: string) => string; } = { pascalCase: () => '' };
    mixin(target, { pascalCase: flow(camelCase, upperFirst) });
    return target.pascalCase(this);
};