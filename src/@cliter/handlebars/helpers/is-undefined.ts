import * as handlebars from 'handlebars';

handlebars.registerHelper('isUndefined', function (variable: any)
{
    return variable === undefined;
});
