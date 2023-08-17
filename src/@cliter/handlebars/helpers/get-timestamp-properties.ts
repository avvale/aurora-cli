import * as handlebars from 'handlebars';
import { Property, getTimestampProperties } from '../..';

handlebars.registerHelper('getTimestampProperties', function(
    properties: Property[],
): Property[]
{
    return getTimestampProperties(
        properties,
    );
});
