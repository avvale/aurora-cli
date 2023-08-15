import * as handlebars from 'handlebars';
import { Property, getMapperProperties } from '../..';

handlebars.registerHelper('getMapperProperties', function(
    properties: Property[],
): Property[]
{
    return getMapperProperties(properties);
});
