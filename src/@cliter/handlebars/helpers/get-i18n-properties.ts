import * as handlebars from 'handlebars';
import { Property, getI18nProperties } from '../..';

handlebars.registerHelper('getI18nProperties', function(
    properties: Property[],
): Property[]
{
    return getI18nProperties(
        properties,
    );
});
