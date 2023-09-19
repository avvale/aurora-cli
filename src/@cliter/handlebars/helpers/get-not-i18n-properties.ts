import * as handlebars from 'handlebars';
import { Property, getNotI18nProperties } from '../..';

handlebars.registerHelper('getNotI18nProperties', function(
    properties: Property[],
): Property[]
{
    return getNotI18nProperties(
        properties,
    );
});
