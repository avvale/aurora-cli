import * as handlebars from 'handlebars';
import { Property, getDtoProperties } from '../..';

handlebars.registerHelper('getDtoProperties', function(
    properties: Property[],
): Property[]
{
    return getDtoProperties(properties);
});
