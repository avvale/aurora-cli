import * as handlebars from 'handlebars';

handlebars.registerHelper('push', function(...properties)
{
    // delete last element that contains "lookupProperty, name, hash, data, loc" properties
    const cleanProperties = Array.prototype.slice.call(properties, 0, -1);
    const arrayContainer = cleanProperties.slice(0, 1);
    const propertiesToAdd = cleanProperties.slice(1);

    if (!Array.isArray(arrayContainer)) throw new Error('First argument must be an array');

    properties[0].push(...propertiesToAdd);
});
