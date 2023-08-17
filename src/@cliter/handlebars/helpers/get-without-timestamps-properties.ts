import * as handlebars from 'handlebars';
import { Property, getWithoutTimestampsProperties } from '../..';

handlebars.registerHelper('getWithoutTimestampsProperties', function(
    properties: Property[],
): Property[]
{
    return getWithoutTimestampsProperties(
        properties,
    );
});
