import * as handlebars from 'handlebars';
import { Property, hasIndexI18nProperties } from '../..';

handlebars.registerHelper('hasIndexI18nProperties', function(
    properties: Property[],
): boolean
{
    return hasIndexI18nProperties(
        properties,
    );
});
