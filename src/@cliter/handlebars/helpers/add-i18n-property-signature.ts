import * as handlebars from 'handlebars';
import { Property } from '../..';

handlebars.registerHelper('addI18nPropertySignature', function(property: Property)
{
    return property.isI18n ? 'I18n' : '';
});
