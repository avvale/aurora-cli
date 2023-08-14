import * as handlebars from 'handlebars';
import { Property, getEnumProperties } from '../..';

handlebars.registerHelper('getEnumProperties', function(
    properties: Property[],
): Property[]
{
    return getEnumProperties(properties);
});
