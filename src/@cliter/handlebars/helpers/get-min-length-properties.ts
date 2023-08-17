import * as handlebars from 'handlebars';
import { Property, getMinLengthProperties } from '../..';

handlebars.registerHelper('getMinLengthProperties', function(
    properties: Property[],
): Property[]
{
    return getMinLengthProperties(
        properties,
    );
});
