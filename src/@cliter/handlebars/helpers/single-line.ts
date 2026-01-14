import * as handlebars from 'handlebars';

/**
 * Convert a multiline string to a single line by removing line breaks and normalizing whitespace.
 * Useful for handling YAML multiline descriptions in templates.
 *
 * @example
 * singleLine('Hello\n  World\n    Test')  // Will return 'Hello World Test'.
 * singleLine('Line 1\nLine 2')            // Will return 'Line 1 Line 2'.
 *
 * @returns {string}
 *   The single line string with normalized whitespace.
 */
handlebars.registerHelper('singleLine', function(value)
{
    if (!value || typeof value !== 'string') return value;

    // Remove line breaks and normalize whitespace
    return value
        .replace(/\r?\n|\r/g, ' ')  // Replace line breaks with spaces
        .replace(/\s+/g, ' ')        // Replace multiple spaces with a single space
        .trim();                      // Remove leading and trailing whitespace
});
