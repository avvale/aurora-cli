import { Property, hasI18nProperties } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasI18nProperties', function(
    properties: Property[],
): boolean
{
    return hasI18nProperties(
        properties,
    );
});
