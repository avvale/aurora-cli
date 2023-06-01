import * as handlebars from 'handlebars';

handlebars.registerHelper('replaceI18n', function(name: string)
{
    // replace I18N with I18n in value objects to avoid uppercase in file names
    return name?.replace('I18N', 'I18n').replace('i18N', 'i18n');
});
