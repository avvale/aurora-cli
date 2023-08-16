import * as handlebars from 'handlebars';
import { Property, getIntegerUnsignedProperties } from '../..';

handlebars.registerHelper('getIntegerUnsignedProperties', function(
    properties: Property[],
): Property[]
{
    return getIntegerUnsignedProperties(
        properties,
    );
});
