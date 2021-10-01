import * as handlebars from 'handlebars';

handlebars.registerHelper('hasItems', function(this: any, items, options)
{
    if (Array.isArray(items) && items.length > 0) return options.fn(this);
});