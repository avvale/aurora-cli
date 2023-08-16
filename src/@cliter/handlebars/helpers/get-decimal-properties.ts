import * as handlebars from 'handlebars';
import { Property, getDecimalProperties } from '../..';

handlebars.registerHelper('getDecimalProperties', function(
    properties: Property[],
): Property[]
{
    return getDecimalProperties(
        properties,
    );
});
