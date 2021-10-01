import * as handlebars from 'handlebars';

handlebars.registerHelper('setVar', function(varName: string, varValue: any, options)
{
    options.data.root[varName] = varValue;
});