import { Property, hasIndexProperties } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasIndexProperties', function(
    properties: Property[],
): boolean
{
    return hasIndexProperties(properties);
});
