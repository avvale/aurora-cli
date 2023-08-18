import * as handlebars from 'handlebars';
import { Property, getFormGroupFieldsIsNotI18nProperties } from '../..';

handlebars.registerHelper('getFormGroupFieldsIsNotI18nProperties', function(
    properties: Property[],
): Property[]
{
    return getFormGroupFieldsIsNotI18nProperties(
        properties,
    );
});
