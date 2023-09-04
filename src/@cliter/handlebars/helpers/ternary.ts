import * as handlebars from 'handlebars';

handlebars.registerHelper('ternary', function (condition: any, firstOption: any, secondOption: any)
{
    return condition ? firstOption : secondOption;
});
