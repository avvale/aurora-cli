import * as handlebars from 'handlebars';
import { Property, getResponseProperties } from '../..';

handlebars.registerHelper('getResponseProperties', function(
    properties: Property[],
): Property[]
{
    return getResponseProperties(properties);
});
