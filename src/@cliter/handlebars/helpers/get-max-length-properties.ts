import * as handlebars from 'handlebars';
import { Property, getMaxLengthProperties } from '../..';

handlebars.registerHelper('getMaxLengthProperties', function(
    properties: Property[],
): Property[]
{
    return getMaxLengthProperties(
        properties,
    );
});
