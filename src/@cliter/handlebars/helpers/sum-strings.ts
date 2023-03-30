import * as handlebars from 'handlebars';

handlebars.registerHelper('sumStrings', function(...properties)
{
    // delete last element that contains "lookupProperty, name, hash, data, loc" properties
    return Array.prototype.slice.call(properties, 0, -1).join('');
});
