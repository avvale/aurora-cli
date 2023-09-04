import * as handlebars from 'handlebars';
import { Property } from '../..';

handlebars.registerHelper('addI18nPropertySignature', function(property: Property, isPath = false)
{
    return property.isI18n ? (isPath === true ? 'i18n-' : 'I18n') : '';
});
