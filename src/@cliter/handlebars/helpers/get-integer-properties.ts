import * as handlebars from 'handlebars';
import { Property, getIntegerProperties } from '../..';

handlebars.registerHelper('getIntegerProperties', function(
    properties: Property[],
): Property[]
{
    return getIntegerProperties(
        properties,
    );
});
