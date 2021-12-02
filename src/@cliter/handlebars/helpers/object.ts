import * as handlebars from 'handlebars';

handlebars.registerHelper('object', function({ hash })
{
    return hash;
});